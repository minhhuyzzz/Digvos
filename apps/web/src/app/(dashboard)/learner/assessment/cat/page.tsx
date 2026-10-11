'use client';

import React, { useState } from 'react';
import { 
  Cpu, 
  Clock, 
  CheckCircle2, 
  Sparkles, 
  AlertCircle, 
  HelpCircle,
  BarChart2,
  Check,
  ChevronRight,
  TrendingUp,
  ShieldCheck,
  RotateCcw,
  BookOpen,
  Info,
  Award,
  Layers
} from 'lucide-react';
import Link from 'next/link';

interface HistoricalExam {
  date: string;
  duration: string;
  theta: string;
  level: string;
  status: string;
}

export default function LearnerCATExamPage() {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(14);
  const [thetaScore, setThetaScore] = useState<number>(1.45);
  const [submittedAnswersCount, setSubmittedAnswersCount] = useState<number>(13);
  const [isExamCompleted, setIsExamCompleted] = useState<boolean>(false);
  const [flaggedQuestions, setFlaggedQuestions] = useState<number[]>([]);

  // Lịch sử thi CAT để giao diện phong phú
  const examHistory: HistoricalExam[] = [
    { date: '15/07/2026', duration: '28 phút', theta: '+1.12', level: 'Level 4 (Intermediate)', status: 'Đã lưu On-Chain' },
    { date: '01/07/2026', duration: '35 phút', theta: '+0.85', level: 'Level 3 (Basic)', status: 'Đã lưu On-Chain' },
  ];

  const questionsBank = [
    {
      id: 14,
      domain: 'Domain 4 — An toàn & Bảo mật số (Sub-skill 4.2: Protection of Personal Data)',
      difficultyB: '+1.20 (Khó trung bình)',
      discriminationA: '1.00 (Mặc định Rasch)',
      guessingC: '0.00 (Không áp dụng)',
      predictedProb: '55.4%',
      questionText: 'Trong quy trình xác thực chứng chỉ số Soulbound Token (SBT) trên mạng Polygon Mainnet, phương thức mã hóa nào được sử dụng để đảm bảo tính toàn vẹn của dữ liệu không thể thay đổi (Immutable Data)?',
      options: [
        { id: 0, text: 'A. Thuật toán mã hóa đối xứng AES-256 với khóa bí mật SHA-256.' },
        { id: 1, text: 'B. Chữ ký số bất đối xứng Elliptic Curve Digital Signature Algorithm (ECDSA / Keccak-256) trên Smart Contract.' },
        { id: 2, text: 'C. Cơ chế băm mật khẩu MD5 kết hợp với chuỗi Salt bảo mật.' },
        { id: 3, text: 'D. Mã hóa công khai RSA-2048 với giao thức truyền tải SSL/TLS.' },
      ],
    },
    {
      id: 15,
      domain: 'Domain 3 — Sáng tạo Nội dung số (Sub-skill 3.4: AI Generative Integration)',
      difficultyB: '+1.45 (Nâng cao)',
      discriminationA: '1.00 (Mặc định Rasch)',
      guessingC: '0.00 (Không áp dụng)',
      predictedProb: '42.8%',
      questionText: 'Kỹ thuật Prompting nào hiệu quả nhất để giảm thiểu hiện tượng Ảo giác (Hallucination) của LLM khi xây dựng hệ thống RAG (Retrieval-Augmented Generation)?',
      options: [
        { id: 0, text: 'A. Tăng tham số Temperature lên 1.0 để mô hình phát sinh nhiều ý tưởng phong phú hơn.' },
        { id: 1, text: 'B. Sử dụng System Prompt ép buộc mô hình trích dẫn ngữ cảnh (Grounding in Context) và phản hồi "Không tìm thấy" nếu dữ liệu không có trong DB.' },
        { id: 2, text: 'C. Viết câu hỏi thật dài và dùng nhiều từ ngữ hoa mỹ để kích thích AI suy luận.' },
        { id: 3, text: 'D. Chuyển sang mô hình nhỏ hơn như Llama-3-8B để tiết kiệm dung lượng bộ nhớ.' },
      ],
    }
  ];

  const currentQ = questionsBank[(currentQuestionIndex - 14) % questionsBank.length];

  const handleNextAdaptiveQuestion = () => {
    if (selectedAnswer === null) return;
    const isCorrect = selectedAnswer === 1;
    const delta = isCorrect ? +0.15 : -0.20;
    const nextTheta = Number((thetaScore + delta).toFixed(2));
    setThetaScore(nextTheta);
    setSubmittedAnswersCount(prev => prev + 1);

    if (currentQuestionIndex >= 25) {
      setIsExamCompleted(true);
    } else {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
    }
  };

  const toggleFlagQuestion = (qIndex: number) => {
    setFlaggedQuestions(prev => 
      prev.includes(qIndex) ? prev.filter(i => i !== qIndex) : [...prev, qIndex]
    );
  };

  // Trình điều hướng câu hỏi CAT (Question Navigation list)
  const renderQuestionNavigator = () => {
    const totalQ = 25;
    return (
      <div className="grid grid-cols-5 gap-1.5 pt-2">
        {Array.from({ length: totalQ }, (_, i) => {
          const qNum = i + 1;
          const isCurrent = qNum === currentQuestionIndex;
          const isDone = qNum < currentQuestionIndex;
          const isFlagged = flaggedQuestions.includes(qNum);

          return (
            <div
              key={qNum}
              className={`p-2 rounded text-center font-mono font-bold text-[10px] border transition-all ${
                isCurrent 
                  ? 'bg-[#0f172a] text-white border-[#0f172a]' 
                  : isFlagged
                  ? 'bg-amber-500 text-white border-amber-500'
                  : isDone
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  : 'bg-[#f8fafc] text-[#94a3b8] border-[#e2e8f0]'
              }`}
            >
              {qNum}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16 font-sans text-[#0f172a]">
      {/* Top Banner Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-[#e2e8f0] pb-5 gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#0f172a] flex items-center gap-2">
            <Cpu className="w-6 h-6 text-[#0f172a]" /> Kỳ Thi Thích Ứng Năng Lực Số CAT (Rasch IRT Model)
          </h1>
          <p className="text-xs text-[#64748b] mt-1">Động cơ bài thi thích ứng tự động điều chỉnh độ khó câu hỏi dựa trên chỉ số Năng lực Theta ($\theta$).</p>
        </div>

        <div className="flex items-center space-x-4 bg-white border border-[#e2e8f0] rounded-xl px-4 py-2.5 text-xs shadow-2xs">
          <div className="flex items-center space-x-1.5 font-mono font-bold text-[#0f172a]">
            <Clock className="w-4 h-4 text-[#0f172a]" />
            <span>32:45 còn lại</span>
          </div>
          <span className="text-[#cbd5e1]">|</span>
          <span className="font-bold text-[#0f172a]">Câu {currentQuestionIndex} / 25</span>
        </div>
      </div>

      {isExamCompleted ? (
        /* Completed Exam Result Summary Box */
        <div className="bg-white border border-[#e2e8f0] rounded-xl p-8 text-center space-y-6 shadow-2xs">
          <div className="w-16 h-16 bg-[#f1f5f9] border border-[#cbd5e1] rounded-full flex items-center justify-center mx-auto text-[#0f172a]">
            <ShieldCheck className="w-8 h-8 text-emerald-600" />
          </div>

          <div className="space-y-2 max-w-md mx-auto">
            <h2 className="text-xl font-extrabold text-[#0f172a]">Chúc Mừng! Bạn Đã Hoàn Thành Kỳ Thi CAT</h2>
            <p className="text-xs text-[#64748b]">Thuật toán khảo thí IRT Rasch đã phân tích chính xác năng lực số của bạn.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-xl mx-auto text-xs">
            <div className="p-4 bg-[#f8fafc] border border-[#e2e8f0] rounded-xl text-center">
              <span className="text-[11px] text-[#64748b] block">Chỉ số Theta Final</span>
              <span className="text-2xl font-mono font-extrabold text-[#0f172a] block mt-1">+{thetaScore} $\theta$</span>
            </div>
            <div className="p-4 bg-[#f8fafc] border border-[#e2e8f0] rounded-xl text-center">
              <span className="text-[11px] text-[#64748b] block">Cấp Độ Năng Lực</span>
              <span className="text-sm font-bold text-emerald-600 block mt-2">Level 5 (Advanced)</span>
            </div>
            <div className="p-4 bg-[#f8fafc] border border-[#e2e8f0] rounded-xl text-center">
              <span className="text-[11px] text-[#64748b] block">Độ Tin Cậy SE</span>
              <span className="text-2xl font-mono font-bold text-[#0f172a] block mt-1">96.4%</span>
            </div>
          </div>

          <div className="flex items-center justify-center space-x-3 pt-2">
            <Link
              href="/learner/analytics/radar"
              className="px-5 py-2.5 bg-[#0f172a] hover:bg-[#1e293b] text-white text-xs font-bold rounded-xl transition-all shadow-xs"
            >
              Xem Biểu Đồ Radar Năng Lực
            </Link>
            <Link
              href="/learner/portfolio/proofs"
              className="px-5 py-2.5 bg-white border border-[#cbd5e1] hover:bg-[#f8fafc] text-[#0f172a] text-xs font-bold rounded-xl transition-all"
            >
              Nộp Bài Minh Chứng Cấp SBT
            </Link>
          </div>
        </div>
      ) : (
        /* Main Exam Interface Workspace */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Primary Question Area (68%) */}
          <div className="lg:col-span-8 space-y-4">
            <div className="bg-white border border-[#e2e8f0] rounded-xl p-6 shadow-2xs space-y-5">
              <div className="flex items-center justify-between border-b border-[#f1f5f9] pb-3 text-xs">
                <span className="font-mono font-bold bg-[#f1f5f9] text-[#334155] px-2.5 py-1 rounded border border-[#cbd5e1] truncate max-w-[70%]">
                  {currentQ.domain}
                </span>
                <span className="font-mono text-[#0f172a] font-bold bg-[#f1f5f9] px-2 py-0.5 rounded border border-[#cbd5e1] shrink-0">
                  Độ khó $b$: {currentQ.difficultyB}
                </span>
              </div>

              <div className="space-y-3">
                <h3 className="text-sm font-bold text-[#0f172a] leading-relaxed">
                  Câu {currentQuestionIndex}: {currentQ.questionText}
                </h3>

                <div className="space-y-2.5 pt-2 text-xs">
                  {currentQ.options.map((opt) => (
                    <div
                      key={opt.id}
                      onClick={() => setSelectedAnswer(opt.id)}
                      className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-start space-x-3 ${
                        selectedAnswer === opt.id
                          ? 'bg-[#0f172a] text-white border-[#0f172a] font-bold shadow-xs'
                          : 'bg-[#f8fafc] text-[#334155] border-[#e2e8f0] hover:border-[#cbd5e1]'
                      }`}
                    >
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
                        selectedAnswer === opt.id ? 'border-white bg-white text-[#0f172a]' : 'border-[#cbd5e1] bg-white'
                      }`}>
                        {selectedAnswer === opt.id && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                      <span className="leading-relaxed">{opt.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-[#f1f5f9]">
                <button
                  onClick={() => toggleFlagQuestion(currentQuestionIndex)}
                  className={`px-3.5 py-2 border text-xs font-bold rounded-lg transition-all ${
                    flaggedQuestions.includes(currentQuestionIndex)
                      ? 'bg-amber-500 text-white border-amber-500'
                      : 'bg-white hover:bg-[#f8fafc] border-[#cbd5e1] text-[#0f172a]'
                  }`}
                >
                  {flaggedQuestions.includes(currentQuestionIndex) ? 'Đã đánh dấu xem lại' : 'Đánh dấu xem lại câu này'}
                </button>

                <button
                  onClick={handleNextAdaptiveQuestion}
                  disabled={selectedAnswer === null}
                  className={`px-5 py-2.5 text-xs font-bold rounded-xl transition-all flex items-center space-x-2 ${
                    selectedAnswer !== null
                      ? 'bg-[#0f172a] hover:bg-[#1e293b] text-white cursor-pointer shadow-xs'
                      : 'bg-[#e2e8f0] text-[#94a3b8] cursor-not-allowed'
                  }`}
                >
                  <span>Nộp đáp án & Chuyển câu tiếp theo</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* 📊 NEW WIREFRAME WIDGET: Bảng thông số kỹ thuật khảo thí IRT Rasch */}
            <div className="bg-white border border-[#e2e8f0] rounded-xl p-5 shadow-2xs space-y-3 text-xs">
              <h3 className="font-bold text-sm text-[#0f172a] flex items-center gap-1.5 border-b border-[#f1f5f9] pb-2">
                <Info className="w-4 h-4 text-[#0f172a]" /> Thông Số Kỹ Thuật Câu Hỏi Hiện Tại (IRT Parameters)
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-3 bg-[#f8fafc] border border-[#e2e8f0] rounded-lg">
                  <span className="text-[#64748b] block font-semibold text-[10px]">Độ khó ($b$-parameter):</span>
                  <span className="font-mono font-bold text-[#0f172a] text-xs">{currentQ.difficultyB}</span>
                </div>
                <div className="p-3 bg-[#f8fafc] border border-[#e2e8f0] rounded-lg">
                  <span className="text-[#64748b] block font-semibold text-[10px]">Độ phân biệt ($a$-parameter):</span>
                  <span className="font-mono font-bold text-[#0f172a] text-xs">{currentQ.discriminationA}</span>
                </div>
                <div className="p-3 bg-[#f8fafc] border border-[#e2e8f0] rounded-lg">
                  <span className="text-[#64748b] block font-semibold text-[10px]">Hệ số đoán mò ($c$-parameter):</span>
                  <span className="font-mono font-bold text-[#0f172a] text-xs">{currentQ.guessingC}</span>
                </div>
                <div className="p-3 bg-[#f8fafc] border border-[#e2e8f0] rounded-lg">
                  <span className="text-[#64748b] block font-semibold text-[10px]">Xác suất đúng dự báo:</span>
                  <span className="font-mono font-bold text-emerald-600 text-xs">{currentQ.predictedProb}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Adaptive IRT Theta Engine Simulator (32%) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-white border border-[#e2e8f0] rounded-xl p-5 shadow-2xs space-y-3">
              <div className="flex items-center justify-between border-b border-[#f1f5f9] pb-2">
                <h3 className="font-bold text-xs uppercase tracking-wider text-[#64748b]">Dự Báo Năng Lực Theta ($\theta$)</h3>
                <span className="text-[10px] font-mono font-bold bg-[#f1f5f9] text-[#334155] px-2 py-0.5 rounded border border-[#cbd5e1]">
                  Rasch 1PL Model
                </span>
              </div>

              {/* LIVE LINE GRAPH (SVG) OF THETA */}
              <div className="bg-[#f8fafc] border border-[#e2e8f0] rounded-xl p-3">
                <svg className="w-full h-24 text-[#0f172a]" viewBox="0 0 100 40">
                  <path
                    d="M 10,32 L 20,28 L 30,26 L 40,24 L 50,18 L 60,15 L 70,22 L 80,14 L 90,10"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle cx="10" cy="32" r="1" fill="currentColor" />
                  <circle cx="20" cy="28" r="1" fill="currentColor" />
                  <circle cx="30" cy="26" r="1" fill="currentColor" />
                  <circle cx="40" cy="24" r="1" fill="currentColor" />
                  <circle cx="50" cy="18" r="1" fill="currentColor" />
                  <circle cx="60" cy="15" r="1" fill="currentColor" />
                  <circle cx="70" cy="22" r="1" fill="currentColor" />
                  <circle cx="80" cy="14" r="1" fill="currentColor" />
                  <circle cx="90" cy="10" r="2" fill="#10b981" />
                  {/* Grid Lines */}
                  <line x1="0" y1="20" x2="100" y2="20" stroke="#e2e8f0" strokeWidth="0.5" strokeDasharray="2,2" />
                </svg>
                <div className="flex justify-between text-[8px] text-[#64748b] font-mono pt-1">
                  <span>Câu 1</span>
                  <span>Câu 6</span>
                  <span>Câu {currentQuestionIndex} (Hiện tại)</span>
                </div>
              </div>

              <div className="space-y-2 text-xs pt-1">
                <div className="flex justify-between">
                  <span className="text-[#64748b]">Theta hiện tại:</span>
                  <span className="font-mono font-bold text-[#0f172a]">+{thetaScore} $\theta$</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#64748b]">Độ sai số chuẩn SE:</span>
                  <span className="font-mono font-bold text-[#0f172a]">0.18</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#64748b]">Số câu đã trả lời:</span>
                  <span className="font-mono font-bold text-[#0f172a]">{submittedAnswersCount} câu</span>
                </div>
              </div>
            </div>

            {/* 📊 NEW WIREFRAME WIDGET: Navigation board of questions */}
            <div className="bg-white border border-[#e2e8f0] rounded-xl p-5 shadow-2xs space-y-3 text-xs">
              <h3 className="font-bold text-xs uppercase tracking-wider text-[#64748b] border-b border-[#f1f5f9] pb-2">
                Trình Điều Hướng Câu Hỏi CAT
              </h3>
              {renderQuestionNavigator()}
              <div className="flex items-center justify-between text-[8px] text-[#64748b] pt-1">
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-emerald-500"></span> Đã trả lời</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-[#0f172a]"></span> Đang làm</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-amber-500"></span> Xem lại</span>
              </div>
            </div>

            {/* Exam History logs */}
            <div className="bg-white border border-[#e2e8f0] rounded-xl p-5 shadow-2xs space-y-3">
              <h3 className="font-bold text-xs uppercase tracking-wider text-[#64748b]">Lịch Sử Khảo Thí CAT</h3>
              <div className="space-y-2 text-xs">
                {examHistory.map((item, idx) => (
                  <div key={idx} className="p-3 bg-[#f8fafc] border border-[#e2e8f0] rounded-lg space-y-1">
                    <div className="flex justify-between font-bold text-[#0f172a]">
                      <span>{item.level}</span>
                      <span className="font-mono">{item.theta} $\theta$</span>
                    </div>
                    <div className="flex justify-between text-[10px] text-[#64748b]">
                      <span>{item.date} • {item.duration}</span>
                      <span className="text-emerald-600 font-bold">{item.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}