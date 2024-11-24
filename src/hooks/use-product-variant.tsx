import useSWR, { mutate } from 'swr'
import { ProductVariant } from '../../types/Type'
import { API_URL } from '@/configs/apiConfig'

interface ApiResponse {
  message: string
  data: ProductVariant[]
}

const fetcher = (url: string) => fetch(url).then((res) => res.json())

const useVariant = (productId: number) => {
  const { data, error } = useSWR<ApiResponse>(
    `${API_URL}/products/variant/${productId}`,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  )

  // Kiểm tra trạng thái đang tải
  const isLoading = !data && !error

  return {
    data,
    error,
    isLoading,
    mutate: () => mutate(`${API_URL}/products/variant/${productId}`),
  }
}

export default useVariant
