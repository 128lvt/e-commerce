'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface Snowflake {
  id: number
  x: number
  y: number
  size: number
  speed: number
}

export default function SnowEffect() {
  const [snowflakes, setSnowflakes] = useState<Snowflake[]>([])

  useEffect(() => {
    const createSnowflake = (): Snowflake => ({
      id: Math.random(),
      x: Math.random() * window.innerWidth,
      y: -10,
      size: Math.random() * 5 + 2,
      speed: Math.random() * 2 + 1,
    })

    const initialSnowflakes = Array.from({ length: 50 }, createSnowflake)
    setSnowflakes(initialSnowflakes)

    const interval = setInterval(() => {
      setSnowflakes((prevSnowflakes) =>
        prevSnowflakes.map((flake) => ({
          ...flake,
          y: flake.y + flake.speed,
          x: flake.x + Math.sin(flake.y * 0.1) * 2,
        })),
      )
    }, 50)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="pointer-events-none fixed inset-0 z-50">
      {snowflakes.map((flake) => (
        <motion.div
          key={flake.id}
          className="absolute rounded-full bg-white opacity-80"
          style={{
            width: flake.size,
            height: flake.size,
            x: flake.x,
            y: flake.y,
          }}
          animate={{
            y: window.innerHeight + 10,
          }}
          transition={{
            duration: (window.innerHeight - flake.y) / (flake.speed * 20),
            ease: 'linear',
            repeat: Infinity,
            repeatType: 'loop',
          }}
        />
      ))}
    </div>
  )
}
