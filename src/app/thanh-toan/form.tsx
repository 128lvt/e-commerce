'use client'
import { useCart } from '@/hooks/useCart'
import useUser from '@/hooks/useUser'
import { useForm, FormProvider } from 'react-hook-form'
import { z } from 'zod'
import { OrderDetailSchema, OrderSchema } from '../schemas/paymentSchema'
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
import { API_URL } from '../configs/apiConfig'
import Cookies from 'js-cookie'

export default function FormCashout() {
  const { user, loadUserFromLocalStorage } = useUser()
  const { cart, loadCartFromLocalStorage } = useCart()
  const [token, setToken] = useState('')
  const { toast } = useToast()

  useEffect(() => {
    const tokenFromCookie = Cookies.get('token')
    if (tokenFromCookie) {
      setToken(tokenFromCookie)
    } else {
      console.log('Token not found in cookies')
    }
  }, [])

  useEffect(() => {
    loadCartFromLocalStorage()
    loadUserFromLocalStorage()
  }, [loadCartFromLocalStorage, loadUserFromLocalStorage])

  const totalMoney = cart.reduce((total, item) => total + item.price, 0)

  const form = useForm<z.infer<typeof OrderSchema>>({
    resolver: zodResolver(OrderSchema),
    defaultValues: {
      user_id: user?.id,
      fullname: user?.name || '',
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
      fullname: user?.name || '',
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
    console.log(token)
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
    orderDetail: z.infer<typeof OrderDetailSchema>, // Chỉ cần một đối tượng duy nhất
  ) => {
    try {
      // Validate và thêm order_id vào chi tiết đơn hàng
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
        body: JSON.stringify(validatedOrderDetail), // Gửi đối tượng chi tiết đơn hàng
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(
          errorData.message || 'Có lỗi xảy ra khi tạo chi tiết đơn hàng.',
        )
      }

      return await response.json() // Trả về kết quả từ API
    } catch (error) {
      console.error('Lỗi khi tạo chi tiết đơn hàng:', error)
    }
  }

  const onSubmit = async (values: z.infer<typeof OrderSchema>) => {
    toast({
      description: `Đang gửi đơn hàng...`,
      variant: 'loading',
    })

    const orderId = await createOrder(values) // Tạo đơn hàng và lấy ID
    if (orderId) {
      // Chuyển đổi giỏ hàng thành chi tiết đơn hàng và gửi từng sản phẩm
      const orderDetails = cart.map((item) => ({
        order_id: orderId,
        product_id: item.productId,
        number_of_products: 1, // Có thể thay đổi số lượng theo nhu cầu
        variant_id: item.variantId,
      }))

      for (const orderDetail of orderDetails) {
        const orderDetailResponse = await createOrderDetail(
          orderId,
          orderDetail,
        )

        if (!orderDetailResponse) {
          toast({
            description: `Có lỗi xảy ra khi tạo chi tiết đơn hàng cho sản phẩm ID: ${orderDetail.product_id}.`,
            variant: 'error',
          })
        }
      }

      toast({
        description: `Đơn hàng đã được tạo thành công với ID: ${orderId}`,
      })
    } else {
      toast({
        description: `Có lỗi xảy ra khi tạo đơn hàng.`,
        variant: 'error',
      })
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
            <Button type="submit" className="bg-green-600">
              Thanh toán
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  )
}
