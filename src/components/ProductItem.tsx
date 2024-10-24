import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import Image from 'next/image'
import { CiShoppingCart, CiCircleInfo } from 'react-icons/ci'

interface IProps {
  name: string
  price: number
  image: string
  type: string
}

export function ProductItem(prop: IProps) {
  return (
    <Card className="mt-3 w-full rounded-md bg-[--background] shadow-sm shadow-gray-600 transition-transform duration-300 hover:border-emerald-300">
      <CardHeader className="py-4">
        <CardTitle className="flex items-center justify-between text-ellipsis whitespace-nowrap">
          {prop.name ? prop.name : 'Tên sản phẩm'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="w-50 relative">
          {prop.type !== 'none' && (
            <Badge className="absolute right-[-1rem] top-[-1rem] h-10 cursor-default rounded-full bg-red-500 shadow-sm shadow-gray-500">
              {prop.type}
            </Badge>
          )}
        </div>
        <Image
          src={prop.image ? `/products/${prop.image}` : '/default-image.jpg'}
          width={400}
          height={400}
          alt="Product"
          className="h-64 w-full object-cover"
        ></Image>
        <p className="mt-5 font-semibold">
          {new Intl.NumberFormat('vi-VN').format(prop.price)} VNĐ
        </p>
      </CardContent>
      <CardFooter className="flex justify-end gap-3 px-2 pb-3">
        <Button className="transition-transform duration-300 hover:scale-110">
          <CiCircleInfo className="h-4 w-4 stroke-1" />
        </Button>
        <Button className="transition-transform duration-300 hover:scale-110">
          <CiShoppingCart className="h-4 w-4 stroke-1" />
        </Button>
      </CardFooter>
    </Card>
  )
}
