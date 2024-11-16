import { useEffect } from 'react'
import Image from 'next/image'
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
      className="group relative mt-3 w-full overflow-hidden rounded-lg bg-gradient-to-br from-purple-50 to-indigo-100 text-gray-800 shadow-lg transition-all duration-300 hover:shadow-xl"
    >
      <CardHeader className="p-4">
        <CardTitle className="line-clamp-1 text-lg font-semibold text-indigo-800">
          {product.name || 'Product Name'}
        </CardTitle>
        <Badge
          variant="secondary"
          className="absolute right-2 top-3 bg-indigo-200 text-indigo-800"
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
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-indigo-900/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-2 p-4">
        <div className="flex w-full items-center justify-between">
          <p className="text-xl font-bold text-indigo-600">
            {new Intl.NumberFormat('vi-VN', {
              style: 'currency',
              currency: 'VND',
            }).format(product.price)}
          </p>
          <p className="text-sm text-indigo-600">In stock: {product.stock}</p>
        </div>
        <div className="flex w-full justify-between gap-2">
          <Button
            size="sm"
            className="flex-1 bg-indigo-500 text-white transition-all duration-300 hover:bg-indigo-600"
          >
            <CiCircleInfo className="mr-2 h-4 w-4" />
            Chi tiết
          </Button>
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
          ></AddToCartDialog>
        </div>
      </CardFooter>
    </Card>
  )
}
