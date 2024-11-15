import ProductList from '@/app/san-pham/product-list'
import Filter from './filter'

export default function page() {
  return (
    <div>
      <Filter />
      <div className="text-center text-2xl font-semibold">
        Danh sách sản phẩm
      </div>
      <div className="container mx-auto flex">
        <ProductList />
      </div>
    </div>
  )
}
