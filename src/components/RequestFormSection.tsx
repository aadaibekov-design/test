'use client'

import { useState, useTransition } from 'react'
import { CheckCircle, ArrowRight } from 'lucide-react'
import { submitOrder } from '@/app/actions'

export default function RequestFormSection() {
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const [isPending, startTransition] = useTransition()

  async function handleSubmit(formData: FormData) {
    setError('')
    startTransition(async () => {
      const result = await submitOrder(formData)
      if (result.success) {
        setSuccess(true)
      } else {
        setError(result.error || 'Произошла ошибка. Попробуйте позже.')
      }
    })
  }

  return (
    <section id="request" className="py-24 relative overflow-hidden" style={{ background: 'var(--bg2)' }}>
      {/* orange glow */}
      <div
        className="absolute top-0 left-0 w-[500px] h-[400px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(249,115,22,0.12) 0%, transparent 70%)',
          filter: 'blur(60px)',
          transform: 'translate(-20%, -20%)',
        }}
        aria-hidden
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          {/* Left */}
          <div>
            <p className="text-orange-500 text-sm font-semibold uppercase tracking-widest mb-4">
              Заявка
            </p>
            <h2
              className="text-3xl md:text-4xl font-black text-white leading-tight"
              style={{ letterSpacing: '-0.04em' }}
            >
              Готовы обсудить<br />ваш проект?
            </h2>
            <p className="mt-4 text-gray-400 text-lg leading-relaxed" style={{ letterSpacing: '-0.01em' }}>
              Оставьте заявку — менеджер свяжется в течение 2 часов и подготовит персональное предложение.
            </p>
            <ul className="mt-7 space-y-3">
              {[
                'Расчёт стоимости бесплатно',
                'Предложение от 3 вариантов',
                'Без обязательств',
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-gray-300 text-sm">
                  <CheckCircle size={15} className="text-orange-500 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Right — form */}
          <div
            className="rounded-2xl p-8"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            {success ? (
              <div className="text-center py-8">
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5"
                  style={{ background: 'rgba(52,211,153,0.12)', border: '1px solid rgba(52,211,153,0.25)' }}
                >
                  <CheckCircle size={28} color="#34d399" />
                </div>
                <h3
                  className="text-xl font-black text-white mb-2"
                  style={{ letterSpacing: '-0.03em' }}
                >
                  Заявка отправлена!
                </h3>
                <p className="text-gray-400 text-sm">Мы свяжемся с вами в течение 2 часов.</p>
                <button
                  onClick={() => setSuccess(false)}
                  className="mt-6 text-sm text-orange-500 hover:text-orange-400 font-medium transition-colors"
                >
                  Отправить ещё одну заявку
                </button>
              </div>
            ) : (
              <form action={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1.5">
                      Компания <span className="text-orange-500">*</span>
                    </label>
                    <input name="company_name" required className="input" placeholder="ООО «Название»" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1.5">
                      Контактное лицо <span className="text-orange-500">*</span>
                    </label>
                    <input name="contact_name" required className="input" placeholder="Иван Иванов" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1.5">
                      Email <span className="text-orange-500">*</span>
                    </label>
                    <input name="email" type="email" required className="input" placeholder="ivan@company.ru" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1.5">Телефон</label>
                    <input name="phone" type="tel" className="input" placeholder="+7 (999) 123-45-67" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5">
                    Что интересует? Тираж?
                  </label>
                  <textarea
                    name="notes"
                    rows={3}
                    className="input resize-none"
                    placeholder="Например: 200 футболок с логотипом для корпоратива"
                  />
                </div>

                {error && <p className="text-red-400 text-sm">{error}</p>}

                <button
                  type="submit"
                  disabled={isPending}
                  className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isPending ? 'Отправляем...' : (
                    <>Отправить заявку <ArrowRight size={16} /></>
                  )}
                </button>

                <p className="text-xs text-gray-600 text-center">
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
