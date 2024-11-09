import { create } from 'zustand'

interface ProductPrams {
  page: number
  limit: number
  name: string
  categoryIds: string
  sort: string
  setParams: (params: {
    page?: number
    limit?: number
    name?: string
    categoryIds?: string
    sort?: string
  }) => void
}

export const useProductParams = create<ProductPrams>((set) => ({
  page: 0, // Giá trị mặc định
  limit: 16, // Giá trị mặc định
  name: '',
  categoryIds: '-1',
  sort: '-1',
  setParams: (params) =>
    set((state) => ({
      page: params.page ?? state.page,
      limit: params.limit ?? state.limit,
      name: params.name ?? state.name,
      categoryIds: params.categoryIds ?? state.categoryIds,
      sort: params.sort ?? state.sort,
    })),
}))
