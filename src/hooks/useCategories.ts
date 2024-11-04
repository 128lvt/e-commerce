import useSWR from 'swr'
import { API_URL } from '@/app/configs/apiConfig'
import { Category } from '../../types/Type'

interface ApiResponse {
  message: string
  data: Category[]
}

const fetcher = (url: string) => fetch(url).then((res) => res.json())

const useCategories = () => {
  const { data, error } = useSWR<ApiResponse>(
    `${API_URL}/categories`,
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

export default useCategories
