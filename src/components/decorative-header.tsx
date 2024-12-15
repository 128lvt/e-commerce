'use client'
import { motion } from 'framer-motion'
import { FaSnowflake, FaGift, FaTree } from 'react-icons/fa'
import { useEffect, useState } from 'react'

export function DecorativeHeader() {
  const [positions, setPositions] = useState<{ top: string; left: string }[]>(
    [],
  )

  useEffect(() => {
    const newPositions = [...Array(50)].map(() => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
    }))
    setPositions(newPositions)
  }, [])

  return (
    <motion.div
      className="relative overflow-hidden rounded-lg bg-gradient-to-br from-red-100 to-green-100 py-16 shadow-2xl dark:bg-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container relative z-10 mx-auto px-4 text-center">
        <motion.h1
          className="mb-4 text-4xl font-bold md:text-5xl"
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Chào mừng đến với 6AE Fashion
        </motion.h1>
        <motion.p
          className="mb-8 text-xl"
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          Khám phá bộ sưu tập Giáng Sinh độc đáo
        </motion.p>
        <motion.div
          className="flex justify-center space-x-4"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <FaSnowflake className="h-8 w-8" />
          <FaGift className="h-8 w-8 text-yellow-400" />
          <FaTree className="h-8 w-8 text-green-400" />
        </motion.div>
      </div>
      <div className="absolute inset-0 z-0">
        {positions.map((position, i) => (
          <motion.div
            key={i}
            className="absolute h-1 w-1 rounded-full bg-white"
            style={{
              top: position.top,
              left: position.left,
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0, 1, 0], opacity: [0, 1, 0] }}
            transition={{
              duration: Math.random() * 3 + 2, // Random duration between 2-5 seconds
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>
    </motion.div>
  )
}
