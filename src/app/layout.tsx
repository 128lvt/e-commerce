import type { Metadata } from 'next'
import { JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from 'next-themes'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Progress from '@/components/Progress'

const jetBrainsMono = JetBrains_Mono({
  subsets: ['vietnamese'], // choose subsets according to your need
  weight: ['400', '500', '700'], // define font weights
})
export const metadata: Metadata = {
  title: 'Shop Thời Trang 6AE.',
  description: 'Shop Thời Trang 6AE.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en suppressHydrationWarning">
      <body className={jetBrainsMono.className}>
        <Progress />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
