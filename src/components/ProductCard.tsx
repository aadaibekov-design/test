import Link from 'next/link'
import Image from 'next/image'
import type { Product } from '@/lib/types'
import { formatPrice } from '@/lib/utils'
import AddToCartButton from './AddToCartButton'

export default function ProductCard({ product }: { product: Product }) {
  const image =
    product.images?.[0] ||
    `https://placehold.co/400x400/EDEAE4/0A0A0A?text=${encodeURIComponent(product.name)}`

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-black/[0.07] hover:border-black/[0.15] hover:-translate-y-1 transition-all duration-200 hover:shadow-xl hover:shadow-black/[0.07]">
      <Link href={`/catalog/${product.slug}`}>
        <div className="relative aspect-square overflow-hidden bg-[#F4F2EE]">
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
          className="text-[10px] font-bold text-[#D4500A] uppercase"
          style={{ letterSpacing: '0.1em' }}
        >
          {product.category}
        </span>

        <Link href={`/catalog/${product.slug}`}>
          <h3
            className="mt-1.5 font-bold text-[#0A0A0A] group-hover:text-[#D4500A] transition-colors leading-snug"
            style={{ letterSpacing: '-0.02em' }}
          >
            {product.name}
          </h3>
        </Link>

        {product.short_description && (
          <p className="mt-2 text-sm text-[#5A5A5A] line-clamp-2 leading-relaxed">
            {product.short_description}
          </p>
        )}

        <div className="mt-4 flex items-center justify-between pt-4 border-t border-black/[0.06]">
          <div>
            <span className="text-xs text-[#A8A8A8]">от </span>
            <span className="text-lg font-black text-[#0A0A0A]" style={{ letterSpacing: '-0.04em' }}>
              {formatPrice(product.base_price)}
            </span>
          </div>
          <AddToCartButton
            item={{
              id: product.id,
              name: product.name,
              slug: product.slug,
              price: product.base_price,
              image: product.images?.[0],
              category: product.category,
            }}
          />
        </div>
      </div>
    </div>
  )
}
