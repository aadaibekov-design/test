'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Minus, Plus, Trash2, CheckCircle, ArrowRight, ShoppingBag } from 'lucide-react'
import { useCart } from '@/lib/cart-context'
import { submitOrder } from '@/app/actions'
import { formatPrice } from '@/lib/utils'

export default function CheckoutForm() {
  const router = useRouter()
  const { items, removeItem, updateQty, clearCart, totalPrice } = useCart()
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const [isPending, startTransition] = useTransition()

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')

    if (items.length === 0) {
      setError('Корзина пуста. Добавьте товары перед отправкой.')
      return
    }

    const formData = new FormData(e.currentTarget)

    const cartLines = items
      .map((i) => `• ${i.name} × ${i.quantity} шт. — от ${formatPrice(i.price * i.quantity)}`)
      .join('\n')
    const existingNotes = (formData.get('notes') as string || '').trim()
    const fullNotes = existingNotes
      ? `Состав заказа:\n${cartLines}\n\nДополнительно: ${existingNotes}`
      : `Состав заказа:\n${cartLines}`

    formData.set('notes', fullNotes)
    formData.set('product_name', items.map((i) => i.name).join(', '))

    startTransition(async () => {
      const result = await submitOrder(formData)
      if (result.success) {
        clearCart()
        setSuccess(true)
      } else {
        setError(result.error || 'Произошла ошибка. Попробуйте позже.')
      }
    })
  }

  // ── Success screen ──────────────────────────────────────────────────────────
  if (success) {
    return (
      <div className="max-w-lg mx-auto text-center py-20">
        <div className="w-16 h-16 rounded-full bg-[#D4500A]/10 border border-[#D4500A]/20 flex items-center justify-center mx-auto mb-6">
          <CheckCircle size={30} color="#D4500A" />
        </div>
        <h2 className="font-black text-[#0A0A0A] text-2xl mb-3" style={{ letterSpacing: '-0.04em' }}>
          Заявка отправлена!
        </h2>
        <p className="text-[#5A5A5A] leading-relaxed mb-8">
          Мы получили вашу заявку и свяжемся в течение 2 часов для уточнения деталей и расчёта стоимости.
        </p>
        <Link href="/catalog" className="btn-primary py-3 px-8">
          Вернуться в каталог
          <ArrowRight size={15} />
        </Link>
      </div>
    )
  }

  // ── Empty cart ──────────────────────────────────────────────────────────────
  if (items.length === 0) {
    return (
      <div className="max-w-lg mx-auto text-center py-20">
        <div className="w-16 h-16 rounded-full bg-[#F7F5F2] flex items-center justify-center mx-auto mb-5">
          <ShoppingBag size={26} className="text-[#A8A8A8]" />
        </div>
        <h2 className="font-black text-[#0A0A0A] text-xl mb-2" style={{ letterSpacing: '-0.03em' }}>
          Корзина пуста
        </h2>
        <p className="text-[#5A5A5A] text-sm mb-6">Добавьте товары из каталога чтобы оформить заявку</p>
        <Link href="/catalog" className="btn-primary py-3 px-8">
          Перейти в каталог
          <ArrowRight size={15} />
        </Link>
      </div>
    )
  }

  const inputClass =
    'w-full px-4 py-3 bg-white border border-black/[0.10] rounded-xl text-[#0A0A0A] placeholder-black/25 focus:outline-none focus:border-[#D4500A]/50 focus:ring-2 focus:ring-[#D4500A]/10 transition-all text-sm'

  // ── Main layout ─────────────────────────────────────────────────────────────
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-8 items-start">

      {/* ── LEFT — order summary ─────────────────────────────────────────── */}
      <div className="space-y-3">
        <h2 className="font-bold text-[#0A0A0A] text-base mb-4" style={{ letterSpacing: '-0.02em' }}>
          Состав заказа
        </h2>

        {items.map((item) => {
          const img = item.image ||
            `https://placehold.co/120x120/EDEAE4/0A0A0A?text=${encodeURIComponent(item.name)}`
          return (
            <div
              key={item.id}
              className="flex items-start gap-4 bg-white rounded-2xl p-4 border border-black/[0.07]"
            >
              <Link href={`/catalog/${item.slug}`} className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-[#EDEAE4]">
                <Image src={img} alt={item.name} fill className="object-cover" />
              </Link>

              <div className="flex-1 min-w-0">
                <p className="text-[10px] font-bold text-[#D4500A] uppercase mb-0.5" style={{ letterSpacing: '0.08em' }}>
                  {item.category}
                </p>
                <Link href={`/catalog/${item.slug}`}>
                  <p className="font-bold text-[#0A0A0A] leading-snug hover:text-[#D4500A] transition-colors" style={{ letterSpacing: '-0.02em' }}>
                    {item.name}
                  </p>
                </Link>
                <p className="text-xs text-[#A8A8A8] mt-0.5">от {formatPrice(item.price)} / шт.</p>

                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQty(item.id, item.quantity - 1)}
                      className="w-7 h-7 rounded-full border border-black/15 flex items-center justify-center hover:border-black/30 transition-colors"
                    >
                      <Minus size={11} />
                    </button>
                    <span className="text-sm font-bold w-6 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQty(item.id, item.quantity + 1)}
                      className="w-7 h-7 rounded-full border border-black/15 flex items-center justify-center hover:border-black/30 transition-colors"
                    >
                      <Plus size={11} />
                    </button>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-black text-[#0A0A0A]" style={{ letterSpacing: '-0.03em' }}>
                      от {formatPrice(item.price * item.quantity)}
                    </span>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-[#A8A8A8] hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )
        })}

        {/* Total */}
        <div className="flex items-center justify-between bg-[#0A0A0A] rounded-2xl px-6 py-5">
          <div>
            <p className="text-white/50 text-xs uppercase tracking-wider font-medium">Итого (ориентировочно)</p>
            <p className="text-white font-black text-2xl mt-0.5" style={{ letterSpacing: '-0.04em' }}>
              от {formatPrice(totalPrice)}
            </p>
          </div>
          <p className="text-white/30 text-xs max-w-[140px] text-right leading-relaxed">
            Точная стоимость после согласования тиража и нанесения
          </p>
        </div>
      </div>

      {/* ── RIGHT — contact form ─────────────────────────────────────────── */}
      <div className="bg-white rounded-2xl border border-black/[0.08] p-7 sticky top-24">
        <h2 className="font-bold text-[#0A0A0A] text-base mb-5" style={{ letterSpacing: '-0.02em' }}>
          Контактные данные
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#5A5A5A] mb-1.5 uppercase tracking-wider">
                Компания <span className="text-[#D4500A]">*</span>
              </label>
              <input name="company_name" required className={inputClass} placeholder='ООО «Название»' />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#5A5A5A] mb-1.5 uppercase tracking-wider">
                Контакт <span className="text-[#D4500A]">*</span>
              </label>
              <input name="contact_name" required className={inputClass} placeholder="Имя" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#5A5A5A] mb-1.5 uppercase tracking-wider">
              Email <span className="text-[#D4500A]">*</span>
            </label>
            <input name="email" type="email" required className={inputClass} placeholder="ivan@company.kz" />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#5A5A5A] mb-1.5 uppercase tracking-wider">
              Телефон
            </label>
            <input name="phone" type="tel" className={inputClass} placeholder="+7 (777) 123-45-67" />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#5A5A5A] mb-1.5 uppercase tracking-wider">
              Пожелания
            </label>
            <textarea
              name="notes"
              rows={3}
              className={`${inputClass} resize-none`}
              placeholder="Цвета, размеры, логотип, сроки..."
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm bg-red-50 border border-red-100 rounded-xl px-4 py-3">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="btn-primary w-full py-3.5 disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ fontSize: '0.9375rem' }}
          >
            {isPending ? 'Отправляем...' : (
              <>
                <span>Отправить заявку</span>
                <ArrowRight size={16} />
              </>
            )}
          </button>

          <p className="text-xs text-[#A8A8A8] text-center">
            Нажимая кнопку, вы соглашаетесь с обработкой персональных данных
          </p>
        </form>
      </div>

    </div>
  )
}
