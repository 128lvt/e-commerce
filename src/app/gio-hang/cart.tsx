'use client'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import Image from 'next/image'
import { API_URL } from '../../configs/apiConfig'
import { Button } from '@/components/ui/button'
import { useEffect } from 'react'
import Link from 'next/link'
import { useCart } from '@/hooks/use-cart'
import { Input } from '@/components/ui/input'

export default function Cart() {
  const { cart, loadCartFromLocalStorage, updateQuantity, removeFromCart } =
    useCart()

  useEffect(() => {
    loadCartFromLocalStorage()
  }, [loadCartFromLocalStorage])

  console.log(cart)

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  )

  return (
    <div className="container mx-auto">
      <Table>
        <TableCaption>
          Tổng tiền: {new Intl.NumberFormat('vi-VN').format(totalPrice)} VNĐ
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Tên sản phẩm</TableHead>
            <TableHead>Hình ảnh</TableHead>
            <TableHead>Size</TableHead>
            <TableHead>Màu</TableHead>
            <TableHead>Số lượng</TableHead>
            <TableHead className="text-right">Giá</TableHead>
            <TableHead className="text-right">Hành động</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {cart.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">{item.name}</TableCell>
              <TableCell>
                <Image
                  src={`${API_URL}/products/images/${item.imageUrl}`}
                  alt="Product Image"
                  height={500}
                  width={500}
                  className="w-[100px]"
                />
              </TableCell>
              <TableCell>{item.size}</TableCell>
              <TableCell>{item.color}</TableCell>
              <TableCell>
                <Input
                  type="number"
                  value={item.quantity || 1} // Gán giá trị mặc định nếu quantity là undefined
                  min="1"
                  max={item.stock}
                  className="w-20"
                  onChange={(e) => {
                    const newQuantity = Number(e.target.value) || 1
                    updateQuantity(
                      item.id,
                      item.variantId,
                      Math.min(Math.max(newQuantity, 1), item.stock),
                    )
                  }}
                />
              </TableCell>

              <TableCell className="text-right">
                {new Intl.NumberFormat('vi-VN').format(
                  item.price * item.quantity,
                )}{' '}
                VNĐ
              </TableCell>
              <TableCell className="text-right">
                <Button onClick={() => removeFromCart(item.id)}>Xóa</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="container flex justify-end">
        <Link href="thanh-toan" className="rounded-md bg-red-600 px-5 py-3">
          Thanh toán
        </Link>
      </div>
    </div>
  )
}
