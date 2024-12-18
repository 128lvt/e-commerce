import { API_URL } from '@/configs/apiConfig'
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST(req: Request) {
  const { email, password } = await req.json()

  const backendResponse = await fetch(`${API_URL}/users/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })

  const res = await backendResponse.json()

  if (!backendResponse.ok) {
    return NextResponse.json(
      { message: res.data || 'Đăng nhập thất bại' },
      { status: backendResponse.status },
    )
  }

  const user = res.data.user

  const token = res.data.token

  const response = NextResponse.json(
    { message: 'Đăng nhập thành công', user, token },
    { status: 200 },
  )

  cookies().set({
    name: 'token',
    value: token,
    sameSite: 'lax',
    maxAge: 259200,
  })

  cookies().set({
    name: 'user',
    value: JSON.stringify(user),
    sameSite: 'lax',
    maxAge: 259200,
  })

  return response
}
