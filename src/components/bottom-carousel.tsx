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
import { Tag } from 'lucide-react'

export function BottomCarousel() {
  const offers = [
    { image: '/carousels/1.jpg', title: 'Summer Sale', discount: '30% OFF' },
    {
      image: '/carousels/2.jpg',
      title: 'New Arrivals',
      discount: 'Free Shipping',
    },
    {
      image: '/carousels/3.jpg',
      title: 'Clearance',
      discount: 'Up to 50% OFF',
    },
  ]

  return (
    <div className="w-full rounded-lg bg-gradient-to-r from-blue-100 to-green-100 p-6 shadow-lg">
      <motion.div
        className="mb-4 flex items-center justify-between"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold text-gray-800">Special Offers</h2>
        <Tag className="h-6 w-6 text-primary" />
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
                        className="h-48 w-full object-cover"
                      />
                      <div className="absolute inset-0 flex flex-col justify-end bg-black bg-opacity-40 p-4">
                        <h3 className="mb-2 text-xl font-semibold text-white">
                          {offer.title}
                        </h3>
                        <Badge variant="secondary" className="w-fit">
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
        <CarouselPrevious variant="secondary" />
        <CarouselNext variant="secondary" />
      </Carousel>
    </div>
  )
}
