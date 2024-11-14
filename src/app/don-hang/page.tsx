import DataList from './order-list'

export default function page() {
  return (
    <div className="container mx-auto">
      <div className="text-center text-2xl font-semibold">Đơn hàng đã mua</div>
      <DataList />
    </div>
  )
}
