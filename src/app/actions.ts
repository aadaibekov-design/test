'use server'

import { createClient } from '@/lib/supabase/server'

export async function submitOrder(formData: FormData) {
  const supabase = await createClient()

  const company_name = (formData.get('company_name') as string)?.trim()
  const contact_name = (formData.get('contact_name') as string)?.trim()
  const email = (formData.get('email') as string)?.trim()
  const phone = (formData.get('phone') as string)?.trim() || null
  const product_id = (formData.get('product_id') as string) || null
  const product_name = (formData.get('product_name') as string)?.trim() || null
  const quantity_raw = formData.get('quantity')
  const quantity = quantity_raw ? parseInt(quantity_raw as string) || null : null
  const notes = (formData.get('notes') as string)?.trim() || null

  if (!company_name || !contact_name || !email) {
    return { success: false, error: 'Заполните обязательные поля' }
  }

  const { error } = await supabase.from('orders').insert({
    company_name,
    contact_name,
    email,
    phone,
    product_id,
    product_name,
    quantity,
    notes,
  })

  if (error) {
    console.error('Order insert error:', error)
    return { success: false, error: 'Не удалось отправить заявку. Попробуйте позже.' }
  }

  return { success: true }
}
