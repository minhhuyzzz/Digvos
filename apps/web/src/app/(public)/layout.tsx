import React from 'react';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="light-theme flex flex-col min-h-screen relative text-slate-900 bg-[#f8fafc]">

      {/* Header công cộng dùng chung */}
      <Navbar />

      {/* Nội dung chính của trang con */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-6 pt-24 pb-12 z-10">
        {children}
      </main>

      {/* Chân trang công cộng dùng chung */}
      <Footer />
    </div>
  );
}
