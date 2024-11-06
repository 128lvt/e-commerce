'use client'
import { ProductItem } from '@/components/ProductItem'
import { Button } from '@/components/ui/button'
import useProduct from '../hooks/useProduct'
import { Product } from '../../types/Type'

interface IProps {
  title: string
  index: number
}

export default function HomePageProducts(page: IProps) {
  const { data, isLoading, error } = useProduct(page.index, 8)

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!data || !data.data || data.data.products.length === 0) {
    return <div>No products available</div>
  }

  if (error) {
    return <div>Error loading product</div>
  }

  const products: Product[] = data.data.products

  return (
    <div className="w-full rounded-md">
      <div>
        <p className="mt-2 flex items-center px-2 py-1 text-sm uppercase">
          {page.title}
          <span className="ms-2">*</span>
        </p>
        <div className="grid grid-cols-2 justify-center gap-5 md:grid-cols-2 xl:grid-cols-4">
          {products.map((product) => (
            <ProductItem
              key={product.name}
              name={product.name}
              price={product.price}
              images={product.images}
              variants={product.variants}
              category={product.category}
              id={product.id}
            />
          ))}
        </div>
      </div>
      <Button className="mx-auto mt-5 flex transition-transform duration-300 hover:scale-110 hover:bg-emerald-500">
        Xem tất cả sản phẩm
      </Button>
    </div>
  )
}
