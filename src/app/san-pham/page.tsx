import ProductList from '@/app/san-pham/product-list'
import Filter from './filter'

export default function page() {
  return (
    <div>
      <Filter />
      <div className="container mx-auto flex">
        <ProductList />
      </div>
    </div>
  )
}
