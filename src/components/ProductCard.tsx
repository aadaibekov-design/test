import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import type { Product } from '@/lib/types'
import { formatPrice } from '@/lib/utils'

export default function ProductCard({ product }: { product: Product }) {
  const image =
    product.images?.[0] ||
    `https://placehold.co/400x400/0f0f24/ffffff?text=${encodeURIComponent(product.name)}`

  return (
    <div
      className="group rounded-2xl overflow-hidden transition-all duration-200 hover:-translate-y-1 border border-white/[0.08] hover:border-orange-500/[0.25]"
      style={{ background: 'var(--bg3)' }}
    >
      <Link href={`/catalog/${product.slug}`}>
        <div
          className="relative aspect-square overflow-hidden"
          style={{ background: 'rgba(255,255,255,0.03)' }}
        >
          <Image
            src={image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      </Link>
      <div className="p-5">
        <span
          className="text-xs font-semibold text-orange-500 uppercase"
          style={{ letterSpacing: '0.08em' }}
        >
          {product.category}
        </span>
        <Link href={`/catalog/${product.slug}`}>
          <h3
            className="mt-1.5 font-bold text-white group-hover:text-orange-400 transition-colors"
            style={{ letterSpacing: '-0.02em' }}
          >
            {product.name}
          </h3>
        </Link>
        {product.short_description && (
          <p className="mt-2 text-sm text-gray-500 line-clamp-2 leading-relaxed">
            {product.short_description}
          </p>
        )}
        <div
          className="mt-4 flex items-center justify-between pt-4"
          style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}
        >
          <div>
            <span className="text-xs text-gray-500">от</span>
            <span
              className="ml-1 text-lg font-black text-white"
              style={{ letterSpacing: '-0.04em' }}
            >
              {formatPrice(product.base_price)}
            </span>
          </div>
          <Link
            href={`/catalog/${product.slug}`}
            className="inline-flex items-center gap-1 text-sm font-semibold text-orange-500 hover:text-orange-400 transition-colors"
          >
            Подробнее <ArrowRight size={13} />
          </Link>
        </div>
      </div>
    </div>
  )
}
