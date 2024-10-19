import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Image from 'next/image';

interface ProductProps {
  name: string;
  price: number;
  image: string;
}
export function ProductItem(Product: ProductProps) {
  return (
    <Card className="mt-3 w-full rounded-md">
      <CardHeader className="py-4">
        <CardTitle>{Product.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <Image
          src={`/products/${Product.image}`}
          width={400}
          height={400}
          alt="Product"
          className="h-[400px] w-full object-cover"
        ></Image>
        <p className="mt-5">
          {new Intl.NumberFormat('vi-VN').format(Product.price)} VNĐ
        </p>
      </CardContent>
      <CardFooter className="flex flex-col justify-between gap-1 px-2 pb-3 xl:flex-row">
        <Button variant="outline">Chi tiết</Button>
        <Button>Thêm vào giỏ hàng</Button>
      </CardFooter>
    </Card>
  );
}
