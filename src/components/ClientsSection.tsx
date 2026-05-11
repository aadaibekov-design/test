import { createClient } from '@/lib/supabase/server'
import type { Client } from '@/lib/types'
import ClientMarquee from './ClientMarquee'

export default async function ClientsSection() {
  const supabase = await createClient()
  const { data: clients } = await supabase
    .from('clients')
    .select('*')
    .eq('is_active', true)
    .order('sort_order')

  if (!clients?.length) return null

  return (
    <section id="clients" className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 mb-10 text-center">
        <div className="eyebrow">Клиенты</div>
        <h2 className="section-title">Нам доверяют</h2>
        <p className="section-subtitle">
          Крупнейшие компании Казахстана выбирают Union Industry для своего мерча
        </p>
      </div>
      <ClientMarquee clients={clients as Client[]} />
    </section>
  )
}
