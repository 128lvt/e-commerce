'use client'
import Profile from '@/app/(user)/(auth)/profile'
import { ModeToggle } from './mode-toggle'
import Sidebar from './sidebar'
import Link from 'next/link'
import { Badge } from './ui/badge'
import { CiShoppingCart } from 'react-icons/ci'
import { useCart } from '@/hooks/use-cart'

export default function MobileNav() {
  const { cart } = useCart()
  return (
    <div className="flex items-center gap-5">
      <ModeToggle />
      <Link
        href={'/gio-hang'}
        aria-label="Giỏ hàng"
        className="relative rounded-md border border-input p-[0.65rem] text-sm font-medium shadow-sm hover:bg-accent hover:text-accent-foreground"
      >
        <Badge className="absolute right-[-0.5rem] top-[-0.5rem] flex h-5 w-5 items-center justify-center rounded-full bg-purple-700 text-xs">
          {cart.length}
        </Badge>
        <CiShoppingCart className="h-4 w-4" />
      </Link>
      <Profile />
      <Sidebar />
    </div>
  )
}
