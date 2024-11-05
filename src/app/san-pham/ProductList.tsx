'use client'
import useProduct from '@/hooks/useProduct'
import type { Product } from '../../../types/Type'
import { ProductItem } from '../../components/ProductItem'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { useState } from 'react'
import Filter from './Filter'

export default function ProductList() {
  const [pageIndex, setPageIndex] = useState(0)
  const [sortType, setSortType] = useState<'up' | 'down'>('down')

  const { data, isLoading, error } = useProduct(pageIndex, 16)

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!data || !data.data || data.data.products.length === 0) {
    return <div>No products available</div>
  }

  if (error) {
    return <div>Error loading product</div>
  }

  const rawProducts: Product[] = data.data.products

  const filterProduct = () => {
    return [...rawProducts].sort((a, b) =>
      sortType === 'up' ? a.price - b.price : b.price - a.price,
    )
  }

  const products = filterProduct()

  const totalPages = data.data.totalPages

  const handlePageChange = (newPage: number) => {
    console.log(newPage)
    if (newPage >= 0 && newPage < totalPages) {
      setPageIndex(newPage)
    }
  }

  const getPaginationRange = () => {
    const maxVisiblePages = 4
    let startPage = Math.max(1, pageIndex + 1 - Math.floor(maxVisiblePages / 2))
    let endPage = startPage + maxVisiblePages - 1

    if (endPage > totalPages) {
      endPage = totalPages
      startPage = Math.max(1, endPage - maxVisiblePages + 1)
    }

    return Array.from(
      { length: endPage - startPage + 1 },
      (_, index) => startPage + index,
    )
  }

  const paginationRange = getPaginationRange()

  const handleFilterChange = (type: 'up' | 'down') => {
    setSortType(type)
  }

  return (
    <div className="mt-8">
      <Filter onFilterChange={handleFilterChange} />
      <div className="w-full rounded-md">
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
        <div className="my-8">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={() =>
                    handlePageChange(pageIndex == 0 ? pageIndex : pageIndex - 1)
                  }
                />
              </PaginationItem>
              {paginationRange.map((page) => (
                <PaginationItem key={page}>
                  <PaginationLink
                    href="#"
                    onClick={() => handlePageChange(page - 1)}
                    className={pageIndex === page - 1 ? 'text-red-600' : ''} // Đánh dấu trang hiện tại
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={() => handlePageChange(pageIndex + 1)}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  )
}
