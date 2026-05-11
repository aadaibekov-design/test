import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { CartProvider } from '@/lib/cart-context'
import CartDrawer from '@/components/CartDrawer'

const inter = Inter({ subsets: ['latin', 'cyrillic'] })

export const metadata: Metadata = {
  title: 'Union — Мерч для бизнеса',
  description:
    'Union производит корпоративный мерч и брендированную продукцию для компаний. Каталог товаров, расчёт стоимости, быстрое производство.',
  keywords: 'корпоративный мерч, брендированная продукция, печать на футболках, корпоративные подарки',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body className={inter.className}>
        <CartProvider>
          {children}
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  )
}
