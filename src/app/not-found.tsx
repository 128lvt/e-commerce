// app/404.tsx
import Link from 'next/link'

export default function Custom404() {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>404 - Trang không tìm thấy</h1>
      <p>Xin lỗi, trang bạn tìm kiếm không tồn tại.</p>
      <Link href="/">
        <button style={{ padding: '10px 20px', fontSize: '16px' }}>
          Trở về trang chủ
        </button>
      </Link>
    </div>
  )
}
