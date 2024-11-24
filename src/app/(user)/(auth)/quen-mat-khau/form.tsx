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
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Mail, Key, Lock, RefreshCw, ArrowLeft } from 'lucide-react'

export default function EnhancedForgotPasswordForm() {
  const { toast } = useToast()
  const router = useRouter()
  const [isButtonDisabled, setIsButtonDisabled] = useState(false)

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
          variant: 'destructive',
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
        variant: 'destructive',
      })
    }
  }

  const handleGetToken = async (data: z.infer<typeof forgotPasswordSchema>) => {
    const email = data.email

    if (!email) {
      toast({
        title: 'Lỗi',
        description: 'Vui lòng nhập email trước khi lấy token.',
        variant: 'destructive',
      })
      setIsButtonDisabled(false)
      return
    }

    toast({
      title: 'Đang gửi token',
      description: 'Vui lòng đợi trong giây lát.',
    })

    setIsButtonDisabled(true)

    try {
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
          variant: 'destructive',
        })
      }
    } catch (error) {
      console.error('Error:', error)
      toast({
        title: 'Lỗi',
        description: 'Đã xảy ra lỗi trong quá trình gửi token.',
        variant: 'destructive',
      })
    } finally {
      setTimeout(() => {
        setIsButtonDisabled(false)
      }, 60000)
    }
  }

  return (
    <div className="flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">
            Quên mật khẩu
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <div className="flex space-x-2">
                      <FormControl className="flex-1">
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 transform text-muted-foreground" />
                          <Input
                            placeholder="Nhập email"
                            {...field}
                            className="pl-10"
                            onChange={(e) => field.onChange(e.target.value)}
                          />
                        </div>
                      </FormControl>
                      <Button
                        onClick={() => handleGetToken(form.getValues())}
                        disabled={isButtonDisabled}
                        type="button"
                        className="bg-yellow-400 text-black hover:bg-yellow-300"
                      >
                        {isButtonDisabled ? (
                          <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                          'Lấy token'
                        )}
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
                      <div className="relative">
                        <Key className="absolute left-3 top-1/2 -translate-y-1/2 transform text-muted-foreground" />
                        <Input
                          placeholder="Nhập token"
                          {...field}
                          className="pl-10"
                        />
                      </div>
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
                    <FormLabel>Mật khẩu mới</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 transform text-muted-foreground" />
                        <Input
                          type="password"
                          placeholder="Mật khẩu mới"
                          {...field}
                          className="pl-10"
                        />
                      </div>
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
                    <FormLabel>Nhập lại mật khẩu mới</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 transform text-muted-foreground" />
                        <Input
                          type="password"
                          placeholder="Nhập lại mật khẩu mới"
                          {...field}
                          className="pl-10"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </CardContent>
        <CardFooter>
          <Button
            type="submit"
            className="w-full"
            onClick={form.handleSubmit(onSubmit)}
          >
            Xác nhận
          </Button>
          <Button
            variant="link"
            className="text-sm text-muted-foreground"
            onClick={() => router.push('/dang-nhap')}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Quay lại trang đăng nhập
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
