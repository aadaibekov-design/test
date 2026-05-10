'use client'

import { useState, useTransition } from 'react'
import { Plus, Trash2, Save } from 'lucide-react'
import type { Client } from '@/lib/types'
import { createClient_action, deleteClient, updateClient } from '../actions'

export default function ClientsManager({ initialClients }: { initialClients: Client[] }) {
  const [clients, setClients] = useState<Client[]>(initialClients)
  const [showForm, setShowForm] = useState(false)
  const [isPending, startTransition] = useTransition()
  const [editingId, setEditingId] = useState<string | null>(null)

  async function handleCreate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    startTransition(async () => {
      const result = await createClient_action(formData)
      if (result.success) {
        setShowForm(false)
        window.location.reload()
      }
    })
  }

  async function handleDelete(id: string, name: string) {
    if (!confirm(`Удалить клиента «${name}»?`)) return
    startTransition(async () => {
      await deleteClient(id)
      setClients((prev) => prev.filter((c) => c.id !== id))
    })
  }

  async function handleUpdate(e: React.FormEvent<HTMLFormElement>, id: string) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    startTransition(async () => {
      const result = await updateClient(id, formData)
      if (result.success) {
        setEditingId(null)
        window.location.reload()
      }
    })
  }

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              <th className="px-5 py-3 text-left">Компания</th>
              <th className="px-5 py-3 text-left">Лого URL</th>
              <th className="px-5 py-3 text-left">Сайт</th>
              <th className="px-5 py-3 text-left">Порядок</th>
              <th className="px-5 py-3 text-left">Статус</th>
              <th className="px-5 py-3 text-left">Действия</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {clients.map((client) => (
              <tr key={client.id}>
                {editingId === client.id ? (
                  <td colSpan={6} className="px-5 py-4">
                    <form onSubmit={(e) => handleUpdate(e, client.id)} className="flex flex-wrap gap-2 items-end">
                      <input name="name" defaultValue={client.name} className="input text-sm flex-1 min-w-[120px]" placeholder="Название" required />
                      <input name="logo_url" defaultValue={client.logo_url ?? ''} className="input text-sm flex-1 min-w-[160px]" placeholder="URL лого" />
                      <input name="website" defaultValue={client.website ?? ''} className="input text-sm w-40" placeholder="Сайт" />
                      <input name="sort_order" type="number" defaultValue={client.sort_order} className="input text-sm w-20" />
                      <select name="is_active" defaultValue={client.is_active ? 'true' : 'false'} className="input text-sm w-28">
                        <option value="true">Активен</option>
                        <option value="false">Скрыт</option>
                      </select>
                      <button type="submit" disabled={isPending} className="inline-flex items-center gap-1 bg-orange-500 text-white text-xs font-semibold px-3 py-2 rounded-lg hover:bg-orange-600 disabled:opacity-60">
                        <Save size={13} /> Сохранить
                      </button>
                      <button type="button" onClick={() => setEditingId(null)} className="text-xs text-gray-500 hover:text-gray-700 px-2">
                        Отмена
                      </button>
                    </form>
                  </td>
                ) : (
                  <>
                    <td className="px-5 py-3 font-medium text-gray-900">{client.name}</td>
                    <td className="px-5 py-3 text-gray-400 text-xs truncate max-w-[160px]">{client.logo_url || '—'}</td>
                    <td className="px-5 py-3 text-gray-400 text-xs">{client.website || '—'}</td>
                    <td className="px-5 py-3 text-gray-500">{client.sort_order}</td>
                    <td className="px-5 py-3">
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${client.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                        {client.is_active ? 'Активен' : 'Скрыт'}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setEditingId(client.id)}
                          className="text-xs text-gray-500 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-lg transition-colors"
                        >
                          Ред.
                        </button>
                        <button
                          onClick={() => handleDelete(client.id, client.name)}
                          disabled={isPending}
                          className="inline-flex items-center gap-1 text-xs text-red-400 hover:text-red-600 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-lg transition-colors disabled:opacity-50"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showForm ? (
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <h3 className="font-bold text-gray-900 mb-4">Добавить клиента</h3>
          <form onSubmit={handleCreate} className="flex flex-wrap gap-3 items-end">
            <div className="flex-1 min-w-[140px]">
              <label className="block text-xs font-medium text-gray-600 mb-1">Название *</label>
              <input name="name" required className="input text-sm" placeholder="Сбер" />
            </div>
            <div className="flex-1 min-w-[180px]">
              <label className="block text-xs font-medium text-gray-600 mb-1">URL логотипа</label>
              <input name="logo_url" className="input text-sm" placeholder="https://..." />
            </div>
            <div className="w-40">
              <label className="block text-xs font-medium text-gray-600 mb-1">Сайт</label>
              <input name="website" className="input text-sm" placeholder="https://..." />
            </div>
            <div className="w-24">
              <label className="block text-xs font-medium text-gray-600 mb-1">Порядок</label>
              <input name="sort_order" type="number" defaultValue="0" className="input text-sm" />
            </div>
            <div className="flex gap-2">
              <button type="submit" disabled={isPending} className="btn-primary text-sm py-2.5 disabled:opacity-60">
                {isPending ? 'Добавляем...' : 'Добавить'}
              </button>
              <button type="button" onClick={() => setShowForm(false)} className="text-sm text-gray-500 hover:text-gray-700 px-4">
                Отмена
              </button>
            </div>
          </form>
        </div>
      ) : (
        <button
          onClick={() => setShowForm(true)}
          className="inline-flex items-center gap-2 text-sm font-semibold text-orange-500 hover:text-orange-600 transition-colors"
        >
          <Plus size={16} />
          Добавить клиента
        </button>
      )}
    </div>
  )
}
