import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import Image from 'next/image'
import { CiShoppingCart } from 'react-icons/ci'
import ProductVariant from './ProductVariant'
import { useEffect, useState } from 'react'
import { useToast } from '@/hooks/use-toast'
import { Product } from '../../types/Type'
import { API_URL } from '@/app/configs/apiConfig'
import { useCartStore } from '@/hooks/useCartStore'
import { v4 as uuidv4 } from 'uuid'

export function AddToCartDialog(product: Product) {
  const imageUrl =
    product.images && product.images.length > 0
      ? `${API_URL}/products/images/${product.images[0].imageUrl}`
      : '/default-image.jpg'

  const [selectedSize, setSelectedSize] = useState<string>('')
  const [selectedColor, setSelectedColor] = useState<string>('')

  const { toast } = useToast()
  const { addToCart, loadCartFromLocalStorage } = useCartStore()

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      toast({
        description: 'Vui lòng chọn kích thước và màu sắc!',
        variant: 'error',
      })
      return
    }

    const getVariantInfo = (size: string, color: string) => {
      const variant = product.variants.find(
        (v) => v.size === size && v.color === color,
      )
      return variant ? variant.id : null // Trả về variantId hoặc null
    }

    const variantId = getVariantInfo(selectedSize, selectedColor)
    const productToAdd = {
      id: uuidv4(),
      productId: product.id,
      name: product.name,
      price: product.price,
      size: selectedSize,
      color: selectedColor,
      variantId: variantId,
      imageUrl: product.images[0].imageUrl,
    }

    addToCart(productToAdd)

    // Log thông tin sản phẩm ra console
    console.log('Sản phẩm được thêm vào giỏ hàng:', productToAdd)
    toast({
      description: `Đã thêm ${productToAdd.name} vào giỏ hàng.`,
    })
  }

  useEffect(() => {
    loadCartFromLocalStorage()
  }, [loadCartFromLocalStorage]) // Đảm bảo loadCartFromLocalStorage chỉ được gọi khi component mount

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="transition-transform duration-300 hover:scale-110">
          <CiShoppingCart className="h-4 w-4 stroke-1" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            <p>{product.name}</p>
          </DialogTitle>
          <DialogDescription>Mô tả sản phẩm</DialogDescription>
        </DialogHeader>
        <Image
          src={imageUrl}
          width={400}
          height={400}
          alt="Product"
          className="h-64 w-full object-cover"
        />
        <ProductVariant
          variants={product.variants}
          onSizeChange={setSelectedSize} // Gọi hàm để cập nhật kích thước
          onColorChange={setSelectedColor} // Gọi hàm để cập nhật màu sắc
        />
        <DialogFooter className="flex items-center sm:justify-between">
          <p>
            <span>Giá: </span>
            {new Intl.NumberFormat('vi-VN').format(product.price)} VNĐ
          </p>
          <div>
            <Button type="button" onClick={handleAddToCart}>
              Thêm vào giỏ hàng
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
