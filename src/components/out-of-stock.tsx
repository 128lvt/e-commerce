'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AlertCircle, XCircle, ChevronDown } from 'lucide-react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Image from 'next/image'
import { API_URL } from '@/configs/apiConfig'

interface ProductVariant {
  id: number
  size: string
  color: string
  stock: number
  p_id: number
}

interface Product {
  id: number
  name: string
  price: number
  stock: number
  description: string
  category: {
    id: number
    name: string
  }
  variants: ProductVariant[]
  images: {
    id: number
    imageUrl: string
    product_id: number
  }[]
}

interface OutOfStock {
  product: Product
  productVariant: ProductVariant
}

export function OutOfStockList({ data }: { data: OutOfStock[] }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  const filteredProducts = data?.filter(
    (item) =>
      item.product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.productVariant.size
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      item.productVariant.color
        .toLowerCase()
        .includes(searchTerm.toLowerCase()),
  )

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl font-bold">
              Sản phẩm sắp hết hàng
            </CardTitle>
            <CardDescription className="text-lg">
              <span className="font-semibold text-primary">
                {filteredProducts?.length}
              </span>{' '}
              sản phẩm cần thêm số lượng
            </CardDescription>
          </div>
          <AlertCircle className="h-10 w-10 text-red-500" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <Input
            type="text"
            placeholder="Search by name, size, or color..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
        <AnimatePresence>
          {filteredProducts
            ?.slice(0, isExpanded ? undefined : 5)
            .map((item, index) => (
              <motion.div
                key={`${item.product.id}-${item.productVariant.id}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="mb-4 flex items-center justify-between rounded-lg border p-4 transition-colors hover:bg-muted/50"
              >
                <div className="flex items-center gap-4">
                  <div className="relative h-12 w-12 rounded-md bg-muted">
                    {item.product.images[0] && (
                      <Image
                        src={`${API_URL}/products/images/${item.product.images[0].imageUrl}`}
                        alt="Product Image"
                        className="h-full w-full rounded-md object-cover"
                        width={100}
                        height={100}
                        priority
                      />
                    )}
                    <XCircle className="absolute -right-2 -top-2 h-6 w-6 text-red-500" />
                  </div>
                  <div>
                    <h3 className="font-medium">{item.product.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      Size: {item.productVariant.size}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">
                    Số lượng: {item.productVariant.stock}
                  </p>
                </div>
              </motion.div>
            ))}
        </AnimatePresence>
        {filteredProducts?.length > 5 && (
          <Button
            className="mt-4 w-full"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? 'Show Less' : 'Show More'}
            <ChevronDown
              className={`ml-2 h-4 w-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
            />
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
