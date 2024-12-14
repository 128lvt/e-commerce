import { NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value

  // Kiểm tra token có tồn tại và có độ dài hợp lệ
  if (!token || token.length < 10) {
    // Nếu không có token hợp lệ và người dùng truy cập vào các trang yêu cầu xác thực
    if (req.nextUrl.pathname.startsWith('/thanh-toan')) {
      const redirectUrl = new URL('/dang-nhap', req.url)
      return NextResponse.redirect(redirectUrl)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/thanh-toan/:path*'],
}
