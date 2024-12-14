'use client'
import useOrder from '@/hooks/use-order'
import useUser from '@/hooks/use-user'
import { useEffect } from 'react'
import OrderList from './order-list'
import { Breadcrumb } from '@/components/breadcumb'

export default function Page() {
  const { user, loadUserFromCookies } = useUser()
  const token = useUser((state) => state.getToken())
  const breadcrumbItems = [{ label: 'Đơn hàng', href: '/don-hang' }]

  useEffect(() => {
    loadUserFromCookies()
  }, [loadUserFromCookies])

  const { data, isLoading, error } = useOrder(user?.id ?? 0, token ?? '')

  const orders = data?.data

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div className="text-center">Bạn chưa có đơn hàng nào</div>
  }

  if (!data) {
    return <div>No data available</div>
  }

  return (
    <div>
      <Breadcrumb items={breadcrumbItems} />
      <div className="container mx-auto mb-7">
        <OrderList orders={orders} />
      </div>
    </div>
  )
}
