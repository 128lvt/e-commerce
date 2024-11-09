import { API_URL } from '@/app/configs/apiConfig'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { phone_number, password } = await req.json()

  const backendResponse = await fetch(`${API_URL}/users/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ phone_number, password }),
  })

  const res = await backendResponse.json()

  if (!backendResponse.ok) {
    return NextResponse.json(
      { message: res.message || 'Đăng nhập thất bại' },
      { status: backendResponse.status },
    )
  }

  const user = res.data.user

  const token = res.data.token

  const response = NextResponse.json(
    { message: 'Đăng nhập thành công', user, token },
    { status: 200 },
  )

  response.headers.append(
    'Set-Cookie',
    `token=${token}; Path=/; Max-Age=99999999999999999;`,
  )

  return response
}
