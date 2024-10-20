'use client';
import { StarIcon } from '@radix-ui/react-icons';
import { ProductItem } from '@/components/ProductItem';
import { Button } from '@/components/ui/button';
import useSWR from 'swr';
import { Product } from '../../types/Product';

interface IProps {
  title: string;
}

export default function HomePageProducts(title: IProps) {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());

  const { data, error, isLoading } = useSWR<{ [key: string]: Product }>(
    'https://product-7ffbf-default-rtdb.firebaseio.com/products.json',
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!data) {
    console.log('No product available');
  }

  if (error) {
    return <div>Error loading product</div>;
  }

  const products: Product[] = Object.values(data || {});

  return (
    <div className="w-full rounded-md bg-[#577877] px-2 pb-2 dark:bg-[#162623]">
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