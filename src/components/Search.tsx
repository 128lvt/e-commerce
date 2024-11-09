import { useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { useProductParams } from '@/hooks/useProductParams'

export default function Search() {
  // Lấy các tham số hiện tại từ store
  const { name, setParams } = useProductParams()

  // State để quản lý input tìm kiếm
  const [searchTerm, setSearchTerm] = useState(name)

  // Hàm xử lý khi nhấn nút tìm kiếm
  const handleSearch = () => {
    // Cập nhật giá trị name trong Zustand store
    setParams({ name: searchTerm })
  }

  return (
    <div className="flex max-w-sm items-center gap-1">
      {/* Input để người dùng nhập từ khóa tìm kiếm */}
      <Input
        type="text"
        className="p-3"
        placeholder="Tìm kiếm"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)} // Cập nhật state khi thay đổi
      />
      <Button
        className="bg-[--background] p-3"
        variant="outline"
        aria-label="Tìm kiếm"
        onClick={handleSearch} // Khi nhấn nút tìm kiếm
      >
        Tìm kiếm
      </Button>
    </div>
  )
}
