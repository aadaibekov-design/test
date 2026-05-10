import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import ProductForm from '@/components/admin/ProductForm'
import { createAdminClient } from '@/lib/supabase/server'
import { updateProduct } from '../../actions'
import type { Product } from '@/lib/types'

interface Props {
  params: Promise<{ id: string }>
}

export const metadata = { title: 'Редактировать товар — Union Admin' }

export default async function EditProductPage({ params }: Props) {
  const { id } = await params
  const supabase = await createAdminClient()
  const { data } = await supabase.from('products').select('*').eq('id', id).single()

  if (!data) notFound()

  const product = data as Product

  async function handleUpdate(formData: FormData) {
    'use server'
    return updateProduct(id, formData)
  }

  return (
    <div className="p-8">
      <Link href="/admin/products" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 mb-6 transition-colors">
        <ArrowLeft size={15} />
        Назад к товарам
      </Link>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Редактировать: {product.name}</h1>
      <ProductForm product={product} onSubmit={handleUpdate} />
    </div>
  )
}
