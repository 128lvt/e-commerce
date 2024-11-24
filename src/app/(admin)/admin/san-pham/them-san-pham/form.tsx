'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { productSchema } from '@/schemas/productSchema'
import useCategory from '@/hooks/use-category'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { z } from 'zod'
import { API_URL } from '@/configs/apiConfig'
import { useToast } from '@/hooks/use-toast'
import useProduct from '@/hooks/use-product'
import useUser from '@/hooks/use-user'

export function ProductForm() {
  const { data, isLoading, error } = useCategory()
  const { toast } = useToast()
  const { reloadProduct } = useProduct()
  const token = useUser((state) => state.getToken())

  const form = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: '',
      price: 100000,
      description: '',
      category_id: -1,
    },
  })

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error loading categories</div>
  }

  if (!data) {
    return <div>No categories available</div>
  }

  const categories = data?.data

  const addProduct = async (values: z.infer<typeof productSchema>) => {
    const response = await fetch(`${API_URL}/products`, {
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
      return res.data.id
    }
  }

  const onSubmit = async (values: z.infer<typeof productSchema>) => {
    const productId = await addProduct(values)
    if (productId) {
      reloadProduct()
      toast({
        title: 'Thành công!',
        description: `Sản phẩm đã tạo. ID: ${productId}`,
      })
    } else {
      toast({
        title: 'Thất bại!',
        description: 'Có lỗi xảy ra khi tạo sản phẩm.',
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
              <FormLabel>Tên sản phẩm</FormLabel>
              <FormControl>
                <Input placeholder="Nhập tên sản phẩm" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Giá</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Nhập giá" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mô tả</FormLabel>
              <FormControl>
                <Input placeholder="Nhập mô tả" {...field} />
              </FormControl>
              <FormDescription>Mô tả chi tiết về sản phẩm.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="category_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Danh mục</FormLabel>
              <Select onValueChange={field.onChange}>
                <FormControl className="text-foreground">
                  <SelectTrigger>
                    <SelectValue
                      placeholder="Chọn danh mục"
                      className="text-foreground"
                    ></SelectValue>
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="text-foreground">
                  {categories.map((category) => (
                    <SelectItem
                      className="text-foreground"
                      key={category.id}
                      value={String(category.id)}
                    >
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Gửi</Button>
      </form>
    </Form>
  )
}
