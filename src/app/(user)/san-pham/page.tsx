import { Suspense } from 'react'
import ProductList from '@/app/(user)/san-pham/product-list'
import Filter from './filter'
import { Breadcrumb } from '@/components/breadcumb'
import { Skeleton } from '@/components/ui/skeleton'

function FilterSkeleton() {
  return (
    <div className="mb-6">
      <Skeleton className="h-10 w-full max-w-sm" />
      <div className="mt-4 flex flex-wrap gap-2">
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton key={index} className="h-8 w-24" />
        ))}
      </div>
    </div>
  )
}

export default function Page() {
  const breadcrumbItems = [{ label: 'Sản phẩm', href: '/san-pham' }]

  return (
    <div>
      <Breadcrumb items={breadcrumbItems} />
      <div className="container mx-auto px-4">
        <Suspense fallback={<FilterSkeleton />}>
          <Filter />
        </Suspense>
        <div>
          <ProductList />
        </div>
      </div>
    </div>
  )
}
