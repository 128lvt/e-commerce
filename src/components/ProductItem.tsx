import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import Image from 'next/image'
import { AddToCartDialog } from './AddToCartDialog'
import { CiCircleInfo } from 'react-icons/ci'
import { Product } from '../../types/Type'
import { API_URL } from '@/configs/apiConfig'

export function ProductItem(product: Product) {
  const imageUrl =
    product.images && product.images.length > 0
      ? `${API_URL}/products/images/${product.images[0].imageUrl}`
      : '/default-image.jpg'

  return (
    <Card className="mt-3 w-full rounded-md bg-[--background] shadow-sm shadow-gray-600 transition-transform duration-300 hover:border-emerald-300">
      <CardHeader className="py-4">
        <CardTitle className="flex items-center justify-between text-ellipsis whitespace-nowrap">
          {product.name ? product.name : 'Tên sản phẩm'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Image
          src={imageUrl}
          width={400}
          height={400}
          alt="Product"
          className="h-64 w-full object-cover"
        ></Image>
        <p className="mt-5 font-semibold">
          {new Intl.NumberFormat('vi-VN').format(product.price)} VNĐ
        </p>
      </CardContent>
      <CardFooter className="flex justify-end gap-3 px-2 pb-3">
        <Button className="transition-transform duration-300 hover:scale-110">
          <CiCircleInfo className="h-4 w-4 stroke-1" />
        </Button>
        <AddToCartDialog
          images={product.images}
          name={product.name}
          price={product.price}
          category={product.category}
          id={product.id}
          variants={product.variants}
        />
      </CardFooter>
    </Card>
  )
}
