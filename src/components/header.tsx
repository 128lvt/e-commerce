'use client'

import Link from 'next/link'
import MobileNav from './mobile-nav'
import Nav from './nav'
import { motion } from 'framer-motion'
import { FaSnowflake } from 'react-icons/fa'

export default function Header() {
  return (
    <div className="relative overflow-hidden">
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 xl:py-12"
      >
        <div className="container mx-auto flex items-center justify-between">
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Link href="/">
              <motion.h1
                className="flex items-center text-4xl font-semibold"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaSnowflake className="mr-2 text-blue-200" />
                6AE Shop
                <motion.span
                  className="ml-1 text-red-400"
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 0.5, delay: 1 }}
                >
                  .
                </motion.span>
              </motion.h1>
            </Link>
          </motion.div>
          {/* Desktop Nav */}
          <div className="hidden items-center gap-8 xl:flex">
            <Nav />
          </div>
          {/* Mobile Nav */}
          <div className="py-8 xl:hidden">
            <MobileNav />
          </div>
        </div>
      </motion.header>
      <div className="absolute inset-0 z-0">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-1 w-1 rounded-full bg-white"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0, 1, 0], opacity: [0, 1, 0] }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>
      {/* <div className="absolute inset-0 from-blue-900 to-black opacity-90 dark:bg-gradient-to-b" /> */}
    </div>
  )
}
