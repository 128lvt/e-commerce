import { NextApiRequest, NextApiResponse } from 'next'
import { API_URL } from '@/configs/apiConfig'

const statusOrder = [
  'Chờ xác nhận',
  'Đang xử lý',
  'Đang giao hàng',
  'Đã giao hàng',
]

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'PUT') {
    const { orderId } = req.query
    const { status } = req.query
    const token = req.headers.authorization?.split(' ')[1]

    if (!orderId || !token) {
      return res.status(400).json({ error: 'Order ID and token are required' })
    }

    try {
      // Fetch current order status
      const orderResponse = await fetch(`${API_URL}/orders/${orderId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!orderResponse.ok) {
        throw new Error('Failed to fetch order')
      }

      const orderData = await orderResponse.json()
      const currentStatus = orderData.status
      let nextStatus = currentStatus

      if (status === 'next') {
        const currentIndex = statusOrder.indexOf(currentStatus)
        nextStatus = statusOrder[currentIndex + 1] || statusOrder[currentIndex]
      } else {
        nextStatus = status as string
      }

      // Update order status
      const updateResponse = await fetch(
        `${API_URL}/orders/status/${orderId}?status=${nextStatus}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      )

      if (!updateResponse.ok) {
        throw new Error('Failed to update order status')
      }

      const updatedOrder = await updateResponse.json()
      res.status(200).json(updatedOrder)
    } catch (error) {
      res.status(500).json({ error: 'Error updating order status' })
    }
  } else {
    res.setHeader('Allow', ['PUT'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
