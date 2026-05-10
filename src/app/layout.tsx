import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Union — Мерч для бизнеса',
  description:
    'Union производит корпоративный мерч и брендированную продукцию для компаний. Каталог товаров, расчёт стоимости, быстрое производство.',
  keywords: 'корпоративный мерч, брендированная продукция, печать на футболках, корпоративные подарки',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  )
}
