import type { Metadata } from 'next'
import { JetBrains_Mono } from 'next/font/google'
import './globals.css'

const jetBrainsMono = JetBrains_Mono({
  subsets: ['vietnamese'],
  weight: ['400', '500', '700'],
})

export const metadata: Metadata = {
  title: '6AE Fashion Shop',
  description: 'Discover the latest trends at 6AE Fashion Shop.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={jetBrainsMono.className}>{children}</body>
    </html>
  )
}
