'use client'

import Link from 'next/link'
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Logo and About */}
          <div className="space-y-4">
            <h2 className="text-3xl font-bold">6AE Shop</h2>
            <p className="text-sm text-gray-400">
              Bringing style and quality to your everyday life. Discover the
              latest trends and timeless classics at 6AE Shop.
            </p>
          </div>
          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <nav className="flex flex-col space-y-2">
              <Link
                href="/"
                className="text-sm transition-colors hover:text-primary"
              >
                Trang chủ
              </Link>
              <Link
                href="/san-pham"
                className="text-sm transition-colors hover:text-primary"
              >
                Sản phẩm
              </Link>
              <Link
                href="/thanh-toan"
                className="text-sm transition-colors hover:text-primary"
              >
                Thanh toán
              </Link>
              <Link
                href="/lien-he"
                className="text-sm transition-colors hover:text-primary"
              >
                Liên hệ
              </Link>
            </nav>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Us</h3>
            <div className="space-y-2 text-sm">
              <p className="flex items-center">
                <Mail className="mr-2 h-4 w-4" /> info@6aeshop.com
              </p>
              <p className="flex items-center">
                <Phone className="mr-2 h-4 w-4" /> +84 123 456 789
              </p>
              <p className="flex items-center">
                <MapPin className="mr-2 h-4 w-4" /> 123 Nguyen Hue, District 1,
                Ho Chi Minh City
              </p>
            </div>
          </div>

          {/* Newsletter Signup */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Stay Updated</h3>
            <p className="text-sm text-gray-400">
              Subscribe to our newsletter for the latest updates and offers.
            </p>
            <form
              className="flex space-x-2"
              onSubmit={(e) => e.preventDefault()}
            >
              <Input
                type="email"
                placeholder="Your email"
                className="border-gray-700 bg-gray-800 text-white placeholder-gray-400"
              />
              <Button type="submit" variant="secondary">
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        <div className="mb-8 mt-8 border-t border-gray-700"></div>

        {/* Social Media and Copyright */}
        <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
          <div className="flex space-x-4">
            <a
              href="#"
              className="transition-colors hover:text-primary"
              aria-label="Facebook"
            >
              <Facebook className="h-5 w-5" />
            </a>
            <a
              href="#"
              className="transition-colors hover:text-primary"
              aria-label="Instagram"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <a
              href="#"
              className="transition-colors hover:text-primary"
              aria-label="Twitter"
            >
              <Twitter className="h-5 w-5" />
            </a>
          </div>
          <p className="text-sm text-gray-400">
            © 2024 6AE Shop. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
