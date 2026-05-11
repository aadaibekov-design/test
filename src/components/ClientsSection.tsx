import { createClient } from '@/lib/supabase/server'
import type { Client } from '@/lib/types'
import ClientLogo from './ClientLogo'

export default async function ClientsSection() {
  const supabase = await createClient()
  const { data: clients } = await supabase
    .from('clients')
    .select('*')
    .eq('is_active', true)
    .order('sort_order')

  if (!clients?.length) return null

  return (
    <section id="clients" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">

        <div className="text-center mb-14">
          <div className="eyebrow">Клиенты</div>
          <h2 className="section-title">Нам доверяют</h2>
          <p className="section-subtitle">
            Крупнейшие компании Казахстана выбирают Union Industry для своего мерча
          </p>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
          {(clients as Client[]).map((client) => (
            <div
              key={client.id}
              className="rounded-xl p-4 flex items-center justify-center min-h-[68px] border border-black/[0.07] hover:border-black/[0.15] hover:bg-[#F7F5F2] transition-all duration-200"
            >
              {client.logo_url ? (
                <ClientLogo src={client.logo_url} name={client.name} />
              ) : (
                <span className="text-xs font-bold text-[#A8A8A8]" style={{ letterSpacing: '-0.01em' }}>
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
