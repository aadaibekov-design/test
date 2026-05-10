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
    <section id="request" className="py-24 bg-[#0A0A0A] relative overflow-hidden">
      {/* Subtle texture */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
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

            {/* Brand mark */}
            <div className="mt-16 border-t border-white/[0.07] pt-8">
              <div className="flex flex-col leading-none">
                <span className="font-black text-white/20 text-2xl tracking-[0.06em] uppercase">Union</span>
                <span className="font-light text-white/15 text-xs uppercase" style={{ letterSpacing: '0.18em' }}>Industry</span>
              </div>
            </div>
          </div>

          {/* Right — form */}
          <div className="rounded-2xl p-8 border border-white/[0.09]" style={{ background: 'rgba(255,255,255,0.04)' }}>
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
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-white/40 mb-1.5 uppercase tracking-wider">
                      Компания <span className="text-[#D4500A]">*</span>
                    </label>
                    <input name="company_name" required className="input" placeholder="ООО «Название»" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-white/40 mb-1.5 uppercase tracking-wider">
                      Контактное лицо <span className="text-[#D4500A]">*</span>
                    </label>
                    <input name="contact_name" required className="input" placeholder="Иван Иванов" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-white/40 mb-1.5 uppercase tracking-wider">
                      Email <span className="text-[#D4500A]">*</span>
                    </label>
                    <input name="email" type="email" required className="input" placeholder="ivan@company.ru" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-white/40 mb-1.5 uppercase tracking-wider">Телефон</label>
                    <input name="phone" type="tel" className="input" placeholder="+7 (999) 123-45-67" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-white/40 mb-1.5 uppercase tracking-wider">
                    Что интересует?
                  </label>
                  <textarea name="notes" rows={3} className="input resize-none" placeholder="Например: 200 худи с логотипом для корпоратива" />
                </div>

                {error && <p className="text-red-400 text-sm">{error}</p>}

                <button
                  type="submit"
                  disabled={isPending}
                  className="btn-primary-inv w-full py-3.5 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {isPending ? 'Отправляем...' : <><span>Отправить заявку</span><ArrowRight size={16} /></>}
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
