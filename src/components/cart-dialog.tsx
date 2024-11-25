import { useState, useEffect } from 'react'
import { useToast } from '@/hooks/use-toast'
import { useCart } from '@/hooks/use-cart'
import { v4 as uuidv4 } from 'uuid'
import { Product } from '../../types/Type'
import { API_URL } from '@/configs/apiConfig'
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
import { ProductVariant } from './product-variant'
import { ShoppingCart, X } from 'lucide-react'
import Image from 'next/image'
import { Separator } from '@/components/ui/separator'

export function AddToCartDialog(product: Product) {
  const [selectedSize, setSelectedSize] = useState<string>('')
  const [selectedColor, setSelectedColor] = useState<string>('')
  const [isOpen, setIsOpen] = useState(false)

  const { toast } = useToast()
  const { addToCart, loadCartFromLocalStorage } = useCart()

  const imageUrl =
    product.images && product.images.length > 0
      ? `${API_URL}/products/images/${product.images[0].imageUrl}`
      : '/default-image.jpg'

  const handleAddToCart = (variantStock: number) => {
    if (!selectedSize || !selectedColor) {
      toast({
        description: 'Vui lòng chọn kích thước và màu sắc!',
        variant: 'destructive',
      })
      return
    }

    if (variantStock === 0) {
      toast({
        description: 'Sản phẩm này đã hết hàng.',
        variant: 'destructive',
      })
      return
    }

    const getVariantInfo = (size: string, color: string) => {
      const variant = product.variants.find(
        (v) => v.size === size && v.color === color,
      )
      return variant?.id
    }

    const variantId = getVariantInfo(selectedSize, selectedColor)

    const productToAdd = {
      id: uuidv4(),
      productId: product.id,
      name: product.name,
      price: product.price,
      size: selectedSize,
      color: selectedColor,
      variantId: variantId || 0,
      imageUrl: product.images[0]?.imageUrl,
      quantity: 1,
      stock: variantStock,
    }

    addToCart(productToAdd)

    toast({
      description: `Đã thêm ${productToAdd.name} vào giỏ hàng.`,
    })

    setIsOpen(false)
  }

  useEffect(() => {
    loadCartFromLocalStorage()
  }, [loadCartFromLocalStorage])

  return (
    <div className="w-full text-white sm:w-auto">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button
            size="sm"
            className="flex-1 transition-all duration-300 hover:bg-primary/90"
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            Thêm vào giỏ hàng
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">
              {product.name}
            </DialogTitle>
            <DialogDescription />
          </DialogHeader>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-4"
            onClick={() => setIsOpen(false)}
          >
            <X className="h-4 w-4" />
          </Button>
          <div className="relative mt-4 aspect-square overflow-hidden rounded-lg">
            <Image
              src={imageUrl}
              alt={product.name}
              fill
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-all duration-300 hover:scale-105"
            />
          </div>
          <div className="mt-4 pr-4">
            <div className="space-y-4">
              <Separator />
              <ProductVariant
                stock={product.stock}
                variants={product.variants}
                onSizeChange={setSelectedSize}
                onColorChange={setSelectedColor}
              />
            </div>
          </div>
          <DialogFooter className="mt-6 flex items-center justify-between gap-10">
            <div className="flex flex-col items-start">
              <p className="text-lg font-semibold">
                {new Intl.NumberFormat('vi-VN', {
                  style: 'currency',
                  currency: 'VND',
                }).format(product.price)}
              </p>
            </div>
            <Button
              onClick={() =>
                handleAddToCart(
                  product.variants.find(
                    (v) => v.size === selectedSize && v.color === selectedColor,
                  )?.stock || 0,
                )
              }
              className="transition-all duration-300 hover:bg-primary/90"
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              Thêm vào giỏ hàng
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
