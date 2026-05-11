import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, CheckCircle, ArrowRight } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { createClient } from '@/lib/supabase/server'
import { formatPrice } from '@/lib/utils'
import type { Product } from '@/lib/types'
import ProductRequestForm from '@/components/ProductRequestForm'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const supabase = await createClient()
  const { data } = await supabase.from('products').select('name, short_description').eq('slug', slug).single()
  if (!data) return {}
  return {
    title: `${data.name} — Union`,
    description: data.short_description || '',
  }
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params
  const supabase = await createClient()
  const { data: product } = await supabase
    .from('products')
    .select('*')
    .eq('slug', slug)
    .eq('is_active', true)
    .single()

  if (!product) notFound()

  const p = product as Product
  const mainImage =
    p.images?.[0] ||
    `https://placehold.co/800x800/EDEAE4/0A0A0A?text=${encodeURIComponent(p.name)}`

  const perks = ['Бесплатный дизайн и макет', 'Минимальный тираж от 50 шт', 'Производство от 7 дней']

  return (
    <>
      <Navbar />
      <main className="pt-16 min-h-screen" style={{ background: 'var(--bg)' }}>

        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-5 sm:px-8 pt-8 pb-2">
          <Link
            href="/catalog"
            className="inline-flex items-center gap-1.5 text-sm text-[#5A5A5A] hover:text-[#0A0A0A] transition-colors"
            style={{ letterSpacing: '-0.01em' }}
          >
            <ArrowLeft size={14} />
            Каталог
          </Link>
        </div>

        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">

            {/* ── IMAGE COLUMN ── */}
            <div className="space-y-3">
              <div
                className="relative aspect-square rounded-2xl overflow-hidden"
                style={{ background: 'linear-gradient(150deg, #EDEAE4 0%, #E4E0D9 100%)' }}
              >
                <Image src={mainImage} alt={p.name} fill className="object-cover" />
              </div>
              {p.images.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {p.images.slice(1, 5).map((img, i) => (
                    <div
                      key={i}
                      className="relative aspect-square rounded-xl overflow-hidden"
                      style={{ background: '#EDEAE4' }}
                    >
                      <Image src={img} alt={`${p.name} ${i + 2}`} fill className="object-cover" />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* ── INFO COLUMN ── */}
            <div>
              {/* Category eyebrow */}
              <div className="eyebrow">{p.category}</div>

              <h1
                className="font-black text-[#0A0A0A] leading-none mt-1"
                style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', letterSpacing: '-0.045em' }}
              >
                {p.name}
              </h1>

              {p.short_description && (
                <p className="mt-4 text-[#5A5A5A] leading-relaxed" style={{ letterSpacing: '-0.01em' }}>
                  {p.short_description}
                </p>
              )}

              {/* Price block */}
              <div className="mt-6 flex items-end gap-3 py-5 border-y border-black/[0.07]">
                <div>
                  <p className="text-xs text-[#A8A8A8] mb-1 uppercase tracking-wider font-medium">
                    Стоимость
                  </p>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-xs text-[#5A5A5A]">от</span>
                    <span
                      className="font-black text-[#0A0A0A]"
                      style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', letterSpacing: '-0.05em' }}
                    >
                      {formatPrice(p.base_price)}
                    </span>
                  </div>
                  <p className="text-xs text-[#A8A8A8] mt-0.5">
                    Итоговая цена зависит от материала, нанесения и тиража
                  </p>
                </div>
              </div>

              {/* Perks */}
              <ul className="mt-5 space-y-2.5">
                {perks.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-[#5A5A5A]">
                    <div className="w-5 h-5 rounded-full bg-[#D4500A]/10 border border-[#D4500A]/20 flex items-center justify-center flex-shrink-0">
                      <CheckCircle size={11} color="#D4500A" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>

              {p.description && (
                <div className="mt-6 pt-6 border-t border-black/[0.07]">
                  <h2
                    className="font-bold text-[#0A0A0A] mb-2 text-sm uppercase tracking-wider"
                    style={{ letterSpacing: '0.06em' }}
                  >
                    О товаре
                  </h2>
                  <p className="text-[#5A5A5A] leading-relaxed text-sm">{p.description}</p>
                </div>
              )}

              {/* Form — cart button + request form */}
              <div className="mt-8">
                <ProductRequestForm product={p} />
              </div>
            </div>
          </div>
        </div>

      </main>
      <Footer />
    </>
  )
}
