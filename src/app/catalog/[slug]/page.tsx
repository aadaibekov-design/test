import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, CheckCircle } from 'lucide-react'
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
  const mainImage = p.images?.[0] || `https://placehold.co/800x800/1f2937/ffffff?text=${encodeURIComponent(p.name)}`

  return (
    <>
      <Navbar />
      <main className="pt-16 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <Link href="/catalog" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 mb-8 transition-colors">
            <ArrowLeft size={16} />
            Назад в каталог
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Image */}
            <div className="space-y-3">
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-50">
                <Image src={mainImage} alt={p.name} fill className="object-cover" />
              </div>
              {p.images.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {p.images.slice(1, 5).map((img, i) => (
                    <div key={i} className="relative aspect-square rounded-xl overflow-hidden bg-gray-50">
                      <Image src={img} alt={`${p.name} ${i + 2}`} fill className="object-cover" />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Info */}
            <div>
              <span className="text-sm font-medium text-orange-500 uppercase tracking-wider">{p.category}</span>
              <h1 className="mt-2 text-3xl font-black text-gray-900">{p.name}</h1>

              {p.short_description && (
                <p className="mt-3 text-gray-500">{p.short_description}</p>
              )}

              <div className="mt-6 p-5 bg-gray-50 rounded-xl">
                <p className="text-sm text-gray-500">Стоимость</p>
                <p className="text-4xl font-black text-gray-900 mt-1">
                  от {formatPrice(p.base_price)}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  Итоговая цена зависит от материала, нанесения и тиража
                </p>
              </div>

              {p.description && (
                <div className="mt-6">
                  <h2 className="font-bold text-gray-900 mb-3">О товаре</h2>
                  <p className="text-gray-600 leading-relaxed text-sm">{p.description}</p>
                </div>
              )}

              <ul className="mt-6 space-y-2">
                {['Бесплатный дизайн и макет', 'Минимальный тираж от 50 шт', 'Производство от 7 дней'].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-gray-600">
                    <CheckCircle size={15} className="text-green-500 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>

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
