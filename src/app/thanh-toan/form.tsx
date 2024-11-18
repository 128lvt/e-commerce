'use client'

import { useEffect, useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useCart } from '@/hooks/use-cart'
import useUser from '@/hooks/use-user'
import useOrder from '@/hooks/use-order'
import useProduct from '@/hooks/use-product'
import { useToast } from '@/hooks/use-toast'
import { API_URL } from '../../configs/apiConfig'
import { OrderSchema, OrderDetailSchema } from '../../schemas/paymentSchema'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { ScrollArea } from '@/components/ui/scroll-area'
import { ShoppingCart, CreditCard, Loader2 } from 'lucide-react'

export default function FormCashout() {
  const { user, loadUserFromLocalStorage, token } = useUser()
  const { cart, loadCartFromLocalStorage, clearCart } = useCart()
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const { mutate } = useOrder(user?.id ?? 0, token ?? '')
  const { reloadProduct } = useProduct()

  useEffect(() => {
    loadCartFromLocalStorage()
    loadUserFromLocalStorage()
  }, [loadCartFromLocalStorage, loadUserFromLocalStorage])

  const totalMoney = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  )

  const form = useForm<z.infer<typeof OrderSchema>>({
    resolver: zodResolver(OrderSchema),
    defaultValues: {
      user_id: user?.id,
      fullname: user?.fullName || '',
      email: '',
      phone_number: '',
      address: '',
      note: '',
      total_money: totalMoney,
      shipping_method: 'standard',
      payment_method: 'cod',
    },
  })

  useEffect(() => {
    form.reset({
      user_id: user?.id,
      fullname: user?.fullName || '',
      email: '',
      phone_number: '',
      address: '',
      note: '',
      total_money: totalMoney,
      shipping_method: 'standard',
      payment_method: 'cod',
    })
  }, [user, totalMoney, form])

  const createOrder = async (values: z.infer<typeof OrderSchema>) => {
    try {
      const response = await fetch(`${API_URL}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(values),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Có lỗi xảy ra khi tạo đơn hàng.')
      }

      const res = await response.json()
      return res.data.id
    } catch (error) {
      console.error('Lỗi khi tạo đơn hàng:', error)
    }
  }

  const createOrderDetail = async (
    orderId: number,
    orderDetail: z.infer<typeof OrderDetailSchema>,
  ) => {
    const validatedOrderDetail = OrderDetailSchema.parse({
      ...orderDetail,
      order_id: orderId,
    })

    const response = await fetch(`${API_URL}/order_details`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(validatedOrderDetail),
    })

    const res = await response.json()

    if (!response.ok) {
      return null
    }

    return res.data
  }

  const onSubmit = async (values: z.infer<typeof OrderSchema>) => {
    if (isLoading) return
    setIsLoading(true)
    toast({
      description: 'Đang gửi đơn hàng...',
    })

    try {
      const orderId = await createOrder(values)
      if (orderId) {
        const orderDetails = cart.map((item) => ({
          order_id: orderId,
          product_id: item.productId,
          number_of_products: item.quantity,
          variant_id: item.variantId,
        }))

        for (const orderDetail of orderDetails) {
          const orderDetailResponse = await createOrderDetail(
            orderId,
            orderDetail,
          )
          if (orderDetailResponse === null) {
            throw new Error('Số lượng sản phẩm vượt quá số lượng trong kho.')
          }
        }

        clearCart()
        loadCartFromLocalStorage()
        reloadProduct()
        mutate()
        toast({
          title: 'Thành công!',
          description: `Thanh toán thành công. [${orderId}]`,
        })
      }
    } catch (error) {
      toast({
        title: 'Thất bại!',
        description: `Có lỗi xảy ra khi thanh toán. [${error instanceof Error ? error.message : String(error)}]`,
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="mx-auto w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="flex items-center text-2xl font-bold">
            <ShoppingCart className="mr-2" />
            Thanh toán
          </CardTitle>
        </CardHeader>
        <CardContent>
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <ScrollArea className="h-[400px] pr-4">
                <FormField
                  control={form.control}
                  name="fullname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Họ và Tên</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Nhập họ và tên"
                          {...field}
                          readOnly
                        />
                      </FormControl>
                      <FormDescription>
                        Đây là tên hiển thị công khai của bạn.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Nhập email" {...field} />
                      </FormControl>
                      <FormDescription>
                        Nhập địa chỉ email của bạn.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone_number"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Số Điện Thoại</FormLabel>
                      <FormControl>
                        <Input placeholder="Nhập số điện thoại" {...field} />
                      </FormControl>
                      <FormDescription>
                        Nhập số điện thoại của bạn.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Địa Chỉ</FormLabel>
                      <FormControl>
                        <Input placeholder="Nhập địa chỉ" {...field} />
                      </FormControl>
                      <FormDescription>
                        Nhập địa chỉ giao hàng của bạn.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="note"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ghi Chú</FormLabel>
                      <FormControl>
                        <Input placeholder="Nhập ghi chú (nếu có)" {...field} />
                      </FormControl>
                      <FormDescription>
                        Bất kỳ ghi chú nào bạn muốn thêm.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </ScrollArea>
            </form>
          </FormProvider>
        </CardContent>
        <Separator className="my-4" />
        <CardFooter className="flex flex-col items-center justify-between sm:flex-row">
          <div className="mb-4 sm:mb-0">
            <p className="text-lg font-semibold">
              Tổng tiền:{' '}
              {new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND',
              }).format(totalMoney)}
            </p>
          </div>
          <Button
            onClick={form.handleSubmit(onSubmit)}
            disabled={isLoading}
            className="w-full bg-primary hover:bg-primary/90 sm:w-auto"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Đang xử lý...
              </>
            ) : (
              <>
                <CreditCard className="mr-2 h-4 w-4" />
                Thanh toán
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
