import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import Navbar from '@/components/Navbar'
import CheckoutForm from '@/components/CheckoutForm'

export const metadata: Metadata = {
  title: 'Оформление заявки — Union',
}

export default function CheckoutPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16 min-h-screen" style={{ background: 'var(--bg)' }}>
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-10">

          <Link
            href="/catalog"
            className="inline-flex items-center gap-1.5 text-sm text-[#5A5A5A] hover:text-[#0A0A0A] transition-colors mb-8"
            style={{ letterSpacing: '-0.01em' }}
          >
            <ArrowLeft size={14} />
            Вернуться в каталог
          </Link>

          <div className="mb-8">
            <div className="eyebrow">Заявка</div>
            <h1
              className="font-black text-[#0A0A0A] mt-1"
              style={{ fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', letterSpacing: '-0.045em' }}
            >
              Оформление заказа
            </h1>
          </div>

          <CheckoutForm />

        </div>
      </main>
    </>
  )
}
