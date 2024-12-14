import useSWR, { mutate } from 'swr'
import { API_URL } from '@/configs/apiConfig'

interface chartData {
  categoryName: string
  totalSold: number
}

interface countData {
  user: number
  order: number
  product: number
}

const fetcher = (url: string, token: string) => {
  return fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json())
}

const useMonthlyChart = (token: string) => {
  const { data, error } = useSWR(
    `${API_URL}/dashboard/top-selling-monthly`,
    (url) => fetcher(url, token),
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  )

  // Kiểm tra trạng thái đang tải
  const isLoading = !data && !error

  const monthlyChart = data

  return {
    monthlyChart,
    error,
    isLoading,
    mutate: () => mutate(`${API_URL}/dashboard/top-selling-monthly`, token),
  }
}

const useCategoriesChart = (token: string) => {
  const { data, error } = useSWR(
    `${API_URL}/dashboard/top-selling-categories`,
    (url) => fetcher(url, token),
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  )

  // Kiểm tra trạng thái đang tải
  const isLoading = !data && !error

  const categoryChart: chartData[] = data

  return {
    categoryChart,
    error,
    isLoading,
    mutate: () => mutate(`${API_URL}/dashboard/top-selling-categories`, token),
  }
}

const fetcher1 = (url: string) => {
  return fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => res.json())
}

const useCount = () => {
  const { data, error } = useSWR(
    `${API_URL}/dashboard/count`,
    (url) => fetcher1(url),
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  )

  const isLoading = !data && !error

  console.log('data', data)

  const countData: countData = data

  return {
    countData,
    error,
    isLoading,
    mutate: () => mutate(`${API_URL}/dashboard/count`),
  }
}

export { useMonthlyChart, useCategoriesChart, useCount }
