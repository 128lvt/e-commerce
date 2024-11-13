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
  quantity: number
  stock: number
}

interface CartState {
  cart: CartItem[]
  addToCart: (item: CartItem) => void
  removeFromCart: (id: string) => void
  updateQuantity: (id: string, variantId: number, quantity: number) => void
  loadCartFromLocalStorage: () => void
  clearCart: () => void
}

export const useCart = create<CartState>((set) => ({
  cart: [],

  // Thêm sản phẩm vào giỏ hàng
  addToCart: (item) => {
    set((state) => {
      // Kiểm tra xem sản phẩm đã có trong giỏ chưa
      const existingItemIndex = state.cart.findIndex(
        (cartItem) =>
          cartItem.id === item.id && cartItem.variantId === item.variantId,
      )

      let updatedCart
      if (existingItemIndex !== -1) {
        // Nếu sản phẩm đã có trong giỏ, cập nhật số lượng
        const updatedItem = {
          ...state.cart[existingItemIndex],
          quantity: Math.min(
            state.cart[existingItemIndex].quantity + 1,
            state.cart[existingItemIndex].stock,
          ), // Đảm bảo không vượt quá stock
        }
        updatedCart = [
          ...state.cart.slice(0, existingItemIndex),
          updatedItem,
          ...state.cart.slice(existingItemIndex + 1),
        ]
      } else {
        // Nếu sản phẩm chưa có, thêm sản phẩm mới vào giỏ hàng
        updatedCart = [
          ...state.cart,
          { ...item, quantity: 1 }, // Số lượng mặc định là 1
        ]
      }

      // Lưu giỏ hàng vào localStorage
      localStorage.setItem('cart', JSON.stringify(updatedCart))
      return { cart: updatedCart }
    })
  },

  // Xóa sản phẩm khỏi giỏ hàng
  removeFromCart: (id) => {
    set((state) => {
      const updatedCart = state.cart.filter((item) => item.id !== id)
      localStorage.setItem('cart', JSON.stringify(updatedCart)) // Cập nhật lại localStorage
      return { cart: updatedCart }
    })
  },

  // Cập nhật số lượng sản phẩm trong giỏ
  updateQuantity: (id, variantId, quantity) => {
    set((state) => {
      // Kiểm tra nếu quantity hợp lệ
      const validQuantity = !isNaN(quantity) && quantity > 0 ? quantity : 1 // Đảm bảo quantity hợp lệ

      const updatedCart = state.cart.map((item) =>
        item.id === id && item.variantId === variantId
          ? {
              ...item,
              quantity: Math.min(validQuantity, item.stock),
            }
          : item,
      )

      localStorage.setItem('cart', JSON.stringify(updatedCart))
      return { cart: updatedCart }
    })
  },

  // Tải giỏ hàng từ localStorage khi trang được tải lại
  loadCartFromLocalStorage: () => {
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      set({ cart: JSON.parse(savedCart) })
    }
  },

  // Xóa toàn bộ sản phẩm trong giỏ hàng
  clearCart: () => {
    set({ cart: [] })
    localStorage.removeItem('cart') // Xóa giỏ hàng khỏi localStorage
  },
}))
