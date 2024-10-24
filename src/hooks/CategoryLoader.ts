import useSWR from "swr"
import { Category } from "../../types/Category"

const fetcher = (url: string) => fetch(url).then((res) => res.json())


 const useFetchCategories = ()=>{
    const { data, error, isLoading } = useSWR<{ [key: string]: Category }>(
        'https://product-7ffbf-default-rtdb.firebaseio.com/categories.json',
        fetcher,
        {
          revalidateIfStale: false,
          revalidateOnFocus: false,
          revalidateOnReconnect: false,
        },
      )
      return {data, error, isLoading}
}

export default useFetchCategories