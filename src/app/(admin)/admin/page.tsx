'use client'
import { motion } from 'framer-motion'
import CategorySalesChart from '@/components/selling-chart-category'
import { OutOfStockList } from '@/components/out-of-stock'
import MonthlySalesChart from '@/components/selling-chart-monthly'
import useUser from '@/hooks/use-user'
import {
  useCategoriesChart,
  useMonthlyChart,
  useOutOfStock,
} from '@/hooks/use-dashboard'

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
  const { monthlyChart } = useMonthlyChart(token ?? '')
  const { categoryChart } = useCategoriesChart(token ?? '')
  const { outOfStock } = useOutOfStock(token ?? '')
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
      <motion.div
        className="container mx-auto px-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <h1 className="mb-8 text-3xl font-bold text-gray-800">
          Thống kê bán hàng
        </h1>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <motion.div
            variants={itemVariants}
            className="col-span-1 lg:col-span-2"
          >
            <MonthlySalesChart data={monthlyChart} />
          </motion.div>
          <motion.div variants={itemVariants}>
            <CategorySalesChart chartData={categoryChart ?? []} />
          </motion.div>
          <motion.div variants={itemVariants}>
            <OutOfStockList data={outOfStock} />
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}
