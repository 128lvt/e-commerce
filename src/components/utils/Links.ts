import { Category } from "../../../types/Category";

 const createLinks = (categories: Category[]) => [
    {
      name: 'Trang chủ',
      href: '/',
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
  ];
  export default createLinks