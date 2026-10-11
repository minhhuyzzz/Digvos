'use client';

import React, { useState } from 'react';
import { 
  User, 
  Settings, 
  Wallet, 
  Lock, 
  Compass, 
  Check, 
  ShieldCheck, 
  Save,
  CheckCircle2,
  Phone,
  Hash,
  School,
  Mail,
  ToggleLeft,
  ToggleRight,
  Briefcase
} from 'lucide-react';

type TabType = 'profile' | 'learning_goals' | 'company' | 'security';

export default function LearnerSettingsPage() {
  const [activeTab, setActiveTab] = useState<TabType>('profile');
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Profile Form States
  const [fullName, setFullName] = useState('Trần Minh Huy');
  const [email, setEmail] = useState('mhuyyzzz@digvos.vn');
  const [phoneNumber, setPhoneNumber] = useState('090-1234-567');
  const [studentId, setStudentId] = useState('HV-089-HCMUT');
  const [affiliation, setAffiliation] = useState('Đại Học Bách Khoa TP.HCM & VNG Corporation');

  // Learning Goals States
  const [studyGoalHours, setStudyGoalHours] = useState('5.0');
  const [targetDomain, setTargetDomain] = useState('Domain 4: Safety & Security');
  const [emailNotification, setEmailNotification] = useState(true);

  // 🏢 NEW WIREFRAME DATA: Company & Job Match Settings
  const [userRole, setUserRole] = useState('Nhân viên chính thức');
  const [department, setDepartment] = useState('Phòng Phát Triển Sản Phẩm (R&D)');
  const [employeeId, setEmployeeId] = useState('EMP-2026-894');
  const [publicProfile, setPublicProfile] = useState(true);

  // Security States
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [requireTwoFactor, setRequireTwoFactor] = useState(false);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16 font-sans text-[#0f172a]">
      {/* Top Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-[#e2e8f0] pb-5 gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#0f172a] flex items-center gap-2">
            <Settings className="w-6 h-6 text-[#0f172a]" /> Cài Đặt Tài Khoản & Cấu Hình Hồ Sơ
          </h1>
          <p className="text-xs text-[#64748b] mt-1">Cấu hình hồ sơ cá nhân học viên/nhân viên, chỉ tiêu rèn luyện hàng tuần và thông tin liên kết doanh nghiệp.</p>
        </div>

        <div>
          <button
            onClick={handleSaveSettings}
            className="px-4 py-2.5 bg-[#0f172a] hover:bg-[#1e293b] text-white font-bold text-xs rounded-xl transition-all flex items-center space-x-2 shadow-xs"
          >
            <Save className="w-4 h-4" />
            <span>Lưu Cài Đặt Hồ Sơ</span>
          </button>
        </div>
      </div>

      {savedSuccess && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Đã cập nhật cài đặt tài khoản thành công!</span>
        </div>
      )}

      {/* Main Settings Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        {/* Left Side Navigation Tabs */}
        <div className="bg-white border border-[#e2e8f0] rounded-xl p-4 shadow-2xs space-y-1">
          <span className="text-[10px] font-bold text-[#64748b] uppercase tracking-wider px-3 block mb-2">Hồ Sơ & Học Tập</span>
          
          <button
            onClick={() => setActiveTab('profile')}
            className={`w-full text-left px-3 py-2.5 rounded-lg text-xs font-bold transition-all flex items-center space-x-2.5 ${
              activeTab === 'profile' ? 'bg-[#0f172a] text-white' : 'text-[#64748b] hover:bg-[#f8fafc] hover:text-[#0f172a]'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Hồ Sơ Cá Nhân</span>
          </button>

          <button
            onClick={() => setActiveTab('learning_goals')}
            className={`w-full text-left px-3 py-2.5 rounded-lg text-xs font-bold transition-all flex items-center space-x-2.5 ${
              activeTab === 'learning_goals' ? 'bg-[#0f172a] text-white' : 'text-[#64748b] hover:bg-[#f8fafc] hover:text-[#0f172a]'
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>Mục Tiêu Học Tập</span>
          </button>

          <button
            onClick={() => setActiveTab('company')}
            className={`w-full text-left px-3 py-2.5 rounded-lg text-xs font-bold transition-all flex items-center space-x-2.5 ${
              activeTab === 'company' ? 'bg-[#0f172a] text-white' : 'text-[#64748b] hover:bg-[#f8fafc] hover:text-[#0f172a]'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            <span>Thông Tin Công Ty / Doanh Nghiệp</span>
          </button>

          <button
            onClick={() => setActiveTab('security')}
            className={`w-full text-left px-3 py-2.5 rounded-lg text-xs font-bold transition-all flex items-center space-x-2.5 ${
              activeTab === 'security' ? 'bg-[#0f172a] text-white' : 'text-[#64748b] hover:bg-[#f8fafc] hover:text-[#0f172a]'
            }`}
          >
            <Lock className="w-4 h-4" />
            <span>Bảo Mật Tài Khoản</span>
          </button>
        </div>

        {/* Right Side Settings Pane */}
        <div className="lg:col-span-3 bg-white border border-[#e2e8f0] rounded-xl p-6 shadow-2xs">
          <form onSubmit={handleSaveSettings} className="space-y-6 text-xs">
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="space-y-4">
                <div className="border-b border-[#f1f5f9] pb-3 flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-sm text-[#0f172a]">Thông Tin Cá Nhân</h3>
                    <p className="text-[11px] text-[#64748b]">Cập nhật thông tin nhận diện cơ bản phục vụ hiển thị chứng chỉ.</p>
                  </div>
                  <div className="w-12 h-12 bg-[#f1f5f9] border border-[#cbd5e1] rounded-full flex items-center justify-center text-[#64748b] font-bold text-sm">
                    TMH
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="font-bold text-[#0f172a] block">Họ & Tên Học Viên / Nhân Viên</label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full bg-[#f8fafc] border border-[#e2e8f0] rounded-lg p-2.5 text-xs text-[#0f172a] font-bold"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="font-bold text-[#0f172a] block">Địa Chỉ Email</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-[#f8fafc] border border-[#e2e8f0] rounded-lg p-2.5 text-xs text-[#0f172a] font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="font-bold text-[#0f172a] block">Mã Số Định Danh</label>
                    <input
                      type="text"
                      value={studentId}
                      onChange={(e) => setStudentId(e.target.value)}
                      className="w-full bg-[#f8fafc] border border-[#e2e8f0] rounded-lg p-2.5 text-xs text-[#0f172a] font-mono font-bold"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="font-bold text-[#0f172a] block">Số Điện Thoại</label>
                    <input
                      type="text"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="w-full bg-[#f8fafc] border border-[#e2e8f0] rounded-lg p-2.5 text-xs text-[#0f172a] font-mono"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-[#0f172a] block">Đơn vị liên kết đào tạo / Công tác</label>
                  <input
                    type="text"
                    value={affiliation}
                    onChange={(e) => setAffiliation(e.target.value)}
                    className="w-full bg-[#f8fafc] border border-[#e2e8f0] rounded-lg p-2.5 text-xs text-[#0f172a] font-bold"
                  />
                </div>
              </div>
            )}

            {/* Learning Goals Tab */}
            {activeTab === 'learning_goals' && (
              <div className="space-y-4">
                <div className="border-b border-[#f1f5f9] pb-3">
                  <h3 className="font-bold text-sm text-[#0f172a]">Mục Tiêu & Chỉ Tiêu Học Tập</h3>
                  <p className="text-[11px] text-[#64748b]">Cấu hình chỉ tiêu giờ rèn luyện mỗi tuần để nhận các huy chương streak tự động.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="font-bold text-[#0f172a] block">Số giờ tự học mục tiêu hàng tuần (Giờ)</label>
                    <input
                      type="number"
                      step="0.5"
                      value={studyGoalHours}
                      onChange={(e) => setStudyGoalHours(e.target.value)}
                      className="w-full bg-[#f8fafc] border border-[#e2e8f0] rounded-lg p-2.5 text-xs text-[#0f172a] font-mono font-bold"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="font-bold text-[#0f172a] block">Vùng năng lực DigComp ưu tiên phát triển</label>
                    <select
                      value={targetDomain}
                      onChange={(e) => setTargetDomain(e.target.value)}
                      className="w-full bg-[#f8fafc] border border-[#e2e8f0] rounded-lg p-2.5 text-xs text-[#0f172a] font-bold"
                    >
                      <option>Domain 1: Information & Data Literacy</option>
                      <option>Domain 2: Communication & Collaboration</option>
                      <option>Domain 3: Digital Content Creation</option>
                      <option>Domain 4: Safety & Security</option>
                      <option>Domain 5: Problem Solving</option>
                    </select>
                  </div>
                </div>

                <div className="pt-2">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="email_notif_chk"
                      checked={emailNotification}
                      onChange={(e) => setEmailNotification(e.target.checked)}
                      className="rounded border-[#cbd5e1] text-[#0f172a] focus:ring-[#0f172a]"
                    />
                    <label htmlFor="email_notif_chk" className="font-bold text-[#0f172a] cursor-pointer">
                      Nhận email nhắc nhở ôn tập khi sắp đến hạn nộp đồ án và mất chuỗi Streak học tập
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Company / Employee Tab */}
            {activeTab === 'company' && (
              <div className="space-y-4">
                <div className="border-b border-[#f1f5f9] pb-3">
                  <h3 className="font-bold text-sm text-[#0f172a]">Thông Tin Doanh Nghiệp & Định Danh Nhân Viên</h3>
                  <p className="text-[11px] text-[#64748b]">Cấu hình thông tin công tác đối với trường hợp là nhân viên của công ty/doanh nghiệp tham gia rèn luyện năng lực số.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="font-bold text-[#0f172a] block">Chức danh / Vai trò công tác</label>
                    <input
                      type="text"
                      value={userRole}
                      onChange={(e) => setUserRole(e.target.value)}
                      className="w-full bg-[#f8fafc] border border-[#e2e8f0] rounded-lg p-2.5 text-xs text-[#0f172a] font-bold"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="font-bold text-[#0f172a] block">Mã số nhân viên (Employee ID)</label>
                    <input
                      type="text"
                      value={employeeId}
                      onChange={(e) => setEmployeeId(e.target.value)}
                      className="w-full bg-[#f8fafc] border border-[#e2e8f0] rounded-lg p-2.5 text-xs text-[#0f172a] font-mono font-bold"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-[#0f172a] block">Phòng ban / Đơn vị nội bộ</label>
                  <input
                    type="text"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full bg-[#f8fafc] border border-[#e2e8f0] rounded-lg p-2.5 text-xs text-[#0f172a] font-bold"
                  />
                </div>

                <div className="pt-2">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="pub_profile_chk"
                      checked={publicProfile}
                      onChange={(e) => setPublicProfile(e.target.checked)}
                      className="rounded border-[#cbd5e1] text-[#0f172a] focus:ring-[#0f172a]"
                    />
                    <label htmlFor="pub_profile_chk" className="font-bold text-[#0f172a] cursor-pointer">
                      Cho phép quản lý phòng ban và bộ phận nhân sự (HR) tra cứu chứng chỉ SBT xác thực của tôi
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Security Tab */}
            {activeTab === 'security' && (
              <div className="space-y-4">
                <div className="border-b border-[#f1f5f9] pb-3">
                  <h3 className="font-bold text-sm text-[#0f172a]">Bảo Mật Tài Khoản</h3>
                  <p className="text-[11px] text-[#64748b]">Thay đổi mật khẩu tài khoản và bật các cơ chế bảo mật xác thực bổ sung.</p>
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-[#0f172a] block">Mật Khẩu Hiện Tại</label>
                  <input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-[#f8fafc] border border-[#e2e8f0] rounded-lg p-2.5 text-xs text-[#0f172a]"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="font-bold text-[#0f172a] block">Mật Khẩu Mới</label>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Tối thiểu 8 ký tự..."
                      className="w-full bg-[#f8fafc] border border-[#e2e8f0] rounded-lg p-2.5 text-xs text-[#0f172a]"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="font-bold text-[#0f172a] block">Xác Nhận Mật Khẩu Mới</label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Xác nhận lại mật khẩu mới..."
                      className="w-full bg-[#f8fafc] border border-[#e2e8f0] rounded-lg p-2.5 text-xs text-[#0f172a]"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="2fa_learner_chk"
                      checked={requireTwoFactor}
                      onChange={(e) => setRequireTwoFactor(e.target.checked)}
                      className="rounded border-[#cbd5e1] text-[#0f172a] focus:ring-[#0f172a]"
                    />
                    <label htmlFor="2fa_learner_chk" className="font-bold text-[#0f172a] cursor-pointer">
                      Yêu cầu nhập mã OTP xác thực qua Email mỗi khi đăng nhập
                    </label>
                  </div>
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
                <span>Lưu Thay Đổi Cài Đặt</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
