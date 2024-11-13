export interface Link {
  name?: string
  href?: string
}

const createLinks = () => [
  {
    name: 'Trang chủ',
    href: '/',
  },
  {
    name: 'Sản phẩm',
    href: '/san-pham',
  },
  {
    name: 'Thanh toán',
    href: 'thanh-toan',
  },
  {
    name: 'Liên hệ',
    href: '/lien-he',
  },
]
export default createLinks
