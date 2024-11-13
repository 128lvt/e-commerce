import ProductList from '@/app/san-pham/ProductList'
import Filter from './Filter'

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
