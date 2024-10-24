import Link from 'next/link'
import Nav from '@/components/Nav'
import MobileNav from './MobileNav'
export default function Header() {
  return (
    <header className="xl:py-12">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/">
          <h1 className="text-4xl font-semibold">
            6AE Shop<span className="text-cyan-200">.</span>
          </h1>
        </Link>
        {/* Desktop Nav */}
        <div className="hidden items-center gap-8 xl:flex">
          <Nav />
        </div>
        {/* Mobile Nav */}
        <div className="py-8 xl:hidden">
          <MobileNav />
        </div>
      </div>
    </header>
  )
}
