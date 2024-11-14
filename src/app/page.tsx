import { TopCarousel } from '@/components/top-carousel'
import HomePageProducts from '@/components/home-product'
import { BottomCarousel } from '@/components/bottom-carousel'
import ProductCarousel from '@/components/product-carousel'
import IconBottom from '@/components/icon-bottom'
import Banner from '@/components/banner'

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
          <HomePageProducts index={0} title="Sản phẩm mới" />
        </div>
        <div className="container mx-auto mb-2 mt-2 flex rounded-md">
          <HomePageProducts index={1} title="Sản đang giảm giá" />
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
  )
}
