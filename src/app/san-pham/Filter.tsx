import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface IProps {
  onFilterChange: (type: 'up' | 'down') => void
}

export default function Filter({ onFilterChange }: IProps) {
  const handleFilter = (type: 'up' | 'down') => {
    onFilterChange(type)
  }

  return (
    <div className="container my-6 flex justify-end">
      <DropdownMenu>
        <DropdownMenuTrigger>Sắp xếp theo</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Giá</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => handleFilter('up')}>
            Từ thấp tới cao
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleFilter('down')}>
            Từ cao tới thâp
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
