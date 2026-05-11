'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import type { Product } from '@/lib/types'
import { CATEGORIES } from '@/lib/types'
import ImageUploader from './ImageUploader'

interface Props {
  product?: Product
  onSubmit: (formData: FormData) => Promise<{ success: boolean; error?: string }>
}

export default function ProductForm({ product, onSubmit }: Props) {
  const router = useRouter()
  const [error, setError] = useState('')
  const [isPending, startTransition] = useTransition()

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')
    const formData = new FormData(e.currentTarget)
    startTransition(async () => {
      const result = await onSubmit(formData)
      if (result.success) {
        router.push('/admin/products')
        router.refresh()
      } else {
        setError(result.error || 'Ошибка. Попробуйте ещё раз.')
      }
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 max-w-2xl">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Название <span className="text-red-500">*</span>
          </label>
          <input name="name" required defaultValue={product?.name} className="input-light" placeholder="Футболка с принтом" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Категория <span className="text-red-500">*</span>
          </label>
          <select name="category" required defaultValue={product?.category || ''} className="input-light">
            <option value="" disabled>Выберите категорию</option>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Цена от (₽) <span className="text-red-500">*</span>
          </label>
          <input
            name="base_price"
            type="number"
            min="1"
            required
            defaultValue={product?.base_price}
            className="input-light"
            placeholder="350"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Краткое описание</label>
          <input
            name="short_description"
            defaultValue={product?.short_description ?? ''}
            className="input-light"
            placeholder="Хлопок 100%, шелкотрафарет или DTF печать"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Полное описание</label>
          <textarea
            name="description"
            rows={4}
            defaultValue={product?.description ?? ''}
            className="input resize-none"
            placeholder="Подробное описание товара..."
          />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Фотографии товара
          </label>
          <ImageUploader initialUrls={product?.images ?? []} />
        </div>

        <div className="flex items-center gap-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              name="is_featured"
              value="true"
              defaultChecked={product?.is_featured ?? false}
              className="w-4 h-4 accent-orange-500"
            />
            <span className="text-sm font-medium text-gray-700">На главной (Featured)</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              name="is_active"
              value="true"
              defaultChecked={product?.is_active ?? true}
              className="w-4 h-4 accent-orange-500"
            />
            <span className="text-sm font-medium text-gray-700">Активен</span>
          </label>
        </div>
      </div>

      {error && <p className="text-sm text-red-500 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{error}</p>}

      <div className="flex items-center gap-3 pt-2">
        <button type="submit" disabled={isPending} className="btn-primary disabled:opacity-60">
          {isPending ? 'Сохраняем...' : product ? 'Сохранить изменения' : 'Создать товар'}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="px-5 py-3 text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors"
        >
          Отмена
        </button>
      </div>
    </form>
  )
}
