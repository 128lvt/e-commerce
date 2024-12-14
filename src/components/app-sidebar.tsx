'use client'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from './ui/collapsible'
import Link from 'next/link'
import {
  LayoutDashboard,
  LogIn,
  LogOut,
  Package,
  ShoppingCart,
} from 'lucide-react'
import useUser from '@/hooks/use-user'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export function AppSidebar() {
  const { user, setUser, loadUserFromCookies } = useUser()
  const router = useRouter()
  useEffect(() => {
    loadUserFromCookies()
  }, [loadUserFromCookies])

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/logout', {
        method: 'POST',
      })

      if (response.ok) {
        setUser(null)
        router.push('/admin/dang-nhap')
      } else {
        console.error('Đăng xuất không thành công')
      }
    } catch (error) {
      console.error('Có lỗi xảy ra khi đăng xuất:', error)
    }
  }
  return (
    <Sidebar className="h-full bg-gray-900 text-black">
      <SidebarContent className="px-6 py-8">
        <SidebarGroup>
          <SidebarGroupLabel>
            <Link href="/admin" className="mb-6 text-2xl font-bold text-black">
              Quản lý
            </Link>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <Collapsible defaultOpen className="group/collapsible">
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton className="text-md font-medium">
                      <Package className="mr-2 h-5 w-5" />
                      Danh mục
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      <SidebarMenuSubItem>
                        <Link href="/admin/danh-muc/them-danh-muc">Thêm</Link>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                        <Link href="/admin/danh-muc/danh-sach">Danh sách</Link>
                      </SidebarMenuSubItem>
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
              <Collapsible defaultOpen className="group/collapsible">
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton className="text-md font-medium">
                      <Package className="mr-2 h-5 w-5" />
                      Sản phẩm
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      <SidebarMenuSubItem>
                        <Link href="/admin/san-pham/them-san-pham">Thêm</Link>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                        <Link href="/admin/san-pham/danh-sach">Danh sách</Link>
                      </SidebarMenuSubItem>
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
              <SidebarMenuButton className="text-md font-medium">
                <LayoutDashboard className="mr-2 h-5 w-5" />
                <Link href={'/admin'}>Thống kê</Link>
              </SidebarMenuButton>
              <SidebarMenuButton className="text-md font-medium">
                <ShoppingCart className="mr-2 h-5 w-5" />
                <Link href={'/admin/quan-li-don-hang'}>Quản lí đơn hàng</Link>
              </SidebarMenuButton>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup className="mt-auto">
          <SidebarGroupContent>
            <SidebarMenu>
              {user ? (
                <SidebarMenuButton
                  className="text-md font-medium"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-2 h-5 w-5" />
                  Đăng xuất
                </SidebarMenuButton>
              ) : (
                <SidebarMenuButton className="text-md font-medium">
                  <LogIn className="mr-2 h-5 w-5" />
                  <Link href={'/admin/dang-nhap'}>Đăng nhập</Link>
                </SidebarMenuButton>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
