import { NextResponse } from 'next/server'

export async function POST() {
  return NextResponse.json(
    { message: 'Đăng xuất thành công' },
    {
      status: 200,
      headers: {
        'Set-Cookie': [
          'token=; HttpOnly; Path=/; Max-Age=0; Secure; SameSite=Strict',
          'user=; HttpOnly; Path=/; Max-Age=0; Secure; SameSite=Strict',
        ].join(', '),
      },
    },
  )
}
