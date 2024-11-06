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

  const data = await backendResponse.json()

  if (!backendResponse.ok) {
    return NextResponse.json(
      { message: data.message || 'Đăng nhập thất bại' },
      { status: backendResponse.status },
    )
  }

  const user = {
    id: data.data.userId,
    name: data.data.name,
    phoneNumber: data.data.phoneNumber,
  }

  const token = data.data.token

  const response = NextResponse.json(
    { message: 'Đăng nhập thành công', user, token },
    { status: 200 },
  )

  response.headers.append(
    'Set-Cookie',
    `token=${token}; Path=/; Max-Age=99999999999999999`,
  )

  return response
}
