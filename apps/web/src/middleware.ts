import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Ghi nhật ký kiểm soát phân quyền (Audit Logging)
  console.log(`[DIGVOS Auth Security Middleware] Đang kiểm tra quyền truy cập: ${pathname}`);

  // Đọc thông tin xác thực từ Cookies do client ghi vào
  const token = request.cookies.get('digvos_access_token')?.value;
  const userRole = request.cookies.get('digvos_user_role')?.value;

  // Nếu chưa đăng nhập (không có token)
  if (!token || !userRole) {
    if (pathname.startsWith('/admin')) {
      return NextResponse.redirect(new URL('/login?role=ADMIN', request.url));
    }
    return NextResponse.redirect(new URL('/select-role', request.url));
  }

  // Kiểm tra quyền truy cập dựa trên role
  if (pathname.startsWith('/learner')) {
    if (userRole !== 'STUDENT') {
      return NextResponse.redirect(new URL('/select-role', request.url));
    }
  }

  if (pathname.startsWith('/org')) {
    if (userRole !== 'TEACHER' && userRole !== 'EMPLOYER' && userRole !== 'ORG') {
      return NextResponse.redirect(new URL('/select-role', request.url));
    }
  }

  if (pathname.startsWith('/admin')) {
    if (userRole !== 'ADMIN') {
      return NextResponse.redirect(new URL('/login?role=ADMIN', request.url));
    }
  }

  return NextResponse.next();
}

// Bọc toàn bộ các phân khu quản trị để kiểm soát
export const config = {
  matcher: [
    '/learner/:path*',
    '/org/:path*',
    '/admin/:path*',
  ],
};
