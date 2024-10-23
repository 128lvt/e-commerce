'use client';
import { ProductItem } from '@/components/ProductItem';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { StarIcon } from '@radix-ui/react-icons';
import { Product } from '../../types/Product';
import useSWR from 'swr';
import React from 'react';
import Autoplay from 'embla-carousel-autoplay';
export default function ProductCarousel() {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true }),
  );
  const fetcher = (url: string) => fetch(url).then((res) => res.json());

  const { data, error, isLoading } = useSWR<{ [key: string]: Product }>(
    'https://product-7ffbf-default-rtdb.firebaseio.com/products.json',
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!data) {
    console.log('No product available');
  }

  if (error) {
    return <div>Error loading product</div>;
  }

  const products: Product[] = Object.values(data || {});

  return (
    <div className="w-full rounded-md">
      <p className="flex items-center px-2 pb-2 text-xl font-bold">
        Sản phẩm bản chạy
        <span className="ms-2">
          <StarIcon className="h-6 w-6" />
        </span>
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
                image={products[index]?.image}
                name={products[index]?.name}
                price={products[index]?.price}
                key={index}
                type="none"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
