import React from 'react';
import dynamic from 'next/dynamic';
import HeroSection from '@/components/landing/hero-section';
import ClientsMarquee from '@/components/landing/clients-marquee';

// Lazy load các section bên dưới (Below-the-fold) để giảm JS Payload ban đầu
const DashboardShowcase = dynamic(() => import('@/components/landing/dashboard-showcase'));
const StepWorkflow = dynamic(() => import('@/components/landing/step-workflow'));
const ComparisonSection = dynamic(() => import('@/components/landing/comparison-section'));
const TestimonialsSection = dynamic(() => import('@/components/landing/testimonials-section'));
const PricingSection = dynamic(() => import('@/components/landing/pricing-section'));
const FaqCta = dynamic(() => import('@/components/landing/faq-cta'));

export default function Home() {
  return (
    <div className="relative w-full min-h-screen bg-white">
      {/* Global Background Decorations */}
      <div className="absolute top-0 left-0 w-full h-[800px] bg-gradient-to-b from-brand-50/50 to-transparent pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-100/20 via-transparent to-transparent pointer-events-none" />
      
      {/* Schema.org SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "DIGVOS",
            "url": "https://digvos.edu.vn",
            "logo": "https://digvos.edu.vn/logo.png",
            "description": "Hệ thống Đánh giá và Chứng nhận Năng lực số Thích ứng dựa trên AI và Blockchain Polygon",
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+84-1900-xxxx",
              "contactType": "customer service"
            }
          })
        }}
      />

      <div className="relative z-10 flex flex-col space-y-8 md:space-y-12 pb-16">
        <HeroSection />
        <ClientsMarquee />
        <DashboardShowcase />
        <StepWorkflow />
        <ComparisonSection />
        <TestimonialsSection />
        <PricingSection />
        <FaqCta />
      </div>
    </div>
  );
}
