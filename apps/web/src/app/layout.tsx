import './globals.css';
import type { Metadata } from 'next';

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
    <html lang="vi">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
