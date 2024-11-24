import { ThemeProvider } from 'next-themes'
import { Toaster } from '@/components/ui/toaster'
import Footer from '@/components/footer'
import Progress from '@/components/progress'
import Header from '@/components/header'

export default function ShopLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <div className="flex min-h-screen flex-col bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
        <Progress />
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </div>
      <Toaster />
    </ThemeProvider>
  )
}
