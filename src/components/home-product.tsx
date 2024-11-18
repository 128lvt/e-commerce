'use client'

import { ProductItem } from '@/components/product-item'
import { Button } from '@/components/ui/button'
import { Product } from '../../types/Type'
import useHomePage from '@/hooks/use-home'
import { motion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'

interface IProps {
  title: string
  index: number
}

export default function HomePageProducts({ title }: IProps) {
  const { data, isLoading, error } = useHomePage()

  if (isLoading) {
    return <div className="flex justify-center p-8">Loading...</div>
  }

  if (!data) {
    return <div className="flex justify-center p-8">No products available</div>
  }

  if (error) {
    return <div className="flex justify-center p-8">Error loading products</div>
  }

  const products: Product[] = data.data

  const shuffleArray = (array: Product[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[array[i], array[j]] = [array[j], array[i]]
    }
  }

  shuffleArray(products)
  const randomProducts = products.slice(0, 8)

  return (
    <div className="w-full rounded-lg bg-gradient-to-r from-indigo-50 to-pink-50 p-6 shadow-lg">
      <motion.h2
        className="mb-6 text-2xl font-bold text-gray-800"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {title}
        <span className="ml-2 text-pink-500">*</span>
      </motion.h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {randomProducts.map((product, productIndex) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: productIndex * 0.1 }}
          >
            <ProductItem
              description={product.description}
              stock={product.stock}
              name={product.name}
              price={product.price}
              images={product.images}
              variants={product.variants}
              category={product.category}
              id={product.id}
            />
          </motion.div>
        ))}
      </div>
      <motion.div
        className="mt-8 flex justify-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <Button className="group bg-pink-500 text-white hover:bg-pink-600">
          View All Products
          <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </motion.div>
    </div>
  )
}
