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
import Profile from '@/components/Profile'
import createLinks from './utils/Links'
import useCategory from '@/hooks/useCategory'
import { Category } from '../../types/Type'
import { useCart } from '@/hooks/useCart'

interface Link {
  name: string
  href: string
  dropdown?: Category[]
}

export default function Nav() {
  const path = usePathname()

  const { cart } = useCart()

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
                          key={item.name} // Sử dụng item.id làm key
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
