import useSWR from 'swr'
import { Product } from '../../types/Type'
import { API_URL } from '@/configs/apiConfig'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

const useProductId = (id: number) => {
  const { data, error } = useSWR<Product>(
    `${API_URL}/products/${id}`,
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

export default useProductId
