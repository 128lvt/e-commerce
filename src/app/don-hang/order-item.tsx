import { Order } from 'types/Type'

interface IProps {
  order?: Order
}
export default function OrderItem({ order }: IProps) {
  return (
    <div>
      <div className="mx-auto max-w-4xl space-y-6 rounded-lg border border-gray-400 p-6 shadow-md">
        <div className="text-2xl font-semibold">Đơn hàng #1{order?.id}</div>
        <div className="text-lg">
          <p>
            <strong>Tên khách hàng:</strong> {order?.fullName}
          </p>
          <p>
            <strong>Số điện thoại:</strong> {order?.phoneNumber}
          </p>
          <p>
            <strong>Địa chỉ:</strong> {order?.address}
          </p>
          <p>
            <strong>Ghi chú:</strong> {order?.note}
          </p>
          <p>
            <strong>Ngày đặt hàng:</strong> {order?.orderDate?.toLocaleString()}
          </p>
          <p>
            <strong>Tổng tiền:</strong> {order?.totalMoney} VNĐ
          </p>
          <p>
            <strong>Hình thức thanh toán:</strong>{' '}
            {order?.paymentMethod?.toUpperCase()}
          </p>
        </div>

        <div className="border-t-2 pt-4">
          <div className="mb-1 text-xl font-semibold">Danh sách sản phẩm</div>
          <div className="mt-2 space-y-4">
            {order?.orderDetails?.map((orderDetail) => (
              <div
                key={orderDetail.id}
                className="rounded-lg border border-gray-50 p-4 shadow-sm"
              >
                <div>
                  <strong>Tên sản phẩm:</strong> {orderDetail.product.name}
                </div>
                <div>
                  <strong>Giá:</strong> {orderDetail.product.price} VNĐ
                </div>
                <div>
                  <strong>Màu sắc:</strong> {orderDetail.productVariant?.color}
                </div>
                <div>
                  <strong>Size:</strong> {orderDetail.productVariant?.size}
                </div>
                <div>
                  <strong>Số lượng:</strong> {orderDetail.numberOfProducts}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
