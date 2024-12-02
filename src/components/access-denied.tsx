'use client'

import { motion } from 'framer-motion'
import { AlertTriangle } from 'lucide-react'
import Link from 'next/link'

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

export default function AccessDenied() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 py-8">
      <motion.div
        className="container mx-auto px-4 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <AlertTriangle className="mx-auto mb-4 h-16 w-16 text-yellow-500" />
        </motion.div>
        <motion.h1
          className="mb-4 text-4xl font-bold text-gray-800"
          variants={itemVariants}
        >
          Không có quyền truy cập
        </motion.h1>
        <motion.p
          className="mb-8 text-xl text-gray-600"
          variants={itemVariants}
        >
          Bạn không có quyền truy cập vào trang này. Vui lòng liên hệ với quản
          trị viên nếu bạn cho rằng đây là một sự nhầm lẫn.
        </motion.p>
        <motion.div variants={itemVariants}>
          <Link
            href="/"
            className="rounded bg-blue-500 px-4 py-2 font-bold text-white transition duration-300 hover:bg-blue-600"
          >
            Quay lại trang chủ
          </Link>
        </motion.div>
      </motion.div>
    </div>
  )
}
