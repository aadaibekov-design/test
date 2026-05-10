import { createAdminClient } from '@/lib/supabase/server'
import type { Order, OrderStatus } from '@/lib/types'
import { ORDER_STATUS_LABELS, ORDER_STATUS_COLORS } from '@/lib/types'
import { formatDate } from '@/lib/utils'
import OrderStatusSelect from './OrderStatusSelect'

export const metadata = { title: 'Заявки — Union Admin' }

export default async function AdminOrdersPage() {
  const supabase = await createAdminClient()
  const { data: orders } = await supabase
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false })

  const counts = {
    all: orders?.length ?? 0,
    new: orders?.filter((o) => o.status === 'new').length ?? 0,
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Заявки</h1>
          <p className="text-sm text-gray-500 mt-1">
            Всего: {counts.all} · Новых: {counts.new}
          </p>
        </div>
      </div>

      {!orders?.length ? (
        <div className="text-center py-20 text-gray-400">
          <p>Заявок пока нет</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  <th className="px-5 py-3 text-left">Компания</th>
                  <th className="px-5 py-3 text-left">Контакт</th>
                  <th className="px-5 py-3 text-left">Товар</th>
                  <th className="px-5 py-3 text-left">Тираж</th>
                  <th className="px-5 py-3 text-left">Статус</th>
                  <th className="px-5 py-3 text-left">Дата</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {(orders as Order[]).map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-4 font-medium text-gray-900">{order.company_name}</td>
                    <td className="px-5 py-4">
                      <div className="text-gray-700">{order.contact_name}</div>
                      <div className="text-gray-400 text-xs">{order.email}</div>
                      {order.phone && <div className="text-gray-400 text-xs">{order.phone}</div>}
                    </td>
                    <td className="px-5 py-4 text-gray-600">
                      {order.product_name || '—'}
                      {order.notes && (
                        <div className="text-xs text-gray-400 mt-1 max-w-xs truncate" title={order.notes}>
                          {order.notes}
                        </div>
                      )}
                    </td>
                    <td className="px-5 py-4 text-gray-600">{order.quantity ?? '—'}</td>
                    <td className="px-5 py-4">
                      <OrderStatusSelect orderId={order.id} currentStatus={order.status as OrderStatus} />
                    </td>
                    <td className="px-5 py-4 text-gray-400 text-xs whitespace-nowrap">
                      {formatDate(order.created_at)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
