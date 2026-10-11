'use client';

import React, { useState } from 'react';
import { PageHeader } from '@/components/dashboard/PageHeader';
import { Star, MessageCircle, CalendarDays, MoreHorizontal, Check, X, Search, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ShortlistPage() {
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMsg, setNotificationMsg] = useState('');

  const candidates = [
    { id: 1, name: 'Nguyễn Văn A', position: 'Senior Frontend Engineer', match: 95, exp: '5 năm', status: 'Chờ phỏng vấn' },
    { id: 2, name: 'Lê Thị C', position: 'Product Manager', match: 92, exp: '4 năm', status: 'Mới thêm' },
    { id: 3, name: 'Trần Văn D', position: 'UX/UI Designer', match: 88, exp: '3 năm', status: 'Đang cân nhắc' },
    { id: 4, name: 'Phạm Minh E', position: 'Backend Node.js', match: 85, exp: '2 năm', status: 'Đã gửi Email' },
  ];

  const handleAction = (msg: string) => {
    setNotificationMsg(msg);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8 space-y-6 relative">
      <PageHeader 
        title="Danh sách chọn lọc (Shortlist)" 
        description="Quản lý các ứng viên tài năng đã được đánh dấu."
      />

      <div className="bg-white border border-slate-200 rounded-3xl p-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Tìm theo tên ứng viên hoặc vị trí..." 
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
          />
        </div>
        <div className="flex space-x-2 w-full sm:w-auto">
          <button className="flex-1 sm:flex-none px-4 py-2.5 bg-white border border-slate-200 text-slate-700 font-medium rounded-xl hover:bg-slate-50 transition-colors flex items-center justify-center space-x-2">
            <Filter className="w-4 h-4" />
            <span>Bộ lọc</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {candidates.map((candidate) => (
          <div key={candidate.id} className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-all group flex flex-col">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center text-lg">
                  {candidate.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-lg">{candidate.name}</h3>
                  <p className="text-sm text-brand-600 font-medium">{candidate.position}</p>
                </div>
              </div>
              <button className="text-amber-400 hover:text-amber-500 transition-colors">
                <Star className="w-6 h-6 fill-amber-400" />
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <p className="text-xs text-slate-500 mb-1">Độ phù hợp (AI)</p>
                <div className="flex items-center space-x-2">
                  <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${candidate.match}%` }}></div>
                  </div>
                  <span className="text-sm font-bold text-slate-900">{candidate.match}%</span>
                </div>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <p className="text-xs text-slate-500 mb-1">Kinh nghiệm</p>
                <p className="text-sm font-bold text-slate-900">{candidate.exp}</p>
              </div>
            </div>

            <div className="flex items-center justify-between mt-auto">
              <span className={`px-2.5 py-1 text-xs font-bold rounded-lg ${
                candidate.status === 'Chờ phỏng vấn' ? 'bg-amber-50 text-amber-700' :
                candidate.status === 'Đã gửi Email' ? 'bg-blue-50 text-blue-700' :
                'bg-slate-100 text-slate-600'
              }`}>
                {candidate.status}
              </span>
              
              <div className="flex space-x-2">
                <button 
                  onClick={() => handleAction(`Đã lên lịch phỏng vấn với ${candidate.name}`)}
                  className="p-2 bg-slate-100 text-slate-600 hover:bg-brand-50 hover:text-brand-600 rounded-lg transition-colors"
                  title="Lên lịch phỏng vấn"
                >
                  <CalendarDays className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => handleAction(`Đã gửi email cho ${candidate.name}`)}
                  className="p-2 bg-slate-100 text-slate-600 hover:bg-brand-50 hover:text-brand-600 rounded-lg transition-colors"
                  title="Gửi tin nhắn/Email"
                >
                  <MessageCircle className="w-5 h-5" />
                </button>
                <button 
                  className="p-2 bg-slate-100 text-slate-600 hover:bg-slate-200 rounded-lg transition-colors"
                  title="Thêm tùy chọn"
                >
                  <MoreHorizontal className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Floating Notification */}
      <AnimatePresence>
        {showNotification && (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-8 right-8 z-50 bg-slate-900 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center space-x-4"
          >
            <div className="w-8 h-8 bg-emerald-500/20 rounded-full flex items-center justify-center">
              <Check className="w-5 h-5 text-emerald-400" />
            </div>
            <p className="font-medium pr-4">{notificationMsg}</p>
            <button 
              onClick={() => setShowNotification(false)}
              className="text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}