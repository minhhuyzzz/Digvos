'use client';

import React, { useState } from 'react';
import { Layers, FileText, Download, Search, Filter, Sparkles, BookOpen, ExternalLink, X } from 'lucide-react';
import Link from 'next/link';

interface ResourceItem {
  id: number;
  name: string;
  type: string;
  format: string;
  size: string;
  domain: string;
  downloads: number;
  description: string;
}

export default function LearnerResourcesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFormat, setSelectedFormat] = useState('all');
  const [selectedResource, setSelectedResource] = useState<ResourceItem | null>(null);

  const [resources, setResources] = useState<ResourceItem[]>([
    { id: 1, name: 'Bộ Mẫu Prompt AI Generative Chuẩn DigComp 3.0 (GPT-4o & Claude 3.5)', type: 'DOCUMENT', format: 'PDF', size: '2.4 MB', domain: 'Domain 3: Sáng tạo Nội dung', downloads: 1420, description: 'Tuyển tập các cấu trúc System Prompt, Few-Shot và Chain-of-Thought tối ưu hóa cho AI Evaluator tự động chấm điểm và hỗ trợ học viên.' },
    { id: 2, name: 'Mã Nguồn Mẫu Mã Hóa ECDSA & Smart Contract Polygon Mainnet', type: 'CODE', format: 'ZIP', size: '15.8 MB', domain: 'Domain 4: An toàn & Bảo mật', downloads: 890, description: 'Các file Solidity hợp đồng thông minh ERC-5192 Soulbound Token (SBT), mã nguồn triển khai node RPC và mã hóa ví Web3 Polygon.' },
    { id: 3, name: 'Bộ Dữ Liệu Phân Tích Thuật Toán Rasch IRT (1PL Model Parameters)', type: 'DATASET', format: 'CSV', size: '5.1 MB', domain: 'Domain 1: Vận hành Dữ liệu', downloads: 2150, description: 'Dataset mẫu chứa tham số độ khó câu hỏi (b-parameter) và dữ liệu phản hồi của 1000 thí sinh để chạy thử mô hình ước lượng Theta.' },
    { id: 4, name: 'Tài Liệu Hướng Dẫn Tối Ưu Hóa Vector Embeddings & RAG Engine', type: 'GUIDE', format: 'PDF', size: '8.2 MB', domain: 'Domain 3: Sáng tạo Nội dung', downloads: 1100, description: 'Tài liệu chi tiết hướng dẫn cấu hình cơ sở dữ liệu Vector DB (Pinecone/pgvector) kết hợp chunking strategy cho LLM.' },
  ]);

  const filteredResources = resources.filter(r => {
    const matchesSearch = r.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFormat = selectedFormat === 'all' || r.format.toLowerCase() === selectedFormat.toLowerCase();
    return matchesSearch && matchesFormat;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16 font-sans text-[#0f172a]">
      {/* Page Title & Stats */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-[#e2e8f0] pb-5 gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#0f172a]">Kho Tài Nguyên Số & Mẫu Prompt AI Master</h1>
          <p className="text-xs text-[#64748b] mt-1">Tài liệu bài giảng, mã nguồn mở, bộ dataset thực hành & Prompt AI Generative.</p>
        </div>

        <div className="flex items-center space-x-3 text-xs">
          <div className="px-3.5 py-2 bg-white border border-[#e2e8f0] rounded-xl font-mono font-bold text-[#0f172a] shadow-2xs">
            Tổng số: <span className="text-[#0f172a] font-bold">{resources.length} Tài Nguyên Số</span>
          </div>
        </div>
      </div>

      {/* Filter Controls Bar */}
      <div className="bg-white border border-[#e2e8f0] rounded-xl p-4 shadow-2xs flex flex-wrap items-center justify-between gap-4 text-xs">
        <div className="flex items-center space-x-2">
          <span className="font-bold text-[#0f172a] flex items-center gap-1">
            <Filter className="w-4 h-4 text-[#0f172a]" /> Định dạng:
          </span>
          <button
            onClick={() => setSelectedFormat('all')}
            className={`px-3 py-1.5 rounded-lg border font-bold ${
              selectedFormat === 'all' ? 'bg-[#0f172a] text-white border-[#0f172a]' : 'bg-white text-[#334155] border-[#cbd5e1]'
            }`}
          >
            Tất cả
          </button>
          <button
            onClick={() => setSelectedFormat('pdf')}
            className={`px-3 py-1.5 rounded-lg border font-bold ${
              selectedFormat === 'pdf' ? 'bg-[#0f172a] text-white border-[#0f172a]' : 'bg-white text-[#334155] border-[#cbd5e1]'
            }`}
          >
            Tài liệu PDF
          </button>
          <button
            onClick={() => setSelectedFormat('zip')}
            className={`px-3 py-1.5 rounded-lg border font-bold ${
              selectedFormat === 'zip' ? 'bg-[#0f172a] text-white border-[#0f172a]' : 'bg-white text-[#334155] border-[#cbd5e1]'
            }`}
          >
            Mã nguồn ZIP
          </button>
          <button
            onClick={() => setSelectedFormat('csv')}
            className={`px-3 py-1.5 rounded-lg border font-bold ${
              selectedFormat === 'csv' ? 'bg-[#0f172a] text-white border-[#0f172a]' : 'bg-white text-[#334155] border-[#cbd5e1]'
            }`}
          >
            Dataset CSV
          </button>
        </div>

        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#94a3b8]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm kiếm tài liệu, prompt AI..."
            className="pl-9 pr-3 py-1.5 bg-[#f8fafc] border border-[#e2e8f0] rounded-lg text-xs text-[#0f172a] focus:outline-none focus:border-[#0f172a] w-64"
          />
        </div>
      </div>

      {/* Bento Grid layout of resources */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredResources.map((r) => (
          <div key={r.id} className="bg-white border border-[#e2e8f0] rounded-xl p-5 shadow-2xs space-y-4 flex flex-col justify-between hover:border-[#0f172a] transition-all">
            <div className="space-y-3">
              <div className="flex justify-between items-start">
                <span className="text-[10px] font-mono font-bold bg-[#f1f5f9] text-[#334155] px-2 py-0.5 rounded border border-[#cbd5e1]">{r.domain}</span>
                <span className="text-[10px] font-mono font-bold text-[#0f172a] bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">{r.format}</span>
              </div>
              <h3 className="font-bold text-sm text-[#0f172a] flex items-center gap-1.5"><BookOpen className="w-4 h-4 text-[#64748b]" /> {r.name}</h3>
              <p className="text-xs text-[#64748b] leading-relaxed line-clamp-2">{r.description}</p>
              <div className="flex justify-between text-[11px] text-[#64748b] font-mono pt-1">
                <span>Dung lượng: <strong>{r.size}</strong></span>
                <span>Lượt tải: <strong>{r.downloads.toLocaleString()}</strong></span>
              </div>
            </div>

            <div className="flex justify-end pt-3 border-t border-[#f1f5f9] mt-2 space-x-2">
              <button
                onClick={() => setSelectedResource(r)}
                className="px-3 py-1.5 bg-[#f1f5f9] hover:bg-[#e2e8f0] text-[#0f172a] font-bold rounded text-xs transition-all"
              >
                Xem chi tiết
              </button>
              <button className="px-3.5 py-1.5 bg-[#0f172a] hover:bg-[#1e293b] text-white text-xs font-bold rounded flex items-center space-x-1.5 shadow-xs transition-all">
                <Download className="w-3.5 h-3.5" />
                <span>Tải về</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Resource Detail Modal */}
      {selectedResource && (
        <div className="fixed inset-0 bg-[#0f172a]/20 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white border border-[#e2e8f0] rounded-xl p-5 shadow-md max-w-md w-full text-xs space-y-4">
            <div className="flex justify-between items-center border-b border-[#f1f5f9] pb-2">
              <h3 className="font-bold text-sm text-[#0f172a] flex items-center gap-1.5">
                <Layers className="w-5 h-5" /> Chi tiết tài nguyên học tập
              </h3>
              <button type="button" onClick={() => setSelectedResource(null)} className="text-[#64748b] hover:text-[#0f172a]">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              <div className="p-3 bg-[#f8fafc] border border-[#e2e8f0] rounded-lg space-y-2">
                <div className="flex justify-between">
                  <span className="text-[#64748b]">Tên tài nguyên:</span>
                  <span className="font-bold text-[#0f172a] text-right">{selectedResource.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#64748b]">Khung DigComp:</span>
                  <span className="font-bold text-[#0f172a]">{selectedResource.domain}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#64748b]">Định dạng:</span>
                  <span className="font-mono font-bold text-[#0f172a]">{selectedResource.format} ({selectedResource.size})</span>
                </div>
              </div>

              <div className="space-y-1">
                <span className="font-bold text-[#334155] block">Mô tả tài liệu:</span>
                <p className="text-[#64748b] leading-relaxed">{selectedResource.description}</p>
              </div>
            </div>

            <div className="flex justify-end pt-2 border-t border-[#f1f5f9] space-x-2">
              <button
                type="button"
                onClick={() => setSelectedResource(null)}
                className="px-4 py-2 border border-[#cbd5e1] hover:bg-[#f8fafc] text-[#0f172a] font-bold rounded-lg"
              >
                Đóng
              </button>
              <button className="px-4 py-2 bg-[#0f172a] hover:bg-[#1e293b] text-white font-bold rounded-lg flex items-center space-x-1.5">
                <Download className="w-4 h-4" />
                <span>Tải tài liệu</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}