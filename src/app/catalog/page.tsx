import { Suspense } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { createClient } from '@/lib/supabase/server'
import type { Product } from '@/lib/types'
import { CATEGORIES } from '@/lib/types'
import ProductCard from '@/components/ProductCard'
import Link from 'next/link'

interface Props {
  searchParams: Promise<{ category?: string }>
}

export const metadata = {
  title: 'Каталог — Union',
  description: 'Каталог корпоративного мерча: футболки, худи, кепки, рюкзаки, блокноты и многое другое.',
}

async function ProductGrid({ category }: { category?: string }) {
  const supabase = await createClient()

  let query = supabase.from('products').select('*').eq('is_active', true).order('sort_order')

  if (category && CATEGORIES.includes(category as (typeof CATEGORIES)[number])) {
    query = query.eq('category', category)
  }

  const { data: products } = await query

  if (!products?.length) {
    return (
      <div className="col-span-full text-center py-20 text-gray-400">
        <p className="text-lg">Товары не найдены</p>
        <Link href="/catalog" className="mt-3 inline-block text-orange-500 hover:underline text-sm">
          Сбросить фильтр
        </Link>
      </div>
    )
  }

  return (
    <>
      {(products as Product[]).map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </>
  )
}

export default async function CatalogPage({ searchParams }: Props) {
  const { category } = await searchParams

  return (
    <>
      <Navbar />
      <main className="pt-16 min-h-screen">
        <div className="bg-gray-900 py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl md:text-4xl font-black text-white">Каталог</h1>
            <p className="mt-2 text-gray-400">100+ видов корпоративной продукции с нанесением</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {/* Category tabs */}
          <div className="flex flex-wrap gap-2 mb-8">
            <Link
              href="/catalog"
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                !category ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Все товары
            </Link>
            {CATEGORIES.map((cat) => (
              <Link
                key={cat}
                href={`/catalog?category=${encodeURIComponent(cat)}`}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  category === cat ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {cat}
              </Link>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <Suspense
              fallback={Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="bg-gray-100 rounded-2xl aspect-square animate-pulse" />
              ))}
            >
              <ProductGrid category={category} />
            </Suspense>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
