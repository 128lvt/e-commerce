import type { Metadata } from 'next'
import { JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from 'next-themes'
import { Toaster } from '@/components/ui/toaster'
import Footer from '@/components/footer'
import Progress from '@/components/progress'
import Header from '@/components/header'

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
      <body
        className={`${jetBrainsMono.className} bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex min-h-screen flex-col">
            <Progress />
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
