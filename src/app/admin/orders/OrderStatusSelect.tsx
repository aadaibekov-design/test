'use client'

import { useState, useTransition } from 'react'
import type { OrderStatus } from '@/lib/types'
import { ORDER_STATUS_LABELS, ORDER_STATUS_COLORS } from '@/lib/types'
import { updateOrderStatus } from '../actions'
import { cn } from '@/lib/utils'

const ALL_STATUSES: OrderStatus[] = ['new', 'in_review', 'confirmed', 'completed', 'cancelled']

export default function OrderStatusSelect({
  orderId,
  currentStatus,
}: {
  orderId: string
  currentStatus: OrderStatus
}) {
  const [status, setStatus] = useState<OrderStatus>(currentStatus)
  const [isPending, startTransition] = useTransition()

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const next = e.target.value as OrderStatus
    setStatus(next)
    startTransition(async () => {
      await updateOrderStatus(orderId, next)
    })
  }

  return (
    <div className="relative">
      <span
        className={cn(
          'absolute inset-y-0 left-2 flex items-center pointer-events-none w-2 h-2 rounded-full my-auto',
          status === 'new' && 'bg-blue-500',
          status === 'in_review' && 'bg-yellow-500',
          status === 'confirmed' && 'bg-purple-500',
          status === 'completed' && 'bg-green-500',
          status === 'cancelled' && 'bg-gray-400',
        )}
      />
      <select
        value={status}
        onChange={handleChange}
        disabled={isPending}
        className={cn(
          'pl-5 pr-2 py-1 text-xs font-medium rounded-full border-0 bg-transparent cursor-pointer focus:outline-none focus:ring-1 focus:ring-orange-400 disabled:opacity-60',
          ORDER_STATUS_COLORS[status]
        )}
      >
        {ALL_STATUSES.map((s) => (
          <option key={s} value={s}>
            {ORDER_STATUS_LABELS[s]}
          </option>
        ))}
      </select>
    </div>
  )
}
