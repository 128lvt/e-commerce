'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { z } from 'zod'
import { API_URL } from '@/configs/apiConfig'
import { useToast } from '@/hooks/use-toast'
import useUser from '@/hooks/use-user'
import { categorySchema } from '@/schemas/categorySchema'
import useCategory from '@/hooks/use-category'
import { Category } from 'types/Type'

export function CategoryForm() {
  const { toast } = useToast()
  const { mutate } = useCategory()
  const token = useUser((state) => state.getToken())

  const form = useForm<z.infer<typeof categorySchema>>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: '',
    },
  })

  const createCategory = async (values: z.infer<typeof categorySchema>) => {
    const response = await fetch(`${API_URL}/categories`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(values),
    })

    if (!response.ok) {
      if (response.status === 403) {
        toast({
          title: 'Thất bại!',
          description: 'Không có quyền thực hiện thao tác',
          variant: 'error',
        })
      }
    } else {
      const res = await response.json()
      console.log(res)
      return res.data.id
    }
  }

  const onSubmit = async (values: z.infer<typeof categorySchema>) => {
    console.log('test')
    const categoryId = await createCategory(values)
    if (categoryId) {
      toast({
        title: 'Thành công!',
        description: `Danh mục đã tạo. ID: ${categoryId}`,
      })
      mutate()
    } else {
      toast({
        title: 'Thất bại!',
        description: 'Có lỗi xảy ra khi tạo danh mục.',
        variant: 'error',
      })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tên danh mục</FormLabel>
              <FormControl>
                <Input placeholder="Nhập tên danh mục" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={form.formState.isSubmitting}
          className="me-2"
        >
          {form.formState.isSubmitting ? 'Đang cập nhật...' : 'Gửi'}
        </Button>
      </form>
    </Form>
  )
}
