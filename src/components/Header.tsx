import Link from 'next/link';
import Nav from '@/components/Nav';
import { ModeToggle } from '@/components/ModeToggle';
export default function Header() {
  return (
    <header className="bg-black py-8 text-white dark:bg-gray-800 xl:py-12">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/">
          <h1 className="text-4xl font-semibold">
            Aug<span className="">.</span>
          </h1>
        </Link>
        {/* Desktop Nav */}
        <div className="hidden items-center gap-8 xl:flex">
          <Nav />
        </div>
        {/* Mobile Nav */}
        <div className="xl:hidden">
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
