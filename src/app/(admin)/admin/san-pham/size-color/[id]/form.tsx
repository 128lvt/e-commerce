'use client'

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
import { API_URL } from '@/configs/apiConfig'
import useProduct from '@/hooks/use-product'
import useVariant from '@/hooks/use-product-variant'
import { useToast } from '@/hooks/use-toast'
import useUser from '@/hooks/use-user'
import { variantSchema } from '@/schemas/variantSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { ProductVariant } from 'types/Type'
import { z } from 'zod'

interface IProps {
  productId: number
  variantId?: number
  variant?: ProductVariant
  onClose: () => void
}

// Define the form values type that includes variantId
type FormValues = z.infer<typeof variantSchema> & { v_id?: number }

export function VariantForm({
  onClose = () => {},
  productId,
  variantId,
  variant,
}: IProps) {
  const token = useUser((state) => state.getToken())
  const { mutate } = useVariant(productId)
  const { reloadProduct } = useProduct()
  const { toast } = useToast()

  // Initialize the form with default values, including the variantId if provided
  const form = useForm<FormValues>({
    resolver: zodResolver(variantSchema),
    defaultValues: {
      product_id: productId,
      color: variant?.color || '',
      size: variant?.size || '',
      stock: variant?.stock || 0,
      v_id: variantId,
    },
  })

  // Define the submit handler which will send POST or PUT request based on variantId presence
  async function onSubmit(values: FormValues) {
    const url =
      variantId != undefined
        ? `${API_URL}/products/variant/${variantId}` // PUT if variantId exists
        : `${API_URL}/products/variant` // POST if variantId is null

    const method = variantId != undefined ? 'PUT' : 'POST' // PUT for update, POST for create

    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(values),
    })

    const res = await response.json()

    if (!response.ok) {
      if (response.status === 403) {
        toast({
          title: 'Thất bại!',
          description: `Không có quyền thực hiện thao tác`,
          variant: 'error',
        })
      } else {
        toast({
          title: 'Lỗi!',
          description: `Đã xảy ra sự cố khi gửi yêu cầu. [${res.data}]`,
          variant: 'error',
        })
      }
    } else {
      onClose()
      mutate()
      reloadProduct()
      toast({
        title:
          variantId != undefined
            ? 'Cập nhật thành công!'
            : 'Thêm mới thành công!',
        description:
          variantId != undefined
            ? 'Cập nhật thông tin variant thành công'
            : 'Variant mới đã được thêm thành công',
      })
    }
  }

  // Handle delete action
  async function handleDelete() {
    if (!variantId) return

    const response = await fetch(`${API_URL}/products/variant/${variantId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      toast({
        title: 'Lỗi!',
        description: 'Đã xảy ra sự cố khi xóa variant.',
        variant: 'error',
      })
    } else {
      onClose()
      mutate()
      toast({
        title: 'Xóa thành công!',
        description: 'Variant đã được xóa.',
      })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="color"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Color</FormLabel>
              <FormControl>
                <Input placeholder="Color" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="size"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Size</FormLabel>
              <FormControl>
                <Input placeholder="Size" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="stock"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Stock</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Stock" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="me-2" type="submit">
          {variantId ? 'Cập nhật' : 'Thêm mới'}
        </Button>

        {/* Conditionally render delete button if variantId exists */}
        {variantId && (
          <Button
            type="button"
            onClick={handleDelete}
            className="mt-4"
            variant="destructive"
          >
            Xóa Variant
          </Button>
        )}
      </form>
    </Form>
  )
}
