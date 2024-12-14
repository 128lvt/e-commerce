'use client'
import { useEffect } from 'react'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import useUser from '@/hooks/use-user'
import UserAvatar from './user-avatar'

export default function Profile() {
  const { user, setUser, loadUserFromCookies } = useUser()
  const router = useRouter()

  useEffect(() => {
    loadUserFromCookies()
  }, [loadUserFromCookies])

  const handleLogout = async () => {
    const response = await fetch('/api/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (response.ok) {
      document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
      window.location.reload()
      setUser(null)
      router.push('/dang-nhap') // Chuyển hướng về trang đăng nhập
    }
  }

  const handleLogin = () => {
    if (user) return
    router.push('/dang-nhap')
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild onClick={handleLogin}>
        <span className="cursor-pointer">
          <UserAvatar />
        </span>
      </DropdownMenuTrigger>
      {user && (
        <DropdownMenuContent>
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <Link href="/ho-so">Hồ sơ ({user.fullName})</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/don-hang">Lịch sử mua hàng</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <button onClick={handleLogout}>Đăng xuất</button>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      )}
    </DropdownMenu>
  )
}
