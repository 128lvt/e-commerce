import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { MoveLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-blue-100 to-white px-4 text-center">
      <div className="max-w-md space-y-8">
        <div className="relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-64 w-64 animate-pulse rounded-full bg-blue-200 opacity-70 blur-3xl filter"></div>
          </div>
          <svg
            className="relative z-10 h-64 w-64"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14.9577 5.6055C15.1432 5.03181 15.9568 5.03181 16.1423 5.6055L16.7688 7.57152C16.8414 7.80131 17.0547 7.95485 17.2978 7.95485H19.3649C19.9674 7.95485 20.2196 8.72235 19.7312 9.07152L18.0478 10.3033C17.8539 10.4437 17.7697 10.6889 17.8423 10.9187L18.4688 12.8847C18.6543 13.4584 17.9959 13.9401 17.5074 13.5909L15.8241 12.3591C15.6301 12.2187 15.3699 12.2187 15.1759 12.3591L13.4926 13.5909C13.0041 13.9401 12.3457 13.4584 12.5312 12.8847L13.1577 10.9187C13.2303 10.6889 13.1461 10.4437 12.9522 10.3033L11.2688 9.07152C10.7804 8.72235 11.0326 7.95485 11.6351 7.95485H13.7022C13.9453 7.95485 14.1586 7.80131 14.2312 7.57152L14.9577 5.6055Z"
              fill="#3B82F6"
              stroke="#2563EB"
              strokeWidth="2"
            />
            <path
              d="M7.5 16H16.5"
              stroke="#3B82F6"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <h1 className="text-5xl font-bold text-gray-900">404</h1>
        <p className="text-xl text-gray-600">
          Oops! Looks like you've wandered into uncharted territory.
        </p>
        <Button
          asChild
          className="inline-flex items-center px-6 py-3 text-lg font-semibold transition-colors duration-300"
        >
          <Link href="/">
            <MoveLeft className="mr-2 h-5 w-5" />
            Return Home
          </Link>
        </Button>
      </div>
      <p className="mt-12 text-sm text-gray-500">
        If you believe this is an error, please contact our{' '}
        <a href="/support" className="text-blue-600 hover:underline">
          support team
        </a>
        .
      </p>
    </div>
  )
}
