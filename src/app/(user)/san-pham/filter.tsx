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
import { useProductParams } from '@/hooks/use-param'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import useCategory from '@/hooks/use-category'
import { Category } from 'types/Type'
import { Button } from '@/components/ui/button'
import { ChevronDown, Snowflake } from 'lucide-react'

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
    setSelectedCategories((prevSelected) => {
      const isSelected = prevSelected.includes(id)
      const updated = isSelected
        ? prevSelected.filter((categoryId) => categoryId !== id)
        : [...prevSelected, id]

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
    <div className="container mx-auto flex justify-end px-4">
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div className="flex items-center space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="bg-red-600 text-white hover:bg-red-700">
                <Snowflake className="mr-2 h-4 w-4" />
                Lọc sản phẩm
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-green-100">
              <DropdownMenuLabel className="text-red-800">
                Sắp xếp theo giá
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => handleFilter('asc')}
                className="text-green-800 hover:bg-green-200"
              >
                Thấp đến cao
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleFilter('desc')}
                className="text-green-800 hover:bg-green-200"
              >
                Cao đến thấp
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuLabel className="text-red-800">
                Danh mục quà tặng
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              {categories?.map((item: Category) => (
                <DropdownMenuItem
                  key={item.id}
                  className="flex items-center space-x-2 text-green-800 hover:bg-green-200"
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
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  )
}
