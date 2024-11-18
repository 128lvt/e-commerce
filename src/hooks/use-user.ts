import { create } from 'zustand'

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
}

interface UserState {
  user: User | null
  token: string | null
  setUser: (user: User | null, token?: string | null) => void
  loadUserFromLocalStorage: () => void
  getToken: () => string | null
}

const useUser = create<UserState>((set) => ({
  user: null,
  token: null,

  setUser: (user, token = null) => {
    // Cập nhật user và token trong Zustand
    set({ user, token })

    // Mã hóa user và token thành Base64 trước khi lưu vào localStorage
    if (user) {
      const encodedUser = encodeBase64(JSON.stringify(user))
      localStorage.setItem('user', encodedUser)
    } else {
      localStorage.removeItem('user')
    }

    if (token) {
      localStorage.setItem('token', token)
    } else {
      localStorage.removeItem('token')
    }
  },

  loadUserFromLocalStorage: () => {
    const storedUser = localStorage.getItem('user')
    const storedToken = localStorage.getItem('token')

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
    if (typeof window !== 'undefined') {
      return localStorage.getItem('token')
    }
    return null
  },
}))

export default useUser
