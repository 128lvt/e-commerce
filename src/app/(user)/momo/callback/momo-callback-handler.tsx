'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { useCart } from '@/hooks/use-cart'
import useProduct from '@/hooks/use-product'
import useOrder from '@/hooks/use-order-id'
import useUser from '@/hooks/use-user'
import { API_URL } from '@/configs/apiConfig'

export function MomoCallbackHandler() {
  const searchParams = useSearchParams()
  const { user, loadUserFromLocalStorage, token } = useUser()
  const [result, setResult] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const { loadCartFromLocalStorage, clearCart } = useCart()
  const { mutate } = useOrder(user?.id ?? 0, token ?? '')
  const { reloadProduct } = useProduct()

  useEffect(() => {
    console.log(searchParams)
    const handleCallback = async () => {
      try {
        const apiUrl = `${API_URL}/payments/momo/callback?${searchParams.toString()}`
        const response = await fetch(apiUrl)

        if (!response.ok) {
          throw new Error('Failed to process payment')
        }

        if (response.status === 204) {
          clearCart()
          loadCartFromLocalStorage()
          reloadProduct()
          mutate()
          setResult('Payment processed successfully')
          window.location.href = `/don-hang/${searchParams.get('orderId')}`
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'An unknown error occurred',
        )
      }
    }

    handleCallback()
  }, [
    searchParams,
    loadCartFromLocalStorage,
    loadUserFromLocalStorage,
    clearCart,
    reloadProduct,
    mutate,
  ])

  if (error) {
    return <div className="text-red-500">Error: {error}</div>
  }

  if (!result) {
    return <div>Processing payment...</div>
  }

  return (
    <div>
      <h2 className="mb-2 text-xl font-semibold">Payment Result:</h2>
      <pre className="overflow-x-auto rounded-md bg-gray-100 p-4">{result}</pre>
    </div>
  )
}
