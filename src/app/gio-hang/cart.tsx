'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useCart } from '@/hooks/use-cart'
import { API_URL } from '../../configs/apiConfig'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  ShoppingCart,
  Trash2,
  MinusCircle,
  PlusCircle,
  CreditCard,
} from 'lucide-react'

export default function EnhancedCart() {
  const { cart, loadCartFromLocalStorage, updateQuantity, removeFromCart } =
    useCart()

  useEffect(() => {
    loadCartFromLocalStorage()
  }, [loadCartFromLocalStorage])

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  )

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="mx-auto w-full max-w-4xl">
        <CardHeader>
          <CardTitle className="flex items-center text-2xl font-bold">
            <ShoppingCart className="mr-2" />
            Giỏ hàng của bạn
          </CardTitle>
        </CardHeader>
        <CardContent>
          {cart.length === 0 ? (
            <div className="py-8 text-center text-muted-foreground">
              Giỏ hàng của bạn đang trống. Hãy thêm sản phẩm vào giỏ hàng!
            </div>
          ) : (
            <ScrollArea className="h-[400px] pr-4">
              {cart.map((item, index) => (
                <div key={item.id} className="flex items-center py-4">
                  <div className="mr-4 flex-shrink-0">
                    <Image
                      src={`${API_URL}/products/images/${item.imageUrl}`}
                      alt={item.name}
                      width={80}
                      height={80}
                      className="rounded-md object-cover"
                    />
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {item.size} - {item.color}
                    </p>
                    <div className="mt-2 flex items-center">
                      <Button
                        size="icon"
                        onClick={() =>
                          updateQuantity(
                            item.id,
                            item.variantId,
                            Math.max(1, item.quantity - 1),
                          )
                        }
                      >
                        <MinusCircle className="h-4 w-4" />
                      </Button>
                      <Input
                        type="number"
                        value={item.quantity || 1}
                        min="1"
                        max={item.stock}
                        className="mx-2 w-16 text-center"
                        onChange={(e) => {
                          const newQuantity = Number(e.target.value) || 1
                          updateQuantity(
                            item.id,
                            item.variantId,
                            Math.min(Math.max(newQuantity, 1), item.stock),
                          )
                        }}
                      />
                      <Button
                        size="icon"
                        onClick={() =>
                          updateQuantity(
                            item.id,
                            item.variantId,
                            Math.min(item.quantity + 1, item.stock),
                          )
                        }
                      >
                        <PlusCircle className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="ml-4 text-right">
                    <p className="font-semibold">
                      {new Intl.NumberFormat('vi-VN', {
                        style: 'currency',
                        currency: 'VND',
                      }).format(item.price * item.quantity)}
                    </p>
                    <Button
                      variant="destructive"
                      size="sm"
                      className="mt-2"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Xóa
                    </Button>
                  </div>
                </div>
              ))}
            </ScrollArea>
          )}
        </CardContent>
        <CardFooter className="flex flex-col items-center justify-between sm:flex-row">
          <div className="mb-4 sm:mb-0">
            <p className="text-lg font-semibold">
              Tổng tiền:{' '}
              {new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND',
              }).format(totalPrice)}
            </p>
          </div>
          <Link href="/thanh-toan" passHref>
            <Button className="w-full sm:w-auto" disabled={cart.length === 0}>
              <CreditCard className="mr-2 h-4 w-4" />
              Thanh toán
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}
