import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import ProductForm from '@/components/admin/ProductForm'
import { createProduct } from '../../actions'

export const metadata = { title: 'Новый товар — Union Admin' }

export default function NewProductPage() {
  return (
    <div className="p-8">
      <Link href="/admin/products" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 mb-6 transition-colors">
        <ArrowLeft size={15} />
        Назад к товарам
      </Link>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Новый товар</h1>
      <ProductForm onSubmit={createProduct} />
    </div>
  )
}
