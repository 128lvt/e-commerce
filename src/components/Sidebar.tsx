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
import useFetchCategories from '@/hooks/CategoryLoader'
import { Category } from '../../types/Category'
import { usePathname } from 'next/navigation'

export default function Sidebar() {
  const path = usePathname()
  const { data, error, isLoading } = useFetchCategories()

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!data) {
    console.log('No categories available')
  }

  if (error) {
    return <div>Error loading categories</div>
  }

  // Chuyển dữ liệu từ fetch thành array categories
  const categories: Category[] = Object.keys(data || {}).map((key) => ({
    name: data?.[key]?.name, // Sử dụng toán tử an toàn khi truy cập thuộc tính
    href: `/danh-muc/${
      data?.[key]?.name
        ?.normalize('NFD') // Chuẩn hóa chuỗi để tách chữ và dấu
        .replace(/[\u0300-\u036f]/g, '') // Loại bỏ dấu
        .toLowerCase() // Chuyển thành chữ thường
        .replace(/\s+/g, '-') // Thay dấu cách bằng dấu gạch ngang
        .replace(/[^\w\-]+/g, '') || '/'
    }`, // Loại bỏ các ký tự đặc biệt ngoài dấu gạch ngang
  }))

  const links = createLinks(categories)
  console.table(links)
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
