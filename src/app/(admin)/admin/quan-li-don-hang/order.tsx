'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { Order } from 'types/Type'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Truck,
  Save,
  Ruler,
  Palette,
  Package,
  User,
  Phone,
  Mail,
  MapPin,
  Calendar,
  CreditCard,
  DollarSign,
  Clipboard,
} from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import { ScrollArea } from '@/components/ui/scroll-area'
import useUser from '@/hooks/use-user'
import { useToast } from '@/hooks/use-toast'
import { API_URL } from '@/configs/apiConfig'
import useAdminOrder from '@/hooks/use-admin-order'
import Image from 'next/image'

interface OrderItemProps {
  order: Order
}

export function OrderItem({ order }: OrderItemProps) {
  const [editMode, setEditMode] = useState(false)
  const [newStatus, setNewStatus] = useState(order.status)
  const token = useUser((state) => state.getToken())
  const { toast } = useToast()
  const { mutate } = useAdminOrder(token ?? '')

  useEffect(() => {
    setNewStatus(order.status)
  }, [order.status])

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

  const updateStatus = async (orderId: number, newStatus: string) => {
    try {
      const response = await fetch(
        `${API_URL}/orders/status/${orderId}?status=${newStatus}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      )

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`)
      }

      const data = await response.json()
      console.log('Cập nhật trạng thái thành công:', data)
      toast({
        title: 'Thành công!',
        description: 'Cập nhật trạng thái thành công',
      })
      mutate()
      setEditMode(false)
    } catch (error) {
      toast({
        title: 'Thất bại!',
        description: 'Có lỗi xảy ra khi cập nhật trạng thái',
        variant: 'error',
      })
      console.error('Lỗi khi cập nhật trạng thái:', error)
    }
  }

  const handleSave = () => {
    if (newStatus !== order.status) {
      console.log(newStatus)
      updateStatus(order.id, newStatus)
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="text-2xl font-bold">Đơn hàng #{order.id}</span>
          {editMode ? (
            <div className="flex items-center space-x-2">
              <Select value={newStatus} onValueChange={setNewStatus}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Chọn trạng thái" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Chờ xác nhận">Chờ xác nhận</SelectItem>
                  <SelectItem value="Đang xử lý">Đang xử lý</SelectItem>
                  <SelectItem value="Đang giao hàng">Đang giao hàng</SelectItem>
                  <SelectItem value="Đã giao hàng">Đã giao hàng</SelectItem>
                  <SelectItem value="Đã hủy">Đã hủy</SelectItem>
                </SelectContent>
              </Select>
              <Button onClick={handleSave} className="flex items-center">
                <Save className="mr-2 h-4 w-4" />
                Lưu
              </Button>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Badge
                className={`${getStatusColor(order.status)} cursor-default text-white`}
              >
                {order.status.toUpperCase()}
              </Badge>
              <Button onClick={() => setEditMode(true)}>Sửa trạng thái</Button>
            </div>
          )}
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
          <ScrollArea className="h-[300px]">
            <div className="space-y-4">
              {order.orderDetails?.map((orderDetail) => (
                <Card key={orderDetail.id} className="p-4">
                  <div className="flex items-start space-x-4">
                    <Image
                      src={`${API_URL}/products/images/${orderDetail.product.images[0].imageUrl}`}
                      alt={''}
                      width={80}
                      height={80}
                      className="rounded-md object-cover"
                    />
                    <div className="flex-grow">
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
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </div>
      </CardContent>
      <CardFooter className="bg-muted/50">
        <div className="flex w-full items-center justify-between">
          <span className="flex items-center text-muted-foreground">
            <Truck className="mr-2 h-4 w-4" />
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
