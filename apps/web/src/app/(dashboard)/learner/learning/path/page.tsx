'use client';

import React, { useState } from 'react';
import { 
  Target, 
  Lock, 
  CheckCircle2, 
  Award, 
  ChevronRight, 
  Sparkles, 
  Layers,
  BookOpen,
  ArrowUpRight,
  Filter,
  ShieldCheck,
  Zap,
  Info,
  InfoIcon
} from 'lucide-react';
import Link from 'next/link';

interface RubricLevel {
  level: string;
  name: string;
  complexity: string;
  autonomy: string;
  description: string;
}

export default function LearnerSkillPathPage() {
  const [selectedNodeId, setSelectedNodeId] = useState<string>('node_3_4');
  const [selectedDomainFilter, setSelectedDomainFilter] = useState<string>('all');

  const domains = [
    {
      id: 'd1',
      code: 'Domain 1',
      title: 'Vận hành Dữ liệu & Thông tin (Information & Data Literacy)',
      progress: 85,
      nodes: [
        { id: 'node_1_1', code: '1.1', title: 'Duyệt & Lọc dữ liệu số', status: 'completed', level: 'Level 4 (Intermediate)', desc: 'Thành thạo kỹ năng truy vấn và lọc nguồn thông tin số đa phương tiện.', reqs: ['Cần 4/4 bài thực hành'], exp: '+150 EXP', cx: 80, cy: 30 },
        { id: 'node_1_2', code: '1.2', title: 'Đánh giá độ tin cậy nguồn tin', status: 'completed', level: 'Level 4 (Intermediate)', desc: 'Phân tích tính chính xác, nguồn gốc và mức độ tin cậy của thông tin số.', reqs: ['Cần 1 bài khảo thí CAT'], exp: '+200 EXP', cx: 200, cy: 30 },
        { id: 'node_1_3', code: 'node_1_3', title: 'Quản lý CSDL PostgreSQL', status: 'in_progress', level: 'Level 5 (Advanced)', desc: 'Thiết kế cơ sở dữ liệu quan hệ và tối ưu hóa truy vấn SQL.', reqs: ['Đồ án CSDL PostgreSQL'], exp: '+350 EXP', cx: 320, cy: 30 },
      ]
    },
    {
      id: 'd3',
      code: 'Domain 3',
      title: 'Sáng tạo Nội dung Số & AI Generative (Digital Content Creation)',
      progress: 60,
      nodes: [
        { id: 'node_3_1', code: '3.1', title: 'Phát triển nội dung số', status: 'completed', level: 'Level 4 (Intermediate)', desc: 'Tạo lập bài viết, giao diện và tài sản số chuẩn nhận diện.', reqs: ['Bài nộp minh chứng UI'], exp: '+180 EXP', cx: 80, cy: 110 },
        { id: 'node_3_4', code: '3.4', title: 'Prompt AI & LLM Integration', status: 'in_progress', level: 'Level 5 (Advanced)', desc: 'Xây dựng câu lệnh Prompt kỹ thuật cao & tích hợp AI API (OpenAI/Gemini).', reqs: ['Đồ án Web Tích hợp AI'], exp: '+500 EXP', cx: 200, cy: 110 },
        { id: 'node_3_5', code: '3.5', title: 'Tối ưu RAG & Vector DB', status: 'locked', level: 'Level 6 (Advanced)', desc: 'Xây dựng cơ sở tri thức cho AI bằng Vector DB Pinecone/pgvector.', reqs: ['Yêu cầu hoàn thành Nút 3.4'], exp: '+600 EXP', cx: 320, cy: 110 }
      ]
    },
    {
      id: 'd4',
      code: 'Domain 4',
      title: 'An toàn & Bảo mật Số (Safety)',
      progress: 40,
      nodes: [
        { id: 'node_4_1', code: '4.1', title: 'Bảo vệ thiết bị & Mã hóa', status: 'completed', level: 'Level 4 (Intermediate)', desc: 'Hiểu về tường lửa, antivirus và mã hóa dữ liệu cơ bản.', reqs: ['Bài thi lý thuyết 100%'], exp: '+200 EXP', cx: 80, cy: 190 },
        { id: 'node_4_2', code: '4.2', title: 'Quyền riêng tư & Mã hóa ECDSA Polygon', status: 'locked', level: 'Level 5 (Advanced)', desc: 'Hiểu về mã hóa bất đối xứng, chữ ký số và bảo mật thông tin cá nhân.', reqs: ['Yêu cầu hoàn thành Nút 3.4'], exp: '+450 EXP', cx: 200, cy: 190 },
      ]
    }
  ];

  // 📝 NEW WIREFRAME DATA: 8 Levels of European DigComp 3.0 Rubric Reference
  const rubricsData: RubricLevel[] = [
    { level: 'F1', name: 'Foundation 1', complexity: 'Cực kỳ đơn giản', autonomy: 'Được hướng dẫn chi tiết', description: 'Có thể thực hiện các tác vụ số cơ bản dưới sự chỉ dẫn trực tiếp của người hướng dẫn.' },
    { level: 'F2', name: 'Foundation 2', complexity: 'Đơn giản, tự động hóa', autonomy: 'Tự chủ một phần', description: 'Tự làm được các tác vụ cơ bản, biết tìm kiếm sự trợ giúp khi gặp sự cố kỹ thuật nhỏ.' },
    { level: 'I3', name: 'Intermediate 3', complexity: 'Trung bình, quen thuộc', autonomy: 'Tự chủ độc lập', description: 'Có khả năng tự giải quyết các yêu cầu công việc văn phòng số thường ngày không cần chỉ dẫn.' },
    { level: 'I4', name: 'Intermediate 4', complexity: 'Nhiều bước phức tạp', autonomy: 'Độc lập & Chỉ dẫn người khác', description: 'Thành thạo các quy trình xử lý dữ liệu phức tạp, có khả năng hướng dẫn lại cho học viên mới.' },
    { level: 'A5', name: 'Advanced 5', complexity: 'Phức tạp và biến động', autonomy: 'Tự chủ hoàn toàn', description: 'Tự thiết kế giải pháp số, chủ động đề xuất cải tiến cấu trúc hạ tầng dữ liệu và prompt.' },
    { level: 'A6', name: 'Advanced 6', complexity: 'Chuyên sâu, đa dạng', autonomy: 'Định hướng hệ thống', description: 'Thẩm định chất lượng code và an toàn thông tin, xây dựng quy chuẩn vận hành chung cho team.' },
    { level: 'S7', name: 'Specialized 7', complexity: 'Phát minh, tích hợp sâu', autonomy: 'Lãnh đạo chuyên môn', description: 'Nghiên cứu các thuật toán tối ưu hóa mới (như Rasch IRT engine nâng cao), dẫn dắt các dự án quy mô lớn.' },
    { level: 'S8', name: 'Specialized 8', complexity: 'Đột phá công nghệ', autonomy: 'Vĩ mô, định hướng ngành', description: 'Tác giả của các khung kiến trúc phần mềm mới, đưa ra các quyết định công nghệ ảnh hưởng toàn bộ tổ chức.' }
  ];

  const allNodes = domains.flatMap(d => d.nodes);
  const activeNode = allNodes.find(n => n.id === selectedNodeId) || allNodes[1];

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16 font-sans text-[#0f172a]">
      {/* Top Banner Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-[#e2e8f0] pb-5 gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#0f172a] flex items-center gap-2">
            <Target className="w-6 h-6 text-[#0f172a]" /> Cây Lộ Trình Năng Lực Số DigComp 3.0
          </h1>
          <p className="text-xs text-[#64748b] mt-1">Lộ trình học tập mở khóa theo sơ đồ cây kỹ năng (Gamified Skill Tree Graph).</p>
        </div>

        <div className="flex items-center space-x-3 text-xs">
          <div className="px-3.5 py-2 bg-white border border-[#e2e8f0] rounded-xl font-mono font-bold text-[#0f172a] shadow-2xs flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-amber-500 fill-amber-500" />
            <span>2,450 EXP</span>
          </div>
          <Link
            href="/learner/assessment/cat"
            className="px-4 py-2 bg-[#0f172a] hover:bg-[#1e293b] text-white font-bold rounded-xl transition-all flex items-center space-x-2 shadow-xs"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Thi Thích Ứng CAT Thăng Cấp</span>
          </Link>
        </div>
      </div>

      {/* Main Workspace Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Side: Interactive Skill Tree Graph (68%) */}
        <div className="lg:col-span-8 bg-white border border-[#e2e8f0] rounded-xl p-6 shadow-2xs space-y-6">
          <div className="flex justify-between items-center border-b border-[#f1f5f9] pb-3 text-xs">
            <h3 className="font-bold text-sm text-[#0f172a] flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#0f172a]" /> Sơ Đồ Node-Link SVG Cây Năng Lực
            </h3>
            <span className="text-[11px] font-mono text-[#64748b]">Bấm vào nút hình tròn để kiểm tra kỹ năng</span>
          </div>

          {/* SVG Canvas Map */}
          <div className="bg-[#f8fafc] border border-[#e2e8f0] rounded-xl p-4 overflow-x-auto">
            <svg className="w-full min-w-[500px] h-[240px] text-[#0f172a]" viewBox="0 0 400 240">
              {/* Lines Connection */}
              {/* Domain 1: 1.1 -> 1.2 -> 1.3 */}
              <line x1="80" y1="30" x2="200" y2="30" stroke="#cbd5e1" strokeWidth="1.5" />
              <line x1="200" y1="30" x2="320" y2="30" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="3,3" />

              {/* Domain 3: 3.1 -> 3.4 -> 3.5 */}
              <line x1="80" y1="110" x2="200" y2="110" stroke="#cbd5e1" strokeWidth="1.5" />
              <line x1="200" y1="110" x2="320" y2="110" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="3,3" />

              {/* Domain 4: 4.1 -> 4.2 */}
              <line x1="80" y1="190" x2="200" y2="190" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="3,3" />

              {/* Cross Domain Connection: 3.4 -> 4.2 */}
              <path d="M 200,110 L 200,190" fill="none" stroke="#cbd5e1" strokeWidth="1.2" strokeDasharray="2,2" />

              {/* Render Nodes */}
              {allNodes.map((n) => {
                const isSelected = selectedNodeId === n.id;
                const isCompleted = n.status === 'completed';
                const isProgress = n.status === 'in_progress';

                return (
                  <g 
                    key={n.id} 
                    className="cursor-pointer group" 
                    onClick={() => setSelectedNodeId(n.id)}
                  >
                    <circle
                      cx={n.cx}
                      cy={n.cy}
                      r="16"
                      fill={isSelected ? '#0f172a' : isCompleted ? '#ffffff' : isProgress ? '#f8fafc' : '#e2e8f0'}
                      stroke={isSelected ? '#0f172a' : isProgress ? '#0f172a' : '#cbd5e1'}
                      strokeWidth={isSelected ? '2' : isProgress ? '1.5' : '1'}
                      strokeDasharray={isProgress ? '3,3' : 'none'}
                    />
                    <text
                      x={n.cx}
                      y={n.cy + 4}
                      textAnchor="middle"
                      className="font-mono text-[9px] font-bold"
                      fill={isSelected ? '#ffffff' : '#0f172a'}
                    >
                      {n.code}
                    </text>
                    <text
                      x={n.cx}
                      y={n.cy - 20}
                      textAnchor="middle"
                      className="text-[8px] font-bold opacity-0 group-hover:opacity-100 transition-all pointer-events-none fill-[#64748b]"
                    >
                      {n.title}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* List detailed node display */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            {allNodes.map((node) => (
              <div
                key={node.id}
                onClick={() => setSelectedNodeId(node.id)}
                className={`p-3.5 rounded-xl border cursor-pointer transition-all space-y-1.5 ${
                  selectedNodeId === node.id
                    ? 'bg-[#0f172a] text-white border-[#0f172a] shadow-xs'
                    : node.status === 'completed'
                    ? 'bg-[#f8fafc] text-[#334155] border-[#e2e8f0] hover:border-[#cbd5e1]'
                    : node.status === 'in_progress'
                    ? 'bg-white text-[#0f172a] border-[#0f172a] border-dashed hover:bg-[#f8fafc]'
                    : 'bg-[#f1f5f9] text-[#94a3b8] border-[#e2e8f0] opacity-80'
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded ${
                    selectedNodeId === node.id ? 'bg-white/20 text-white' : 'bg-[#e2e8f0] text-[#334155]'
                  }`}>
                    {node.code}
                  </span>
                  {node.status === 'completed' ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  ) : node.status === 'in_progress' ? (
                    <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-500 shrink-0" />
                  ) : (
                    <Lock className="w-3 h-3 opacity-60 shrink-0" />
                  )}
                </div>
                <h4 className="text-xs font-bold leading-snug">{node.title}</h4>
              </div>
            ))}
          </div>

          {/* 📊 NEW WIREFRAME WIDGET: Bảng tra cứu chuẩn tiêu chí Rubrics Châu Âu (DigComp 3.0 Standard Rubrics) */}
          <div className="bg-white border border-[#e2e8f0] rounded-xl p-5 shadow-2xs space-y-3 text-xs">
            <h3 className="font-bold text-sm text-[#0f172a] flex items-center gap-1.5 border-b border-[#f1f5f9] pb-2">
              <InfoIcon className="w-4 h-4 text-indigo-600" /> Bảng Tra Cứu Tiêu Chí 8 Cấp Độ Thành Thạo DigComp 3.0
            </h3>
            <div className="border border-[#e2e8f0] rounded-lg overflow-hidden text-xs">
              <table className="w-full text-left divide-y divide-[#e2e8f0]">
                <thead className="bg-[#f8fafc] font-bold text-[#334155]">
                  <tr>
                    <th className="p-2.5 font-mono">Cấp độ</th>
                    <th className="p-2.5">Độ phức tạp</th>
                    <th className="p-2.5">Mức độ tự chủ</th>
                    <th className="p-2.5">Mô tả tiêu chuẩn</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#f1f5f9]">
                  {rubricsData.map((item) => (
                    <tr key={item.level} className="hover:bg-[#f8fafc]">
                      <td className="p-2.5 font-mono font-bold text-[#0f172a]">{item.level} ({item.name})</td>
                      <td className="p-2.5 font-semibold text-[#0f172a]">{item.complexity}</td>
                      <td className="p-2.5 text-[#334155]">{item.autonomy}</td>
                      <td className="p-2.5 text-[#64748b] leading-relaxed">{item.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Side: Node Details Inspector Workspace (32%) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white border border-[#e2e8f0] rounded-xl p-5 shadow-2xs space-y-4">
            <div className="flex justify-between items-center border-b border-[#f1f5f9] pb-2 text-xs">
              <span className="font-bold text-[#64748b] uppercase tracking-wider text-[10px]">Inspector Nút Kỹ Năng</span>
              <span className="font-mono font-bold text-[#0f172a] bg-[#f1f5f9] px-2 py-0.5 rounded border border-[#cbd5e1]">
                {activeNode.code}
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <h3 className="text-sm font-extrabold text-[#0f172a] leading-snug">{activeNode.title}</h3>
              <p className="text-[#64748b] leading-relaxed">{activeNode.desc}</p>

              <div className="p-3.5 bg-[#f8fafc] border border-[#e2e8f0] rounded-lg space-y-2 text-[11px]">
                <span className="font-bold text-[#0f172a] block">Điều kiện mở khóa:</span>
                {activeNode.reqs.map((r, i) => (
                  <div key={i} className="flex items-center space-x-1.5 text-[#334155]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{r}</span>
                  </div>
                ))}
              </div>

              <div className="pt-2 space-y-2">
                <Link
                  href="/learner/learning/courses"
                  className="w-full py-2.5 bg-[#0f172a] hover:bg-[#1e293b] text-white text-xs font-bold rounded-lg flex items-center justify-center space-x-2 transition-all shadow-xs"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Vào bài học kỹ năng này</span>
                </Link>

                <Link
                  href="/learner/portfolio/proofs"
                  className="w-full py-2.5 bg-white border border-[#cbd5e1] hover:bg-[#f8fafc] text-[#0f172a] text-xs font-bold rounded-lg flex items-center justify-center space-x-1.5 transition-all"
                >
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>Nộp bài minh chứng cấp SBT</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}