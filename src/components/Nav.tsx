'use client'
import LogoutButton from '@/components/LogoutButton'
import { ModeToggle } from '@/components/ModeToggle'
import useSWR from 'swr'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuGroup,
  DropdownMenuContent,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { CiShoppingCart } from 'react-icons/ci'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import UserAvatar from '@/components/UserAvatar'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface Category {
  name?: string
  href?: string
}

interface Link {
  name: string
  href: string
  dropdown?: Category[]
}

export default function Nav() {
  const path = usePathname()
  console.log(path)
  const fetcher = (url: string) => fetch(url).then((res) => res.json())

  const { data, error, isLoading } = useSWR<{ [key: string]: Category }>(
    'https://product-7ffbf-default-rtdb.firebaseio.com/categories.json',
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  )

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

  const links: Link[] = [
    {
      name: 'Trang chủ',
      href: '/',
    },
    {
      name: 'Danh mục',
      href: 'danh-muc',
      dropdown: categories,
    },
    {
      name: 'Liên hệ',
      href: '/lien-he',
    },
  ]

  return (
    <>
      {links.map((link) => {
        if (link.name === 'Danh mục') {
          return (
            <div
              key={link.name}
              className={`transition ease-in-out
                ${path.match(link.href) ? 'border-b-2 border-primary' : ''}`}
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
                          key={item.name}
                          asChild
                        >
                          <Link href={item.href}>{item.name}</Link>
                        </DropdownMenuItem>
                      ) : null
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
            key={link.name}
            className={path === link.href ? 'border-b-2 border-primary' : ''}
          >
            {link.name}
          </Link>
        )
      })}
      <div className="flex max-w-sm items-center gap-1">
        <Input type="text" placeholder="Tìm kiếm" />
        <Button variant="outline" aria-label="Tìm kiếm">
          <MagnifyingGlassIcon className="h-4 w-4" />
        </Button>
      </div>
      <div className='flex items-center gap-2'>
        <Button variant="outline" aria-label="Giỏ hàng" className='p-3'>
          <CiShoppingCart className="h-4 w-4" />
        </Button>
        <ModeToggle />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <span className="cursor-pointer">
              <UserAvatar />
            </span>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Link href="/ho-so">Hồ sơ</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogoutButton />
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  )
}
