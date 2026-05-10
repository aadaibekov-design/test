import { createAdminClient } from '@/lib/supabase/server'
import type { Client } from '@/lib/types'
import ClientsManager from './ClientsManager'

export const metadata = { title: 'Клиенты — Union Admin' }

export default async function AdminClientsPage() {
  const supabase = await createAdminClient()
  const { data: clients } = await supabase
    .from('clients')
    .select('*')
    .order('sort_order')

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Клиенты</h1>
        <p className="text-sm text-gray-500 mt-1">Управляйте списком компаний-клиентов на главной странице</p>
      </div>
      <ClientsManager initialClients={(clients ?? []) as Client[]} />
    </div>
  )
}
