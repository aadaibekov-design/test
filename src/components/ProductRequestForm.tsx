'use client'

import { useState, useTransition } from 'react'
import { CheckCircle } from 'lucide-react'
import { submitOrder } from '@/app/actions'
import type { Product } from '@/lib/types'

export default function ProductRequestForm({ product }: { product: Product }) {
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
        setError(result.error || 'Ошибка. Попробуйте позже.')
      }
    })
  }

  if (success) {
    return (
      <div className="border border-green-200 bg-green-50 rounded-xl p-6 text-center">
        <CheckCircle size={32} className="text-green-500 mx-auto mb-2" />
        <p className="font-bold text-gray-900">Заявка отправлена!</p>
        <p className="text-sm text-gray-500 mt-1">Мы свяжемся с вами в течение 2 часов.</p>
      </div>
    )
  }

  return (
    <form action={handleSubmit} className="space-y-3">
      <input type="hidden" name="product_id" value={product.id} />
      <input type="hidden" name="product_name" value={product.name} />

      <h3 className="font-bold text-gray-900 text-lg">Оставить заявку</h3>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <input name="company_name" required className="input text-sm" placeholder="Компания *" />
        </div>
        <div>
          <input name="contact_name" required className="input text-sm" placeholder="Имя *" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <input name="email" type="email" required className="input text-sm" placeholder="Email *" />
        <input name="phone" type="tel" className="input text-sm" placeholder="Телефон" />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <input
          name="quantity"
          type="number"
          min="1"
          className="input text-sm"
          placeholder="Тираж, шт"
        />
        <div />
      </div>

      <textarea name="notes" rows={2} className="input resize-none text-sm" placeholder="Дополнительные пожелания" />

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button
        type="submit"
        disabled={isPending}
        className="btn-primary w-full disabled:opacity-60"
      >
        {isPending ? 'Отправляем...' : 'Отправить заявку'}
      </button>
    </form>
  )
}
