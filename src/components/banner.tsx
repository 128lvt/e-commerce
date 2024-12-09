'use client'

import { useState, useEffect } from 'react'

export default function Banner() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="relative h-[6rem] w-full overflow-hidden rounded-lg shadow-lg transition-all duration-300 ease-in-out hover:shadow-xl sm:h-[8rem] md:h-[10rem] lg:h-[12rem]">
      <div className="absolute inset-0 animate-gradient-x bg-gradient-to-br from-blue-600 via-teal-500 to-cyan-500" />
      <div className="bg-grid-white/[0.2] absolute inset-0 bg-[length:20px_20px]" />
      <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
        <h1 className="mb-1 text-xl font-bold text-white sm:text-2xl md:text-3xl lg:text-4xl">
          Chào mừng đến với 6AE Shop
        </h1>
        <p className="mb-2 max-w-md text-sm text-white/90 sm:text-base md:text-lg lg:text-xl">
          Cửa hàng cung cấp thời trang
        </p>
        <button
          className={`rounded bg-white px-3 py-1 text-sm font-semibold text-blue-600 transition-all duration-300 hover:bg-opacity-90 sm:px-4 sm:py-2 sm:text-base ${
            mounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}
          aria-label="Explore our offerings"
        >
          Mua ngay
        </button>
      </div>
    </div>
  )
}
