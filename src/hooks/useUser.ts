import { create } from 'zustand'

// Helper functions để mã hóa và giải mã bằng Base64
function encodeBase64(data: string): string {
  return btoa(data) // Mã hóa thành Base64
}

function decodeBase64(encodedData: string): string {
  return atob(encodedData) // Giải mã từ Base64
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
    set({
      user: storedUser ? JSON.parse(decodeBase64(storedUser)) : null,
      token: storedToken || null,
    })
  },
}))

export default useUser
