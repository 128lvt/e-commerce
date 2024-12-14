'use client'

import { useState } from 'react'
import { columns } from './column'
import { DataTable } from './data-table'
import Filter from './filter'
import { Product } from 'types/Type'
import { useProductParams } from '@/hooks/use-param'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import useProduct from '@/hooks/use-product'
import useUser from '@/hooks/use-user'
import { useRouter } from 'next/navigation'

export default function Page() {
  const [pageIndex, setPageIndex] = useState(0)
  const role = useUser((state) => state.getRole())
  console.log(role)
  const { setParams } = useProductParams()
  const { data: productData, isLoading, error } = useProduct()
  const router = useRouter()

  const products: Product[] = productData?.data.products ?? []
  const totalPages = productData?.data.totalPages || 0

  const handlePageChange = (newPage: number) => {
    if (newPage >= 0 && newPage < totalPages) {
      setPageIndex(newPage)
      setParams({ page: newPage })
    }
  }
  if (!(role === 'ROLE_DEV' || role === 'ROLE_ADMIN')) {
    router.push('/admin/')
  } else {
    console.log(`Role hợp lệ: ${role}`)
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

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <h2 className="mb-2 text-2xl font-bold text-red-600">Error</h2>
          <p className="text-gray-600">{error.message}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="mb-6 text-3xl font-bold">Danh sách sản phẩm</h1>
      <Filter />
      <DataTable columns={columns} data={products} isLoading={isLoading} />
      <div className="mt-8">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={() =>
                  handlePageChange(pageIndex === 0 ? pageIndex : pageIndex - 1)
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
                      ? 'bg-primary text-primary-foreground'
                      : ''
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
    </div>
  )
}
