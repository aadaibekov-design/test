'use client'

import { useTransition } from 'react'
import { Trash2 } from 'lucide-react'
import { deleteProduct } from '../actions'

export default function DeleteProductButton({ id, name }: { id: string; name: string }) {
  const [isPending, startTransition] = useTransition()

  function handleDelete() {
    if (!confirm(`Удалить товар «${name}»?`)) return
    startTransition(async () => {
      await deleteProduct(id)
    })
  }

  return (
    <button
      onClick={handleDelete}
      disabled={isPending}
      className="inline-flex items-center gap-1 text-xs text-red-400 hover:text-red-600 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-lg transition-colors disabled:opacity-50"
    >
      <Trash2 size={12} />
      Удалить
    </button>
  )
}
