'use client'

import { useState, useTransition } from 'react'
import { CheckCircle, ArrowRight, ShoppingBag, X } from 'lucide-react'
import { submitOrder } from '@/app/actions'
import { useCart } from '@/lib/cart-context'
import { formatPrice } from '@/lib/utils'

export default function RequestFormSection() {
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const [isPending, startTransition] = useTransition()
  const { items, clearCart } = useCart()

  async function handleSubmit(formData: FormData) {
    setError('')
    if (items.length > 0) {
      const cartSummary = items
        .map((i) => `${i.name} × ${i.quantity} (от ${formatPrice(i.price * i.quantity)})`)
        .join(', ')
      const existingNotes = (formData.get('notes') as string) || ''
      const fullNotes = existingNotes
        ? `Корзина: ${cartSummary}\n\nДополнительно: ${existingNotes}`
        : `Корзина: ${cartSummary}`
      formData.set('notes', fullNotes)
      formData.set('product_name', items.map((i) => i.name).join(', '))
    }

    startTransition(async () => {
      const result = await submitOrder(formData)
      if (result.success) {
        setSuccess(true)
        clearCart()
      } else {
        setError(result.error || 'Произошла ошибка. Попробуйте позже.')
      }
    })
  }

  return (
    <section id="request" className="py-24 relative overflow-hidden" style={{ background: '#0C0C0C' }}>
      {/* Dot texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.035) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
        aria-hidden
      />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Left */}
          <div className="pt-2">
            <div className="text-[#D4500A] text-xs font-bold uppercase tracking-[0.12em] mb-4">
              Заявка
            </div>
            <h2
              className="font-black text-white leading-tight"
              style={{ fontSize: 'clamp(2.25rem, 4vw, 3.25rem)', letterSpacing: '-0.045em' }}
            >
              Готовы обсудить<br />ваш проект?
            </h2>
            <p className="mt-5 text-white/50 text-base leading-relaxed" style={{ letterSpacing: '-0.01em' }}>
              Оставьте заявку — менеджер свяжется в течение 2 часов и подготовит персональное предложение.
            </p>

            <ul className="mt-8 space-y-3">
              {['Расчёт стоимости бесплатно', 'Предложение от 3 вариантов', 'Без обязательств'].map((item) => (
                <li key={item} className="flex items-center gap-3 text-white/60 text-sm">
                  <div className="w-5 h-5 rounded-full bg-[#D4500A]/20 border border-[#D4500A]/30 flex items-center justify-center flex-shrink-0">
                    <CheckCircle size={11} color="#D4500A" />
                  </div>
                  {item}
                </li>
              ))}
            </ul>

            {/* Cart preview */}
            {items.length > 0 && (
              <div className="mt-10 rounded-xl border border-white/[0.10] p-4" style={{ background: 'rgba(255,255,255,0.04)' }}>
                <div className="flex items-center gap-2 mb-3">
                  <ShoppingBag size={14} className="text-[#D4500A]" />
                  <span className="text-xs font-bold text-white/70 uppercase tracking-wider">
                    Выбранные товары
                  </span>
                </div>
                <div className="space-y-2">
                  {items.map((i) => (
                    <div key={i.id} className="flex items-center justify-between text-sm">
                      <span className="text-white/60 truncate mr-3">{i.name} × {i.quantity}</span>
                      <span className="text-white/40 whitespace-nowrap">от {formatPrice(i.price * i.quantity)}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-3 pt-3 border-t border-white/[0.08] flex items-center justify-between">
                  <span className="text-xs text-white/40">Ориентировочно</span>
                  <span className="font-black text-white" style={{ letterSpacing: '-0.03em' }}>
                    от {formatPrice(items.reduce((s, i) => s + i.price * i.quantity, 0))}
                  </span>
                </div>
              </div>
            )}

            {/* Brand mark */}
            <div className="mt-16 border-t border-white/[0.07] pt-8">
              <div className="flex flex-col leading-none">
                <span className="font-black text-white/20 text-2xl tracking-[0.06em] uppercase">Union</span>
                <span className="font-light text-white/15 text-xs uppercase" style={{ letterSpacing: '0.18em' }}>Industry</span>
              </div>
            </div>
          </div>

          {/* Right — form */}
          <div className="rounded-2xl p-8" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.10)' }}>
            {success ? (
              <div className="text-center py-10">
                <div className="w-14 h-14 rounded-full bg-[#D4500A]/15 border border-[#D4500A]/25 flex items-center justify-center mx-auto mb-5">
                  <CheckCircle size={26} color="#D4500A" />
                </div>
                <h3 className="text-xl font-black text-white mb-2" style={{ letterSpacing: '-0.03em' }}>
                  Заявка отправлена!
                </h3>
                <p className="text-white/40 text-sm">Мы свяжемся с вами в течение 2 часов.</p>
                <button
                  onClick={() => setSuccess(false)}
                  className="mt-6 text-sm text-[#D4500A] hover:text-orange-400 font-medium transition-colors"
                >
                  Отправить ещё одну заявку
                </button>
              </div>
            ) : (
              <form action={handleSubmit} className="space-y-4">
                {items.length > 0 && (
                  <div className="rounded-lg px-4 py-3 flex items-center gap-2.5 text-sm" style={{ background: 'rgba(212,80,10,0.12)', border: '1px solid rgba(212,80,10,0.25)' }}>
                    <ShoppingBag size={14} color="#D4500A" className="flex-shrink-0" />
                    <span className="text-white/70">
                      В заявке: <span className="font-semibold text-white">{items.length} {items.length === 1 ? 'товар' : items.length < 5 ? 'товара' : 'товаров'}</span>
                    </span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-white/60 mb-1.5 uppercase tracking-wider">
                      Компания <span className="text-[#D4500A]">*</span>
                    </label>
                    <input
                      name="company_name"
                      required
                      className="w-full px-4 py-3 rounded-lg text-white text-sm transition-colors placeholder-white/30 focus:outline-none focus:ring-1"
                      style={{
                        background: 'rgba(255,255,255,0.08)',
                        border: '1px solid rgba(255,255,255,0.14)',
                      }}
                      onFocus={(e) => {
                        e.target.style.border = '1px solid rgba(255,255,255,0.35)'
                        e.target.style.background = 'rgba(255,255,255,0.11)'
                      }}
                      onBlur={(e) => {
                        e.target.style.border = '1px solid rgba(255,255,255,0.14)'
                        e.target.style.background = 'rgba(255,255,255,0.08)'
                      }}
                      placeholder="ООО «Название»"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-white/60 mb-1.5 uppercase tracking-wider">
                      Контактное лицо <span className="text-[#D4500A]">*</span>
                    </label>
                    <input
                      name="contact_name"
                      required
                      className="w-full px-4 py-3 rounded-lg text-white text-sm transition-colors placeholder-white/30 focus:outline-none"
                      style={{
                        background: 'rgba(255,255,255,0.08)',
                        border: '1px solid rgba(255,255,255,0.14)',
                      }}
                      onFocus={(e) => {
                        e.target.style.border = '1px solid rgba(255,255,255,0.35)'
                        e.target.style.background = 'rgba(255,255,255,0.11)'
                      }}
                      onBlur={(e) => {
                        e.target.style.border = '1px solid rgba(255,255,255,0.14)'
                        e.target.style.background = 'rgba(255,255,255,0.08)'
                      }}
                      placeholder="Иван Иванов"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-white/60 mb-1.5 uppercase tracking-wider">
                      Email <span className="text-[#D4500A]">*</span>
                    </label>
                    <input
                      name="email"
                      type="email"
                      required
                      className="w-full px-4 py-3 rounded-lg text-white text-sm transition-colors placeholder-white/30 focus:outline-none"
                      style={{
                        background: 'rgba(255,255,255,0.08)',
                        border: '1px solid rgba(255,255,255,0.14)',
                      }}
                      onFocus={(e) => {
                        e.target.style.border = '1px solid rgba(255,255,255,0.35)'
                        e.target.style.background = 'rgba(255,255,255,0.11)'
                      }}
                      onBlur={(e) => {
                        e.target.style.border = '1px solid rgba(255,255,255,0.14)'
                        e.target.style.background = 'rgba(255,255,255,0.08)'
                      }}
                      placeholder="ivan@company.ru"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-white/60 mb-1.5 uppercase tracking-wider">
                      Телефон
                    </label>
                    <input
                      name="phone"
                      type="tel"
                      className="w-full px-4 py-3 rounded-lg text-white text-sm transition-colors placeholder-white/30 focus:outline-none"
                      style={{
                        background: 'rgba(255,255,255,0.08)',
                        border: '1px solid rgba(255,255,255,0.14)',
                      }}
                      onFocus={(e) => {
                        e.target.style.border = '1px solid rgba(255,255,255,0.35)'
                        e.target.style.background = 'rgba(255,255,255,0.11)'
                      }}
                      onBlur={(e) => {
                        e.target.style.border = '1px solid rgba(255,255,255,0.14)'
                        e.target.style.background = 'rgba(255,255,255,0.08)'
                      }}
                      placeholder="+7 (999) 123-45-67"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-white/60 mb-1.5 uppercase tracking-wider">
                    {items.length > 0 ? 'Дополнительные пожелания' : 'Что интересует?'}
                  </label>
                  <textarea
                    name="notes"
                    rows={3}
                    className="w-full px-4 py-3 rounded-lg text-white text-sm transition-colors placeholder-white/30 focus:outline-none resize-none"
                    style={{
                      background: 'rgba(255,255,255,0.08)',
                      border: '1px solid rgba(255,255,255,0.14)',
                    }}
                    onFocus={(e) => {
                      e.target.style.border = '1px solid rgba(255,255,255,0.35)'
                      e.target.style.background = 'rgba(255,255,255,0.11)'
                    }}
                    onBlur={(e) => {
                      e.target.style.border = '1px solid rgba(255,255,255,0.14)'
                      e.target.style.background = 'rgba(255,255,255,0.08)'
                    }}
                    placeholder={
                      items.length > 0
                        ? 'Цвета, размеры, логотип, сроки...'
                        : 'Например: 200 худи с логотипом для корпоратива'
                    }
                  />
                </div>

                {error && <p className="text-red-400 text-sm">{error}</p>}

                <button
                  type="submit"
                  disabled={isPending}
                  className="btn-primary-inv w-full py-3.5 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {isPending ? 'Отправляем...' : (
                    <>
                      <span>
                        {items.length > 0 ? `Отправить заявку (${items.length} тов.)` : 'Отправить заявку'}
                      </span>
                      <ArrowRight size={16} />
                    </>
                  )}
                </button>

                <p className="text-xs text-white/20 text-center">
                  Нажимая кнопку, вы соглашаетесь с обработкой персональных данных
                </p>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  )
}
