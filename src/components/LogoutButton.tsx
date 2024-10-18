import Link from 'next/link'

export default function LogoutButton() {
  const handleLogout = () => {
    console.log('logout')
  }
  return <Link href="" onClick={handleLogout}>Đăng xuất</Link>
}
