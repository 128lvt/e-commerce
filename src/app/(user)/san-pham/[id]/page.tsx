'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { ShoppingCart, Gift, Snowflake } from 'lucide-react'
import useProductId from '@/hooks/use-product-id'
import { useToast } from '@/hooks/use-toast'
import { useCart } from '@/hooks/use-cart'
import { v4 as uuidv4 } from 'uuid'
import { motion } from 'framer-motion'

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
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        >
          <Snowflake className="h-12 w-12 text-red-600" />
        </motion.div>
      </div>
    )
  if (error)
    return (
      <div className="flex h-screen items-center justify-center text-red-600">
        Error loading product
      </div>
    )
  if (!product)
    return (
      <div className="flex h-screen items-center justify-center text-red-600">
        No product found
      </div>
    )

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
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <motion.div
          className="relative aspect-square overflow-hidden rounded-lg"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Image
            src={`${API_URL}/products/images/${product.images[0].imageUrl}`}
            alt=""
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </motion.div>
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div>
            <h1 className="text-3xl font-bold text-red-800">{product.name}</h1>
            <p className="mt-2 text-sm text-green-700">
              {product.category.name}
            </p>
          </div>

          <p className="text-2xl font-bold text-red-600">
            {new Intl.NumberFormat('vi-VN', {
              style: 'currency',
              currency: 'VND',
            }).format(product.price)}
          </p>
          <p className="text-gray-700">{product.description}</p>
          <ProductVariant
            stock={product.stock}
            variants={product.variants}
            onSizeChange={setSelectedSize}
            onColorChange={setSelectedColor}
          />
          <div className="flex space-x-4">
            <Button
              onClick={() =>
                handleAddToCart(
                  product.variants.find(
                    (v) => v.size === selectedSize && v.color === selectedColor,
                  )?.stock || 0,
                )
              }
              className="flex-1 bg-red-600 text-white transition-all duration-300 hover:bg-red-700"
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              Thêm vào giỏ quà
            </Button>
          </div>
          <div className="rounded-md border border-green-200 bg-green-50 p-4">
            <p className="flex items-center text-sm text-green-700">
              <Snowflake className="mr-2 h-4 w-4" />
              Còn lại: {product.stock} sản phẩm
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
