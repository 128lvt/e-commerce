'use client'
import { ModeToggle } from '@/components/ModeToggle'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuGroup,
  DropdownMenuContent,
} from '@/components/ui/dropdown-menu'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { CiShoppingCart } from 'react-icons/ci'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Badge } from '@/components/ui/badge'
import { Category } from '../../types/Category'
import Profile from '@/components/Profile'
import useFetchCategories from '@/hooks/CategoryLoader'
import createLinks from './utils/Links'

interface Link {
  name: string
  href: string
  dropdown?: Category[]
}

export default function Nav() {
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

  return (
    <>
      {links.map((link) => {
        if (link.name === 'Danh mục') {
          return (
            <div
              key={link.name}
              className={`transition ease-in-out ${path.match(link.href) ? 'border-b-2 border-[--primary]' : ''}`}
            >
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <span className="cursor-pointer">{link.name}</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuGroup>
                    {link.dropdown?.map((item) =>
                      item.href && item.name ? (
                        <DropdownMenuItem
                          className="cursor-pointer"
                          key={item.href}
                          asChild
                        >
                          <Link href={item.href}>{item.name}</Link>
                        </DropdownMenuItem>
                      ) : null,
                    )}
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )
        }

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
      <div className="flex max-w-sm items-center gap-1">
        <Input type="text" className="p-3" placeholder="Tìm kiếm" />
        <Button
          className="bg-[--background] p-3"
          variant="outline"
          aria-label="Tìm kiếm"
        >
          <MagnifyingGlassIcon className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          aria-label="Giỏ hàng"
          className="relative bg-[--background] p-3"
        >
          <Badge className="absolute right-[-0.5rem] top-[-0.5rem] flex h-5 w-5 items-center justify-center rounded-full bg-purple-700 text-xs">
            1
          </Badge>
          <CiShoppingCart className="h-4 w-4" />
        </Button>
        <ModeToggle />
        <Profile />
      </div>
    </>
  )
}
