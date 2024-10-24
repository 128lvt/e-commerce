// import { StarIcon } from '@radix-ui/react-icons';
import { Product } from '../../types/Product';

interface ProductProps {
  Products: Product[];
}
export default function ProductList(Products: ProductProps) {
  const products = Products.Products;

  return (
    <div className="w-full pb-2">
      {/* <p className="flex items-center bg-slate-500 px-2 py-1 text-2xl font-bold text-white">
        Sản phẩm mới
        <span className="ms-2">
          <StarIcon className="h-6 w-6" />
        </span>
      </p> */}
      {/* <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {products.map((product) => (
          <ProductItem
            key={product.name}
            name={product.name}
            price={product.price}
            image={product.image}
          />
        ))}
      </div>*/}
    </div>
  );
}
