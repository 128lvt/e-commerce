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
import { Product } from 'types/Type'
import useProduct from '@/hooks/use-product'

interface IProps {
  product: Product
  onClose: () => void
}

export function ProductForm({ onClose = () => {}, product }: IProps) {
  const { data, isLoading, error } = useCategory()
  const { reloadProduct } = useProduct()
  const { toast } = useToast()
  const token = localStorage.getItem('token')

  const form = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: product?.name,
      price: product?.price,
      description: product?.description,
      category_id: product?.category.id,
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

  const updateProduct = async (values: z.infer<typeof productSchema>) => {
    try {
      const response = await fetch(`${API_URL}/products/${product?.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(values),
      })
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(
          errorData.message || 'Có lỗi xảy ra khi cập nhật sản phẩm.',
        )
      }
      const res = await response.json()
      return res.data.id
    } catch (error) {
      console.error('Lỗi cập nhật sản phẩm:', error)
    }
  }

  const deleteProduct = async () => {
    try {
      const response = await fetch(`${API_URL}/products/${product?.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Có lỗi xảy ra khi xóa sản phẩm.')
      }

      toast({
        title: 'Thành công!',
        description: `Sản phẩm đã bị xóa.`,
      })
      onClose()
      reloadProduct()
    } catch (error) {
      console.error('Lỗi xóa sản phẩm:', error)
      toast({
        title: 'Thất bại!',
        description: 'Có lỗi xảy ra khi xóa sản phẩm.',
        variant: 'error',
      })
    }
  }

  const onSubmit = async (values: z.infer<typeof productSchema>) => {
    const productId = await updateProduct(values)
    if (productId) {
      onClose()
      reloadProduct()
      toast({
        title: 'Thành công!',
        description: `Cập nhật sản phẩm. ID: ${productId}`,
      })
    } else {
      toast({
        title: 'Thất bại!',
        description: 'Có lỗi xảy ra khi cập nhật sản phẩm.',
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
                <Input
                  placeholder="Nhập tên sản phẩm"
                  className="text-foreground"
                  {...field}
                />
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
                <Input
                  type="number"
                  className="text-foreground"
                  placeholder="Nhập giá"
                  {...field}
                />
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
                <Input
                  className="text-foreground"
                  placeholder="Nhập mô tả"
                  {...field}
                />
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
              <Select
                value={field.value.toString()}
                onValueChange={(value) => field.onChange(value)}
              >
                <FormControl className="text-foreground">
                  <SelectTrigger>
                    <SelectValue
                      placeholder="Chọn danh mục"
                      className="text-foreground"
                    >
                      {field.value
                        ? categories.find(
                            (cat) =>
                              cat.id.toString() === field.value.toString(),
                          )?.name
                        : 'Chọn danh mục'}
                    </SelectValue>
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="text-foreground">
                  {categories.map((category) => (
                    <SelectItem
                      className="text-foreground"
                      key={category.id}
                      value={category.id.toString()}
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

        <Button
          type="submit"
          disabled={form.formState.isSubmitting}
          className="me-2"
        >
          {form.formState.isSubmitting ? 'Đang cập nhật...' : 'Gửi'}
        </Button>
        <Button onClick={deleteProduct} variant="destructive">
          Xóa sản phẩm
        </Button>
      </form>
    </Form>
  )
}
