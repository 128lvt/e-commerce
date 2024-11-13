import useSWR from 'swr'
import { Product } from '../../types/Type'
import { API_URL } from '@/app/configs/apiConfig'
interface ApiResponse {
  message: string
  data: Product[]
}

const fetcher = (url: string) => fetch(url).then((res) => res.json())

const useHomePage = () => {
  const { data, error } = useSWR<ApiResponse>(
    `${API_URL}/products?page=0&limit=50`,
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

export default useHomePage
