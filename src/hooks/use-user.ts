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
  role: string
}

interface UserState {
  user: User | null
  token: string | null
  setUser: (user: User | null, token?: string | null) => void
  loadUserFromLocalStorage: () => void
  getToken: () => string | null
  getRole: () => string | null
}

const useUser = create<UserState>((set, get) => ({
  user: null,
  token: null,

  setUser: (user, token = null) => {
    // Cập nhật user và token trong Zustand
    set({ user, token })

    // Mã hóa user và token thành Base64 trước khi lưu vào localStorage
    if (user) {
      const encodedUser = encodeBase64(JSON.stringify(user))
      localStorage.setItem('user', encodedUser)
      localStorage.setItem('role', user.role) // Lưu role vào localStorage
    } else {
      localStorage.removeItem('user')
      localStorage.removeItem('role')
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
    const storedRole = localStorage.getItem('role')

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

    // Nếu không có role trong localStorage, nhưng có trong user, cập nhật localStorage
    if (!storedRole && decodedUser?.role) {
      localStorage.setItem('role', decodedUser.role)
    }
  },

  getToken: () => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('token')
    }
    return null
  },

  getRole: () => {
    if (typeof window !== 'undefined') {
      const { user } = get()
      if (user && user.role) {
        return user.role
      }
      return localStorage.getItem('role')
    }
    return null
  },
}))

export default useUser
