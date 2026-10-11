import './globals.css';
import type { Metadata } from 'next';
import { AuthProvider } from '../components/providers/AuthProvider';

export const metadata: Metadata = {
  title: 'DIGVOS - Digital Competence Validation Operating System',
  description: 'Hệ thống Đánh giá và Chứng nhận Năng lực số Thích ứng dựa trên Trí tuệ Nhân tạo và Blockchain Polygon',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
