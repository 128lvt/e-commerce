'use client'

import useAdminOrder from '@/hooks/use-admin-order'
import { OrderList } from './order-list'
import useUser from '@/hooks/use-user'

export default function AdminOrderPage() {
  const token = useUser((state) => state.getToken())
  const { data, isLoading, error } = useAdminOrder(token ?? '')
  if (isLoading) {
    return <div>Loading...</div>
  }
  if (error) {
    return <div>Error: {error.message}</div>
  }
  const orders = data?.data

  return (
    <div className="container mx-auto">
      <div className="mb-10 text-center text-2xl font-semibold">
        Quản lý đơn hàng
      </div>
      <OrderList orders={orders} />
    </div>
  )
}
