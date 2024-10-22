import Banner from '@/components/Banner';
import { TopCarousel } from '@/components/TopCarousel';
import HomePageProducts from '@/components/HomePageProducts';
import { BottomCarousel } from '@/components/BottomCarousel';
import ProductCarousel from '@/components/ProductCarousel';
import IconBottom from '@/components/IconBottom';

export default function page() {
  return (
    <>
      <div className="">
        <div>
          <TopCarousel />
        </div>
        <div className="container mx-auto mb-2 mt-2 flex">
          <Banner />
        </div>
        <div className="container mx-auto mb-2 mt-2 flex">
          <ProductCarousel />
        </div>
        <div className="container mx-auto mb-2 mt-2 flex rounded-md">
          <HomePageProducts type="New" title="Sản phẩm mới" />
        </div>
        <div className="container mx-auto mb-2 mt-2 flex rounded-md">
          <HomePageProducts type="Sale" title="Sản đang giảm giá" />
        </div>
        <div className="container mx-auto mb-2 mt-2 flex">
          <Banner />
        </div>
        <div className="container mx-auto flex">
          <BottomCarousel />
        </div>
        <div className="container mx-auto mb-2 mt-2 flex rounded-md">
          <IconBottom />
        </div>
      </div>
    </>
  );
}
