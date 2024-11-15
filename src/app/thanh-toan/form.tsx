'use client'
import { useCart } from '@/hooks/use-cart'
import useUser from '@/hooks/use-user'
import { useForm, FormProvider } from 'react-hook-form'
import { z } from 'zod'
import { OrderDetailSchema, OrderSchema } from '../../schemas/paymentSchema'
import { zodResolver } from '@hookform/resolvers/zod'
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
import { useEffect, useState } from 'react'
import { useToast } from '@/hooks/use-toast'
import { API_URL } from '../../configs/apiConfig'
import useOrder from '@/hooks/use-order'
import useProduct from '@/hooks/use-product'

export default function FormCashout() {
  const { user, loadUserFromLocalStorage, token } = useUser()
  const { cart, loadCartFromLocalStorage, clearCart } = useCart()
  const [isLoading] = useState(false)
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

    console.log(validatedOrderDetail)

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

    // console.log(res)

    return res.data
  }

  const onSubmit = async (values: z.infer<typeof OrderSchema>) => {
    if (isLoading) return
    toast({
      description: `Đang gửi đơn hàng...`,
      variant: 'loading',
    })

    const orderId = await createOrder(values) // Tạo đơn hàng và lấy ID
    if (orderId) {
      const orderDetails = cart.map((item) => ({
        order_id: orderId,
        product_id: item.productId,
        number_of_products: item.quantity,
        variant_id: item.variantId,
      }))

      try {
        for (const orderDetail of orderDetails) {
          const orderDetailResponse = await createOrderDetail(
            orderId,
            orderDetail,
          )

          console.log(`ssssssssssss`, orderDetailResponse)

          if (orderDetailResponse === null) {
            throw 'Số lượng sản phẩm vượt quá số lượng trong kho.'
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
      } catch (error) {
        console.log(error)
        toast({
          title: 'Thất bại!',
          description: `Có lỗi xảy ra khi thanh toán. [${error}]`,
          variant: 'error',
        })
      }
    }
  }

  return (
    <div className="flex justify-center">
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-[50rem] space-y-8 rounded-md border border-gray-400 p-5"
        >
          {/* Trường Họ và Tên */}
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
          {/* Trường Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Nhập email" {...field} />
                </FormControl>
                <FormDescription>Nhập địa chỉ email của bạn.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Trường Số Điện Thoại */}
          <FormField
            control={form.control}
            name="phone_number"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Số Điện Thoại</FormLabel>
                <FormControl>
                  <Input placeholder="Nhập số điện thoại" {...field} />
                </FormControl>
                <FormDescription>Nhập số điện thoại của bạn.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Trường Địa Chỉ */}
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
          {/* Trường Ghi Chú */}
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
          <div>
            Tổng tiền: {new Intl.NumberFormat('vi-VN').format(totalMoney)} VNĐ
          </div>
          <div className="flex justify-end">
            <Button disabled={isLoading} type="submit" className="bg-green-600">
              Thanh toán
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  )
}
