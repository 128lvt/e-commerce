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
import { API_URL } from '../configs/apiConfig'
import { Button } from '@/components/ui/button'
import { useCart } from '@/hooks/useCart' // Đảm bảo bạn import đúng
import { useEffect } from 'react'
import Link from 'next/link'

export default function Cart() {
  const { cart, loadCartFromLocalStorage, removeFromCart } = useCart()

  useEffect(() => {
    loadCartFromLocalStorage() // Nạp giỏ hàng từ localStorage khi component được mount
  }, [loadCartFromLocalStorage])

  console.log(cart)
  const totalPrice = cart.reduce((total, item) => total + item.price, 0)

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
              <TableCell>{1}</TableCell>
              <TableCell className="text-right">
                {new Intl.NumberFormat('vi-VN').format(item.price)} VNĐ
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
