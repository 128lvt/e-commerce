import { API_URL } from '@/configs/apiConfig'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { fullname, email, password, retype_password } = await req.json()

  const backendResponse = await fetch(`${API_URL}/users/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ fullname, email, password, retype_password }),
  })

  const res = await backendResponse.json()

  if (!backendResponse.ok) {
    return NextResponse.json(
      { message: res.data || 'Đăng ký thất bại' },
      { status: backendResponse.status },
    )
  }

  const response = NextResponse.json(
    { message: 'Đăng ký thành công' },
    { status: 200 },
  )

  return response
}
