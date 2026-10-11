"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Card } from '@digvos/ui';
import { Calendar, User, ArrowRight, Search, Tag } from 'lucide-react';

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  readTime: string;
  category: string;
}

const posts: BlogPost[] = [
  {
    slug: "chuyen-dich-danh-gia-tu-web2-sang-web3",
    title: 'Tương lai của đánh giá Năng lực số: Chuyển dịch từ Web2 sang Web3',
    excerpt: 'Tại sao các chứng chỉ file PDF truyền thống đang dần mất giá trị và cách công nghệ Soulbound Token (SBT) giải quyết bài toán chống làm giả vĩnh viễn trên Polygon.',
    date: '10 Tháng 7, 2026',
    author: 'Đỗ Khắc Gia Khoa',
    readTime: '5 phút đọc',
    category: "Blockchain"
  },
  {
    slug: "thuat-toan-trac-nghiem-thich-ung-cat-digcomp",
    title: 'Ứng dụng thuật toán Trắc nghiệm Thích ứng (CAT) trong đào tạo chuẩn quốc gia',
    excerpt: 'Tìm hiểu cách thuật toán tinh chỉnh câu hỏi theo thời gian thực giúp đo lường chính xác trần năng lực số của sinh viên theo khung DigComp 3.0.',
    date: '08 Tháng 7, 2026',
    author: 'Hoàng Ái Phương',
    readTime: '8 phút đọc',
    category: "CAT Testing"
  },
  {
    slug: "tro-ly-ai-cham-diem-thuc-hanh-gemini-api",
    title: 'Trợ lý AI chấm điểm thực hành: Đồng minh mới của Giảng viên thời đại số',
    excerpt: 'Làm thế nào API Gemini có thể phân tích ngữ nghĩa, so khớp ma trận Rubrics chấm điểm bài làm và phát hiện các dấu hiệu gian lận thông minh trong bài tập Word/Excel.',
    date: '05 Tháng 7, 2026',
    author: 'Nguyễn Tiến Đạt',
    readTime: '6 phút đọc',
    category: "Trí tuệ Nhân tạo"
  },
];

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("Tất cả");

  const categories = ["Tất cả", "Blockchain", "Trí tuệ Nhân tạo", "CAT Testing"];

  const filteredPosts = posts.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "Tất cả" || post.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-16 py-10 text-slate-900 text-left max-w-6xl mx-auto">
      {/* SEO structured data for Blog */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            "name": "DIGVOS Cổng Tin Tức & Học Thuật",
            "description": "Các nghiên cứu chuyên sâu về CAT, AI và Blockchain trong chuyển đổi số giáo dục.",
            "publisher": {
              "@type": "Organization",
              "name": "DIGVOS"
            }
          })
        }}
      />

      <div className="space-y-4 text-center">
        <span className="text-xs font-bold text-[#5a96b0] uppercase tracking-widest bg-[#5a96b0]/15 px-3 py-1 rounded-full">
          Cổng Tin Tức & Học Thuật
        </span>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-950 leading-tight">
          Nghiên Cứu & Phát Triển Năng Lực Số
        </h1>
        <p className="text-sm md:text-base text-slate-500 max-w-xl mx-auto font-light leading-relaxed text-center">
          Chia sẻ các nghiên cứu chuyên sâu, cẩm nang công nghệ và cập nhật xu hướng chuyển đổi số lao động.
        </p>
      </div>

      {/* Search and Filters Bar */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-4 border-b border-slate-200 pb-8">
        {/* Category Tags */}
        <div className="flex flex-wrap gap-2.5 items-center justify-start w-full md:w-auto">
          <Tag className="w-4 h-4 text-slate-400 mr-1.5" />
          {categories.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => setActiveCategory(cat)}
              className={`text-xs px-3.5 py-1.5 rounded-full border transition-all ${
                activeCategory === cat 
                  ? "bg-slate-900 text-white border-transparent font-semibold"
                  : "bg-white text-slate-500 border-slate-200 hover:border-[#5a96b0] hover:text-[#5a96b0]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Tìm kiếm bài nghiên cứu..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/70 border border-slate-200 rounded-xl py-2.5 pl-10 pr-4 text-xs focus:outline-none focus:border-[#5a96b0] transition-colors"
          />
        </div>
      </div>

      {/* Blog Grid List */}
      {filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredPosts.map((post, idx) => (
            <Card
              key={idx}
              variant="default"
              className="flex flex-col justify-between h-full transition-all duration-300 border border-slate-200/60 hover:scale-[1.02] hover:shadow-lg"
            >
              <div className="space-y-4">
                {/* Meta row */}
                <div className="flex items-center space-x-3 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                  <span className="bg-[#5a96b0]/15 text-[#5a96b0] px-2 py-0.5 rounded-md text-[9px]">
                    {post.category}
                  </span>
                  <span>•</span>
                  <span className="flex items-center space-x-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{post.date}</span>
                  </span>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>

                <Link href={`/blog/${post.slug}`} className="block">
                  <h3 className="text-base font-bold text-slate-900 leading-snug hover:text-[#5a96b0] transition-colors cursor-pointer min-h-[50px] line-clamp-2">
                    {post.title}
                  </h3>
                </Link>
                
                <p className="text-xs text-slate-500 font-light leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-slate-100 flex justify-between items-center text-xs">
                <span className="flex items-center space-x-2 text-slate-500 font-medium">
                  <User className="w-4 h-4 text-[#5a96b0]" />
                  <span>{post.author}</span>
                </span>
                
                <Link href={`/blog/${post.slug}`} className="text-[#5a96b0] hover:text-[#487a90] font-semibold flex items-center space-x-1 group">
                  <span>Đọc bài viết</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 space-y-4">
          <p className="text-sm text-slate-400 font-light">
            Không tìm thấy bài viết nào phù hợp với bộ lọc.
          </p>
          <button
            onClick={() => { setSearchQuery(""); setActiveCategory("Tất cả"); }}
            className="text-xs text-[#5a96b0] font-bold border-b border-[#5a96b0]"
          >
            Đặt lại bộ lọc tìm kiếm
          </button>
        </div>
      )}
    </div>
  );
}
