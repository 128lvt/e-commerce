import { ProductForm } from './form'

export default function page() {
  return (
    <div className="container mx-auto mt-20 w-[600px]">
      <h1 className="text-xl font-semibold">Thêm sản phẩm</h1>
      <ProductForm />
    </div>
  )
}
