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
    <section id="clients" className="py-24" style={{ background: 'var(--bg)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-orange-500 text-sm font-semibold uppercase tracking-widest mb-3">
            Клиенты
          </p>
          <h2 className="section-title">Нам доверяют</h2>
          <p className="section-subtitle">
            Крупнейшие компании России выбирают Union для своего мерча
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {(clients as Client[]).map((client) => (
            <div
              key={client.id}
              className="rounded-xl p-4 flex items-center justify-center min-h-[68px] transition-all duration-200 border border-white/[0.07] hover:bg-white/[0.06] hover:border-orange-500/[0.2]"
              style={{ background: 'rgba(255,255,255,0.03)' }}
            >
              {client.logo_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={client.logo_url}
                  alt={client.name}
                  className="max-h-7 w-auto object-contain opacity-50 hover:opacity-90 transition-opacity"
                />
              ) : (
                <span
                  className="text-sm font-bold text-gray-500"
                  style={{ letterSpacing: '-0.02em' }}
                >
                  {client.name}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
