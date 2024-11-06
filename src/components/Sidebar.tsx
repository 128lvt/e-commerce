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
import createLinks from './utils/Links'
import { usePathname } from 'next/navigation'
import { Category } from '../../types/Type'
import useCategory from '@/hooks/useCategory'

export default function Sidebar() {
  const path = usePathname()
  const { data, error, isLoading } = useCategory()

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (
    !data ||
    !data.data ||
    !Array.isArray(data.data) ||
    data.data.length === 0
  ) {
    return <div>No categories available</div>
  }

  if (error) {
    return <div>Error loading categories</div>
  }

  const categories: Category[] = data.data.map((category: Category) => ({
    id: category.id, // Đảm bảo category có trường id
    name: category.name, // Lấy tên danh mục từ dữ liệu
    href: `/danh-muc/${
      category.name
        ?.normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]+/g, '') || '/'
    }`,
  }))
  const links = createLinks(categories)
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
            <h1 className="text-4xl font-semibold">
              6AE Shop<span className="text-cyan-200">.</span>
            </h1>
          </Link>
        </SheetHeader>
        <div className="mt-10 flex flex-col items-center gap-10 py-12">
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
