import ProductList from '@/app/san-pham/product-list'
import Filter from './filter'
import { Breadcrumb } from '@/components/breadcumb'

export default function Page() {
  const breadcrumbItems = [{ label: 'Sản phẩm', href: '/san-pham' }]

  return (
    <div>
      <Breadcrumb items={breadcrumbItems} />
      <div className="container mx-auto px-4">
        <Filter />
        <div>
          <ProductList />
        </div>
      </div>
    </div>
  )
}
