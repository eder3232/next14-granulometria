import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { siteConfig } from '@/config/site'
import { cn } from '../lib/utils'
import Footer from '@/components/shared/footer'
import Navbar from '@/components/shared/navbar'
import { ThemeProvider } from '@/shared/providers/providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
  icons: [
    {
      url: 'bocchi_right.ico',
      href: 'bocchi_right.ico',
    },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn('relative min-h-screen', inter.className)}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <div className="pb-36">
            <Navbar />
            <div className="flex justify-center">{children}</div>
          </div>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
