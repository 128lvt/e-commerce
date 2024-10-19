import Banner from '@/components/Banner';
import { TopCarousel } from '@/components/TopCarousel';
import HomePageProducts from '@/components/HomePageProducts';
import { BottomCarousel } from '@/components/BottomCarousel';

export default function page() {
  return (
    <>
      <div className="bg-slate-200 dark:bg-gray-950">
        <div>
          <TopCarousel />
        </div>
        <div className="container mx-auto mb-2 mt-2 flex">
          <Banner />
        </div>
        <div className="container mx-auto mb-2 mt-2 flex rounded-md bg-white dark:bg-zinc-800">
          <HomePageProducts title="Sản phẩm mới" />
        </div>
        <div className="container mx-auto mb-2 mt-2 flex rounded-md bg-white dark:bg-zinc-800">
          <HomePageProducts title="Sản phẩm Hot" />
        </div>
        <div className="container mx-auto mb-2 mt-2 flex">
          <Banner />
        </div>
        <div className="container mx-auto flex rounded-md bg-white dark:bg-zinc-800">
          <BottomCarousel />
        </div>
      </div>
    </>
  );
}
