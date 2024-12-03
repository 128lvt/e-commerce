'use client'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTrigger,
} from '@/components/ui/sheet'
import { HamburgerMenuIcon } from '@radix-ui/react-icons'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import createLinks from './utils/Links'

export default function Sidebar() {
  const links = createLinks()
  const path = usePathname()
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="bg-[--background]">
          <HamburgerMenuIcon />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <Link href="/">
            <h1 className="text-4xl font-semibold text-white dark:text-black">
              6AE Shop<span className="text-cyan-200">.</span>
            </h1>
          </Link>
        </SheetHeader>
        <div className="mt-10 flex flex-col items-center gap-10 py-12 text-white dark:text-black">
          {links.map((link) => (
            <Link
              href={link.href}
              className={`${path === link.href ? 'border-b-2 border-[--primary]' : ''} text-xl transition ease-in-out`}
              key={link.href}
            >
              {link.name}
            </Link>
          ))}
        </div>
        <SheetFooter>
          <SheetClose asChild>
            {/* <Button type="submit">Save changes</Button> */}
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
