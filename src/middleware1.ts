import { NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
  const token = req.cookies.get('token')

  // Nếu không có token và người dùng truy cập vào các trang yêu cầu xác thực
  if (!token && req.nextUrl.pathname.startsWith('/thanh-toan')) {
    const redirectUrl = new URL('/dang-nhap', req.url)
    redirectUrl.searchParams.set('redirect', req.nextUrl.pathname) // Lưu lại trang đang truy cập
    return NextResponse.redirect(redirectUrl)
  }

  return NextResponse.next()
}

// Config để áp dụng middleware cho các route cần thiết
export const config = {
  matcher: ['/thanh-toan/:path*'], // Đảm bảo bao phủ tất cả subpath nếu có
}
