import useSWR from 'swr'
import { Category } from '../../types/Category'

export default function CategoryLoader() {
  const fetcher = (url: string) => fetch(url).then((res) => res.json())

  const { data, error, isLoading } = useSWR<{ [key: string]: Category }>(
    'https://product-7ffbf-default-rtdb.firebaseio.com/categories.json',
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  )

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!data) {
    console.log('No categories available')
  }

  if (error) {
    return <div>Error loading categories</div>
  }
}
