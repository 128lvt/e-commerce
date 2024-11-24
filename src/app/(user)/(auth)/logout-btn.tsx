import { Button } from '@/components/ui/button'
import useUser from '@/hooks/use-user'

export default function LogoutButton() {
  const { setUser } = useUser()

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/logout', {
        // Gọi API đăng xuất
        method: 'POST',
      })

      setUser(null)
      setTimeout(() => {
        window.location.href = '/dang-nhap'
      }, 1000)

      if (response.ok) {
      } else {
        console.error('Đăng xuất không thành công')
      }
    } catch (error) {
      console.error('Có lỗi xảy ra khi đăng xuất:', error)
    }
  }
  return <Button onClick={handleLogout}>Đăng xuất</Button>
}
