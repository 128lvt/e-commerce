'use client'
import { CiDeliveryTruck } from 'react-icons/ci'
import { Card, CardContent, CardFooter, CardHeader } from './ui/card'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { useEffect } from 'react'

export default function IconBottom() {
  useEffect(() => {
    AOS.init()
  })

  return (
    <div className="container mx-auto mt-14 w-full">
      <h1 className="text-center text-2xl font-semibold uppercase">
        Tại sao nên chọn chúng tôi
      </h1>
      <div className="mt-5 grid grid-rows-1 gap-4 lg:grid-cols-3 xl:grid-cols-3">
        <Card
          data-aos="fade-right"
          data-aos-duration="500"
          className="relative"
        >
          <CardHeader className="flex items-center">
            <CiDeliveryTruck className="h-10 w-10" />
          </CardHeader>
          <CardContent>
            <p className="text-center text-2xl font-bold">Giao hàng nhanh</p>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-center text-sm">
              Trong vòng 3 ngày kể từ khi nhận hàng
            </p>
          </CardFooter>
        </Card>
        <Card data-aos="fade-up" data-aos-duration="500" className="relative">
          <CardHeader className="flex items-center">
            <CiDeliveryTruck className="h-10 w-10" />
          </CardHeader>
          <CardContent>
            <p className="text-center text-2xl font-bold">Giao hàng nhanh</p>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-center text-sm">
              Trong vòng 3 ngày kể từ khi nhận hàng
            </p>
          </CardFooter>
        </Card>
        <Card data-aos="fade-left" data-aos-duration="500" className="relative">
          <CardHeader className="flex items-center">
            <CiDeliveryTruck className="h-10 w-10" />
          </CardHeader>
          <CardContent>
            <p className="text-center text-2xl font-bold">Giao hàng nhanh</p>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-center text-sm">
              Trong vòng 3 ngày kể từ khi nhận hàng
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
