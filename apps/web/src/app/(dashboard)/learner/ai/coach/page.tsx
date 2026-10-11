'use client';

import React, { useState } from 'react';
import { Sparkles, Send, Bot, User, BookOpen, HelpCircle, ShieldCheck, RefreshCw, Plus, MessageSquare, Code, AlertTriangle, CheckCircle } from 'lucide-react';
import Link from 'next/link';

interface Persona {
  id: string;
  name: string;
  role: string;
  avatar: string;
  description: string;
}

interface AuditIssue {
  id: string;
  category: string;
  severity: 'High' | 'Medium' | 'Low';
  description: string;
  line: string;
}

export default function LearnerAICoachPage() {
  // 📝 NEW WIREFRAME DATA: AI Persona and Code Audit Workspace
  const personas: Persona[] = [
    { id: 'p_1', name: 'AI Coding Mentor', role: 'Fullstack Tech Lead', avatar: '💻', description: 'Chuyên gia giải đáp về cấu trúc dynamic NestJS routing và ORM database.' },
    { id: 'p_2', name: 'AI Security Expert', role: 'Web3 Security Auditor', avatar: '🛡️', description: 'Chuyên gia kiểm định smart contract và bảo mật mã hóa ECDSA.' },
    { id: 'p_3', name: 'AI Assessment Tutor', role: 'IRT Rasch Specialist', avatar: '📊', description: 'Chuyên gia phân tích lý thuyết khảo thí thích ứng CAT và chỉ số Theta.' }
  ];

  const [selectedPersona, setSelectedPersona] = useState<Persona>(personas[0]);
  const [messages, setMessages] = useState([
    { id: 1, sender: 'ai', text: 'Xin chào Trần Minh Huy! Tôi là AI Coding Mentor của bạn. Dựa trên chỉ số khảo thí Theta (θ = +1.45), tôi khuyên bạn nên tập trung cải thiện Kỹ năng 4.2 (Mã hóa ECDSA Polygon). Bạn cần tôi giải thích hay gợi ý bài học nào hôm nay?' },
  ]);
  const [inputText, setInputText] = useState('');
  const [isAiReplying, setIsAiReplying] = useState(false);

  // States for Code Audit Workspace
  const [sourceCode, setSourceCode] = useState(`// Ví dụ mã nguồn cần kiểm tra bảo mật
function mintSoulboundToken(address to, string memory tokenURI) public {
    // THIẾU KIỂM TRA PHÂN QUYỀN HỘI ĐỒNG KHẢO THÍ (OnlyRole)
    _safeMint(to, tokenURI);
}`);
  const [isAuditing, setIsAuditing] = useState(false);
  const [auditIssues, setAuditIssues] = useState<AuditIssue[] | null>(null);

  const promptSuggestions = [
    'Giải thích thuật toán Rasch IRT 1PL Model?',
    'Cách tối ưu prompt cho GPT-4o giảm ảo giác?',
    'Làm thế nào để đúc Soulbound Token Solidity?'
  ];

  const chatSessions = [
    { id: 'ch_1', title: 'Tìm hiểu chữ ký số ECDSA', date: 'Hôm nay' },
    { id: 'ch_2', title: 'Rasch IRT 1PL Model là gì?', date: 'Hôm qua' },
    { id: 'ch_3', title: 'Cách cài đặt pgvector Postgres', date: '18/07/2026' }
  ];

  const handleSendMessage = () => {
    if (!inputText.trim()) return;
    const userMsg = { id: Date.now(), sender: 'user', text: inputText };
    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsAiReplying(true);

    setTimeout(() => {
      setIsAiReplying(false);
      setMessages(prev => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'ai',
          text: `[${selectedPersona.name}]: Cảm ơn câu hỏi của bạn. Quy trình được phân tích theo vai trò chuyên biệt của tôi để đảm bảo bạn nắm vững logic.`
        }
      ]);
    }, 1000);
  };

  const handleRunCodeAudit = () => {
    setIsAuditing(true);
    setAuditIssues(null);

    setTimeout(() => {
      setIsAuditing(false);
      setAuditIssues([
        { id: 'iss_1', category: 'Access Control', severity: 'High', description: 'Hàm mintSoulboundToken không cấu hình Modifier để kiểm soát quyền đúc (Ví dụ: onlyRole hoặc onlyOwner). Học viên có thể tự đúc SBT.', line: 'Line 2' },
        { id: 'iss_2', category: 'Gas Optimization', severity: 'Low', description: 'Tham số memory tokenURI nên được thay thế bằng calldata để tiết kiệm chi phí Gas giao dịch.', line: 'Line 2' }
      ]);
    }, 1500);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16 font-sans text-[#0f172a]">
      {/* Top Banner Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-[#e2e8f0] pb-5 gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#0f172a] flex items-center gap-2">
            <Bot className="w-6 h-6 text-[#0f172a]" /> Trợ Lý AI Coach Gia Sư Năng Lực Số 24/7
          </h1>
          <p className="text-xs text-[#64748b] mt-1">Trợ lý AI cá nhân hóa giải đáp bài học, gợi ý mã nguồn & giải thích bài thi CAT realtime.</p>
        </div>

        <div className="flex items-center space-x-3 text-xs">
          <div className="px-3.5 py-2 bg-white border border-[#e2e8f0] rounded-xl font-mono font-bold text-[#0f172a] shadow-2xs flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-500 fill-amber-500" />
            <span>GPT-4o Engine Active</span>
          </div>
        </div>
      </div>

      {/* ⚡ NEW WIREFRAME ROW: AI Personas Selector */}
      <div className="bg-white border border-[#e2e8f0] rounded-xl p-5 shadow-2xs space-y-3 text-xs">
        <h3 className="font-bold text-sm text-[#0f172a]">Lựa chọn vai trò Trợ lý AI</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {personas.map((p) => (
            <div
              key={p.id}
              onClick={() => {
                setSelectedPersona(p);
                setMessages([
                  { id: Date.now(), sender: 'ai', text: `Xin chào! Tôi là ${p.name} (${p.role}). Tôi sẽ hỗ trợ bạn chuyên sâu về phân hệ này.` }
                ]);
              }}
              className={`p-4 rounded-xl border cursor-pointer transition-all space-y-1.5 ${
                selectedPersona.id === p.id
                  ? 'bg-[#0f172a] text-white border-[#0f172a] shadow-xs'
                  : 'bg-[#f8fafc] text-[#334155] border-[#e2e8f0] hover:border-[#cbd5e1]'
              }`}
            >
              <div className="flex items-center space-x-2">
                <span className="text-lg">{p.avatar}</span>
                <div>
                  <h4 className="font-bold text-xs">{p.name}</h4>
                  <span className={`text-[9px] ${selectedPersona.id === p.id ? 'text-[#cbd5e1]' : 'text-[#64748b]'}`}>{p.role}</span>
                </div>
              </div>
              <p className={`text-[10px] leading-relaxed ${selectedPersona.id === p.id ? 'text-[#e2e8f0]' : 'text-[#64748b]'}`}>{p.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Main Workspace layout: Chat and Audit Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[500px]">
        {/* Left column: Chat App Workspace (55%) */}
        <div className="lg:col-span-6 bg-white border border-[#e2e8f0] rounded-xl p-5 shadow-2xs flex flex-col justify-between">
          <div className="border-b border-[#f1f5f9] pb-3 text-xs font-bold text-[#0f172a] flex justify-between items-center">
            <span>Hỏi đáp cùng {selectedPersona.name}</span>
            <span className="text-[10px] font-mono bg-[#f8fafc] px-2 py-0.5 rounded border border-[#cbd5e1]">{selectedPersona.role}</span>
          </div>

          {/* Messages list area */}
          <div className="space-y-4 text-xs overflow-y-auto max-h-[350px] min-h-[300px] pr-2 pt-3">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex items-start space-x-3 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.sender === 'ai' && (
                  <div className="w-8 h-8 rounded-full bg-[#0f172a] text-white flex items-center justify-center shrink-0">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div className={`p-3.5 rounded-2xl max-w-lg leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-[#0f172a] text-white font-bold rounded-tr-none'
                    : 'bg-[#f8fafc] border border-[#e2e8f0] text-[#0f172a] rounded-tl-none'
                }`}>
                  <p>{m.text}</p>
                </div>

                {m.sender === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-[#cbd5e1] text-[#0f172a] font-bold flex items-center justify-center shrink-0 text-xs">
                    TMH
                  </div>
                )}
              </div>
            ))}

            {isAiReplying && (
              <div className="flex items-center space-x-2 text-xs text-[#64748b] italic">
                <Bot className="w-4 h-4 animate-bounce text-[#0f172a]" />
                <span>AI Coach đang soạn câu trả lời...</span>
              </div>
            )}
          </div>

          {/* Prompt Suggestions & Input box */}
          <div className="space-y-3 pt-4 border-t border-[#f1f5f9]">
            <div className="flex items-center space-x-2 overflow-x-auto pb-1">
              <span className="text-[11px] text-[#64748b] font-bold shrink-0">Gợi ý:</span>
              {promptSuggestions.map((s, idx) => (
                <button
                  key={idx}
                  onClick={() => setInputText(s)}
                  className="px-2.5 py-1 bg-[#f8fafc] hover:bg-[#e2e8f0] border border-[#cbd5e1] rounded-lg text-[10px] text-[#334155] whitespace-nowrap transition-all"
                >
                  {s}
                </button>
              ))}
            </div>

            <div className="flex space-x-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Đặt câu hỏi cho AI..."
                className="flex-1 bg-[#f8fafc] border border-[#e2e8f0] rounded-xl px-4 py-3 text-xs text-[#0f172a] focus:outline-none focus:border-[#0f172a]"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputText.trim()}
                className={`px-5 py-3 rounded-xl font-bold text-xs transition-all flex items-center space-x-2 ${
                  inputText.trim()
                    ? 'bg-[#0f172a] hover:bg-[#1e293b] text-white cursor-pointer shadow-xs'
                    : 'bg-[#e2e8f0] text-[#94a3b8] cursor-not-allowed'
                }`}
              >
                <span>Gửi</span>
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Right column: AI Code Audit Workspace (45%) */}
        <div className="lg:col-span-6 bg-white border border-[#e2e8f0] rounded-xl p-5 shadow-2xs flex flex-col justify-between">
          <div className="space-y-4">
            <div className="border-b border-[#f1f5f9] pb-3 text-xs font-bold text-[#0f172a] flex items-center gap-1.5">
              <Code className="w-4 h-4 text-purple-600" /> Không Gian Thẩm Định Code/Prompt Tự Động (AI Auditor)
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-bold text-[#334155]">Dán mã nguồn Smart Contract / Prompt AI tại đây:</label>
              <textarea
                value={sourceCode}
                onChange={(e) => setSourceCode(e.target.value)}
                className="w-full min-h-[160px] bg-[#0f172a] text-[#a7f3d0] font-mono text-[10px] p-3 rounded-lg focus:outline-none focus:border-[#cbd5e1] leading-relaxed resize-none"
              />
            </div>

            <div className="flex justify-end pt-1">
              <button
                onClick={handleRunCodeAudit}
                disabled={isAuditing}
                className="px-4 py-2 bg-[#0f172a] hover:bg-[#1e293b] text-white text-xs font-bold rounded-lg transition-all flex items-center space-x-2"
              >
                {isAuditing ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>AI đang phân tích...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-amber-400 fill-amber-400" />
                    <span>Chạy phân tích AI Audit</span>
                  </>
                )}
              </button>
            </div>

            {/* Results of Code Audit */}
            {auditIssues && (
              <div className="space-y-2.5 pt-3 border-t border-[#f1f5f9] text-xs">
                <span className="font-bold text-[#334155] block">Kết quả phân tích lỗi của AI:</span>
                <div className="space-y-2">
                  {auditIssues.map((issue) => (
                    <div key={issue.id} className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-start space-x-2">
                      <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-rose-700 font-mono text-[10px]">{issue.category}</span>
                          <span className="text-[8px] font-mono font-bold bg-rose-100 text-rose-800 px-1.5 py-0.5 rounded border border-rose-200">{issue.severity}</span>
                          <span className="text-[9px] text-[#64748b] font-mono">{issue.line}</span>
                        </div>
                        <p className="text-[#64748b] leading-relaxed text-[11px]">{issue.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {!auditIssues && !isAuditing && (
              <div className="p-4 bg-[#f8fafc] border border-[#e2e8f0] rounded-lg text-center text-[#64748b] text-[11px] italic">
                Bấm nút "Chạy phân tích AI Audit" để tìm lỗi bảo mật hoặc lỗi cấu trúc prompt.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}