import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST() {
  cookies().set({
    name: 'token',
    value: '',
    httpOnly: true,
    sameSite: 'lax',
    maxAge: 0,
  })
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
