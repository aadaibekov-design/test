'use client'

import { useState, useTransition } from 'react'
import { CheckCircle } from 'lucide-react'
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
    <section id="request" className="py-20 bg-orange-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-black text-white">
              Готовы обсудить ваш проект?
            </h2>
            <p className="mt-4 text-orange-100 text-lg">
              Оставьте заявку — наш менеджер свяжется с вами в течение 2 часов и подготовит персональное предложение.
            </p>
            <ul className="mt-6 space-y-2">
              {[
                'Расчёт стоимости бесплатно',
                'Предложение от 3 вариантов',
                'Без обязательств',
              ].map((item) => (
                <li key={item} className="flex items-center gap-2 text-orange-100">
                  <CheckCircle size={16} className="text-white shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-xl">
            {success ? (
              <div className="text-center py-6">
                <CheckCircle size={48} className="text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Заявка отправлена!</h3>
                <p className="text-gray-500">Мы свяжемся с вами в течение 2 часов.</p>
                <button
                  onClick={() => setSuccess(false)}
                  className="mt-6 text-sm text-orange-500 hover:text-orange-600 font-medium"
                >
                  Отправить ещё одну заявку
                </button>
              </div>
            ) : (
              <form action={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Компания <span className="text-red-500">*</span>
                    </label>
                    <input name="company_name" required className="input" placeholder="ООО «Название»" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Контактное лицо <span className="text-red-500">*</span>
                    </label>
                    <input name="contact_name" required className="input" placeholder="Иван Иванов" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input name="email" type="email" required className="input" placeholder="ivan@company.ru" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Телефон</label>
                    <input name="phone" type="tel" className="input" placeholder="+7 (999) 123-45-67" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Что интересует? Тираж?
                  </label>
                  <textarea
                    name="notes"
                    rows={3}
                    className="input resize-none"
                    placeholder="Например: 200 футболок с логотипом для корпоратива"
                  />
                </div>

                {error && <p className="text-red-500 text-sm">{error}</p>}

                <button
                  type="submit"
                  disabled={isPending}
                  className="btn-primary w-full disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isPending ? 'Отправляем...' : 'Отправить заявку'}
                </button>

                <p className="text-xs text-gray-400 text-center">
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
