'use client'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { forgotPasswordSchema } from '@/schemas/authSchema'
import { useToast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { API_URL } from '@/configs/apiConfig'
import { useState } from 'react'

export default function ForgotPasswordForm() {
  const { toast } = useToast()
  const router = useRouter()
  const [isButtonDisabled, setIsButtonDisabled] = useState(false)

  // Khởi tạo useForm với schema Zod
  const form = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      token: '',
      email: '',
      password: '',
      retypePassword: '',
    },
  })

  const onSubmit = async (values: z.infer<typeof forgotPasswordSchema>) => {
    try {
      const response = await fetch(`${API_URL}/users/forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })

      const data = await response.json()
      if (!response.ok) {
        toast({
          description: `Đổi mật khẩu thất bại: ${data}.`,
          variant: 'error',
        })
        return
      }

      toast({
        description: 'Đổi mật khẩu thành công.',
      })

      router.push('/')
    } catch (error) {
      console.error('Lỗi:', error)
      toast({
        description: 'Có lỗi xảy ra khi đổi mật khẩu.',
        variant: 'error',
      })
    }
  }

  const handleGetToken = async (data: z.infer<typeof forgotPasswordSchema>) => {
    const email = data.email // Lấy email đã được validate từ form

    console.log('Email:', email)

    // Hiển thị toast "Đang gửi token"
    toast({
      title: 'Đang gửi token',
      description: 'Vui lòng đợi trong giây lát.',
      variant: 'loading',
    })

    setIsButtonDisabled(true)

    try {
      // Gửi yêu cầu API để lấy token
      const response = await fetch(
        `${API_URL}/users/token?email=${encodeURIComponent(email)}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )

      const dataResponse = await response.json()

      if (response.ok) {
        toast({
          title: 'Thành công',
          description: 'Token đã được gửi đến Email của bạn.',
        })
      } else {
        toast({
          title: 'Thất bại',
          description: dataResponse.data,
          variant: 'error',
        })
      }
    } catch (error) {
      console.error('Error:', error)
      toast({
        title: 'Lỗi',
        description: 'Đã xảy ra lỗi trong quá trình gửi token.',
        variant: 'error',
      })
    } finally {
      // Sau 60 giây, kích hoạt lại nút
      setTimeout(() => {
        setIsButtonDisabled(false)
      }, 60000) // 60000ms = 60s
    }
  }

  return (
    <div className="mx-auto w-[500px]">
      <h1 className="mb-4 text-center text-2xl font-semibold">Quên mật khẩu</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <div className="flex space-x-4">
                  <FormControl className="flex-1">
                    <Input
                      placeholder="Nhập email"
                      {...field}
                      onChange={(e) => field.onChange(e.target.value)}
                    />
                  </FormControl>
                  <Button
                    onClick={form.handleSubmit(handleGetToken)}
                    disabled={isButtonDisabled}
                    type="button"
                    className="ml-2 bg-yellow-400 text-black hover:bg-yellow-300"
                  >
                    Lấy token
                  </Button>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="token"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Token</FormLabel>
                <FormControl>
                  <Input placeholder="Nhập token" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mật khẩu</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Mật khẩu" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="retypePassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nhập lại mật khẩu</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Nhập lại mật khẩu"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-end">
            <Button type="submit" className="bg-blue-600">
              Xác nhận
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
