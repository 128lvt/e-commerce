import { NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
  const token = req.cookies.get('token')

  // Nếu không có token và người dùng truy cập vào các trang yêu cầu xác thực
  if (!token && req.nextUrl.pathname.startsWith('/thanh-toan')) {
    const redirectUrl = new URL('/dang-nhap', req.url)
    return NextResponse.redirect(redirectUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/thanh-toan/:path*'],
}
