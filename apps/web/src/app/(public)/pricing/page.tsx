"use client";

import React from 'react';
import PricingSection from '@/components/landing/pricing-section';

export default function PricingPage() {
  return (
    <div className="space-y-16 pb-10 text-center text-slate-900">
      {/* SEO Structured Data for Pricing */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            "name": "DIGVOS Subscription Plans",
            "image": "https://digvos.edu.vn/pricing-image.png",
            "description": "Các gói dịch vụ đánh giá và bảo chứng năng lực số của DIGVOS",
            "offers": {
              "@type": "AggregateOffer",
              "priceCurrency": "VND",
              "lowPrice": "0",
              "highPrice": "299000",
              "offerCount": "3"
            }
          })
        }}
      />

      {/* Render the unified Pricing Section Component */}
      <PricingSection />

      {/* Feature Comparison Matrix Table */}
      <div className="max-w-4xl mx-auto pt-16 text-left space-y-6">
        <h3 className="text-base font-bold text-slate-900 pl-4 border-l-2 border-[#5a96b0]">
          So Sánh Tính Năng Chi Tiết
        </h3>

        <div className="overflow-hidden border border-slate-200 rounded-2xl bg-white/60 shadow-sm">
          <table className="w-full text-xs leading-normal">
            <thead>
              <tr className="bg-slate-50/70 border-b border-slate-200">
                <th className="p-4 font-bold text-slate-800 text-left">Tính năng chính</th>
                <th className="p-4 font-bold text-slate-800 text-center">Free</th>
                <th className="p-4 font-bold text-slate-800 text-center">Pro</th>
                <th className="p-4 font-bold text-slate-800 text-center">Enterprise</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr>
                <td className="p-4 text-slate-600 font-light">Đánh giá thích ứng (CAT Test)</td>
                <td className="p-4 text-center text-slate-500 font-light">3 lượt/tháng</td>
                <td className="p-4 text-center text-[#5a96b0] font-bold">Không giới hạn</td>
                <td className="p-4 text-center text-[#5a96b0] font-bold">Không giới hạn</td>
              </tr>
              <tr>
                <td className="p-4 text-slate-600 font-light">Đúc chứng chỉ SBT on-chain</td>
                <td className="p-4 text-center text-slate-500 font-light">Tự thanh toán gas</td>
                <td className="p-4 text-center text-slate-500 font-light">Tài trợ phí gas</td>
                <td className="p-4 text-center text-slate-500 font-light">Tài trợ phí gas</td>
              </tr>
              <tr>
                <td className="p-4 text-slate-600 font-light">Trợ lý chấm điểm AI (Gemini)</td>
                <td className="p-4 text-center text-slate-400 font-light">—</td>
                <td className="p-4 text-center text-[#5a96b0] font-bold">✓ (Chậm hơn)</td>
                <td className="p-4 text-center text-[#5a96b0] font-bold">✓ (Tốc độ cao)</td>
              </tr>
              <tr>
                <td className="p-4 text-slate-600 font-light">Tạo lớp học phi tập trung</td>
                <td className="p-4 text-center text-slate-400 font-light">—</td>
                <td className="p-4 text-center text-slate-500 font-light">Tối đa 5 lớp</td>
                <td className="p-4 text-center text-[#5a96b0] font-bold">Không giới hạn</td>
              </tr>
              <tr>
                <td className="p-4 text-slate-600 font-light">Hỗ trợ API Webhook & LMS</td>
                <td className="p-4 text-center text-slate-400 font-light">—</td>
                <td className="p-4 text-center text-slate-400 font-light">—</td>
                <td className="p-4 text-center text-[#5a96b0] font-bold">Có hỗ trợ</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
