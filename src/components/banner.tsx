import Image from 'next/image';

export default function Banner() {
  return (
    <div className="h-[10rem] w-full rounded-sm bg-[--primary] xl:h-[20rem]">
      <Image
        src="/banners/banner.png"
        width={1000}
        height={1000}
        alt="Banner"
        className="h-full w-full rounded-md"
      ></Image>
    </div>
  );
}
