import Image from 'next/image'

export default function Container() {
  return (
    <>
      {Array.from({ length: 19 }, (_, i) => (
        <div key={i}>
          <Image
            src={`/Solo_Leveling_c00/${i+1}.png`}
            width={720}
            height={3000}
            alt="image"
          />
        </div>
      ))}
    </>
  )
}
