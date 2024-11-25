'use client'

import { Card, CardContent } from '@/components/ui/card'
import { motion } from 'framer-motion'
import { Truck, Shield, Headphones } from 'lucide-react'

export default function IconBottom() {
  const features = [
    {
      icon: Truck,
      title: 'Giao hàng nhanh',
      description: 'Giao hàng trong 3 ngày',
    },
    {
      icon: Shield,
      title: 'Đổi/Trả hàng miễn phí',
      description: 'Dễ dàng đổi/trả hàng',
    },
    {
      icon: Headphones,
      title: 'Hỗ trợ 24/7',
      description: 'Chăm sóc khách hàng 24/7',
    },
  ]

  return (
    <div className="container mx-auto mt-14 w-full px-4">
      <motion.h2
        className="mb-8 text-center text-3xl font-bold text-gray-800"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Tại sao nên chọn chúng tôi
      </motion.h2>
      <div className="grid gap-6 md:grid-cols-3">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <Card className="overflow-hidden">
              <CardContent className="flex flex-col items-center p-6">
                <feature.icon className="mb-4 h-12 w-12 text-primary" />
                <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>
                <p className="text-center text-sm text-gray-600">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
