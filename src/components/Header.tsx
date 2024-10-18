import Link from 'next/link'
import Nav from '@/components/Nav'
export default function Header() {
  return (
    <header className="py-8 xl:py-12">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/">
          <h1 className="text-4xl font-semibold">
            Aug<span className="">.</span>
          </h1>
        </Link>
        {/* Desktop Nav */}
        <div className="hidden xl:flex items-center gap-8">
          <Nav />
        </div>
        {/* Mobile Nav */}
        <div className="xl:hidden">
          mobile nav
        </div>
      </div>
    </header>
  )
}
