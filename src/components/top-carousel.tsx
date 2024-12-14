'use client'

import * as React from 'react'
import Autoplay from 'embla-carousel-autoplay'
import Image from 'next/image'
import Link from 'next/link'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'

export function TopCarousel() {
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true }),
  )

  const carouselItems = [
    {
      image: '/carousels/4.jpg',
      title: `Bộ sưu tập mới`,
      description:
        'Khám phá những thiết kế mới nhất, mang đến sự tươi mới và phong cách hiện đại cho bạn.',
      buttonText: 'Mua ngay',
      buttonLink: '/nature',
    },
    {
      image: '/carousels/5.jpg',
      title: 'Giảm sốc',
      description:
        'Nhận ngay những ưu đãi đặc biệt cho các bộ trang phục thời trang không thể bỏ lỡ.',
      buttonText: 'Mua ngay',
      buttonLink: '/urban',
    },
    {
      image: '/carousels/6.jpg',
      title: 'Đồng hành cùng người nổi tiếng',
      description:
        'Thể hiện cá tính với những thiết kế cao cấp, mang lại sự tự tin và đẳng cấp.',
      buttonText: 'Mua ngay',
      buttonLink: '/luxury',
    },
  ]

  return (
    <div className="w-full overflow-hidden">
      <Carousel
        plugins={[plugin.current]}
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
        className="relative"
      >
        <CarouselContent>
          {carouselItems.map((item, index) => (
            <CarouselItem key={index}>
              <div className="relative h-[30rem] md:h-[40rem] xl:h-[50rem]">
                <Image
                  src={item.image}
                  fill
                  alt={item.title}
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent" />
                <div className="container absolute inset-0 z-10 mx-auto flex items-center">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="max-w-2xl space-y-6 text-[#eda57a]"
                  >
                    <h2 className="text-3xl font-bold md:text-4xl lg:text-5xl">
                      {item.title}
                    </h2>
                    <p className="text-lg md:text-xl">{item.description}</p>
                    <Link href={item.buttonLink}>
                      <Button
                        size="lg"
                        className="group mt-5 rounded-full bg-white text-black hover:bg-white/90"
                      >
                        {item.buttonText}
                        <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </Link>
                  </motion.div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  )
}
