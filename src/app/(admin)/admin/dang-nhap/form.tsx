'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from '@/hooks/use-toast'
import useUser from '@/hooks/use-user'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { LogIn, KeyRound, Mail } from 'lucide-react'
import { loginSchema } from '@/schemas/loginSchema'

export default function EnhancedFormLogin() {
  const { loadUserFromCookies, setUser } = useUser()
  const { toast } = useToast()

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    try {
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
          variant: 'destructive',
        })
        return
      }

      localStorage.setItem('user', JSON.stringify(data.user))
      setUser(data.user, data.token)

      toast({
        description: 'Đăng nhập thành công',
      })

      loadUserFromCookies()

      // Set a timeout to reload and redirect after 3 seconds
      setTimeout(() => {
        window.location.href = '/admin'
      }, 3000)
    } catch (error) {
      console.error('Lỗi:', error)
      toast({
        description: 'Có lỗi xảy ra khi đăng nhập',
        variant: 'destructive',
      })
    }
  }

  return (
    <Card className="mx-auto mt-16 w-[600px]">
      <CardHeader>
        <CardTitle className="text-center text-2xl font-semibold">
          Đăng nhập
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
                  <FormControl>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 transform text-muted-foreground" />
                      <Input placeholder="Email" {...field} className="pl-10" />
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
                  <FormLabel>Mật khẩu</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 transform text-muted-foreground" />
                      <Input
                        type="password"
                        placeholder="Mật khẩu"
                        {...field}
                        className="pl-10"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full bg-primary transition-colors hover:bg-primary/90"
            >
              <LogIn className="mr-2 h-4 w-4" /> Đăng nhập
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
