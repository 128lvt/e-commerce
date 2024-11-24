import { Breadcrumb } from '@/components/breadcumb'
import Cart from './cart'

export default function page() {
  const breadcrumbItems = [{ label: 'Giỏ hàng', href: '/gio-hang' }]

  return (
    <div>
      <Breadcrumb items={breadcrumbItems} />
      <div className="container mx-auto">
        <Cart />
      </div>
    </div>
  )
}
