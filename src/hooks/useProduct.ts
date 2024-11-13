import useSWR from 'swr'
import { Product } from '../../types/Type'
import { API_URL } from '@/configs/apiConfig'
import { useProductParams } from './useProductParams'

interface ApiResponse {
  message: string
  data: {
    products: Product[]
    totalPages: number
  }
}

const fetcher = (url: string) => fetch(url).then((res) => res.json())

const useProduct = () => {
  const { page, limit, name, categoryIds, sort } = useProductParams(
    (state) => state,
  )
  const { data, error } = useSWR<ApiResponse>(
    `${API_URL}/products/search?page=${page}&limit=${limit}&name=${name}&categoryIds=${categoryIds}&sortOrder=${sort}`,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  )

  // Kiểm tra trạng thái đang tải
  const isLoading = !data && !error

  return { data: data, error, isLoading }
}

export default useProduct
