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

interface IProps {
  category: Category
  onClose: () => void
}

export function CategoryForm({ onClose = () => {}, category }: IProps) {
  const { toast } = useToast()
  const { mutate } = useCategory()
  const token = useUser((state) => state.getToken())

  const form = useForm<z.infer<typeof categorySchema>>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: category?.name,
    },
  })

  const updateCategory = async (values: z.infer<typeof categorySchema>) => {
    const response = await fetch(`${API_URL}/categories/${category.id}`, {
      method: 'PUT',
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
      const res = await response.json()

      console.log(res)
    } else {
      const res = await response.json()
      return res.data.id
    }
  }

  const deleteCategory = async () => {
    try {
      const response = await fetch(`${API_URL}/categories/${category?.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Có lỗi xảy ra khi xóa danh mục.')
      }

      toast({
        title: 'Thành công!',
        description: `Danh mục đã bị xóa.`,
      })
      onClose()
      mutate()
    } catch (error) {
      console.error('Lỗi xóa danh mục:', error)
      toast({
        title: 'Thất bại!',
        description: 'Có lỗi xảy ra khi xóa danh mục.',
        variant: 'error',
      })
    }
  }

  const onSubmit = async (values: z.infer<typeof categorySchema>) => {
    console.log('test')
    const categoryId = await updateCategory(values)
    if (categoryId) {
      toast({
        title: 'Thành công!',
        description: `Danh mục đã được câp nhật. ID: ${categoryId}`,
      })
      mutate()
      onClose()
    } else {
      toast({
        title: 'Thất bại!',
        description: 'Có lỗi xảy ra khi cập nhật danh mục.',
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
        <Button
          type="button"
          onClick={deleteCategory}
          variant="destructive"
          disabled={form.formState.isSubmitting}
        >
          Xóa danh mục
        </Button>
      </form>
    </Form>
  )
}
