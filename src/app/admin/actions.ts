'use server'

import { revalidatePath } from 'next/cache'
import { createAdminClient } from '@/lib/supabase/server'
import type { OrderStatus } from '@/lib/types'

// --- Orders ---

export async function updateOrderStatus(orderId: string, status: OrderStatus) {
  const supabase = await createAdminClient()
  await supabase.from('orders').update({ status }).eq('id', orderId)
  revalidatePath('/admin/orders')
}

// --- Products ---

export async function createProduct(formData: FormData) {
  const supabase = await createAdminClient()

  const name = (formData.get('name') as string).trim()
  const rawImages = (formData.get('images') as string).trim()
  const images = rawImages
    ? rawImages.split('\n').map((s) => s.trim()).filter(Boolean)
    : []

  const slug = name
    .toLowerCase()
    .replace(/[^a-zа-яё0-9\s-]/gi, '')
    .replace(/\s+/g, '-')
    .replace(/[а-яё]/gi, (c) => {
      const map: Record<string, string> = {
        а:'a',б:'b',в:'v',г:'g',д:'d',е:'e',ё:'yo',ж:'zh',з:'z',и:'i',й:'y',
        к:'k',л:'l',м:'m',н:'n',о:'o',п:'p',р:'r',с:'s',т:'t',у:'u',ф:'f',
        х:'kh',ц:'ts',ч:'ch',ш:'sh',щ:'shch',ъ:'',ы:'y',ь:'',э:'e',ю:'yu',я:'ya',
      }
      return map[c.toLowerCase()] ?? c
    })

  const { error } = await supabase.from('products').insert({
    name,
    slug: `${slug}-${Date.now()}`,
    description: (formData.get('description') as string)?.trim() || null,
    short_description: (formData.get('short_description') as string)?.trim() || null,
    category: formData.get('category') as string,
    base_price: parseInt(formData.get('base_price') as string),
    images,
    is_featured: formData.get('is_featured') === 'true',
    is_active: formData.get('is_active') !== 'false',
  })

  if (error) return { success: false, error: error.message }

  revalidatePath('/admin/products')
  revalidatePath('/catalog')
  return { success: true }
}

export async function updateProduct(id: string, formData: FormData) {
  const supabase = await createAdminClient()

  const rawImages = (formData.get('images') as string).trim()
  const images = rawImages
    ? rawImages.split('\n').map((s) => s.trim()).filter(Boolean)
    : []

  const { error } = await supabase.from('products').update({
    name: (formData.get('name') as string).trim(),
    description: (formData.get('description') as string)?.trim() || null,
    short_description: (formData.get('short_description') as string)?.trim() || null,
    category: formData.get('category') as string,
    base_price: parseInt(formData.get('base_price') as string),
    images,
    is_featured: formData.get('is_featured') === 'true',
    is_active: formData.get('is_active') !== 'false',
  }).eq('id', id)

  if (error) return { success: false, error: error.message }

  revalidatePath('/admin/products')
  revalidatePath('/catalog')
  return { success: true }
}

export async function deleteProduct(id: string) {
  const supabase = await createAdminClient()
  await supabase.from('products').delete().eq('id', id)
  revalidatePath('/admin/products')
  revalidatePath('/catalog')
}

// --- Clients ---

export async function createClient_action(formData: FormData) {
  const supabase = await createAdminClient()
  const { error } = await supabase.from('clients').insert({
    name: (formData.get('name') as string).trim(),
    logo_url: (formData.get('logo_url') as string)?.trim() || null,
    website: (formData.get('website') as string)?.trim() || null,
    sort_order: parseInt((formData.get('sort_order') as string) || '0'),
  })
  if (error) return { success: false, error: error.message }
  revalidatePath('/admin/clients')
  revalidatePath('/')
  return { success: true }
}

export async function updateClient(id: string, formData: FormData) {
  const supabase = await createAdminClient()
  const { error } = await supabase.from('clients').update({
    name: (formData.get('name') as string).trim(),
    logo_url: (formData.get('logo_url') as string)?.trim() || null,
    website: (formData.get('website') as string)?.trim() || null,
    sort_order: parseInt((formData.get('sort_order') as string) || '0'),
    is_active: formData.get('is_active') !== 'false',
  }).eq('id', id)
  if (error) return { success: false, error: error.message }
  revalidatePath('/admin/clients')
  revalidatePath('/')
  return { success: true }
}

export async function deleteClient(id: string) {
  const supabase = await createAdminClient()
  await supabase.from('clients').delete().eq('id', id)
  revalidatePath('/admin/clients')
  revalidatePath('/')
}
