import Link from 'next/link'

export default function Footer() {
  return (
    <div className="mt-2">
      <footer className="bg-black pb-4 pt-8 text-white xl:pb-6 xl:pt-12">
        <div className="container mx-auto">
          <div className="flex flex-col items-center space-y-4">
            {/* Logo and shop name */}
            <h2 className="text-3xl font-bold">6AE Shop</h2>

            {/* Links or additional sections */}
            <div className="xl:text-md flex space-x-8 text-sm">
              <Link href="/" className="hover:text-gray-400">
                Trang chủ
              </Link>
              <Link href="/san-pham" className="hover:text-gray-400">
                Sản phẩm
              </Link>
              <Link href="/thanh-toan" className="hover:text-gray-400">
                Thanh toán
              </Link>
              <Link href="/lien-he" className="hover:text-gray-400">
                Liên hệ
              </Link>
            </div>

            {/* Contact and Social Media */}
            <div className="flex flex-col items-center space-y-2">
              <p className="text-center text-sm">
                Liên hệ với chúng tôi: info@6aeshop.com
              </p>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-gray-400">
                  Facebook
                </a>
                <a href="#" className="hover:text-gray-400">
                  Instagram
                </a>
                <a href="#" className="hover:text-gray-400">
                  Twitter
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="xl:text-md container mx-auto mt-6 flex justify-center text-center text-xs text-gray-400">
          © 2024 6AE Shop. All rights reserved.
        </div>
      </footer>
    </div>
  )
}
