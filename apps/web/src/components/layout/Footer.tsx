import React from 'react';
import Link from 'next/link';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-slate-200 bg-white/40 backdrop-blur-md text-slate-600 text-sm font-light py-12">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Cột 1: Logo & Slogan */}
        <div className="space-y-4">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-slate-900 to-brand-500 flex items-center justify-center font-bold text-sm text-white shadow-md shadow-brand-500/10">
              D
            </div>
            <span className="font-bold text-lg tracking-wider text-slate-900">
              DIG<span className="text-brand-500">VOS</span>
            </span>
          </Link>
          <p className="text-xs text-slate-400 leading-relaxed font-light">
            Digital Competence Validation Operating System — Hệ thống chuẩn hóa, đánh giá và bảo chứng năng lực số hàng đầu Việt Nam.
          </p>
        </div>

        {/* Cột 2: Đường dẫn nhanh */}
        <div className="space-y-3">
          <h4 className="font-bold text-xs text-slate-800 uppercase tracking-wider">Hệ thống</h4>
          <ul className="space-y-2 text-xs">
            <li>
              <Link href="/#features" className="hover:text-brand-500 transition-colors">Tính năng chính</Link>
            </li>
            <li>
              <Link href="/#metrics" className="hover:text-brand-500 transition-colors">Bối cảnh vĩ mô</Link>
            </li>
            <li>
              <Link href="/pricing" className="hover:text-brand-500 transition-colors">Bảng giá dịch vụ</Link>
            </li>
            <li>
              <Link href="/blog" className="hover:text-brand-500 transition-colors">Tin tức học thuật</Link>
            </li>
          </ul>
        </div>

        {/* Cột 3: Pháp lý & Tuân thủ */}
        <div className="space-y-3">
          <h4 className="font-bold text-xs text-slate-800 uppercase tracking-wider">Pháp lý & Bảo mật</h4>
          <ul className="space-y-2 text-xs">
            <li>
              <a href="#" className="hover:text-brand-500 transition-colors">Quy chế hoạt động</a>
            </li>
            <li>
              <a href="#" className="hover:text-brand-500 transition-colors">Chính sách bảo mật</a>
            </li>
            <li>
              <a href="#" className="hover:text-brand-500 transition-colors">Điều khoản dịch vụ</a>
            </li>
            <li>
              <a href="#" className="hover:text-brand-500 transition-colors">Tuân thủ DigComp 3.0</a>
            </li>
          </ul>
        </div>

        {/* Cột 4: Liên hệ */}
        <div className="space-y-3">
          <h4 className="font-bold text-xs text-slate-800 uppercase tracking-wider">Liên hệ</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Email: contact@digvos.edu.vn<br />
            Hotline: 1900 xxxx (8:00 - 17:00)<br />
            Phát triển bởi đội ngũ Dokhacgiakhoa.
          </p>
        </div>
      </div>

      {/* Đường phân cách chân trang bản quyền */}
      <div className="max-w-7xl mx-auto px-6 mt-8 pt-8 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-400 gap-4">
        <p>© 2026 DIGVOS monorepo. Bảo lưu mọi quyền.</p>
        <p>Phát triển chuẩn kiến trúc Clean Code và SOLID.</p>
      </div>
    </footer>
  );
};
