'use client'

import { useState, useTransition } from 'react'
import { CheckCircle, ArrowRight, ShoppingBag } from 'lucide-react'
import { submitOrder } from '@/app/actions'
import type { Product } from '@/lib/types'
import { useCart } from '@/lib/cart-context'

export default function ProductRequestForm({ product }: { product: Product }) {
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const [isPending, startTransition] = useTransition()
  const { addItem, openCart } = useCart()

  async function handleSubmit(formData: FormData) {
    setError('')
    startTransition(async () => {
      const result = await submitOrder(formData)
      if (result.success) setSuccess(true)
      else setError(result.error || 'Ошибка. Попробуйте позже.')
    })
  }

  if (success) {
    return (
      <div className="rounded-2xl border border-black/[0.08] bg-[#F7F5F2] p-8 text-center">
        <div className="w-12 h-12 rounded-full bg-[#D4500A]/10 border border-[#D4500A]/20 flex items-center justify-center mx-auto mb-4">
          <CheckCircle size={22} color="#D4500A" />
        </div>
        <p className="font-black text-[#0A0A0A] text-lg" style={{ letterSpacing: '-0.03em' }}>
          Заявка отправлена!
        </p>
        <p className="text-sm text-[#5A5A5A] mt-1">Мы свяжемся с вами в течение 2 часов.</p>
      </div>
    )
  }

  const inputClass =
    'w-full px-4 py-3 bg-white border border-black/[0.10] rounded-xl text-[#0A0A0A] placeholder-black/25 focus:outline-none focus:border-[#D4500A]/50 focus:ring-2 focus:ring-[#D4500A]/10 transition-all text-sm'

  return (
    <div className="rounded-2xl border border-black/[0.08] bg-[#F7F5F2] p-6">
      {/* Add to cart CTA */}
      <button
        onClick={() => { addItem({ id: product.id, name: product.name, slug: product.slug, price: product.base_price, image: product.images?.[0], category: product.category }); openCart() }}
        className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl font-semibold text-sm bg-[#0A0A0A] text-white hover:bg-[#D4500A] transition-colors duration-200 mb-4"
        style={{ letterSpacing: '-0.01em' }}
      >
        <ShoppingBag size={16} />
        Добавить в корзину
      </button>

      <div className="flex items-center gap-3 mb-4">
        <div className="h-px flex-1 bg-black/[0.07]" />
        <span className="text-xs text-[#A8A8A8] font-medium">или оставьте заявку</span>
        <div className="h-px flex-1 bg-black/[0.07]" />
      </div>

      <form action={handleSubmit} className="space-y-3">
        <input type="hidden" name="product_id" value={product.id} />
        <input type="hidden" name="product_name" value={product.name} />

        <div className="grid grid-cols-2 gap-3">
          <input name="company_name" required className={inputClass} placeholder="Компания *" />
          <input name="contact_name" required className={inputClass} placeholder="Имя *" />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <input name="email" type="email" required className={inputClass} placeholder="Email *" />
          <input name="phone" type="tel" className={inputClass} placeholder="Телефон" />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <input name="quantity" type="number" min="1" className={inputClass} placeholder="Тираж, шт" />
          <div />
        </div>

        <textarea
          name="notes"
          rows={2}
          className={`${inputClass} resize-none`}
          placeholder="Дополнительные пожелания"
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={isPending}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm border border-black/[0.15] text-[#0A0A0A] hover:bg-black/[0.04] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ letterSpacing: '-0.01em' }}
        >
          {isPending ? 'Отправляем...' : <><span>Отправить заявку</span><ArrowRight size={14} /></>}
        </button>
      </form>
    </div>
  )
}
