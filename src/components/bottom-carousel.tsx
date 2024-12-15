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
    <div className="relative w-full rounded-lg bg-gradient-to-br from-red-100 to-green-100 p-6 shadow-2xl dark:bg-none">
      <motion.div
        className="mb-4 flex items-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold">Ưu đãi Giáng Sinh</h2>
        <Snowflake className="ml-2 h-6 w-6 text-blue-200" />
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
                        <h3 className="mb-2 text-xl font-semibold">
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
          className="bg-blue-200 text-blue-900 hover:bg-blue-300"
        />
        <CarouselNext
          variant="secondary"
          className="bg-blue-200 text-blue-900 hover:bg-blue-300"
        />
      </Carousel>
      <div className="absolute inset-0 z-0">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-1 w-1 rounded-full bg-white"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={
              i % 3 === 0
                ? {
                    scale: [0, 1, 0.5, 1, 0],
                    opacity: [0, 1, 0.5, 1, 0],
                  }
                : {
                    scale: [0, 1, 0],
                    opacity: [0, 1, 0],
                  }
            }
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>
    </div>
  )
}
