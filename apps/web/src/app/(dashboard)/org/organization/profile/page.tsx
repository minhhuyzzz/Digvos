'use client';

import React, { useState } from 'react';
import { Building2, Mail, Phone, MapPin, Globe, ShieldCheck, Award, Users, BookOpen, Clock, Calendar } from 'lucide-react';
import Link from 'next/link';

export default function OrgProfilePage() {
  const [orgDetails] = useState({
    name: 'Đại Học Bách Khoa TP.HCM',
    code: 'HCMUT-DIGVOS',
    email: 'contact@hcmut.edu.vn',
    phone: '028-3865-4087',
    address: '268 Lý Thường Kiệt, Phường 14, Quận 10, TP.HCM',
    website: 'https://hcmut.edu.vn',
    desc: 'Đơn vị đào tạo kỹ thuật trọng điểm khu vực phía Nam, tiên phong tích hợp khung đánh giá năng lực số DigComp 3.0 Châu Âu vào chương trình đào tạo chuẩn quốc tế.',
    facultyCount: 45,
    studentCount: 1450,
    sbtIssued: 320
  });

  const featuredCourses = [
    { title: 'Lập Trình Web Fullstack Architecture & NestJS', domain: 'Domain 3: Sáng tạo Nội dung', code: 'DIG-FULL-99' },
    { title: 'An Toàn Thông Tin & Mã Hóa Chữ Ký Số Polygon', domain: 'Domain 4: An toàn số', code: 'DIG-SEC-41' }
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16 font-sans text-[#0f172a]">
      {/* Top Banner Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-[#e2e8f0] pb-5 gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#0f172a] flex items-center gap-2">
            <Building2 className="w-6 h-6 text-[#0f172a]" /> Hồ Sơ Đơn Vị Đào Tạo & Xác Minh Doanh Nghiệp
          </h1>
          <p className="text-xs text-[#64748b] mt-1">Thông tin công khai của đơn vị đào tạo, danh sách giảng viên & chứng chỉ SBT đã đúc.</p>
        </div>
      </div>

      {/* Grid: 2 columns - Left profile details, Right verification status */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Side: General Profile (60%) */}
        <div className="lg:col-span-8 bg-white border border-[#e2e8f0] rounded-xl p-6 shadow-2xs space-y-6">
          <div className="flex items-start space-x-4 border-b border-[#f1f5f9] pb-4">
            <div className="w-16 h-16 bg-[#0f172a] text-white rounded-xl flex items-center justify-center font-bold text-xl shrink-0">
              HCMUT
            </div>
            <div className="space-y-1">
              <h2 className="text-lg font-extrabold text-[#0f172a]">{orgDetails.name}</h2>
              <span className="font-mono text-xs text-[#64748b] bg-[#f8fafc] border border-[#e2e8f0] px-2 py-0.5 rounded">
                Mã định danh: {orgDetails.code}
              </span>
            </div>
          </div>

          <div className="space-y-4 text-xs">
            <div className="space-y-1.5">
              <span className="font-bold text-[#0f172a] block">Giới thiệu đơn vị:</span>
              <p className="text-[#64748b] leading-relaxed">{orgDetails.desc}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-[#f1f5f9]">
              <div className="flex items-center space-x-2.5 text-[#334155]">
                <Mail className="w-4 h-4 text-[#64748b]" />
                <span>{orgDetails.email}</span>
              </div>
              <div className="flex items-center space-x-2.5 text-[#334155]">
                <Phone className="w-4 h-4 text-[#64748b]" />
                <span>{orgDetails.phone}</span>
              </div>
              <div className="flex items-center space-x-2.5 text-[#334155]">
                <MapPin className="w-4 h-4 text-[#64748b] shrink-0" />
                <span>{orgDetails.address}</span>
              </div>
              <div className="flex items-center space-x-2.5 text-[#334155]">
                <Globe className="w-4 h-4 text-[#64748b]" />
                <a href={orgDetails.website} target="_blank" rel="noreferrer" className="hover:underline text-[#0f172a] font-bold">
                  {orgDetails.website}
                </a>
              </div>
            </div>
          </div>

          {/* Featured courses */}
          <div className="space-y-3 pt-4 border-t border-[#f1f5f9]">
            <span className="font-bold text-xs uppercase tracking-wider text-[#64748b] block">Chương Trình Đào Tạo Tiêu Biểu</span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {featuredCourses.map((c, idx) => (
                <div key={idx} className="p-3.5 bg-[#f8fafc] border border-[#e2e8f0] rounded-xl space-y-2 text-xs">
                  <span className="text-[10px] font-mono font-bold bg-[#cbd5e1]/40 text-[#0f172a] px-2 py-0.5 rounded">
                    {c.domain}
                  </span>
                  <h4 className="font-bold text-[#0f172a] leading-snug">{c.title}</h4>
                  <span className="font-mono text-[10px] text-[#64748b] block">Mã môn: {c.code}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Verification and Metrics (40%) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white border border-[#e2e8f0] rounded-xl p-5 shadow-2xs space-y-4 text-xs">
            <span className="font-bold text-sm text-[#0f172a] block border-b border-[#f1f5f9] pb-2 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" /> Xác minh đơn vị
            </span>
            <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl space-y-2">
              <span className="font-bold text-emerald-800 block text-[11px]">Đơn vị đào tạo hợp lệ</span>
              <p className="text-emerald-950 text-[10px] leading-relaxed">
                Đại học Bách Khoa TP.HCM đã được xác thực mã định danh và sở hữu ví đúc chữ ký số Polygon Smart Contract được định danh công khai.
              </p>
            </div>
          </div>

          <div className="bg-white border border-[#e2e8f0] rounded-xl p-5 shadow-2xs space-y-4 text-xs">
            <span className="font-bold text-xs uppercase tracking-wider text-[#64748b] block">Thống kê quy mô</span>
            <div className="space-y-3 font-mono">
              <div className="flex justify-between">
                <span>Số lượng giảng viên:</span>
                <strong className="text-[#0f172a]">{orgDetails.facultyCount} GV</strong>
              </div>
              <div className="flex justify-between">
                <span>Số lượng học viên:</span>
                <strong className="text-[#0f172a]">{orgDetails.studentCount} HV</strong>
              </div>
              <div className="flex justify-between">
                <span>SBT đã phát hành:</span>
                <strong className="text-emerald-600 font-bold">{orgDetails.sbtIssued} SBT</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
