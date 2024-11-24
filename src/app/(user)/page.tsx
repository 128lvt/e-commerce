import { TopCarousel } from '@/components/top-carousel'
import { BottomCarousel } from '@/components/bottom-carousel'
import ProductCarousel from '@/components/product-carousel'
import IconBottom from '@/components/icon-bottom'
import { DecorativeHeader } from '@/components/decorative-header'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <TopCarousel />

      <main className="container mx-auto px-4 py-8">
        <section className="mb-12">
          <DecorativeHeader />
        </section>

        <section className="mb-12">
          <ProductCarousel />
        </section>

        {/* <section className="mb-12">
          <HomePageProducts index={0} title="New Arrivals" />
        </section>

        <section className="mb-12">
          <HomePageProducts index={1} title="Sale Items" />
        </section> */}

        <section className="mb-12">
          <BottomCarousel />
        </section>

        <section className="mb-12">
          <IconBottom />
        </section>
      </main>
    </div>
  )
}
