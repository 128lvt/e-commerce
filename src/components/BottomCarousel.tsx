import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { StarIcon } from '@radix-ui/react-icons';
import Image from 'next/image';

export function BottomCarousel() {
  return (
    <div className="w-full p-2">
      <p className="flex items-center px-2 pb-2 text-xl font-bold">
        Ưu đãi
        <span className="ms-2">
          <StarIcon className="h-6 w-6" />
        </span>
      </p>
      <Carousel className="w-full">
        <CarouselContent>
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
              <div className="">
                <Image
                  src={`/carousels/${index + 1}.jpg`}
                  width={1920}
                  height={1080}
                  alt="Carousel"
                  className="h-full min-h-96 w-full rounded-sm object-cover"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
