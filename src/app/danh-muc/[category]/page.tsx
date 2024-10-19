// /app/the-loai/[slug]/page.tsx
export default function Page({ params }: { params: { category: string } }) {
  console.log(params); // Kiểm tra thông tin params
  console.log(params.category); // Kiểm tra giá trị của slug
  return <div>Thể loại: {params.category}</div>;
}
