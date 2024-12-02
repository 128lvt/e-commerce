'use client'
import useUser from '@/hooks/use-user'
import { ProductForm } from './form'
import { useRouter } from 'next/navigation'

export default function Page() {
  const router = useRouter()
  const role = useUser((state) => state.getRole())
  if (role !== null && role !== 'admin' && role !== 'dev') {
    router.push('/admin/')
  }
  return (
    <div className="container mx-auto mt-20 w-[600px]">
      <h1 className="text-xl font-semibold">Thêm sản phẩm</h1>
      <ProductForm />
    </div>
  )
}
