'use client'

import { motion } from 'framer-motion'
import CategorySalesChart from '@/components/selling-chart-category'
import MonthlySalesChart from '@/components/selling-chart-monthly'
import useUser from '@/hooks/use-user'
import {
  useCategoriesChart,
  useCount,
  useMonthlyChart,
} from '@/hooks/use-dashboard'
import AccessDenied from '@/components/access-denied'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
}

export default function DashboardPage() {
  const token = useUser((state) => state.getToken())
  const role = useUser((state) => state.getRole())
  const { monthlyChart } = useMonthlyChart(token ?? '')
  const { categoryChart } = useCategoriesChart(token ?? '')
  const { countData } = useCount()

  if (!(role === 'ROLE_DEV' || role === 'ROLE_ADMIN')) {
    console.log(`Role không hợp lệ: ${role}, chuyển hướng...`)
    return <AccessDenied />
  } else {
    console.log(`Role hợp lệ: ${role}`)
  }
  return (
    <div className="min-h-screen bg-gradient-to-br p-8">
      <motion.div
        className="mx-auto max-w-[1600px]"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <h1 className="mb-8 text-3xl font-bold text-gray-800">
          Thống kê bán hàng
        </h1>

        <motion.div
          className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
        >
          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Số lượng sản phẩm
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{countData?.product}</div>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Số lượng đơn hàng
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{countData?.order}</div>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div variants={itemVariants}>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Số lượng người dùng
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{countData?.user}</div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </motion.div>
      <motion.div
        className="mx-auto max-w-[1600px]"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <h1 className="mb-8 text-3xl font-bold text-gray-800">
          Thống kê bán hàng
        </h1>
        <div className="grid grid-cols-12 gap-8">
          <motion.div variants={itemVariants} className="col-span-8 h-full">
            <MonthlySalesChart data={monthlyChart} />
          </motion.div>
          <motion.div variants={itemVariants} className="col-span-4 h-full">
            <CategorySalesChart chartData={categoryChart ?? []} />
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}
