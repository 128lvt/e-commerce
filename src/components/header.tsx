'use client'

import Link from 'next/link'
import MobileNav from './mobile-nav'
import Nav from './nav'
import { motion } from 'framer-motion'
import SnowEffect from './SnowEffect'
import { FaSnowflake } from 'react-icons/fa'

export default function Header() {
  return (
    <>
      <SnowEffect />
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="xl:py-12"
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
                <FaSnowflake className="mr-2 text-blue-400" />
                6AE Shop
                <motion.span
                  className="ml-1 text-red-600"
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
    </>
  )
}
