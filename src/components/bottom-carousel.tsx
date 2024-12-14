'use client'

import React from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Snowflake } from 'lucide-react'

export function BottomCarousel() {
  const offers = [
    {
      image: '/carousels/13.jpg',
      title: 'Giảm giá Giáng Sinh',
      discount: 'Giảm 30%',
    },
    {
      image: '/carousels/14.jpg',
      title: 'Sản phẩm mới',
      discount: 'Miễn phí vận chuyển',
    },
    {
      image: '/carousels/15.jpg',
      title: 'Ưu đãi cuối năm',
      discount: 'Lên tới 50%',
    },
  ]

  return (
    <div className="w-full rounded-lg bg-gradient-to-r from-red-700 to-green-700 p-6 shadow-lg">
      <motion.div
        className="mb-4 flex items-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold text-white">Ưu đãi Giáng Sinh</h2>
        <Snowflake className="ml-2 h-6 w-6 text-white" />
      </motion.div>
      <Carousel
        opts={{
          align: 'start',
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {offers.map((offer, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="relative">
                      <Image
                        src={offer.image}
                        width={600}
                        height={400}
                        alt={offer.title}
                        priority
                        className="h-58 w-full object-cover"
                      />
                      <div className="absolute inset-0 flex flex-col justify-end bg-black bg-opacity-40 p-4">
                        <h3 className="mb-2 text-xl font-semibold text-white">
                          {offer.title}
                        </h3>
                        <Badge
                          variant="secondary"
                          className="w-fit cursor-default bg-red-600 text-white"
                        >
                          {offer.discount}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
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
