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

import { Button } from './ui/button'
import { PaperPlaneIcon } from '@radix-ui/react-icons'

export function TopCarousel() {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true }),
  )

  return (
    <div className="w-full">
      <Carousel
        plugins={[plugin.current]}
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent>
          {Array.from({ length: 3 }).map((_, index) => (
            <CarouselItem key={index}>
              <div className="relative md:h-[30rem] xl:h-[45rem]">
                <Image
                  src={`/carousels/${index + 1}.jpg`}
                  width={1920}
                  height={1080}
                  alt="Carousel"
                  className="h-full w-full object-cover"
                  priority
                />
                <div className="container absolute inset-0 z-10 mx-auto flex items-center">
                  <div className="ms-8 md:ms-0 md:mt-0 xl:ms-0">
                    <h1 className="mb-1 overflow-hidden text-ellipsis text-nowrap text-sm font-semibold md:mb-8 md:text-2xl">
                      What is Lorem Ipsum?
                    </h1>
                    <p className="line-clamp-2 w-full overflow-hidden text-ellipsis text-wrap text-xs md:w-[35rem] md:text-sm xl:text-lg">
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry.
                    </p>

                    <Button className="mt-1 flex items-center rounded-2xl p-4 text-sm md:mt-10 xl:p-6 xl:text-xl">
                      Mua ngay <PaperPlaneIcon />
                    </Button>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  )
}
