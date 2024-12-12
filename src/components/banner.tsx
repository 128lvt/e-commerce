'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FaGift, FaSnowflake } from 'react-icons/fa'

export default function Banner() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="relative h-[6rem] w-full overflow-hidden rounded-lg shadow-lg transition-all duration-300 ease-in-out hover:shadow-xl sm:h-[8rem] md:h-[10rem] lg:h-[12rem]">
      <div className="absolute inset-0 animate-gradient-x bg-gradient-to-br from-red-600 via-green-500 to-red-500" />
      <div className="absolute inset-0 bg-[url('/christmas-pattern.png')] bg-repeat opacity-20" />
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="mb-1 text-xl font-bold text-white sm:text-2xl md:text-3xl lg:text-4xl">
          Giáng Sinh An Lành tại 6AE Shop
        </h1>
        <p className="mb-2 max-w-md text-sm text-white/90 sm:text-base md:text-lg lg:text-xl">
          Khám phá bộ sưu tập Giáng Sinh độc đáo
        </p>
        <motion.button
          className={`flex items-center rounded bg-white px-3 py-1 text-sm font-semibold text-red-600 transition-all duration-300 hover:bg-opacity-90 sm:px-4 sm:py-2 sm:text-base ${
            mounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Explore our Christmas offerings"
        >
          <FaGift className="mr-2" />
          Mua quà Giáng Sinh
        </motion.button>
      </motion.div>
      <motion.div
        className="absolute left-2 top-2 text-4xl text-white"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      >
        <FaSnowflake />
      </motion.div>
      <motion.div
        className="absolute bottom-2 right-2 text-4xl text-white"
        animate={{ rotate: -360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      >
        <FaSnowflake />
      </motion.div>
    </div>
  )
}
