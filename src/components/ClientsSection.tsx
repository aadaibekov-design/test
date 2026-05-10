import { createClient } from '@/lib/supabase/server'
import type { Client } from '@/lib/types'

export default async function ClientsSection() {
  const supabase = await createClient()
  const { data: clients } = await supabase
    .from('clients')
    .select('*')
    .eq('is_active', true)
    .order('sort_order')

  if (!clients?.length) return null

  return (
    <section id="clients" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="section-title">Нам доверяют</h2>
          <p className="section-subtitle">Крупнейшие компании России выбирают Union для своего мерча</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {(clients as Client[]).map((client) => (
            <div
              key={client.id}
              className="border border-gray-100 rounded-xl p-4 flex items-center justify-center hover:border-orange-200 hover:shadow-sm transition-all min-h-[72px]"
            >
              {client.logo_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={client.logo_url}
                  alt={client.name}
                  className="max-h-8 w-auto object-contain grayscale hover:grayscale-0 transition-all"
                />
              ) : (
                <span className="text-sm font-bold text-gray-500">{client.name}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
