import { Order } from 'types/Type'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  User,
  Phone,
  Mail,
  MapPin,
  Clipboard,
  Calendar,
  CreditCard,
  Package,
  DollarSign,
  Truck,
  ShoppingBag,
  Palette,
  Ruler,
} from 'lucide-react'

interface OrderItemProps {
  order?: Order
}

function OrderItem({ order }: OrderItemProps) {
  if (!order) return null

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'chờ xác nhận':
        return 'bg-yellow-500'
      case 'đang xử lí':
        return 'bg-blue-500'
      case 'đang giao hàng':
        return 'bg-green-500'
      case 'đã giao hàng':
        return 'bg-green-700'
      case 'đã hủy':
        return 'bg-red-500'
      default:
        return 'bg-gray-500'
    }
  }

  return (
    <Card className="mx-auto w-full max-w-4xl">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="text-2xl font-bold">Đơn hàng #{order.id}</span>
          <Badge className={`${getStatusColor(order.status)} text-white`}>
            {order.status.toUpperCase()}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <p className="flex items-center">
              <User className="mr-2 h-4 w-4" /> <strong>Khách hàng:</strong>{' '}
              {order.fullName}
            </p>
            <p className="flex items-center">
              <Phone className="mr-2 h-4 w-4" /> <strong>Số điện thoại:</strong>{' '}
              {order.phoneNumber}
            </p>
            <p className="flex items-center">
              <Mail className="mr-2 h-4 w-4" /> <strong>Email:</strong>{' '}
              {order.email}
            </p>
            <p className="flex items-center">
              <MapPin className="mr-2 h-4 w-4" /> <strong>Địa chỉ:</strong>{' '}
              {order.address}
            </p>
          </div>
          <div className="space-y-2">
            <p className="flex items-center">
              <Clipboard className="mr-2 h-4 w-4" /> <strong>Ghi chú:</strong>{' '}
              {order.note || 'Không có ghi chú'}
            </p>
            <p className="flex items-center">
              <Calendar className="mr-2 h-4 w-4" />{' '}
              <strong>Ngày đặt hàng:</strong>{' '}
              {order.orderDate?.toLocaleString()}
            </p>
            <p className="flex items-center">
              <CreditCard className="mr-2 h-4 w-4" />{' '}
              <strong>Thanh toán:</strong> {order.paymentMethod?.toUpperCase()}
            </p>
            <p className="flex items-center">
              <DollarSign className="mr-2 h-4 w-4" />{' '}
              <strong>Tổng tiền:</strong>{' '}
              {new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND',
              }).format(order.totalMoney)}
            </p>
          </div>
        </div>

        <Separator />

        <div>
          <h3 className="mb-2 flex items-center text-xl font-semibold">
            <Package className="mr-2 h-5 w-5" /> Danh sách sản phẩm
          </h3>
          <ScrollArea className="h-[200px]">
            <div className="space-y-4">
              {order.orderDetails?.map((orderDetail) => (
                <Card key={orderDetail.id} className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <p className="font-semibold">
                        {orderDetail.product.name}
                      </p>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Palette className="mr-1 h-3 w-3" />{' '}
                        {orderDetail.productVariant?.color}
                        <Separator
                          orientation="vertical"
                          className="mx-2 h-4"
                        />
                        <Ruler className="mr-1 h-3 w-3" />{' '}
                        {orderDetail.productVariant?.size}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">
                        {new Intl.NumberFormat('vi-VN', {
                          style: 'currency',
                          currency: 'VND',
                        }).format(orderDetail.product.price)}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        x{orderDetail.numberOfProducts}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </div>
      </CardContent>
      <CardFooter className="bg-muted/50 pt-5">
        <div className="flex w-full items-center justify-between">
          <span className="flex items-center text-muted-foreground">
            <Truck className="mr-2 h-4 w-4" /> Đang vận chuyển
          </span>
          <span className="font-semibold">
            Tổng cộng:{' '}
            {new Intl.NumberFormat('vi-VN', {
              style: 'currency',
              currency: 'VND',
            }).format(order.totalMoney)}
          </span>
        </div>
      </CardFooter>
    </Card>
  )
}

interface OrderListProps {
  orders?: Order[]
}

function OrderList({ orders }: OrderListProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="mb-6 flex items-center text-3xl font-bold">
        <ShoppingBag className="mr-2 h-8 w-8" /> Danh sách đơn hàng
      </h2>
      <div className="space-y-8">
        {orders?.map((order) => <OrderItem key={order.id} order={order} />)}
      </div>
    </div>
  )
}

export { OrderItem, OrderList }