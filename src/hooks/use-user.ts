import { create } from 'zustand'
import Cookies from 'js-cookie' // Recommend using js-cookie library for easier cookie management

// Mã hóa Unicode thành Base64
function encodeBase64(data: string): string {
  return Buffer.from(data, 'utf-8').toString('base64')
}

// Giải mã từ Base64 về Unicode
function decodeBase64(encodedData: string): string {
  return Buffer.from(encodedData, 'base64').toString('utf-8')
}

interface User {
  id: number
  fullName: string
  phoneNumber: string
  authorities: any
}

interface UserState {
  user: User | null
  token: string | null
  setUser: (user: User | null, token?: string | null) => void
  loadUserFromCookies: () => void
  getToken: () => string | null
  getRole: () => string | null
}

const useUser = create<UserState>((set, get) => ({
  user: null,
  token: null,

  setUser: (user, token = null) => {
    // Cập nhật user và token trong Zustand
    set({ user, token })

    const role = user?.authorities?.[0]?.authority

    // Mã hóa user và token thành Base64 trước khi lưu vào cookies
    if (user) {
      const encodedUser = encodeBase64(JSON.stringify(user))

      Cookies.set('user', encodedUser, { expires: 3 }) // Tồn tại trong 3 ngày
      Cookies.set('role', role, { expires: 3 })
    } else {
      Cookies.remove('user')
      Cookies.remove('role')
    }

    if (token) {
      Cookies.set('token', token, { expires: 3 })
    } else {
      Cookies.remove('token')
    }
  },

  loadUserFromCookies: () => {
    const storedUser = Cookies.get('user')
    const storedToken = Cookies.get('token')

    let decodedUser = null
    if (storedUser) {
      try {
        decodedUser = JSON.parse(decodeBase64(storedUser))
      } catch (e) {
        console.error('Failed to decode user data:', e)
      }
    }

    set({
      user: decodedUser,
      token: storedToken || null,
    })
  },

  getToken: () => {
    return Cookies.get('token') || null
  },

  getRole: () => {
    return Cookies.get('role') || null
  },
}))

export default useUser
