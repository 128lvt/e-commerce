export interface Product {
  name: string;
  price: number;
  image: string;
  variants: IVariant[]
}

interface IVariant {
  size: string
  color: string
  stock: number
}