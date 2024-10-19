import Image from 'next/image';

export default function Banner() {
  return (
    <div className="h-[20rem] w-full">
      <Image
        src="/banners/1.png"
        width={500}
        height={500}
        alt="Banner"
        className="h-full w-full rounded-md object-cover"
      ></Image>
    </div>
  );
}
