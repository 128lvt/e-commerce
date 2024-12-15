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
import { Product } from '../../types/Type'
import { motion } from 'framer-motion'
import { GiftIcon } from 'lucide-react'
import useSWR from 'swr'
import { API_URL } from '@/configs/apiConfig'
import { ProductSkeleton } from '@/components/product-skeleton'

interface ApiResponse {
  message: string
  data: Product[]
}

export default function ProductCarousel() {
  const fetcher = (url: string) => fetch(url).then((res) => res.json())

  const { data, error } = useSWR<ApiResponse>(`${API_URL}/products`, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  })

  // Function to get 10 random products
  const getRandomProducts = (products: Product[] | undefined) => {
    if (!products || products.length <= 10) return products

    // Fisher-Yates shuffle algorithm
    const shuffled = [...products]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }

    return shuffled.slice(0, 10)
  }

  const randomProducts = getRandomProducts(data?.data)

  return (
    <div className="w-full rounded-lg bg-gradient-to-r from-red-700 to-green-700 p-6 shadow-lg">
      <motion.h2
        className="mb-4 flex items-center justify-center text-2xl font-bold text-white"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Sản phẩm chơi Giáng Sinh
        <GiftIcon className="ml-2 h-6 w-6 text-yellow-400" />
      </motion.h2>
      <Carousel
        opts={{
          align: 'start',
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {!data && !error
            ? Array.from({ length: 10 }).map((_, index) => (
                <CarouselItem
                  key={`skeleton-${index}`}
                  className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <ProductSkeleton />
                  </motion.div>
                </CarouselItem>
              ))
            : randomProducts?.map((product, index) => (
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
        <CarouselPrevious
          variant="secondary"
          className="bg-white text-red-700 hover:bg-red-100"
        />
        <CarouselNext
          variant="secondary"
          className="bg-white text-green-700 hover:bg-green-100"
        />
      </Carousel>
    </div>
  )
}
