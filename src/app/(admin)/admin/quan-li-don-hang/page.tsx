'use client'

import { useState } from 'react'
import useAdminOrder from '@/hooks/use-admin-order'
import { OrderList } from './order-list'
import useUser from '@/hooks/use-user'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import { OrderSkeleton } from './order-skeleton'

export default function AdminOrderPage() {
  const token = useUser((state) => state.getToken())
  const role = useUser((state) => state.getRole())
  const router = useRouter()
  const { data, isLoading, error } = useAdminOrder(token ?? '')
  const [searchTerm, setSearchTerm] = useState('')

  if (!(role === 'ROLE_DEV' || role === 'ROLE_ADMIN')) {
    console.log(`Role không hợp lệ: ${role}, chuyển hướng...`)
    router.push('/admin/')
    return null
  }

  console.log(`Role hợp lệ: ${role}`)

  const orders = data?.data

  const filteredOrders = orders?.filter(
    (order) =>
      order.id.toString().includes(searchTerm) ||
      order.fullName?.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="container mx-auto min-w-[1000px] px-4 py-8">
      <div className="mb-10 text-center text-2xl font-semibold">
        Quản lý đơn hàng
      </div>
      <div className="relative mb-6">
        <Input
          type="text"
          placeholder="Tìm kiếm theo tên hoặc ID đơn hàng"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-400" />
      </div>
      {isLoading ? (
        <OrderSkeleton />
      ) : error ? (
        <div className="mt-10 text-center text-red-500">
          Error: {error.message}
        </div>
      ) : (
        <OrderList orders={filteredOrders} />
      )}
    </div>
  )
}
