'use client';

import React, { useState } from 'react';
import { 
  Settings, 
  ShieldCheck, 
  Key, 
  Save, 
  Server, 
  Lock, 
  Globe, 
  Database, 
  Cpu, 
  Activity,
  CheckCircle,
  Eye,
  EyeOff
} from 'lucide-react';

type TabType = 'general' | 'blockchain' | 'ai' | 'security';

export default function AdminSystemSettingsPage() {
  const [activeTab, setActiveTab] = useState<TabType>('general');
  const [showSecret, setShowSecret] = useState(false);
  const [saved, setSaved] = useState(false);

  // General Settings State
  const [siteName, setSiteName] = useState('DIGVOS Platform');
  const [siteDomain, setSiteDomain] = useState('https://digvos.vn');
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [allowRegistration, setAllowRegistration] = useState(true);

  // Blockchain Settings State
  const [rpcUrl, setRpcUrl] = useState('https://polygon-rpc.com');
  const [contractAddress, setContractAddress] = useState('0x71C7656EC7ab88b098defB751B7401B5f6d89B4');
  const [gasLimit, setGasLimit] = useState('250000');
  const [scanApiKey, setScanApiKey] = useState('PLG_SCAN_API_KEY_9821');

  // AI Router Settings State
  const [defaultModel, setDefaultModel] = useState('gpt-4o');
  const [temperature, setTemperature] = useState('0.2');
  const [maxTokens, setMaxTokens] = useState('2048');

  // Security Settings State
  const [jwtSecret, setJwtSecret] = useState('super_secret_jwt_key_digvos_2026');
  const [jwtExpiry, setJwtExpiry] = useState('7d');
  const [maxFailedLogins, setMaxFailedLogins] = useState('5');
  const [require2FA, setRequire2FA] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16 font-sans text-[#0f172a]">
      {/* Top Banner Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-[#e2e8f0] pb-5 gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#0f172a] flex items-center gap-2">
            <Settings className="w-6 h-6 text-[#0f172a]" /> Cài Đặt Hệ Thống & Security Center
          </h1>
          <p className="text-xs text-[#64748b] mt-1">Cấu hình các tham số cốt lõi của nền tảng bao gồm Web3 Blockchain, AI Router Engine và các chính sách bảo mật tối cao.</p>
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

      {saved && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-bold flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-emerald-600" />
          <span>Lưu toàn bộ thay đổi hệ thống thành công và đã đồng bộ với File cấu hình Server!</span>
        </div>
      )}

      {/* Workspace Matrix: Left Sidebar Tabs & Right Settings Panes */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        {/* Left Side Navigation Tabs */}
        <div className="bg-white border border-[#e2e8f0] rounded-xl p-4 shadow-2xs space-y-1">
          <span className="text-[10px] font-bold text-[#64748b] uppercase tracking-wider px-3 block mb-2">Phân hệ cài đặt</span>
          
          <button
            onClick={() => setActiveTab('general')}
            className={`w-full text-left px-3 py-2.5 rounded-lg text-xs font-bold transition-all flex items-center space-x-2.5 ${
              activeTab === 'general' ? 'bg-[#0f172a] text-white' : 'text-[#64748b] hover:bg-[#f8fafc] hover:text-[#0f172a]'
            }`}
          >
            <Globe className="w-4 h-4" />
            <span>Cấu Hình Chung</span>
          </button>

          <button
            onClick={() => setActiveTab('blockchain')}
            className={`w-full text-left px-3 py-2.5 rounded-lg text-xs font-bold transition-all flex items-center space-x-2.5 ${
              activeTab === 'blockchain' ? 'bg-[#0f172a] text-white' : 'text-[#64748b] hover:bg-[#f8fafc] hover:text-[#0f172a]'
            }`}
          >
            <Database className="w-4 h-4" />
            <span>Blockchain & Web3</span>
          </button>

          <button
            onClick={() => setActiveTab('ai')}
            className={`w-full text-left px-3 py-2.5 rounded-lg text-xs font-bold transition-all flex items-center space-x-2.5 ${
              activeTab === 'ai' ? 'bg-[#0f172a] text-white' : 'text-[#64748b] hover:bg-[#f8fafc] hover:text-[#0f172a]'
            }`}
          >
            <Cpu className="w-4 h-4" />
            <span>AI Router Engine</span>
          </button>

          <button
            onClick={() => setActiveTab('security')}
            className={`w-full text-left px-3 py-2.5 rounded-lg text-xs font-bold transition-all flex items-center space-x-2.5 ${
              activeTab === 'security' ? 'bg-[#0f172a] text-white' : 'text-[#64748b] hover:bg-[#f8fafc] hover:text-[#0f172a]'
            }`}
          >
            <Lock className="w-4 h-4" />
            <span>Bảo Mật & API Secrets</span>
          </button>
        </div>

        {/* Right Side Settings Pane */}
        <div className="lg:col-span-3 bg-white border border-[#e2e8f0] rounded-xl p-6 shadow-2xs">
          <form onSubmit={handleSave} className="space-y-6 text-xs">
            {/* General Tab */}
            {activeTab === 'general' && (
              <div className="space-y-4">
                <div className="border-b border-[#f1f5f9] pb-3">
                  <h3 className="font-bold text-sm text-[#0f172a]">Cấu Hình Nền Tảng Chung</h3>
                  <p className="text-[11px] text-[#64748b]">Thiết lập nhận diện thương hiệu cơ bản và trạng thái đóng/mở đăng ký.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="font-bold text-[#0f172a] block">Tên Nền Tảng (Site Name)</label>
                    <input
                      type="text"
                      value={siteName}
                      onChange={(e) => setSiteName(e.target.value)}
                      className="w-full bg-[#f8fafc] border border-[#e2e8f0] rounded-lg p-2.5 text-xs text-[#0f172a] font-bold"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="font-bold text-[#0f172a] block">Domain Chính (Primary Domain)</label>
                    <input
                      type="text"
                      value={siteDomain}
                      onChange={(e) => setSiteDomain(e.target.value)}
                      className="w-full bg-[#f8fafc] border border-[#e2e8f0] rounded-lg p-2.5 text-xs text-[#0f172a] font-mono"
                    />
                  </div>
                </div>

                <div className="pt-2 space-y-3">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="maint_chk"
                      checked={maintenanceMode}
                      onChange={(e) => setMaintenanceMode(e.target.checked)}
                      className="rounded border-[#cbd5e1] text-[#0f172a] focus:ring-[#0f172a]"
                    />
                    <label htmlFor="maint_chk" className="font-bold text-[#0f172a] cursor-pointer">
                      Kích hoạt Chế độ Bảo trì Hệ thống (Maintenance Mode)
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="reg_chk"
                      checked={allowRegistration}
                      onChange={(e) => setAllowRegistration(e.target.checked)}
                      className="rounded border-[#cbd5e1] text-[#0f172a] focus:ring-[#0f172a]"
                    />
                    <label htmlFor="reg_chk" className="font-bold text-[#0f172a] cursor-pointer">
                      Cho phép Đăng ký tài khoản mới tự do
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Blockchain Tab */}
            {activeTab === 'blockchain' && (
              <div className="space-y-4">
                <div className="border-b border-[#f1f5f9] pb-3">
                  <h3 className="font-bold text-sm text-[#0f172a]">Cấu Hình Blockchain & Web3 Polygon</h3>
                  <p className="text-[11px] text-[#64748b]">Thiết lập mạng lưới Polygon Node RPC và địa chỉ Smart Contract phát hành Soulbound Token (SBT).</p>
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-[#0f172a] block">Polygon Network RPC Endpoint URL</label>
                  <input
                    type="text"
                    value={rpcUrl}
                    onChange={(e) => setRpcUrl(e.target.value)}
                    className="w-full bg-[#f8fafc] border border-[#e2e8f0] rounded-lg p-2.5 text-xs text-[#0f172a] font-mono"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-[#0f172a] block">Địa Chỉ Hợp Đồng SBT Smart Contract (ERC-5192)</label>
                  <input
                    type="text"
                    value={contractAddress}
                    onChange={(e) => setContractAddress(e.target.value)}
                    className="w-full bg-[#f8fafc] border border-[#e2e8f0] rounded-lg p-2.5 text-xs text-[#0f172a] font-mono"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="font-bold text-[#0f172a] block">Gas Limit mặc định cho giao dịch Mint</label>
                    <input
                      type="number"
                      value={gasLimit}
                      onChange={(e) => setGasLimit(e.target.value)}
                      className="w-full bg-[#f8fafc] border border-[#e2e8f0] rounded-lg p-2.5 text-xs text-[#0f172a] font-mono"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="font-bold text-[#0f172a] block">PolygonScan API Key (Verify contract)</label>
                    <input
                      type="password"
                      value={scanApiKey}
                      onChange={(e) => setScanApiKey(e.target.value)}
                      className="w-full bg-[#f8fafc] border border-[#e2e8f0] rounded-lg p-2.5 text-xs text-[#0f172a] font-mono"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* AI Router Tab */}
            {activeTab === 'ai' && (
              <div className="space-y-4">
                <div className="border-b border-[#f1f5f9] pb-3">
                  <h3 className="font-bold text-sm text-[#0f172a]">Cấu Hình AI Router & LLM Engine</h3>
                  <p className="text-[11px] text-[#64748b]">Tối ưu hóa các cài đặt tham số mô hình thông minh cho bộ máy chấm điểm Rubrics & AI Coach.</p>
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-[#0f172a] block">Mô hình AI mặc định (Default Model Router)</label>
                  <select
                    value={defaultModel}
                    onChange={(e) => setDefaultModel(e.target.value)}
                    className="w-full bg-[#f8fafc] border border-[#e2e8f0] rounded-lg p-2.5 text-xs text-[#0f172a] font-bold"
                  >
                    <option value="gpt-4o">OpenAI GPT-4o (Được khuyến nghị cho chấm Rubrics)</option>
                    <option value="claude-3.5">Anthropic Claude 3.5 Sonnet</option>
                    <option value="gemini-1.5-pro">Google Gemini 1.5 Pro</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="font-bold text-[#0f172a] block">Nhiệt Độ Sáng Tạo (Temperature)</label>
                    <input
                      type="number"
                      step="0.1"
                      min="0"
                      max="1.0"
                      value={temperature}
                      onChange={(e) => setTemperature(e.target.value)}
                      className="w-full bg-[#f8fafc] border border-[#e2e8f0] rounded-lg p-2.5 text-xs text-[#0f172a] font-mono"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="font-bold text-[#0f172a] block">Số lượng Tokens Phản Hồi Tối Đa (Max Output Tokens)</label>
                    <input
                      type="number"
                      value={maxTokens}
                      onChange={(e) => setMaxTokens(e.target.value)}
                      className="w-full bg-[#f8fafc] border border-[#e2e8f0] rounded-lg p-2.5 text-xs text-[#0f172a] font-mono"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Security Tab */}
            {activeTab === 'security' && (
              <div className="space-y-4">
                <div className="border-b border-[#f1f5f9] pb-3">
                  <h3 className="font-bold text-sm text-[#0f172a]">Chính Sách Bảo Mật & API Credentials Vault</h3>
                  <p className="text-[11px] text-[#64748b]">Cấu hình khóa ký JWT Tokens hệ thống và các cơ chế phòng chống đăng nhập bất hợp pháp.</p>
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-[#0f172a] block">JWT Bearer Sign Key Secret</label>
                  <div className="relative">
                    <input
                      type={showSecret ? 'text' : 'password'}
                      value={jwtSecret}
                      onChange={(e) => setJwtSecret(e.target.value)}
                      className="w-full bg-[#f8fafc] border border-[#e2e8f0] rounded-lg p-2.5 pr-10 text-xs text-[#0f172a] font-mono"
                    />
                    <button
                      type="button"
                      onClick={() => setShowSecret(!showSecret)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#64748b] hover:text-[#0f172a]"
                    >
                      {showSecret ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="font-bold text-[#0f172a] block">Thời gian hết hạn Token JWT</label>
                    <input
                      type="text"
                      value={jwtExpiry}
                      onChange={(e) => setJwtExpiry(e.target.value)}
                      className="w-full bg-[#f8fafc] border border-[#e2e8f0] rounded-lg p-2.5 text-xs text-[#0f172a] font-mono"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="font-bold text-[#0f172a] block">Số lần đăng nhập sai tối đa trước khi khóa</label>
                    <input
                      type="number"
                      value={maxFailedLogins}
                      onChange={(e) => setMaxFailedLogins(e.target.value)}
                      className="w-full bg-[#f8fafc] border border-[#e2e8f0] rounded-lg p-2.5 text-xs text-[#0f172a] font-mono"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="2fa_chk"
                      checked={require2FA}
                      onChange={(e) => setRequire2FA(e.target.checked)}
                      className="rounded border-[#cbd5e1] text-[#0f172a] focus:ring-[#0f172a]"
                    />
                    <label htmlFor="2fa_chk" className="font-bold text-[#0f172a] cursor-pointer">
                      Bắt buộc xác thực hai yếu tố (2FA) đối với nhóm tài khoản Quản trị viên
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Bottom Actions Row */}
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
