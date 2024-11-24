'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import ImageDialog from '@/components/image-dialog'
import ProductDialog from '@/components/product-dialog'
import { Product } from 'types/Type'

interface ProductId {
  id: number
}

interface DataTableProps<TData extends ProductId, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  isLoading: boolean
}

export function DataTable<TData extends ProductId, TValue>({
  columns,
  data,
  isLoading,
}: DataTableProps<TData, TValue>) {
  const [selectedRow, setSelectedRow] = useState<TData | null>(null)
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  )
  const [globalFilter, setGlobalFilter] = React.useState('')
  const router = useRouter()

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    state: {
      sorting,
      columnFilters,
      globalFilter,
    },
  })

  const handleRowDoubleClick = (row: TData) => {
    setSelectedRow(row)
  }

  const closeDialog = () => {
    setSelectedRow(null)
  }

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-t-2 border-gray-900"></div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="rounded-lg border bg-white shadow-md">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      className="bg-gray-100 px-4 py-3 font-medium text-gray-700"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && 'selected'}
                    onDoubleClick={() => handleRowDoubleClick(row.original)}
                    className="cursor-default transition-colors hover:bg-gray-50"
                  >
                    {row.getVisibleCells().map((cell) => {
                      const cellValue = cell.getValue()
                      const columnId = cell.column.id

                      if (columnId === 'images') {
                        const items = Array.isArray(cellValue) ? cellValue : []
                        return (
                          <TableCell key={cell.id} className="p-4 text-center">
                            <ImageDialog
                              images={items}
                              productId={row.original.id}
                            />
                          </TableCell>
                        )
                      } else if (columnId === 'variants') {
                        const items = Array.isArray(cellValue) ? cellValue : []
                        const productId = row.original.id
                        return (
                          <TableCell key={cell.id} className="p-4 text-center">
                            <Button
                              onClick={() => {
                                router.push(`/san-pham/size-color/${productId}`)
                              }}
                              className="rounded bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600"
                            >
                              {items.length}
                            </Button>
                          </TableCell>
                        )
                      } else {
                        return (
                          <TableCell key={cell.id} className="p-4">
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext(),
                            )}
                          </TableCell>
                        )
                      }
                    })}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
      <ProductDialog
        product={selectedRow as unknown as Product}
        isOpen={!!selectedRow}
        onClose={closeDialog}
      />
    </div>
  )
}
