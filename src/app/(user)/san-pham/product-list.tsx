'use client'

import { useState } from 'react'
import useProduct from '@/hooks/use-product'
import { useProductParams } from '@/hooks/use-param'
import { ProductItem } from '@/components/product-item'
import { ProductSkeleton } from '@/components/product-skeleton'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'

export default function EnhancedProductListPage() {
  const [pageIndex, setPageIndex] = useState(0)
  const { setParams } = useProductParams()
  const { data: productData, isLoading, error } = useProduct()

  const products = productData?.data.products
  const totalPages = productData?.data.totalPages || 0

  const handlePageChange = (newPage: number) => {
    if (newPage >= 0 && newPage < totalPages) {
      setPageIndex(newPage)
      setParams({ page: newPage })
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

  const renderProductGrid = () => {
    if (isLoading) {
      return (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <ProductSkeleton key={index} />
          ))}
        </div>
      )
    }

    if (error) {
      return (
        <div className="flex h-64 items-center justify-center text-red-600">
          Error loading products. Please try again later.
        </div>
      )
    }

    if (!products || products.length === 0) {
      return (
        <div className="flex h-64 items-center justify-center text-green-600">
          Không tìm thấy sản phẩm
        </div>
      )
    }

    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {products.map((product) => (
          <ProductItem
            key={product.id}
            name={product.name}
            price={product.price}
            images={product.images}
            variants={product.variants}
            category={product.category}
            id={product.id}
            stock={product.stock}
            description={product.description}
          />
        ))}
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {renderProductGrid()}
      {!isLoading && products && products.length > 0 && (
        <div className="mt-8">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={() =>
                    handlePageChange(
                      pageIndex === 0 ? pageIndex : pageIndex - 1,
                    )
                  }
                />
              </PaginationItem>
              {getPaginationRange().map((page) => (
                <PaginationItem key={page}>
                  <PaginationLink
                    href="#"
                    onClick={() => handlePageChange(page - 1)}
                    className={
                      pageIndex === page - 1
                        ? 'bg-red-600 text-white'
                        : 'bg-green-100 text-green-800 hover:bg-green-200'
                    }
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
      )}
    </div>
  )
}
