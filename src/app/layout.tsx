import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { siteConfig } from '@/config/site'
import { cn } from '../lib/utils'
import Footer from '@/shared/components/footer'

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
    <html lang="en">
      <body className={cn('relative h-screen', inter.className)}>
        <div className="pb-36">{children}</div>
        <Footer />
      </body>
    </html>
  )
}
