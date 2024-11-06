import { create } from 'zustand'

interface User {
  id: number
  name: string
  phoneNumber: string
}

interface UserState {
  user: User | null
  token: string | null // Thêm trường token
  setUser: (user: User | null) => void
  loadUserFromLocalStorage: () => void
  loadTokenFromCookie: () => void // Thêm phương thức load token
}

const useUser = create<UserState>((set) => ({
  user: null,
  token: null, // Khởi tạo token là null
  setUser: (user: User | null) => set({ user }),
  loadUserFromLocalStorage: () => {
    // Kiểm tra nếu localStorage có user
    const storedUser = localStorage.getItem('user')

    if (storedUser) {
      // Nếu có, chuyển đổi JSON thành object và cập nhật vào state
      const userInfo = JSON.parse(storedUser)
      set({ user: userInfo })
    } else {
      // Nếu không có, thiết lập user là null
      set({ user: null })
    }
  },
  loadTokenFromCookie: () => {
    const cookies = document.cookie.split('; ')
    const token = cookies.find((cookie) => cookie.startsWith('token='))

    if (!token) {
      set({ token: null })
    } else {
      set({ token })
    }
  },
}))

export default useUser
