import { Order } from 'types/Type'
import OrderItem from './order-item'

interface IProps {
  orders?: Order[]
}

export default function OrderList({ orders }: IProps) {
  return (
    <div className="space-y-5">
      {orders?.map((order) => <OrderItem key={order.id} order={order} />)}
    </div>
  )
}
