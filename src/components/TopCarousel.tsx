'use client';
import * as React from 'react';
import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';
import Link from 'next/link';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { PaperPlaneIcon } from '@radix-ui/react-icons';
import ScrollingText from '@/components/ScrollingText';

export function TopCarousel() {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true }),
  );

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
              <div className="relative flex items-center justify-center xl:h-[50rem]">
                <div className="absolute top-0 flex w-[50%]">
                  <ScrollingText />
                </div>
                <Link
                  href="/"
                  className="absolute left-0 flex h-full cursor-pointer items-center px-5"
                >
                  <p className="mt-32 rounded-md bg-[#295255] p-3 text-sm text-foreground text-white dark:bg-[#162623] xl:mt-52 xl:p-5 xl:text-xl">
                    Mua sắm ngay <PaperPlaneIcon className="inline" />
                  </p>
                </Link>
                <Image
                  src={`/carousels/${index + 1}.jpg`}
                  width={1920}
                  height={1080}
                  alt="Carousel"
                  className="h-full w-full object-cover"
                  priority
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
