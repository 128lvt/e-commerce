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
import { API_URL } from '../../../configs/apiConfig'
import { OrderSchema, OrderDetailSchema } from '../../../schemas/paymentSchema'
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
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function FormCashout() {
  const { user, loadUserFromCookies, token } = useUser()
  const { cart, loadCartFromLocalStorage, clearCart } = useCart()
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()
  const { mutate } = useOrder(user?.id ?? 0, token ?? '')
  const { reloadProduct } = useProduct()

  useEffect(() => {
    loadCartFromLocalStorage()
    loadUserFromCookies()
  }, [loadCartFromLocalStorage, loadUserFromCookies])

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

  const createMomoPayment = async (values: z.infer<typeof OrderSchema>) => {
    try {
      const response = await fetch(`${API_URL}/payments/momo`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(values),
      })

      if (!response.ok) {
        const errorData = await response.json()
        console.log(errorData)
        throw new Error('Không thể tạo thanh toán MoMo.')
      }

      const data = await response.json()
      return {
        payUrl: data.data.payment.payUrl,
        orderId: data.data.order.id,
      }
    } catch (error) {
      console.error('Lỗi khi tạo thanh toán MoMo:', error)
      return null
    }
  }

  const onSubmit = async (values: z.infer<typeof OrderSchema>) => {
    if (isLoading) return
    setIsLoading(true)
    toast({
      description: 'Đang xử lý đơn hàng...',
    })

    try {
      let orderId: number | undefined

      if (values.payment_method === 'cod') {
        orderId = await createOrder(values)

        if (orderId) {
          const orderDetails = cart.map((item) => ({
            order_id: orderId!,
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
        }
      }

      if (values.payment_method === 'momo') {
        const response = await createMomoPayment(values)

        orderId = response?.orderId

        if (orderId) {
          const orderDetails = cart.map((item) => ({
            order_id: orderId!,
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

          if (response?.payUrl) {
            console.log(response)
            window.open(response.payUrl, '_blank')
          }
        }
      }
      // Luồng COD (Thanh toán khi nhận hàng)
      clearCart()
      loadCartFromLocalStorage()
      reloadProduct()
      mutate()
      toast({
        title: 'Thành công!',
        description: `Đơn hàng đã được tạo. [${orderId}]`,
      })
      router.push(`/don-hang/${orderId}`)
    } catch (error) {
      toast({
        title: 'Thất bại!',
        description: `Có lỗi xảy ra khi xử lý đơn hàng. [${error instanceof Error ? error.message : String(error)}]`,
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
              {/* Cart Summary */}

              {/* Existing form fields */}
              <FormField
                control={form.control}
                name="fullname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Họ và Tên</FormLabel>
                    <FormControl>
                      <Input placeholder="Nhập họ và tên" {...field} readOnly />
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
              <FormField
                control={form.control}
                name="payment_method"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phương thức thanh toán</FormLabel>
                    <FormControl>
                      <select {...field} className="w-full rounded border p-2">
                        <option value="cod">
                          Thanh toán khi nhận hàng (COD)
                        </option>
                        <option value="momo">Thanh toán qua MoMo</option>
                      </select>
                    </FormControl>
                    <FormDescription>
                      Chọn phương thức thanh toán của bạn.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </FormProvider>
          <ScrollArea className="h-[300px] pr-4">
            <div className="mb-6">
              <h3 className="mb-2 text-lg font-semibold">Giỏ hàng của bạn</h3>
              {cart.map((item) => (
                <div key={item.id} className="mb-2 flex items-center">
                  <Image
                    src={`${API_URL}/products/images/${item.imageUrl}`}
                    alt={item.name}
                    width={50}
                    height={50}
                    className="mr-2 rounded-md object-cover"
                  />
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {item.size} - {item.color} x {item.quantity}
                    </p>
                  </div>
                  <p className="ml-auto">
                    {new Intl.NumberFormat('vi-VN', {
                      style: 'currency',
                      currency: 'VND',
                    }).format(item.price * item.quantity)}
                  </p>
                </div>
              ))}
              <Separator className="my-2" />
              <div className="flex justify-between">
                <p className="font-semibold">Tổng cộng:</p>
                <p className="font-semibold">
                  {new Intl.NumberFormat('vi-VN', {
                    style: 'currency',
                    currency: 'VND',
                  }).format(totalMoney)}
                </p>
              </div>
            </div>
          </ScrollArea>
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
