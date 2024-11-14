import useSWR, { mutate } from 'swr'
import { API_URL } from '@/configs/apiConfig'
import { Order } from 'types/Type'

interface ApiResponse {
  message: string
  data: Order[]
}

// Cập nhật fetcher để thêm token vào headers
const fetcher = (url: string, token: string) => {
  return fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json())
}

const useOrder = (id: number, token: string) => {
  const { data, error } = useSWR<ApiResponse>(
    `${API_URL}/orders/user/${id}`,
    (url) => fetcher(url, token),
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
    mutate: () => mutate(`${API_URL}/orders/user/${id}`, token),
  }
}

export default useOrder
