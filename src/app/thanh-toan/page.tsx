'use client'

import { useCart } from '@/hooks/use-cart'
import { Button } from '@/components/ui/button'
import { ShoppingCart, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import FormCashout from './form'
import { Breadcrumb } from '@/components/breadcumb'

export default function Page() {
  const { cart } = useCart()

  const breadcrumbItems = [{ label: 'Thanh toán', href: '/thanh-toan' }]

  if (cart.length === 0) {
    return (
      <div>
        <Breadcrumb items={breadcrumbItems} />
        <div className="flex flex-col items-center justify-center px-4 text-center">
          <ShoppingCart className="mb-4 h-16 w-16 text-gray-400" />
          <h1 className="mb-2 text-2xl font-bold">
            Không có sản phẩm trong giỏ hàng
          </h1>
          <p className="mb-4 text-gray-600">
            Hãy tham khảo một sản phẩm trên trang sản phãm.
          </p>
          <Link href="/san-pham" passHref>
            <Button className="flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return <FormCashout />
}
