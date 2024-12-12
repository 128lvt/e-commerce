'use client'

import { Card, CardContent } from '@/components/ui/card'
import { motion } from 'framer-motion'
import { GiftIcon, Snowflake, Bell } from 'lucide-react'

export default function IconBottom() {
  const features = [
    {
      icon: GiftIcon,
      title: 'Gói quà miễn phí',
      description: 'Dịch vụ gói quà đặc biệt cho Giáng Sinh',
    },
    {
      icon: Snowflake,
      title: 'Giao hàng trong ngày',
      description: 'Nhận quà kịp thời cho đêm Giáng Sinh',
    },
    {
      icon: Bell,
      title: 'Hỗ trợ 24/7',
      description: 'Luôn sẵn sàng phục vụ trong mùa lễ hội',
    },
  ]

  return (
    <div className="container mx-auto mt-14 w-full px-4">
      <motion.h2
        className="mb-8 text-center text-3xl font-bold text-red-600"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Dịch vụ Giáng Sinh đặc biệt
      </motion.h2>
      <div className="grid gap-6 md:grid-cols-3">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <Card className="overflow-hidden bg-gradient-to-br from-red-100 to-green-100">
              <CardContent className="flex flex-col items-center p-6">
                <feature.icon className="mb-4 h-12 w-12 text-red-600" />
                <h3 className="mb-2 text-xl font-semibold text-green-700">
                  {feature.title}
                </h3>
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
