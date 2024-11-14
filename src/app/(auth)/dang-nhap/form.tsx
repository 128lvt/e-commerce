'use client'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { loginSchema } from '@/schemas/loginSchema'
import { useToast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'
import useUser from '@/hooks/use-user'

export default function FormLogin() {
  const { loadUserFromLocalStorage, setUser } = useUser() // Sử dụng loadUserFromLocalStorage
  const { toast } = useToast()
  const router = useRouter()

  // Khởi tạo useForm với schema Zod
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      phone_number: '',
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
    <div className="flex justify-center">
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-[50rem] space-y-4"
      >
        <div>
          <label htmlFor="phone_number">Số điện thoại</label>
          <Input id="phone_number" {...form.register('phone_number')} />
          {form.formState.errors.phone_number && (
            <p>{form.formState.errors.phone_number.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="password">Mật khẩu</label>
          <Input type="password" id="password" {...form.register('password')} />
          {form.formState.errors.password && (
            <p>{form.formState.errors.password.message}</p>
          )}
        </div>
        <div className="flex justify-end space-x-4">
          <Button className="w-60 items-center bg-green-600">Đăng ký</Button>
          <Button type="submit" className="w-60 items-center bg-blue-600">
            Đăng nhập
          </Button>
        </div>
      </form>
    </div>
  )
}
