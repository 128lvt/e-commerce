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
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import useCategory from '@/hooks/use-category'
import { Category } from 'types/Type'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ChevronDown, FilterIcon, Search } from 'lucide-react'
import { useProductParams } from '@/hooks/use-param'
import SearchInput from '@/components/search'

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
    <div className="container mx-auto py-8">
      <Card className="mb-8 dark:bg-gray-900">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Lọc sản phẩm</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-muted-foreground" />
              <SearchInput padding="pl-10" />
            </div>
            <div className="flex items-center space-x-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button>
                    <FilterIcon className="mr-2 h-4 w-4" />
                    Sắp xếp
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>Sắp xếp theo giá</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => handleFilter('asc')}>
                    Thấp đến cao
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleFilter('desc')}>
                    Cao đến thấp
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuLabel>Danh mục</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {categories?.map((item: Category) => (
                    <DropdownMenuItem
                      key={item.id}
                      className="flex items-center space-x-2"
                    >
                      <Checkbox
                        id={item.id.toString()}
                        checked={selectedCategories.includes(
                          item.id.toString(),
                        )}
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
        </CardContent>
      </Card>
    </div>
  )
}
