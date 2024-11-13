'use client'
import { useEffect, useState } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useProductParams } from '@/hooks/useProductParams'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import useCategory from '@/hooks/useCategory'
import { Category } from '../../../types/Type'

export default function Filter() {
  const { setParams } = useProductParams()
  const { data } = useCategory()
  const categories = data?.data

  // State to store selected category IDs
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])

  const handleFilter = (type: string) => {
    setParams({ sort: type })
  }

  const handleCategoryChange = (id: string) => {
    console.log('Category selected:', id)
    setSelectedCategories((prevSelected) => {
      const isSelected = prevSelected.includes(id)
      const updated = isSelected
        ? prevSelected.filter((categoryId) => categoryId !== id)
        : [...prevSelected, id]

      console.log('Updated selectedCategories:', updated)
      return updated
    })
  }

  useEffect(() => {
    if (selectedCategories.length > 0) {
      setParams({ categoryIds: selectedCategories.join(',') })
    } else {
      setParams({ categoryIds: '' })
    }
  }, [selectedCategories, setParams])

  return (
    <div className="container mx-auto flex justify-end">
      <DropdownMenu>
        <DropdownMenuTrigger className="rounded-md border border-gray-300 px-3 py-2">
          Sắp xếp theo
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Giá</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => handleFilter('asc')}>
            Từ thấp tới cao
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleFilter('desc')}>
            Từ cao tới thấp
          </DropdownMenuItem>
          <DropdownMenuSeparator />

          <DropdownMenuLabel>Danh mục</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {categories?.map((item: Category) => {
            return (
              <DropdownMenuItem
                key={item.id}
                className="flex items-center gap-3"
              >
                <Checkbox
                  id={item.id.toString()}
                  checked={selectedCategories.includes(item.id.toString())}
                  onCheckedChange={() =>
                    handleCategoryChange(item.id.toString())
                  }
                />
                <Label htmlFor={item.id.toString()}>{item.name}</Label>
              </DropdownMenuItem>
            )
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
