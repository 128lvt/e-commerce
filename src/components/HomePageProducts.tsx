import { StarIcon } from '@radix-ui/react-icons';
import { ProductItem } from '@/components/ProductItem';
import { Button } from '@/components/ui/button';

interface IProps {
  title: string;
}

export default function HomePageProducts(title: IProps) {
  const products = [
    {
      name: 'Product 1',
      price: 100000,
      image: '1.jpg',
    },
    {
      name: 'Product 2',
      price: 200000,
      image: '2.jpg',
    },
    {
      name: 'Product 3',
      price: 300000,
      image: '3.jpg',
    },
    {
      name: 'Product 4',
      price: 400000,
      image: '4.jpg',
    },
  ];
  return (
    <div className="w-full px-2 pb-2">
      <div>
        <p className="mt-2 flex items-center px-2 py-1 text-xl font-bold">
          {title.title}
          <span className="ms-2">
            <StarIcon className="h-6 w-6" />
          </span>
        </p>
        <div className="grid grid-cols-2 justify-center gap-5 md:grid-cols-2 xl:grid-cols-4">
          {products.map((product) => (
            <ProductItem
              key={product.name}
              name={product.name}
              price={product.price}
              image={product.image}
            />
          ))}
        </div>
      </div>
      <Button variant="outline" className="mx-auto mt-5 flex">
        Xem tất cả sản phẩm
      </Button>
    </div>
  );
}
