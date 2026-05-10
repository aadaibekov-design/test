import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import type { Product } from '@/lib/types'
import { formatPrice } from '@/lib/utils'

export default function ProductCard({ product }: { product: Product }) {
  const image = product.images?.[0] || `https://placehold.co/400x400/1f2937/ffffff?text=${encodeURIComponent(product.name)}`

  return (
    <div className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow">
      <Link href={`/catalog/${product.slug}`}>
        <div className="relative aspect-square overflow-hidden bg-gray-50">
          <Image
            src={image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      </Link>
      <div className="p-5">
        <div className="flex items-start justify-between gap-2">
          <div>
            <span className="text-xs font-medium text-orange-500 uppercase tracking-wider">
              {product.category}
            </span>
            <Link href={`/catalog/${product.slug}`}>
              <h3 className="mt-1 font-bold text-gray-900 group-hover:text-orange-500 transition-colors">
                {product.name}
              </h3>
            </Link>
          </div>
        </div>
        {product.short_description && (
          <p className="mt-2 text-sm text-gray-500 line-clamp-2">{product.short_description}</p>
        )}
        <div className="mt-4 flex items-center justify-between">
          <div>
            <span className="text-xs text-gray-400">от</span>
            <span className="ml-1 text-lg font-black text-gray-900">{formatPrice(product.base_price)}</span>
          </div>
          <Link
            href={`/catalog/${product.slug}`}
            className="inline-flex items-center gap-1 text-sm font-semibold text-orange-500 hover:text-orange-600 transition-colors"
          >
            Подробнее <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  )
}
