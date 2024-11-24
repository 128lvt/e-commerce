import useSWR, { mutate } from 'swr'
import { API_URL } from '@/configs/apiConfig'

interface chartData {
  categoryName: string
  totalSold: number
}

interface ProductVariant {
  id: number
  size: string
  color: string
  stock: number
  p_id: number
}

interface Product {
  id: number
  name: string
  price: number
  stock: number
  description: string
  category: {
    id: number
    name: string
  }
  variants: ProductVariant[]
  images: {
    id: number
    imageUrl: string
    product_id: number
  }[]
}

interface OutOfStock {
  product: Product
  productVariant: ProductVariant
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

const useOutOfStock = (token: string) => {
  const { data, error } = useSWR(
    `${API_URL}/dashboard/out-of-stock`,
    (url) => fetcher(url, token),
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  )

  const isLoading = !data && !error

  const outOfStock: OutOfStock[] = data

  return {
    outOfStock,
    error,
    isLoading,
    mutate: () => mutate(`${API_URL}/dashboard/out-of-stock`, token),
  }
}

export { useMonthlyChart, useCategoriesChart, useOutOfStock }
