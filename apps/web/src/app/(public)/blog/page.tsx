import React from 'react';
import Link from 'next/link';
import { Card } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Calendar, User, ArrowRight } from 'lucide-react';

export default function BlogPage() {
  const posts = [
    {
      title: 'Tương lai của đánh giá Năng lực số: Chuyển dịch từ Web2 sang Web3',
      excerpt: 'Tại sao các chứng chỉ file PDF truyền thống đang dần mất giá trị và cách công nghệ Soulbound Token (SBT) giải quyết bài toán chống làm giả vĩnh viễn.',
      date: '10 Tháng 7, 2026',
      author: 'Đỗ Khắc Gia Khoa',
      readTime: '5 phút đọc',
    },
    {
      title: 'Ứng dụng thuật toán Trắc nghiệm Thích ứng (CAT) trong đào tạo chuẩn quốc gia',
      excerpt: 'Tìm hiểu cách thuật toán tinh chỉnh câu hỏi theo thời gian thực giúp đo lường chính xác trần năng lực số của sinh viên theo khung DigComp 3.0.',
      date: '08 Tháng 7, 2026',
      author: 'Hoàng Ái Phương',
      readTime: '8 phút đọc',
    },
    {
      title: 'Trợ lý AI chấm điểm thực hành: Đồng minh mới của Giảng viên thời đại số',
      excerpt: 'Làm thế nào API Gemini có thể phân tích ngữ nghĩa, so khớp ma trận Rubrics chấm điểm bài làm và phát hiện các dấu hiệu gian lận thông minh.',
      date: '05 Tháng 7, 2026',
      author: 'Nguyễn Tiến Đạt',
      readTime: '6 phút đọc',
    },
  ];

  return (
    <div className="space-y-12 py-10 text-slate-900">
      <div className="space-y-4 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-950 leading-tight">
          Cổng Tin Tức & Học Thuật
        </h1>
        <p className="text-sm md:text-base text-slate-500 max-w-xl mx-auto font-light leading-relaxed">
          Chia sẻ các nghiên cứu chuyên sâu, cẩm nang công nghệ và cập nhật xu hướng chuyển đổi số năng lực lao động.
        </p>
      </div>

      {/* Blog list */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto pt-6 text-left">
        {posts.map((post, idx) => (
          <Card
            key={idx}
            variant="default"
            className="flex flex-col justify-between h-full transition-transform hover:scale-[1.02] duration-300 border border-slate-200/60"
          >
            <div className="space-y-4">
              {/* Meta row */}
              <div className="flex items-center space-x-4 text-[10px] text-slate-500 font-semibold uppercase tracking-wider">
                <span className="flex items-center space-x-1">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{post.date}</span>
                </span>
                <span>•</span>
                <span>{post.readTime}</span>
              </div>

              <h3 className="text-base font-bold text-slate-900 leading-snug hover:text-brand-500 transition-colors cursor-pointer">
                {post.title}
              </h3>
              
              <p className="text-xs text-slate-500 font-light leading-relaxed line-clamp-3">
                {post.excerpt}
              </p>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-100 flex justify-between items-center text-xs">
              <span className="flex items-center space-x-2 text-slate-600 font-medium">
                <User className="w-4 h-4 text-brand-500" />
                <span>{post.author}</span>
              </span>
              
              <Link href="/blog" className="text-brand-500 hover:text-brand-600 font-semibold flex items-center space-x-1 group">
                <span>Đọc bài</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
