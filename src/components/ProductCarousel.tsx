'use client'
import { ProductItem } from '@/components/ProductItem'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel'
import React from 'react'
import Autoplay from 'embla-carousel-autoplay'
import { Product } from '../../types/Type'
import useProduct from '@/hooks/useProduct'
export default function ProductCarousel() {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true }),
  )
  const { data, isLoading, error } = useProduct()

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!data || !data.data || data.data.products.length === 0) {
    return <div>No products available</div>
  }

  if (error) {
    return <div>Error loading product</div>
  }

  const products: Product[] = data.data.products

  return (
    <div className="w-full rounded-md">
      <p className="flex items-center px-2 pb-2 text-sm uppercase">
        Sản phẩm bản chạy
        <span className="ms-2">*</span>
      </p>
      <Carousel
        className="w-full"
        plugins={[plugin.current]}
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent>
          {Array.from({ length: 10 }).map((_, index) => (
            <CarouselItem
              key={index}
              className="h-full w-full basis-1/2 sm:basis-1/3 md:basis-1/3 lg:basis-1/4"
            >
              <ProductItem
                images={products[index]?.images}
                name={products[index]?.name}
                price={products[index]?.price}
                key={index}
                variants={products[index]?.variants}
                category={products[index]?.category}
                id={products[index].id}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  )
}
