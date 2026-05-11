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
      <div className="col-span-full text-center py-20 text-[#A8A8A8]">
        <p className="text-lg font-semibold text-[#5A5A5A]">Товары не найдены</p>
        <Link href="/catalog" className="mt-3 inline-block text-[#D4500A] hover:underline text-sm">
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
      <main className="pt-16 min-h-screen" style={{ background: 'var(--bg)' }}>

        {/* Header */}
        <div className="bg-[#0A0A0A] py-14">
          <div className="max-w-7xl mx-auto px-5 sm:px-8">
            <div className="eyebrow" style={{ color: '#D4500A' }}>Ассортимент</div>
            <h1
              className="font-black text-white mt-1"
              style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', letterSpacing: '-0.045em', lineHeight: 1 }}
            >
              Каталог
            </h1>
            <p className="mt-3 text-white/40 text-sm" style={{ letterSpacing: '-0.01em' }}>
              100+ видов корпоративной продукции с нанесением
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-10">
          {/* Category tabs */}
          <div className="flex flex-wrap gap-2 mb-8">
            <Link
              href="/catalog"
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-150 ${
                !category
                  ? 'bg-[#0A0A0A] text-white'
                  : 'bg-white border border-black/[0.10] text-[#5A5A5A] hover:border-black/[0.20] hover:text-[#0A0A0A]'
              }`}
              style={{ letterSpacing: '-0.01em' }}
            >
              Все товары
            </Link>
            {CATEGORIES.map((cat) => (
              <Link
                key={cat}
                href={`/catalog?category=${encodeURIComponent(cat)}`}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-150 ${
                  category === cat
                    ? 'bg-[#0A0A0A] text-white'
                    : 'bg-white border border-black/[0.10] text-[#5A5A5A] hover:border-black/[0.20] hover:text-[#0A0A0A]'
                }`}
                style={{ letterSpacing: '-0.01em' }}
              >
                {cat}
              </Link>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            <Suspense
              fallback={Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="bg-white rounded-2xl aspect-square animate-pulse border border-black/[0.06]" />
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
