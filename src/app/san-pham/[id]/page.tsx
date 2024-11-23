'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { ShoppingCart } from 'lucide-react'
import useProductId from '@/hooks/use-product-id'
import { useToast } from '@/hooks/use-toast'
import { useCart } from '@/hooks/use-cart'
import { v4 as uuidv4 } from 'uuid'

import { Button } from '@/components/ui/button'
import { ProductVariant } from '@/components/product-variant'
import { API_URL } from '@/configs/apiConfig'

export default function ProductDetail({ params }: { params: { id: number } }) {
  const { data: product, error, isLoading } = useProductId(params.id)
  const [selectedSize, setSelectedSize] = useState('')
  const [selectedColor, setSelectedColor] = useState('')
  const { toast } = useToast()
  const { addToCart, loadCartFromLocalStorage } = useCart()

  useEffect(() => {
    loadCartFromLocalStorage()
  }, [loadCartFromLocalStorage])

  if (isLoading)
    return (
      <div className="flex h-screen items-center justify-center">
        Loading...
      </div>
    )
  if (error)
    return (
      <div className="flex h-screen items-center justify-center">
        Error loading product
      </div>
    )
  if (!product)
    return (
      <div className="flex h-screen items-center justify-center">
        No product found
      </div>
    )

  const handleSizeChange = (size: string) => setSelectedSize(size)
  const handleColorChange = (color: string) => setSelectedColor(color)

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      toast({
        description: 'Vui lòng chọn kích thước và màu sắc!',
        variant: 'destructive',
      })
      return
    }

    const variant = product.variants.find(
      (v) => v.size === selectedSize && v.color === selectedColor,
    )

    if (!variant || variant.stock === 0) {
      toast({
        description: 'Sản phẩm này đã hết hàng.',
        variant: 'destructive',
      })
      return
    }

    const productToAdd = {
      id: uuidv4(),
      productId: product.id,
      name: product.name,
      price: product.price,
      size: selectedSize,
      color: selectedColor,
      variantId: variant.id,
      imageUrl: product.images[0]?.imageUrl,
      quantity: 1,
      stock: variant.stock,
    }

    addToCart(productToAdd)

    toast({
      description: `Đã thêm ${productToAdd.name} vào giỏ hàng.`,
    })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="relative aspect-square overflow-hidden rounded-lg">
          <Image
            src={`${API_URL}/products/images/${product.images[0].imageUrl}`}
            alt=""
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
            <p className="mt-2 text-sm text-gray-500">
              {product.category.name}
            </p>
          </div>

          <p className="text-2xl font-bold text-violet-600">
            {new Intl.NumberFormat('vi-VN', {
              style: 'currency',
              currency: 'VND',
            }).format(product.price)}
          </p>
          <p className="text-gray-700">{product.description}</p>
          <ProductVariant
            variants={product.variants}
            onSizeChange={handleSizeChange}
            onColorChange={handleColorChange}
            stock={product.stock}
          />
          <div className="flex space-x-4">
            <Button
              onClick={handleAddToCart}
              className="flex-1 bg-violet-600 text-white hover:bg-violet-700"
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              Thêm vào giỏ hàng
            </Button>
          </div>
          <div className="rounded-md bg-violet-50 p-4">
            <p className="text-sm text-violet-700">
              Còn lại: {product.stock} sản phẩm
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
