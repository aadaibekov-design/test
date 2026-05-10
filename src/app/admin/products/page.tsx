import Link from 'next/link'
import Image from 'next/image'
import { Plus, Pencil } from 'lucide-react'
import { createAdminClient } from '@/lib/supabase/server'
import type { Product } from '@/lib/types'
import { formatPrice } from '@/lib/utils'
import DeleteProductButton from './DeleteProductButton'

export const metadata = { title: 'Товары — Union Admin' }

export default async function AdminProductsPage() {
  const supabase = await createAdminClient()
  const { data: products } = await supabase
    .from('products')
    .select('*')
    .order('sort_order')

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Товары</h1>
          <p className="text-sm text-gray-500 mt-1">{products?.length ?? 0} позиций</p>
        </div>
        <Link href="/admin/products/new" className="btn-primary text-sm py-2.5 px-5">
          <Plus size={16} />
          Добавить товар
        </Link>
      </div>

      {!products?.length ? (
        <div className="text-center py-20 text-gray-400">
          <p>Товаров нет</p>
          <Link href="/admin/products/new" className="mt-3 inline-block text-orange-500 hover:underline text-sm">
            Добавить первый товар
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                <th className="px-5 py-3 text-left">Товар</th>
                <th className="px-5 py-3 text-left">Категория</th>
                <th className="px-5 py-3 text-left">Цена от</th>
                <th className="px-5 py-3 text-left">Статус</th>
                <th className="px-5 py-3 text-left">Действия</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {(products as Product[]).map((product) => {
                const thumb = product.images?.[0] || `https://placehold.co/60x60/f3f4f6/6b7280?text=${encodeURIComponent(product.name.slice(0, 1))}`
                return (
                  <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-gray-100 shrink-0">
                          <Image src={thumb} alt={product.name} fill className="object-cover" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{product.name}</div>
                          <div className="text-xs text-gray-400">{product.slug}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3 text-gray-600">{product.category}</td>
                    <td className="px-5 py-3 font-semibold text-gray-900">{formatPrice(product.base_price)}</td>
                    <td className="px-5 py-3">
                      <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${product.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                        {product.is_active ? 'Активен' : 'Скрыт'}
                      </span>
                      {product.is_featured && (
                        <span className="ml-1 inline-flex items-center text-xs font-medium px-2 py-1 rounded-full bg-orange-100 text-orange-700">
                          Featured
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/admin/products/${product.id}`}
                          className="inline-flex items-center gap-1 text-xs text-gray-500 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-lg transition-colors"
                        >
                          <Pencil size={12} />
                          Ред.
                        </Link>
                        <DeleteProductButton id={product.id} name={product.name} />
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
