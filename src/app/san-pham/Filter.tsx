import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useProductParams } from '@/hooks/useProductParams'

export default function Filter() {
  const { setParams } = useProductParams()

  const handleFilter = (type: string) => {
    setParams({ sort: type })
  }

  return (
    <div className="container my-6 flex justify-end">
      <DropdownMenu>
        <DropdownMenuTrigger>Sắp xếp theo</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Giá</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => handleFilter('asc')}>
            Từ thấp tới cao
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleFilter('desc')}>
            Từ cao tới thấp
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
