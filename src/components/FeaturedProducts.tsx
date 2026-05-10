import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import type { Product } from '@/lib/types'
import ProductCard from './ProductCard'

export default async function FeaturedProducts() {
  const supabase = await createClient()
  const { data: products } = await supabase
    .from('products')
    .select('*')
    .eq('is_featured', true)
    .eq('is_active', true)
    .order('sort_order')
    .limit(6)

  if (!products?.length) return null

  return (
    <section id="catalog" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <h2 className="section-title">Популярные товары</h2>
            <p className="section-subtitle">Самые востребованные позиции для корпоративного мерча</p>
          </div>
          <Link href="/catalog" className="btn-outline shrink-0 text-sm py-2.5 px-5">
            Весь каталог <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {(products as Product[]).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}
