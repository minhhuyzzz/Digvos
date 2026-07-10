'use client';

import React from 'react';
import { Card } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { ShieldCheck, Users, HelpCircle, History, Landmark, Check, X } from 'lucide-react';

export default function AdminDashboard() {
  return (
    <div className="space-y-8 text-slate-100">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-white">Quản Trị Hệ Thống Tối Cao</h1>
        <p className="text-sm text-slate-400 font-light">Giám sát giao dịch chuỗi khối, duyệt KYC doanh nghiệp và cấu hình ma trận DigComp.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
        <Card variant="default" className="p-5">
          <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Ví Gas Relayer</span>
          <span className="text-xl font-extrabold text-brand-400">124.5 MATIC</span>
        </Card>
        <Card variant="default" className="p-5">
          <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Tổng SBT Đã Đúc</span>
          <span className="text-xl font-extrabold text-white">3,450 SBT</span>
        </Card>
        <Card variant="default" className="p-5">
          <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Doanh nghiệp tham gia</span>
          <span className="text-xl font-extrabold text-white">48 Đối tác</span>
        </Card>
        <Card variant="default" className="p-5">
          <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">KYC Chờ Phê Duyệt</span>
          <span className="text-xl font-extrabold text-amber-500">3 Đơn vị</span>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* KYC Approval Queue */}
        <Card variant="default" className="lg:col-span-2 space-y-6">
          <h3 className="text-base font-bold text-white flex items-center space-x-2">
            <ShieldCheck className="w-5 h-5 text-brand-400" />
            <span>Phê Duyệt KYC Doanh Nghiệp (Employers KYC)</span>
          </h3>

          <div className="space-y-4">
            {[
              { company: 'Công ty Cổ phần VNG', tax: '0102030405', rep: 'Nguyễn Khánh Nam', status: 'Pending' },
              { company: 'Tập đoàn FPT', tax: '0304050607', rep: 'Lê Thanh Bình', status: 'Pending' },
              { company: 'Ngân hàng Techcombank', tax: '0405060708', rep: 'Vũ Minh Tuấn', status: 'Pending' },
            ].map((company, idx) => (
              <div key={idx} className="bg-slate-900/60 border border-white/5 p-4 rounded-xl flex flex-col sm:flex-row justify-between sm:items-center gap-4 text-xs">
                <div>
                  <h4 className="text-sm font-bold text-white">{company.company}</h4>
                  <p className="text-slate-500 mt-1">Mã số thuế: {company.tax} | Đại diện: {company.rep}</p>
                </div>
                <div className="flex space-x-2">
                  <Button variant="danger" size="sm" className="px-3.5 py-2">
                    <X className="w-4 h-4" />
                  </Button>
                  <Button variant="primary" size="sm" className="px-3.5 py-2 flex items-center space-x-1.5 bg-emerald-600 hover:bg-emerald-700 shadow-emerald-500/10">
                    <Check className="w-4 h-4" />
                    <span>Duyệt</span>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Dynamic Framework matrix configurator */}
        <Card variant="premium" className="space-y-6">
          <h3 className="text-base font-bold text-white flex items-center space-x-2">
            <Landmark className="w-5 h-5 text-brand-400" />
            <span>Cấu Hình Khung Năng Lực</span>
          </h3>
          <p className="text-xs text-slate-400 font-light leading-relaxed">
            Thiết lập các tiêu chí chuẩn hóa thích ứng của nhóm câu hỏi CAT theo tiêu chuẩn quốc gia hoặc Châu Âu (DigComp 3.0).
          </p>

          <div className="space-y-3 text-xs">
            <div className="flex justify-between items-center bg-slate-900/80 p-3 rounded-lg border border-white/5">
              <span>1. Xử lý thông tin và dữ liệu</span>
              <span className="text-brand-400 font-bold">Level 1 - 4</span>
            </div>
            <div className="flex justify-between items-center bg-slate-900/80 p-3 rounded-lg border border-white/5">
              <span>2. Giao tiếp và hợp tác số</span>
              <span className="text-brand-400 font-bold">Level 1 - 4</span>
            </div>
            <div className="flex justify-between items-center bg-slate-900/80 p-3 rounded-lg border border-white/5">
              <span>3. Sáng tạo nội dung số</span>
              <span className="text-brand-400 font-bold">Level 1 - 4</span>
            </div>
            <Button variant="glass" size="sm" className="w-full text-xs">
              Quản lý ma trận năng lực
            </Button>
          </div>
        </Card>
      </div>

      {/* Immutable audit logs */}
      <Card variant="default" className="space-y-6">
        <div className="flex justify-between items-center border-b border-white/5 pb-4">
          <h3 className="text-base font-bold text-white flex items-center space-x-2">
            <History className="w-5 h-5 text-brand-400" />
            <span>Nhật ký Kiểm toán Bất biến (Immutable Audit Logs)</span>
          </h3>
          <span className="text-xs text-slate-500 font-mono">Gas limit: 30Gwei</span>
        </div>

        <div className="space-y-3 font-mono text-[11px] text-slate-400">
          <div className="flex justify-between items-center py-2 border-b border-white/5">
            <span>[2026-07-10 16:35] MINTED SBT - Token ID: #9842 - Owner: 0x9a8C7d...e8f9</span>
            <span className="text-brand-400">Tx: 0xe4bce9...</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-white/5">
            <span>[2026-07-10 16:12] COMPLETED CAT - Student ID: STU-8941 - Level: 3.2</span>
            <span className="text-slate-500">Hash: 0x8a92fb...</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-white/5">
            <span>[2026-07-10 15:44] KYC APPROVED - Company: VNG - Tax: 0102030405</span>
            <span className="text-slate-500">Hash: 0x3d41f0...</span>
          </div>
        </div>
      </Card>
    </div>
  );
}
