// models.ts

// BaseEntity (for created and updated dates)
export abstract class BaseEntity {
  createdAt?: Date
  updatedAt?: Date

  constructor() {
    this.createdAt = new Date()
    this.updatedAt = new Date()
  }

  onCreate() {
    this.createdAt = new Date()
    this.updatedAt = new Date()
  }

  onUpdate() {
    this.updatedAt = new Date()
  }
}

// Role and RoleConstants
export interface Role {
  id: number
  name: string
}

export const RoleConstants = {
  ADMIN: 'ADMIN',
  USER: 'USER',
  DEV: 'DEV',
}

// User and UserDetails
export interface User extends BaseEntity {
  id: number
  fullName?: string
  email: string
  address?: string
  password: string
  active?: boolean
  dateOfBirth?: Date
  facebookAccountId?: string
  googleAccountId?: string
  role: Role
}

export interface UserDetails {
  getUsername(): string
  getAuthorities(): Array<string>
  isAccountNonExpired(): boolean
  isAccountNonLocked(): boolean
  isCredentialsNonExpired(): boolean
  isEnabled(): boolean
}

export class UserDetailsImpl implements UserDetails {
  private user: User

  constructor(user: User) {
    this.user = user
  }

  getUsername(): string {
    return this.user.email
  }

  getAuthorities(): Array<string> {
    return [`ROLE_${this.user.role.name.toUpperCase()}`]
  }

  isAccountNonExpired(): boolean {
    return true
  }

  isAccountNonLocked(): boolean {
    return true
  }

  isCredentialsNonExpired(): boolean {
    return true
  }

  isEnabled(): boolean {
    return true
  }
}

// SocialAccount
export interface SocialAccount {
  id: number
  provider: string
  providerId?: string
  name?: string
  email?: string
}

// Token
export interface Token {
  id: number
  token: string
  tokenType: string
  expirationDate: Date
  revoked: boolean
  expired: boolean
  user: User
}

// Product and related interfaces
export interface Product {
  id: number
  name: string
  price: number
  stock: number
  description: string
  category: Category
  variants: ProductVariant[]
  images: ProductImage[]
}

export interface ProductVariant {
  id: number
  product: Product
  size?: string
  color?: string
  stock: number
  p_id: number
}

export interface ProductImage {
  id: number
  product: Product
  imageUrl: string
}

// Order and OrderDetail
export interface Order {
  id: number
  user: User
  fullName?: string
  email?: string
  phoneNumber: string
  address?: string
  note?: string
  orderDate?: Date
  status: string
  totalMoney: number
  shippingMethod?: string
  shippingAddress?: string
  shippingDate?: Date
  trackingNumber?: string
  paymentMethod?: string
  paymentStatus?: string
  active?: boolean
  orderDetails: OrderDetail[]
}

export interface OrderDetail {
  id: number
  order: Order
  product: Product
  numberOfProducts: number
  totalMoney: number
  productVariant?: ProductVariant
}

// Category
export interface Category {
  id: number
  name: string
}

// OrderStatus constants
export const OrderStatus = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  SHIPPED: 'shipped',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled',
}
