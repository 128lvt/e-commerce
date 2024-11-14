'use client'
import useOrder from '@/hooks/use-order'
import useUser from '@/hooks/use-user'
import { useEffect } from 'react'
import OrderList from './order-list'

export default function Page() {
  const { user, loadUserFromLocalStorage } = useUser()
  const token = useUser((state) => state.getToken())

  useEffect(() => {
    loadUserFromLocalStorage()
  }, [loadUserFromLocalStorage])

  const { data, isLoading, error } = useOrder(user?.id ?? 0, token ?? '')

  const orders = data?.data

  console.log(orders)

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }

  if (!data) {
    return <div>No data available</div>
  }

  return (
    <div className="container mx-auto">
      <div className="mb-10 text-center text-2xl font-semibold">
        Đơn hàng đã mua
      </div>
      <OrderList orders={orders} />
    </div>
  )
}
