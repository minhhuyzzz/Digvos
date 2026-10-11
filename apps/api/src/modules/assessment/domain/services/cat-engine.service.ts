import { Injectable } from '@nestjs/common';
import { ProficiencyLevel } from '@digvos/database';

export interface QuestionData {
  id: string;
  level: ProficiencyLevel;
  difficulty: number;
}

@Injectable()
export class CatEngineDomainService {
  // Map ProficiencyLevel to IRT difficulty parameter 'b'
  private readonly levelDifficultyMap: Record<ProficiencyLevel, number> = {
    [ProficiencyLevel.FOUNDATION_1]: -2.5,
    [ProficiencyLevel.FOUNDATION_2]: -1.8,
    [ProficiencyLevel.INTERMEDIATE_3]: -1.0,
    [ProficiencyLevel.INTERMEDIATE_4]: -0.2,
    [ProficiencyLevel.ADVANCED_5]: 0.5,
    [ProficiencyLevel.ADVANCED_6]: 1.2,
    [ProficiencyLevel.HIGHLY_SPECIALIZED_7]: 2.0,
    [ProficiencyLevel.HIGHLY_SPECIALIZED_8]: 2.8,
  };

  /**
   * Get numerical difficulty value for a given level
   */
  getDifficulty(level: ProficiencyLevel): number {
    return this.levelDifficultyMap[level] || 0.0;
  }

  /**
   * Map theta value back to the nearest ProficiencyLevel
   */
  mapThetaToLevel(theta: number): ProficiencyLevel {
    let closestLevel: ProficiencyLevel = ProficiencyLevel.FOUNDATION_1;
    let minDiff = Infinity;

    for (const [level, diff] of Object.entries(this.levelDifficultyMap)) {
      const d = Math.abs(theta - diff);
      if (d < minDiff) {
        minDiff = d;
        closestLevel = level as ProficiencyLevel;
      }
    }

    return closestLevel;
  }

  /**
   * Calculate updated theta parameter using simplified Item Response Theory (IRT)
   * Formula: theta_new = theta_old + K * (isCorrect - P(theta_old))
   * Where P(theta) = 1 / (1 + exp(-1.7 * (theta - difficulty)))
   */
  updateEstimation(currentTheta: number, questionDifficulty: number, isCorrect: boolean): number {
    const K = 0.8; // Step size parameter
    const expTerm = Math.exp(-1.7 * (currentTheta - questionDifficulty));
    const probability = 1 / (1 + expTerm);

    const actual = isCorrect ? 1 : 0;
    let newTheta = currentTheta + K * (actual - probability);

    // Clamp theta to standard range [-3.0, 3.0]
    newTheta = Math.max(-3.0, Math.min(3.0, newTheta));
    return newTheta;
  }

  /**
   * Select the next question from pool based on current estimated theta
   * Filter out already answered questions.
   */
  selectNextQuestion(
    currentTheta: number,
    pool: QuestionData[],
    answeredIds: string[],
  ): QuestionData | null {
    const targetLevel = this.mapThetaToLevel(currentTheta);
    const available = pool.filter((q) => !answeredIds.includes(q.id));

    if (available.length === 0) return null;

    // 1. Try to find a question matching the exact target level
    const exactMatches = available.filter((q) => q.level === targetLevel);
    if (exactMatches.length > 0) {
      // Return a random one from exact matches
      return exactMatches[Math.floor(Math.random() * exactMatches.length)];
    }

    // 2. Fallback: Find the question with difficulty closest to the target theta
    let bestMatch: QuestionData = available[0];
    let minDiff = Infinity;

    for (const q of available) {
      const diffVal = this.getDifficulty(q.level);
      const difference = Math.abs(currentTheta - diffVal);
      if (difference < minDiff) {
        minDiff = difference;
        bestMatch = q;
      }
    }

    return bestMatch;
  }

  /**
   * Determine whether the adaptive test session should stop
   */
  shouldTerminate(questionsAsked: number, maxQuestions: number, availablePoolCount: number): boolean {
    // Stop if we have asked enough questions, or no questions remain in the pool
    return questionsAsked >= maxQuestions || availablePoolCount === 0;
  }
}
