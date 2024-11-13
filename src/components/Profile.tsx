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
import UserAvatar from '@/components/UserAvatar'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import useUser from '@/hooks/use-user'

export default function Profile() {
  const { user, setUser, loadUserFromLocalStorage } = useUser()
  const router = useRouter()

  useEffect(() => {
    loadUserFromLocalStorage()
  }, [loadUserFromLocalStorage])

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

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <span className="cursor-pointer">
          <UserAvatar />
        </span>
      </DropdownMenuTrigger>
      {user && (
        <DropdownMenuContent>
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <p>{user?.fullName}</p>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/ho-so">Hồ sơ</Link>
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
