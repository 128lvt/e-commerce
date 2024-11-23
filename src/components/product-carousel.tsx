'use client'

import React from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { ProductItem } from '@/components/product-item'
import useProduct from '@/hooks/use-product'
import { Product } from '../../types/Type'
import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'

export default function ProductCarousel() {
  const { data, isLoading, error } = useProduct()

  if (isLoading) {
    return <div className="flex justify-center p-8">Loading...</div>
  }

  if (!data || !data.data || data.data.products.length === 0) {
    return <div className="flex justify-center p-8">No products available</div>
  }

  if (error) {
    return <div className="flex justify-center p-8">Error loading products</div>
  }

  const products: Product[] = data.data.products

  return (
    <div className="w-full rounded-lg bg-gradient-to-r from-purple-100 to-pink-100 p-6 shadow-lg">
      <motion.h2
        className="mb-4 flex items-center justify-center text-2xl font-bold text-gray-800"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Sản phẩm nổi bật
        <Sparkles className="ml-2 h-6 w-6 text-yellow-500" />
      </motion.h2>
      <Carousel
        opts={{
          align: 'start',
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {products.slice(0, 10).map((product, index) => (
            <CarouselItem
              key={product.id}
              className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <ProductItem
                  description={product.description}
                  stock={product.stock}
                  images={product.images}
                  name={product.name}
                  price={product.price}
                  variants={product.variants}
                  category={product.category}
                  id={product.id}
                />
              </motion.div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious variant="secondary" />
        <CarouselNext variant="secondary" />
      </Carousel>
    </div>
  )
}
