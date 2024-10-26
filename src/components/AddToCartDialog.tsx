import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import Image from 'next/image'

import { CiShoppingCart } from 'react-icons/ci'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { useState } from 'react'

interface IProps {
  name: string
  price: number
  image: string
}

export function AddToCartDialog(prop: IProps) {
  const [selectedSize, setSelectedSize] = useState('S')
  const [selectedColor, setSelectedColor] = useState('Đen')

  const handleAddToCart = () => {
    const selectedProduct = {
      name: prop.name,
      price: prop.price,
      image: prop.image,
      size: selectedSize,
      color: selectedColor,
    }
    console.log('Product added to cart:', selectedProduct)
    // You can add functionality here to save or use `selectedProduct` as needed.
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="transition-transform duration-300 hover:scale-110">
          <CiShoppingCart className="h-4 w-4 stroke-1" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            <p>{prop.name}</p>
          </DialogTitle>
          <DialogDescription>Mô tả sản phẩm</DialogDescription>
        </DialogHeader>
        <Image
          src={prop.image ? `/products/${prop.image}` : '/default-image.jpg'}
          width={400}
          height={400}
          alt="Product"
          className="h-64 w-full object-cover"
        ></Image>
        <RadioGroup
          defaultValue={selectedSize}
          onValueChange={setSelectedSize}
          className="flex flex-col"
        >
          <p>Kích thước</p>
          <div className="flex gap-3">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="S" id="r1" />
              <Label htmlFor="r1">S</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="M" id="r2" />
              <Label htmlFor="r2">M</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="L" id="r3" />
              <Label htmlFor="r3">L</Label>
            </div>
          </div>
        </RadioGroup>
        <RadioGroup
          defaultValue={selectedColor}
          onValueChange={setSelectedColor}
          className="flex flex-col"
        >
          <p>Màu sắc</p>
          <div className="flex gap-3">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Đen" id="r1" />
              <Label htmlFor="r1">Đen</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Đỏ" id="r2" />
              <Label htmlFor="r2">Đỏ</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="Tím" id="r3" />
              <Label htmlFor="r3">Tím</Label>
            </div>
          </div>
        </RadioGroup>
        <DialogFooter className="flex items-center sm:justify-between">
          <p className="">
            <span>Giá: </span>
            {new Intl.NumberFormat('vi-VN').format(prop.price)} VNĐ
          </p>
          <div>
            <Button onClick={handleAddToCart} type="submit">
              Thêm vào giỏ hàng
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
