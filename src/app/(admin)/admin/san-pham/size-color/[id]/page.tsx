'use client'

import useVariant from '@/hooks/use-product-variant'
import { useParams } from 'next/navigation'
import { VariantColums } from './variant-column'
import { VariantForm } from './form'
import { VariantDatatable } from './variant-data-table'

export default function Page() {
  const params = useParams()

  const id = params.id

  const { data, isLoading, error } = useVariant(Number(id))

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error loading data</p>
      ) : (
        <VariantDatatable columns={VariantColums} data={data?.data ?? []} />
      )}
      <div className="container mx-auto mt-20 w-[600px]">
        <div className="text-center text-xl font-semibold">
          Thêm size, màu sắc
        </div>
        <VariantForm onClose={() => void 0} productId={Number(id)} />
      </div>
    </div>
  )
}
