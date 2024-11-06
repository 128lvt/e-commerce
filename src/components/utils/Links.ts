export interface Link {
  name?: string
  href?: string
}

const createLinks = (categories: Link[]) => [
  {
    name: 'Trang chủ',
    href: '/',
  },
  {
    name: 'Sản phẩm',
    href: '/san-pham',
  },
  {
    name: 'Danh mục',
    href: 'danh-muc',
    dropdown: categories,
  },
  {
    name: 'Liên hệ',
    href: '/lien-he',
  },
]
export default createLinks
