export type OrderStatus = 'new' | 'in_review' | 'confirmed' | 'completed' | 'cancelled'

export interface Product {
  id: string
  name: string
  slug: string
  description: string | null
  short_description: string | null
  category: string
  base_price: number
  images: string[]
  is_featured: boolean
  is_active: boolean
  sort_order: number
  created_at: string
  updated_at: string
}

export interface Order {
  id: string
  company_name: string
  contact_name: string
  email: string
  phone: string | null
  product_id: string | null
  product_name: string | null
  quantity: number | null
  notes: string | null
  status: OrderStatus
  created_at: string
  updated_at: string
}

export interface Client {
  id: string
  name: string
  logo_url: string | null
  website: string | null
  sort_order: number
  is_active: boolean
  created_at: string
}

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  new: 'Новая',
  in_review: 'На рассмотрении',
  confirmed: 'Подтверждена',
  completed: 'Выполнена',
  cancelled: 'Отменена',
}

export const ORDER_STATUS_COLORS: Record<OrderStatus, string> = {
  new: 'bg-blue-100 text-blue-700',
  in_review: 'bg-yellow-100 text-yellow-700',
  confirmed: 'bg-purple-100 text-purple-700',
  completed: 'bg-green-100 text-green-700',
  cancelled: 'bg-gray-100 text-gray-500',
}

export const CATEGORIES = ['Одежда', 'Аксессуары', 'Канцелярия', 'Посуда'] as const
export type Category = (typeof CATEGORIES)[number]
