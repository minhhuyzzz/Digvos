'use client';

import React, { useState } from 'react';
import { 
  Settings, 
  Sliders, 
  Save, 
  Check, 
  ArrowLeft, 
  Building2, 
  Cpu, 
  Bell, 
  Link2,
  CheckCircle2
} from 'lucide-react';
import Link from 'next/link';

type TabType = 'profile' | 'academic' | 'ai_eval' | 'webhooks';

export default function OrgSettingsPage() {
  const [activeTab, setActiveTab] = useState<TabType>('profile');
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Profile States
  const [orgName, setOrgName] = useState('Đại Học Bách Khoa TP.HCM');
  const [orgCode, setOrgCode] = useState('HCMUT-DIGVOS');
  const [contactEmail, setContactEmail] = useState('contact@hcmut.edu.vn');
  const [supportPhone, setSupportPhone] = useState('028-3865-4087');

  // Academic States
  const [passingTheta, setPassingTheta] = useState('0.0');
  const [autoMintSbt, setAutoMintSbt] = useState(false);
  const [attendanceWeight, setAttendanceWeight] = useState('10');
  const [assignmentWeight, setAssignmentWeight] = useState('40');
  const [examWeight, setExamWeight] = useState('50');

  // AI Evaluator States
  const [aiModel, setAiModel] = useState('gpt-4o');
  const [aiStrictness, setAiStrictness] = useState('High');
  const [plagiarismThreshold, setPlagiarismThreshold] = useState('20');

  // Webhooks States
  const [webhookUrl, setWebhookUrl] = useState('https://api.yourdomain.com/webhooks/notifications');
  const [lmsToken, setLmsToken] = useState('moodle_token_hcmut_sec_2026');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16 font-sans text-[#0f172a]">
      {/* Top Title Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-[#e2e8f0] pb-5 gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#0f172a] flex items-center gap-2">
            <Settings className="w-6 h-6 text-[#0f172a]" /> Cấu Hình Giảng Dạy & Đơn Vị Đào Tạo
          </h1>
          <p className="text-xs text-[#64748b] mt-1">Cấu hình hồ sơ trường/đơn vị, tham số học thuật kỳ thi CAT thích ứng và quy định AI Pre-grading cho đồ án.</p>
        </div>

        <div>
          <button
            onClick={handleSave}
            className="px-4 py-2.5 bg-[#0f172a] hover:bg-[#1e293b] text-white font-bold text-xs rounded-xl transition-all flex items-center space-x-2 shadow-xs"
          >
            <Save className="w-4 h-4" />
            <span>Lưu Toàn Bộ Cấu Hình</span>
          </button>
        </div>
      </div>

      {savedSuccess && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Lưu cấu hình đơn vị đào tạo thành công!</span>
        </div>
      )}

      {/* Main Settings Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        {/* Left Side Navigation Tabs */}
        <div className="bg-white border border-[#e2e8f0] rounded-xl p-4 shadow-2xs space-y-1">
          <span className="text-[10px] font-bold text-[#64748b] uppercase tracking-wider px-3 block mb-2">Phân hệ cài đặt</span>
          
          <button
            onClick={() => setActiveTab('profile')}
            className={`w-full text-left px-3 py-2.5 rounded-lg text-xs font-bold transition-all flex items-center space-x-2.5 ${
              activeTab === 'profile' ? 'bg-[#0f172a] text-white' : 'text-[#64748b] hover:bg-[#f8fafc] hover:text-[#0f172a]'
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>Hồ Sơ Đơn Vị</span>
          </button>

          <button
            onClick={() => setActiveTab('academic')}
            className={`w-full text-left px-3 py-2.5 rounded-lg text-xs font-bold transition-all flex items-center space-x-2.5 ${
              activeTab === 'academic' ? 'bg-[#0f172a] text-white' : 'text-[#64748b] hover:bg-[#f8fafc] hover:text-[#0f172a]'
            }`}
          >
            <Sliders className="w-4 h-4" />
            <span>Đào Tạo & Khảo Thí</span>
          </button>

          <button
            onClick={() => setActiveTab('ai_eval')}
            className={`w-full text-left px-3 py-2.5 rounded-lg text-xs font-bold transition-all flex items-center space-x-2.5 ${
              activeTab === 'ai_eval' ? 'bg-[#0f172a] text-white' : 'text-[#64748b] hover:bg-[#f8fafc] hover:text-[#0f172a]'
            }`}
          >
            <Cpu className="w-4 h-4" />
            <span>AI Evaluator</span>
          </button>

          <button
            onClick={() => setActiveTab('webhooks')}
            className={`w-full text-left px-3 py-2.5 rounded-lg text-xs font-bold transition-all flex items-center space-x-2.5 ${
              activeTab === 'webhooks' ? 'bg-[#0f172a] text-white' : 'text-[#64748b] hover:bg-[#f8fafc] hover:text-[#0f172a]'
            }`}
          >
            <Link2 className="w-4 h-4" />
            <span>Webhooks & LMS</span>
          </button>
        </div>

        {/* Right Side Settings Pane */}
        <div className="lg:col-span-3 bg-white border border-[#e2e8f0] rounded-xl p-6 shadow-2xs">
          <form onSubmit={handleSave} className="space-y-6 text-xs">
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="space-y-4">
                <div className="border-b border-[#f1f5f9] pb-3">
                  <h3 className="font-bold text-sm text-[#0f172a]">Thông Tin Hồ Sơ Đơn Vị</h3>
                  <p className="text-[11px] text-[#64748b]">Cập nhật thông tin nhận diện cơ bản của Trường đại học, Học viện hoặc Doanh nghiệp đào tạo.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="font-bold text-[#0f172a] block">Tên Đơn Vị Đào Tạo</label>
                    <input
                      type="text"
                      value={orgName}
                      onChange={(e) => setOrgName(e.target.value)}
                      className="w-full bg-[#f8fafc] border border-[#e2e8f0] rounded-lg p-2.5 text-xs text-[#0f172a] font-bold"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="font-bold text-[#0f172a] block">Mã Tổ Chức (Org Code Prefix)</label>
                    <input
                      type="text"
                      value={orgCode}
                      onChange={(e) => setOrgCode(e.target.value)}
                      className="w-full bg-[#f8fafc] border border-[#e2e8f0] rounded-lg p-2.5 text-xs text-[#0f172a] font-mono font-bold"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="font-bold text-[#0f172a] block">Email Liên Hệ Đơn Vị</label>
                    <input
                      type="email"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      className="w-full bg-[#f8fafc] border border-[#e2e8f0] rounded-lg p-2.5 text-xs text-[#0f172a] font-mono"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="font-bold text-[#0f172a] block">Số Điện Thoại Hỗ Trợ Đào Tạo</label>
                    <input
                      type="text"
                      value={supportPhone}
                      onChange={(e) => setSupportPhone(e.target.value)}
                      className="w-full bg-[#f8fafc] border border-[#e2e8f0] rounded-lg p-2.5 text-xs text-[#0f172a] font-mono"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Academic Tab */}
            {activeTab === 'academic' && (
              <div className="space-y-4">
                <div className="border-b border-[#f1f5f9] pb-3">
                  <h3 className="font-bold text-sm text-[#0f172a]">Cấu Hình Đào Tạo & Khảo Thí</h3>
                  <p className="text-[11px] text-[#64748b]">Cấu hình quy chuẩn đánh giá, phân chia trọng số điểm các thành phần môn học và ngưỡng cấp phát chứng chỉ SBT.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <label className="font-bold text-[#0f172a] block">Trọng số Điểm chuyên cần (%)</label>
                    <input
                      type="number"
                      value={attendanceWeight}
                      onChange={(e) => setAttendanceWeight(e.target.value)}
                      className="w-full bg-[#f8fafc] border border-[#e2e8f0] rounded-lg p-2.5 text-xs text-[#0f172a] font-mono"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="font-bold text-[#0f172a] block">Trọng số Điểm bài tập/đồ án (%)</label>
                    <input
                      type="number"
                      value={assignmentWeight}
                      onChange={(e) => setAssignmentWeight(e.target.value)}
                      className="w-full bg-[#f8fafc] border border-[#e2e8f0] rounded-lg p-2.5 text-xs text-[#0f172a] font-mono"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="font-bold text-[#0f172a] block">Trọng số Điểm thi CAT (%)</label>
                    <input
                      type="number"
                      value={examWeight}
                      onChange={(e) => setExamWeight(e.target.value)}
                      className="w-full bg-[#f8fafc] border border-[#e2e8f0] rounded-lg p-2.5 text-xs text-[#0f172a] font-mono"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-[#0f172a] block">Ngưỡng năng lực Theta tối thiểu để đỗ môn (Passing Theta $\theta$ Score)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={passingTheta}
                    onChange={(e) => setPassingTheta(e.target.value)}
                    className="w-full bg-[#f8fafc] border border-[#e2e8f0] rounded-lg p-2.5 text-xs text-[#0f172a] font-mono font-bold"
                  />
                  <span className="text-[10px] text-[#64748b] block">Học viên có năng lực $\theta$ cao hơn hoặc bằng ngưỡng này sẽ được coi là hoàn thành chuẩn đầu ra môn học.</span>
                </div>

                <div className="pt-2">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="auto_sbt_chk"
                      checked={autoMintSbt}
                      onChange={(e) => setAutoMintSbt(e.target.checked)}
                      className="rounded border-[#cbd5e1] text-[#0f172a] focus:ring-[#0f172a]"
                    />
                    <label htmlFor="auto_sbt_chk" className="font-bold text-[#0f172a] cursor-pointer">
                      Tự động đúc SBT lên Polygon khi giảng viên xác nhận phê duyệt minh chứng
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* AI Evaluator Tab */}
            {activeTab === 'ai_eval' && (
              <div className="space-y-4">
                <div className="border-b border-[#f1f5f9] pb-3">
                  <h3 className="font-bold text-sm text-[#0f172a]">Cấu Hình Bộ Chấm Điểm AI Evaluator</h3>
                  <p className="text-[11px] text-[#64748b]">Tùy biến bộ máy AI tự động đánh giá trước đồ án (AI Pre-grading) theo ma trận rubrics đào tạo riêng.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="font-bold text-[#0f172a] block">Model AI Chấm Bài</label>
                    <select
                      value={aiModel}
                      onChange={(e) => setAiModel(e.target.value)}
                      className="w-full bg-[#f8fafc] border border-[#e2e8f0] rounded-lg p-2.5 text-xs text-[#0f172a] font-bold"
                    >
                      <option value="gpt-4o">OpenAI GPT-4o (Khuyên dùng)</option>
                      <option value="claude-3.5">Anthropic Claude 3.5 Sonnet</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="font-bold text-[#0f172a] block">Độ nhạy chấm điểm (Strictness Level)</label>
                    <select
                      value={aiStrictness}
                      onChange={(e) => setAiStrictness(e.target.value)}
                      className="w-full bg-[#f8fafc] border border-[#e2e8f0] rounded-lg p-2.5 text-xs text-[#0f172a] font-bold"
                    >
                      <option value="High">Chặt chẽ (High - Theo sát tuyệt đối rubrics)</option>
                      <option value="Medium">Trung bình (Medium - Cho phép sai lệch nhỏ)</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-[#0f172a] block">Ngưỡng trùng lặp code tối đa cho phép (Plagiarism Threshold %)</label>
                  <input
                    type="number"
                    value={plagiarismThreshold}
                    onChange={(e) => setPlagiarismThreshold(e.target.value)}
                    className="w-full bg-[#f8fafc] border border-[#e2e8f0] rounded-lg p-2.5 text-xs text-[#0f172a] font-mono font-bold"
                  />
                  <span className="text-[10px] text-[#64748b] block">Hệ thống AI sẽ tự động cảnh cáo sao chép nếu tỷ lệ tương đồng vượt quá mức quy định.</span>
                </div>
              </div>
            )}

            {/* Webhooks & LMS Tab */}
            {activeTab === 'webhooks' && (
              <div className="space-y-4">
                <div className="border-b border-[#f1f5f9] pb-3">
                  <h3 className="font-bold text-sm text-[#0f172a]">Cấu Hình Tích Hợp Webhooks & LMS</h3>
                  <p className="text-[11px] text-[#64748b]">Liên kết dữ liệu lớp học, kỳ thi với các hệ thống Quản lý học tập bên ngoài (Canvas, Moodle, Google Classroom).</p>
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-[#0f172a] block">Slack / Discord Webhook URL (Nhận thông báo bài nộp mới)</label>
                  <input
                    type="text"
                    value={webhookUrl}
                    onChange={(e) => setWebhookUrl(e.target.value)}
                    className="w-full bg-[#f8fafc] border border-[#e2e8f0] rounded-lg p-2.5 text-xs text-[#0f172a] font-mono"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-[#0f172a] block">LMS Access Token (Moodle / Canvas Connection)</label>
                  <input
                    type="password"
                    value={lmsToken}
                    onChange={(e) => setLmsToken(e.target.value)}
                    className="w-full bg-[#f8fafc] border border-[#e2e8f0] rounded-lg p-2.5 text-xs text-[#0f172a] font-mono"
                  />
                </div>
              </div>
            )}

            {/* Actions Footer */}
            <div className="pt-5 border-t border-[#f1f5f9] flex justify-end">
              <button
                type="submit"
                className="px-5 py-2.5 bg-[#0f172a] hover:bg-[#1e293b] text-white font-bold text-xs rounded-xl transition-all flex items-center space-x-1.5 shadow-xs"
              >
                <Save className="w-4 h-4" />
                <span>Lưu Thay Đổi Phân Hệ</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
