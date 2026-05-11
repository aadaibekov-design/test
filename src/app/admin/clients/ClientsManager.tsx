'use client'

import { useState, useTransition, useRef } from 'react'
import { Plus, Trash2, Save, Upload, X, Loader2 } from 'lucide-react'
import type { Client } from '@/lib/types'
import { createClient_action, deleteClient, updateClient } from '../actions'
import { uploadProductImage } from '../actions'

const INPUT = 'input-light text-sm'

// ── Inline logo uploader ─────────────────────────────────────────────────────
function LogoField({ defaultUrl = '' }: { defaultUrl?: string }) {
  const [url, setUrl] = useState(defaultUrl)
  const [uploading, setUploading] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    const fd = new FormData()
    fd.append('file', file)
    const result = await uploadProductImage(fd)
    if (result.success && result.url) setUrl(result.url)
    setUploading(false)
    e.target.value = ''
  }

  return (
    <div className="flex items-center gap-2 flex-1 min-w-[180px]">
      {/* Hidden real input so form picks up the value */}
      <input name="logo_url" type="hidden" value={url} />

      {url ? (
        <div className="relative w-10 h-10 rounded-lg border border-black/10 bg-gray-50 flex items-center justify-center flex-shrink-0 overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={url} alt="logo" className="max-h-7 max-w-[32px] object-contain" />
          <button
            type="button"
            onClick={() => setUrl('')}
            className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-white flex items-center justify-center"
          >
            <X size={8} />
          </button>
        </div>
      ) : null}

      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className={`${INPUT} flex-1`}
        placeholder="URL логотипа или загрузите файл"
      />

      <button
        type="button"
        onClick={() => fileRef.current?.click()}
        disabled={uploading}
        className="flex-shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold transition-colors disabled:opacity-50"
      >
        {uploading ? <Loader2 size={13} className="animate-spin" /> : <Upload size={13} />}
        {uploading ? 'Загрузка...' : 'Файл'}
      </button>
      <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
    </div>
  )
}

// ────────────────────────────────────────────────────────────────────────────
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
      if (result.success) { setShowForm(false); window.location.reload() }
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
      if (result.success) { setEditingId(null); window.location.reload() }
    })
  }

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              <th className="px-5 py-3 text-left">Логотип</th>
              <th className="px-5 py-3 text-left">Компания</th>
              <th className="px-5 py-3 text-left">Сайт</th>
              <th className="px-5 py-3 text-left w-20">Порядок</th>
              <th className="px-5 py-3 text-left w-24">Статус</th>
              <th className="px-5 py-3 text-left w-28">Действия</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {clients.map((client) => (
              <tr key={client.id}>
                {editingId === client.id ? (
                  <td colSpan={6} className="px-5 py-4">
                    <form onSubmit={(e) => handleUpdate(e, client.id)} className="space-y-3">
                      <div className="flex flex-wrap gap-2 items-end">
                        <div className="flex-1 min-w-[140px]">
                          <label className="block text-xs font-medium text-gray-500 mb-1">Название *</label>
                          <input name="name" defaultValue={client.name} className={INPUT} placeholder="Компания" required />
                        </div>
                        <div className="w-20">
                          <label className="block text-xs font-medium text-gray-500 mb-1">Порядок</label>
                          <input name="sort_order" type="number" defaultValue={client.sort_order} className={INPUT} />
                        </div>
                        <div className="w-36">
                          <label className="block text-xs font-medium text-gray-500 mb-1">Сайт</label>
                          <input name="website" defaultValue={client.website ?? ''} className={INPUT} placeholder="https://..." />
                        </div>
                        <div className="w-28">
                          <label className="block text-xs font-medium text-gray-500 mb-1">Статус</label>
                          <select name="is_active" defaultValue={client.is_active ? 'true' : 'false'} className={INPUT}>
                            <option value="true">Активен</option>
                            <option value="false">Скрыт</option>
                          </select>
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-500 mb-1">Логотип — загрузите файл или вставьте URL</label>
                        <LogoField defaultUrl={client.logo_url ?? ''} />
                      </div>
                      <div className="flex gap-2 pt-1">
                        <button type="submit" disabled={isPending} className="inline-flex items-center gap-1.5 bg-[#0A0A0A] text-white text-xs font-semibold px-4 py-2 rounded-lg hover:bg-[#D4500A] transition-colors disabled:opacity-60">
                          <Save size={13} /> Сохранить
                        </button>
                        <button type="button" onClick={() => setEditingId(null)} className="text-xs text-gray-500 hover:text-gray-700 px-3 py-2">
                          Отмена
                        </button>
                      </div>
                    </form>
                  </td>
                ) : (
                  <>
                    <td className="px-5 py-3 w-16">
                      {client.logo_url ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={client.logo_url} alt={client.name} className="h-6 w-auto max-w-[60px] object-contain" />
                      ) : (
                        <span className="text-gray-300 text-xs">—</span>
                      )}
                    </td>
                    <td className="px-5 py-3 font-medium text-gray-900">{client.name}</td>
                    <td className="px-5 py-3 text-gray-400 text-xs">{client.website || '—'}</td>
                    <td className="px-5 py-3 text-gray-500">{client.sort_order}</td>
                    <td className="px-5 py-3">
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${client.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                        {client.is_active ? 'Активен' : 'Скрыт'}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2">
                        <button onClick={() => setEditingId(client.id)} className="text-xs text-gray-500 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-lg transition-colors">
                          Ред.
                        </button>
                        <button onClick={() => handleDelete(client.id, client.name)} disabled={isPending} className="inline-flex items-center gap-1 text-xs text-red-400 hover:text-red-600 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-lg transition-colors disabled:opacity-50">
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
          <form onSubmit={handleCreate} className="space-y-4">
            <div className="flex flex-wrap gap-3 items-end">
              <div className="flex-1 min-w-[140px]">
                <label className="block text-xs font-medium text-gray-500 mb-1">Название *</label>
                <input name="name" required className={INPUT} placeholder="Компания" />
              </div>
              <div className="w-36">
                <label className="block text-xs font-medium text-gray-500 mb-1">Сайт</label>
                <input name="website" className={INPUT} placeholder="https://..." />
              </div>
              <div className="w-20">
                <label className="block text-xs font-medium text-gray-500 mb-1">Порядок</label>
                <input name="sort_order" type="number" defaultValue="99" className={INPUT} />
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Логотип — загрузите файл или вставьте URL</label>
              <LogoField />
            </div>
            <div className="flex gap-2 pt-1">
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
        <button onClick={() => setShowForm(true)} className="inline-flex items-center gap-2 text-sm font-semibold text-[#D4500A] hover:text-orange-600 transition-colors">
          <Plus size={16} />
          Добавить клиента
        </button>
      )}
    </div>
  )
}
