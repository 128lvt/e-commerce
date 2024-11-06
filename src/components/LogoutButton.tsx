import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function LogoutButton() {
  const router = useRouter()

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/logout', {
        // Gọi API đăng xuất
        method: 'POST',
      })

      if (response.ok) {
        router.push('/dang-nhap')
      } else {
        console.error('Đăng xuất không thành công')
      }
    } catch (error) {
      console.error('Có lỗi xảy ra khi đăng xuất:', error)
    }
  }
  return (
    <Link href="" onClick={handleLogout}>
      Đăng xuất
    </Link>
  )
}
