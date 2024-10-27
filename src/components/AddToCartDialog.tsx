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
import ProductVariant from './ProductVariant'
import { useState } from 'react'
import { useToast } from '@/hooks/use-toast'

interface IVariant {
  size: string
  color: string
  stock: number
}

interface IProps {
  name: string
  price: number
  image: string
  variants: IVariant[]
}

export function AddToCartDialog(prop: IProps) {
  const [selectedSize, setSelectedSize] = useState<string>('')
  const [selectedColor, setSelectedColor] = useState<string>('')

  const { toast } = useToast()

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      toast({
        description: 'Vui lòng chọn kích thước và màu sắc!',
        variant: 'error',
      })
      return
    }

    const productToAdd = {
      name: prop.name,
      price: prop.price,
      size: selectedSize,
      color: selectedColor,
    }

    // Log thông tin sản phẩm ra console
    console.log('Sản phẩm được thêm vào giỏ hàng:', productToAdd)
    toast({
      description: `Đã thêm ${productToAdd.name} vào giỏ hàng.`,
    })
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
        />
        <ProductVariant
          variants={prop.variants}
          onSizeChange={setSelectedSize} // Gọi hàm để cập nhật kích thước
          onColorChange={setSelectedColor} // Gọi hàm để cập nhật màu sắc
        />
        <DialogFooter className="flex items-center sm:justify-between">
          <p>
            <span>Giá: </span>
            {new Intl.NumberFormat('vi-VN').format(prop.price)} VNĐ
          </p>
          <div>
            <Button type="button" onClick={handleAddToCart}>
              Thêm vào giỏ hàng
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
