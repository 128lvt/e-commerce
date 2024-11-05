// stores/cartStore.ts
import { create } from 'zustand'

interface CartItem {
  id: string
  productId: number
  imageUrl: string
  name: string
  price: number
  size: string
  color: string
  variantId: number
}

interface CartState {
  cart: CartItem[]
  addToCart: (item: CartItem) => void
  removeFromCart: (id: string) => void
  loadCartFromLocalStorage: () => void
}

export const useCart = create<CartState>((set) => ({
  cart: [],
  addToCart: (item) => {
    set((state) => {
      const updatedCart = [...state.cart, item]
      localStorage.setItem('cart', JSON.stringify(updatedCart)) // Lưu vào localStorage
      return { cart: updatedCart }
    })
  },
  removeFromCart: (id) => {
    set((state) => {
      const updatedCart = state.cart.filter((item) => item.id !== id)
      localStorage.setItem('cart', JSON.stringify(updatedCart)) // Cập nhật localStorage
      return { cart: updatedCart }
    })
  },
  loadCartFromLocalStorage: () => {
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      set({ cart: JSON.parse(savedCart) })
    }
  },
}))
