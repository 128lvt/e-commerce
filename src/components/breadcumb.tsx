import Link from 'next/link'
import { ChevronRight, Home } from 'lucide-react'

interface BreadcrumbItem {
  label: string
  href: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="container mx-auto mb-4 px-10">
      <ol className="text-md flex items-center space-x-2 text-gray-500">
        <li>
          <Link href="/" className="flex items-center">
            <Home className="mr-2 h-4 w-4" />
            <span className="sr-only">Home</span>
          </Link>
        </li>
        {items.map((item, index) => (
          <li key={item.href} className="flex items-center">
            <ChevronRight
              className="mx-1 h-4 w-4 text-gray-400"
              aria-hidden="true"
            />
            {index === items.length - 1 ? (
              <span className="font-medium" aria-current="page">
                {item.label}
              </span>
            ) : (
              <Link href={item.href} className="">
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
