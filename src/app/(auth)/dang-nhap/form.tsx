'use client'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { loginSchema } from '@/schemas/authSchema'
import { useToast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'
import useUser from '@/hooks/use-user'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

export default function FormLogin() {
  const { loadUserFromLocalStorage, setUser } = useUser() // Sử dụng loadUserFromLocalStorage
  const { toast } = useToast()
  const router = useRouter()

  // Khởi tạo useForm với schema Zod
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    try {
      console.log(values)
      // Gửi yêu cầu đăng nhập tới endpoint `/api/login`
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })

      const data = await response.json()
      if (!response.ok) {
        toast({
          description: `Đăng nhập thất bại: ${data.message}`,
          variant: 'error',
        })
        return
      }

      localStorage.setItem('user', JSON.stringify(data.user))
      setUser(data.user, data.token)

      toast({
        description: 'Đăng nhập thành công',
      })

      loadUserFromLocalStorage()

      router.push('/')
    } catch (error) {
      console.error('Lỗi:', error)
      toast({
        description: 'Có lỗi xảy ra khi đăng nhập',
        variant: 'error',
      })
    }
  }

  return (
    <div className="mx-auto w-[500px]">
      <h1 className="mb-4 text-center text-2xl font-semibold">Đăng nhập</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Email" {...field} />
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
                  <Input placeholder="Mật khẩu" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-end gap-3">
            <Button
              type="button"
              className="bg-red-600"
              onClick={() => router.push('/quen-mat-khau')}
            >
              Quên mật khẩu
            </Button>
            <Button
              type="button"
              className="bg-green-600"
              onClick={() => router.push('/dang-ky')}
            >
              Đăng ký
            </Button>
            <Button type="submit" className="bg-blue-600">
              Đăng nhập
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
