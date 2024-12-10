'use client'

import { Button } from '@/components/ui/button'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown } from 'lucide-react'
import { Category } from 'types/Type'

export const columns: ColumnDef<Category>[] = [
  {
    accessorKey: 'id',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="w-full justify-start text-left text-lg font-bold"
        >
          ID
          <ArrowUpDown className="ml-2 h-5 w-5" />
        </Button>
      )
    },
    enableColumnFilter: true,
    size: 300,
    cell: ({ row }) => (
      <div className="text-left font-medium">{row.getValue('id')}</div>
    ),
  },
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="w-full justify-start text-left text-lg font-bold"
        >
          Tên danh mục
          <ArrowUpDown className="ml-2 h-5 w-5" />
        </Button>
      )
    },
    enableColumnFilter: true,
    size: 500,
    cell: ({ row }) => <div className="text-left">{row.getValue('name')}</div>,
  },
]
