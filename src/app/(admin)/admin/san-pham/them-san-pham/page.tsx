'use client'
import useUser from '@/hooks/use-user'
import { ProductForm } from './form'
import { useRouter } from 'next/navigation'

export default function Page() {
  const router = useRouter()
  const role = useUser((state) => state.getRole())
  if (!(role === 'ROLE_DEV' || role === 'ROLE_ADMIN')) {
    console.log(` hợp lệ: ${role}, chuyển hướng...`)
    router.push('/admin/')
  } else {
    console.log(`Role hợp lệ: ${role}`)
  }
  return (
    <div className="container mx-auto mt-20 w-[600px]">
      <h1 className="text-xl font-semibold">Thêm sản phẩm</h1>
      <ProductForm />
    </div>
  )
}
