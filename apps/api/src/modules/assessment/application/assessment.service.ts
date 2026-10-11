import { Injectable, Inject, NotFoundException, BadRequestException } from '@nestjs/common';
import { IAssessmentRepository } from '../domain/repositories/assessment.repository.interface';
import { IEventBus } from '../../../common/core/event-bus.interface';
import { CatEngineDomainService, QuestionData } from '../domain/services/cat-engine.service';
import { CreateQuestionDto } from '../dto/create-question.dto';
import { UpdateQuestionDto } from '../dto/update-question.dto';
import { SubmitAnswerDto } from '../dto/submit-answer.dto';

@Injectable()
export class AssessmentService {
  constructor(
    @Inject('IAssessmentRepository')
    private readonly assessmentRepository: IAssessmentRepository,
    @Inject('IEventBus')
    private readonly eventBus: IEventBus,
    private readonly catEngine: CatEngineDomainService,
  ) {}

  // =========================================================================
  // 1. Question Bank CRUD
  // =========================================================================

  async createQuestion(dto: CreateQuestionDto, tenantId: string): Promise<any> {
    return this.assessmentRepository.createQuestion({
      ...dto,
      tenantId,
    });
  }

  async getQuestion(id: string): Promise<any> {
    const question = await this.assessmentRepository.findQuestionById(id);
    if (!question) throw new NotFoundException(`Question with ID '${id}' not found`);
    return question;
  }

  async updateQuestion(id: string, dto: UpdateQuestionDto): Promise<any> {
    await this.getQuestion(id);
    return this.assessmentRepository.updateQuestion(id, dto);
  }

  async deleteQuestion(id: string): Promise<any> {
    await this.getQuestion(id);
    return this.assessmentRepository.deleteQuestion(id);
  }

  async listQuestions(tenantId: string, competencyId?: string): Promise<any[]> {
    return this.assessmentRepository.listQuestions(tenantId, competencyId);
  }

  // =========================================================================
  // 2. CAT Adaptive Testing Engine Application Flow
  // =========================================================================

  /**
   * Start a new Computer Adaptive Testing (CAT) session for a student
   */
  async startSession(studentId: string, competencyId: string, tenantId: string): Promise<any> {
    const questions = await this.assessmentRepository.getQuestionsByCompetency(competencyId);
    if (questions.length === 0) {
      throw new BadRequestException(`No questions available for competency ID '${competencyId}' to start CAT test.`);
    }

    const session = await this.assessmentRepository.createCatSession({
      studentId,
      competencyId,
      maxQuestions: 5, // We use 5 questions for dev/demo purposes
      tenantId,
    });

    // Select the first question for targeted theta = 0.0 (Intermediate level)
    const pool: QuestionData[] = questions.map((q) => ({
      id: q.id,
      level: q.level,
      difficulty: this.catEngine.getDifficulty(q.level),
    }));

    const nextQData = this.catEngine.selectNextQuestion(0.0, pool, []);
    if (!nextQData) {
      throw new BadRequestException('Failed to select the first question.');
    }

    const question = questions.find((q) => q.id === nextQData.id);

    return {
      success: true,
      sessionId: session.id,
      questionsAsked: 0,
      maxQuestions: session.maxQuestions,
      status: session.status,
      nextQuestion: {
        id: question.id,
        content: question.content,
        choices: (question.options as any).choices,
      },
    };
  }

  /**
   * Submit student's answer to the current question, update estimated theta (proficiency),
   * and select the next question or terminate the test.
   */
  async submitAnswer(sessionId: string, dto: SubmitAnswerDto): Promise<any> {
    const session = await this.assessmentRepository.findCatSessionById(sessionId);
    if (!session) throw new NotFoundException(`CAT Session '${sessionId}' not found`);
    if (session.status === 'COMPLETED') {
      throw new BadRequestException('This CAT test session is already completed.');
    }

    const question = await this.assessmentRepository.findQuestionById(dto.questionId);
    if (!question) throw new NotFoundException(`Question '${dto.questionId}' not found`);

    // Verify option answer correctness
    const isCorrect = (question.options as any).correctAnswerIndex === dto.chosenOptionIndex;

    // Save response
    await this.assessmentRepository.createCatResponse({
      sessionId,
      questionId: dto.questionId,
      isCorrect,
    });

    // Run IRT estimation update
    const questionDifficulty = this.catEngine.getDifficulty(question.level);
    const newTheta = this.catEngine.updateEstimation(session.estimatedTheta, questionDifficulty, isCorrect);
    const questionsAsked = session.questionsAsked + 1;

    // Get available questions pool
    const questions = await this.assessmentRepository.getQuestionsByCompetency(session.competencyId);
    const pool: QuestionData[] = questions.map((q) => ({
      id: q.id,
      level: q.level,
      difficulty: this.catEngine.getDifficulty(q.level),
    }));

    const answeredIds = session.responses.map((r: any) => r.questionId).concat(dto.questionId);
    const isTerminated = this.catEngine.shouldTerminate(questionsAsked, session.maxQuestions, pool.length - answeredIds.length);

    if (isTerminated) {
      const finalLevel = this.catEngine.mapThetaToLevel(newTheta);

      // Complete session
      await this.assessmentRepository.updateCatSession(sessionId, {
        status: 'COMPLETED',
        estimatedTheta: newTheta,
        currentLevel: finalLevel,
        questionsAsked,
      });

      // Update student's competency record in DB
      await this.assessmentRepository.updateStudentCompetency(
        session.studentId,
        session.competencyId,
        finalLevel,
      );

      const payload = {
        studentId: session.studentId,
        competencyId: session.competencyId,
        proficiencyLevel: finalLevel,
        estimatedTheta: newTheta,
        tenantId: session.tenantId,
        completedAt: new Date(),
      };

      // 1. Outbox pattern logging
      await this.assessmentRepository.createEventLog('AssessmentCompleted', payload);

      // 2. Publish event via clean IEventBus abstraction
      await this.eventBus.publish('AssessmentCompleted', payload);

      return {
        success: true,
        status: 'COMPLETED',
        questionsAsked,
        maxQuestions: session.maxQuestions,
        estimatedTheta: newTheta,
        finalLevel,
        message: 'CAT Assessment completed successfully. Competency level updated.',
      };
    } else {
      // Select next question
      const nextQData = this.catEngine.selectNextQuestion(newTheta, pool, answeredIds);
      if (!nextQData) {
        throw new BadRequestException('No more questions available to continue adaptive testing.');
      }

      const nextQuestion = questions.find((q) => q.id === nextQData.id);

      // Save interim state
      await this.assessmentRepository.updateCatSession(sessionId, {
        estimatedTheta: newTheta,
        questionsAsked,
        currentLevel: this.catEngine.mapThetaToLevel(newTheta),
      });

      return {
        success: true,
        status: 'STARTED',
        questionsAsked,
        maxQuestions: session.maxQuestions,
        estimatedTheta: newTheta,
        nextQuestion: {
          id: nextQuestion.id,
          content: nextQuestion.content,
          choices: (nextQuestion.options as any).choices,
        },
      };
    }
  }

  // Fallback signature for legacy code / basic endpoints
  async submitAssessment(studentId: string, competencyId: string, score: number, tenantId: string) {
    const payload = { studentId, competencyId, score, tenantId };
    await this.assessmentRepository.createEventLog('AssessmentCompleted', payload);
    await this.eventBus.publish('AssessmentCompleted', payload);
    return {
      success: true,
      message: 'Assessment submitted successfully. Processing competency updates asynchronously.',
      submittedAt: new Date(),
    };
  }
}
