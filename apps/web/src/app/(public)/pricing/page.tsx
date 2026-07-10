import React from 'react';
import Link from 'next/link';
import { Card } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Check } from 'lucide-react';

export default function PricingPage() {
  const plans = [
    {
      name: 'Free (Cá nhân)',
      price: '0đ',
      desc: 'Dành cho người học muốn tự đánh giá năng lực số cơ bản.',
      features: [
        'Vẽ 1 biểu đồ Radar Năng lực số',
        'Luyện tập 3 đề CAT Test/tháng',
        'Lưu trữ hồ sơ e-Portfolio cơ bản',
        'Hỗ trợ cộng đồng',
      ],
      cta: 'Bắt đầu miễn phí',
      popular: false,
    },
    {
      name: 'Pro (Người dạy / Chuyên gia)',
      price: '299K',
      period: '/tháng',
      desc: 'Dành cho giáo viên quản lý lớp học và tự động chấm điểm AI.',
      features: [
        'Đầy đủ tính năng gói Free',
        'Tạo tối đa 5 lớp học phi tập trung',
        'Không giới hạn CAT Test cho học sinh',
        'AI chấm điểm gợi ý (Gemini 1.5 Flash)',
        'Đồng bộ trực tiếp Google Classroom',
      ],
      cta: 'Nâng cấp Pro',
      popular: true,
    },
    {
      name: 'Enterprise (Tổ chức)',
      price: 'Liên hệ',
      desc: 'Dành cho doanh nghiệp tuyển dụng và trường học quy mô lớn.',
      features: [
        'Đầy đủ tính năng gói Pro',
        'Đúc chứng chỉ SBT Polygon số lượng lớn',
        'Bộ lọc Radar săn nhân tài nâng cao',
        'Kiểm toán logs bất biến (Immutable Logs)',
        'Hệ thống Analytics tổng quan tối cao',
        'Hỗ trợ kỹ thuật 24/7 riêng biệt',
      ],
      cta: 'Liên hệ tư vấn',
      popular: false,
    },
  ];

  return (
    <div className="space-y-12 py-10 text-center text-slate-900">
      <div className="space-y-4">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-950 leading-tight">
          Bảng Giá Dịch Vụ DIGVOS
        </h1>
        <p className="text-sm md:text-base text-slate-500 max-w-xl mx-auto font-light leading-relaxed">
          Lựa chọn gói dịch vụ phù hợp để tối ưu hóa việc đánh giá và bảo chứng năng lực số của bạn hoặc doanh nghiệp.
        </p>
      </div>

      {/* Pricing Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto pt-6 text-left">
        {plans.map((plan, idx) => (
          <Card
            key={idx}
            variant={plan.popular ? 'premium' : 'default'}
            className={`flex flex-col justify-between relative h-full transition-transform hover:scale-[1.02] duration-300 border border-slate-200/60
              ${plan.popular ? 'border-brand-500/40 shadow-lg shadow-brand-500/5' : ''}
            `}
          >
            {plan.popular && (
              <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-brand-500 text-slate-950 font-bold text-[10px] tracking-widest px-3 py-1 rounded-full uppercase">
                Khuyên Dùng
              </span>
            )}
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{plan.name}</h3>
                <p className="text-xs text-slate-500 font-light leading-relaxed min-h-[40px]">{plan.desc}</p>
              </div>

              <div className="flex items-baseline space-x-1 py-2 border-b border-slate-100">
                <span className="text-3xl font-extrabold text-slate-900">{plan.price}</span>
                {plan.period && <span className="text-xs text-slate-400">{plan.period}</span>}
              </div>

              <ul className="space-y-3.5 text-xs text-slate-600">
                {plan.features.map((feature, fIdx) => (
                  <li key={fIdx} className="flex items-start space-x-2.5">
                    <Check className="w-4 h-4 text-brand-500 min-w-4 pt-0.5" />
                    <span className="font-light leading-relaxed">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Link href="/login" className="mt-8 block">
              <Button
                variant={plan.popular ? 'primary' : 'glass'}
                className="w-full text-xs font-semibold py-3"
              >
                {plan.cta}
              </Button>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
}
