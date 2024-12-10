import Link from 'next/link'
import MobileNav from './mobile-nav'
import Nav from './nav'
export default function Header() {
  return (
    <header className="bg-[#c2845f] dark:bg-[#59341e] xl:py-12">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/">
          <h1 className="text-4xl font-semibold">
            6AE Shop<span className="text-purple-700">.</span>
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
