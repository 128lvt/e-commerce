'use client'
import { ModeToggle } from '@/components/mode-toggle'
import { CiShoppingCart } from 'react-icons/ci'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Badge } from '@/components/ui/badge'
import createLinks from './utils/Links'
import { Category } from '../../types/Type'
import { useCart } from '@/hooks/use-cart'
import Search from './search'
import Profile from '@/app/(user)/(auth)/profile'
interface Link {
  name: string
  href: string
  dropdown?: Category[]
}

export default function Nav() {
  const path = usePathname()

  const { cart } = useCart()

  const links = createLinks()

  return (
    <>
      {links.map((link) => {
        return (
          <Link
            href={link.href}
            key={link.href}
            className={`${path === link.href ? 'border-b-2 border-[--primary]' : ''} transition ease-in-out`}
          >
            {link.name}
          </Link>
        )
      })}
      <Search padding="" />
      <div className="flex items-center gap-2">
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
        <ModeToggle />
        <Profile />
      </div>
    </>
  )
}
