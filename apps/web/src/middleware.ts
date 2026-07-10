import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Ghi nhật ký kiểm soát phân quyền (Audit Logging)
  console.log(`[DIGVOS Auth Security Middleware] Đang kiểm tra quyền truy cập: ${pathname}`);

  // Trong thực tế, Auth0 hoặc JWT Token sẽ được giải mã để kiểm tra role:
  // const userRole = request.cookies.get('user_role')?.value;
  // if (pathname.startsWith('/admin') && userRole !== 'ADMIN') {
  //   return NextResponse.redirect(new URL('/login', request.url));
  // }

  return NextResponse.next();
}

// Bọc toàn bộ các phân khu quản trị để kiểm soát
export const config = {
  matcher: [
    '/student/:path*',
    '/teacher/:path*',
    '/employer/:path*',
    '/admin/:path*',
  ],
};
