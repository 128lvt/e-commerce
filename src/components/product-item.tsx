'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { CiCircleInfo } from 'react-icons/ci'
import AOS from 'aos'
import 'aos/dist/aos.css'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { AddToCartDialog } from './cart-dialog'
import { Product } from '../../types/Type'
import { API_URL } from '@/configs/apiConfig'

export function ProductItem(product: Product) {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    })
  }, [])

  const imageUrl =
    product.images && product.images.length > 0
      ? `${API_URL}/products/images/${product.images[0].imageUrl}`
      : '/default-image.jpg'

  return (
    <Card
      data-aos="fade-up"
      className="group relative mt-3 w-full overflow-hidden rounded-lg bg-gradient-to-br from-violet-50 to-indigo-100 text-gray-800 shadow-lg transition-all duration-300 hover:shadow-xl sm:mt-4 md:mt-5"
    >
      <CardHeader className="p-3 sm:p-4">
        <CardTitle className="line-clamp-1 text-sm font-bold text-violet-800">
          {product.name || 'Product Name'}
        </CardTitle>
        <Badge
          variant="secondary"
          className="absolute right-2 top-2 cursor-default bg-violet-200 text-xs text-violet-800"
        >
          {product.category.name || 'Category'}
        </Badge>
      </CardHeader>
      <CardContent className="p-0">
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={imageUrl}
            alt={product.name || 'Product Image'}
            fill
            priority
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-violet-900/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </div>
        <div className="p-3 sm:p-4">
          <p className="line-clamp-2 h-[3rem] text-xs text-violet-700 sm:text-sm">
            {product.description || 'No description available'}
          </p>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-2 p-3 sm:p-4">
        <div className="flex w-full flex-col items-start justify-between gap-1 sm:flex-row sm:items-center">
          <p className="text-lg font-bold text-violet-600 sm:text-xl md:text-2xl">
            {new Intl.NumberFormat('vi-VN', {
              style: 'currency',
              currency: 'VND',
            }).format(product.price)}
          </p>
          <p className="text-xs text-violet-600 sm:text-sm">
            Còn lại: {product.stock}
          </p>
        </div>
        <div className="flex w-full flex-col gap-2 sm:flex-row sm:justify-between">
          <Link href={`/san-pham/${product.id}`} passHref>
            <Button
              size="sm"
              className="w-full flex-1 transition-all duration-300 hover:bg-violet-100 hover:text-violet-950 sm:w-auto"
            >
              <CiCircleInfo className="mr-2 h-4 w-4" />
              <span className="sr-only">Xem chi tiết {product.name}</span>
              Chi tiết
            </Button>
          </Link>
          <AddToCartDialog
            key={product.id}
            stock={product.stock}
            description={product.description}
            images={product.images}
            name={product.name}
            price={product.price}
            category={product.category}
            id={product.id}
            variants={product.variants}
          />
        </div>
      </CardFooter>
    </Card>
  )
}
