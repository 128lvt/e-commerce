import { useState, useCallback } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { useProductParams } from '@/hooks/use-param'
import debounce from 'lodash/debounce'
import { usePathname, useRouter } from 'next/navigation'

interface IProps {
  padding: string
}

export default function SearchInput({ padding }: IProps) {
  const { name, setParams } = useProductParams()
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState(name)
  const path = usePathname()

  const debouncedSearch = useCallback(
    debounce((term: string) => {
      setParams({ name: term })
    }, 500),
    [setParams],
  )

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setSearchTerm(newValue)
    setParams({ page: 0 })
    debouncedSearch(newValue)
  }

  const handleSearch = () => {
    if (path.includes('admin')) {
      router.push('/admin/san-pham/danh-sach')
    } else {
      router.push('/san-pham')
    }
    setParams({ name: searchTerm, page: 0 })
  }

  return (
    <div className="flex max-w-sm items-center gap-1">
      <Input
        type="text"
        className={padding}
        placeholder="Tìm kiếm"
        value={searchTerm}
        onChange={handleInputChange}
      />
      <Button
        className="bg-[--background] p-3"
        variant="outline"
        aria-label="Tìm kiếm"
        onClick={handleSearch}
      >
        Tìm kiếm
      </Button>
    </div>
  )
}
