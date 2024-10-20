import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Image from 'next/image';

interface IProps {
  name: string;
  price: number;
  image: string;
  type: string;
}

export function ProductItem(prop: IProps) {
  return (
    <Card className="mt-3 w-full rounded-md bg-[--background] shadow-xl shadow-gray-600">
      <div className="w-50 relative">
        {prop.type !== 'none' && (
          <Badge className="absolute right-[-1rem] top-[-1rem] h-10 cursor-default rounded-full bg-red-500 shadow-lg shadow-gray-500">
            {prop.type}
          </Badge>
        )}
      </div>
      <CardHeader className="py-4">
        <CardTitle className="flex items-center justify-between">
          {prop.name}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Image
          src={`/products/${prop.image}`}
          width={400}
          height={400}
          alt="Product"
          className="h-64 w-full object-cover"
        ></Image>
        <p className="mt-5">
          {new Intl.NumberFormat('vi-VN').format(prop.price)} VNĐ
        </p>
      </CardContent>
      <CardFooter className="flex flex-col justify-between gap-1 px-2 pb-3 xl:flex-row">
        <Button variant="outline">Chi tiết</Button>
        <Button>Thêm vào giỏ hàng</Button>
      </CardFooter>
    </Card>
  );
}
