'use client'

import useCategory from '@/hooks/use-category'
import { DataTable } from './data-table'
import { columns } from './column'

export default function Page() {
  const { data, error, isLoading } = useCategory()

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <h2 className="mb-2 text-2xl font-bold text-red-600">Lỗi</h2>
          <p className="text-gray-600">{error.message}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full px-4 py-10">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Danh sách danh mục</h1>
      </div>
      <div className="overflow-x-auto">
        <div className="min-w-[800px]">
          <DataTable
            columns={columns}
            data={data?.data || []}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  )
}
