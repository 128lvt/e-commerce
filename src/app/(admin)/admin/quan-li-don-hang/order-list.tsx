import { ShoppingBag } from 'lucide-react'
import { OrderItem } from './order'
import { Order } from 'types/Type'

interface IProps {
  orders?: Order[]
}

export function OrderList({ orders }: IProps) {
  if (!orders || orders.length === 0) {
    return (
      <div className="mt-10 text-center text-gray-500">
        Không tìm thấy đơn hàng nào.
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="mb-6 flex items-center text-3xl font-bold">
        <ShoppingBag className="mr-2 h-8 w-8" /> Danh sách đơn hàng
      </h2>
      <div className="grid-cols-2 gap-3 xl:grid">
        {orders.map((order) => (
          <OrderItem key={order.id} order={order} />
        ))}
      </div>
    </div>
  )
}
