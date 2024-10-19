import { CarouselPlugin } from '@/components/Carousel';
import HomePageProducts from '@/components/HomePageProducts';

export default function page() {
  return (
    <>
      <div className="dark:bg-gray-950">
        <div>
          <CarouselPlugin />
        </div>
        <div className="container mx-auto flex">
          <HomePageProducts title="Sản phẩm mới" />
        </div>
        <div className="container mx-auto flex">
          <HomePageProducts title="Sản phẩm Hot" />
        </div>
      </div>
    </>
  );
}
