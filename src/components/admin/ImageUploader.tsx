'use client'

import { useState, useRef, useCallback } from 'react'
import { X, Loader2, ImagePlus } from 'lucide-react'
import { uploadProductImage } from '@/app/admin/actions'

interface Props {
  initialUrls?: string[]
}

interface UploadItem {
  id: string
  url: string           // object URL for preview (or final URL)
  finalUrl?: string     // actual Supabase URL after upload
  uploading?: boolean
  error?: string
}

// Compress image to max 1400px and ~85% JPEG quality — keeps files under 500 KB
async function compressImage(file: File): Promise<File> {
  return new Promise((resolve) => {
    const img = new window.Image()
    const objectUrl = URL.createObjectURL(file)
    img.onload = () => {
      URL.revokeObjectURL(objectUrl)
      const MAX = 1400
      let { width, height } = img
      if (width > MAX || height > MAX) {
        if (width > height) { height = Math.round(height * MAX / width); width = MAX }
        else { width = Math.round(width * MAX / height); height = MAX }
      }
      const canvas = document.createElement('canvas')
      canvas.width = width
      canvas.height = height
      const ctx = canvas.getContext('2d')!
      ctx.drawImage(img, 0, 0, width, height)
      canvas.toBlob(
        (blob) => {
          if (!blob) { resolve(file); return }
          resolve(new File([blob], file.name.replace(/\.[^.]+$/, '.jpg'), { type: 'image/jpeg' }))
        },
        'image/jpeg',
        0.85
      )
    }
    img.onerror = () => { URL.revokeObjectURL(objectUrl); resolve(file) }
    img.src = objectUrl
  })
}

export default function ImageUploader({ initialUrls = [] }: Props) {
  const [items, setItems] = useState<UploadItem[]>(
    initialUrls.filter(Boolean).map((url) => ({ id: url, url, finalUrl: url }))
  )
  const [draggingOver, setDraggingOver] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const finalUrls = items
    .filter((i) => !i.uploading && !i.error && i.finalUrl)
    .map((i) => i.finalUrl!)

  const uploadFiles = useCallback(async (files: File[]) => {
    const validFiles = files.filter((f) => f.type.startsWith('image/'))
    if (!validFiles.length) return

    // Create placeholders with local preview immediately
    const placeholders: UploadItem[] = validFiles.map((f) => ({
      id: `uploading-${Date.now()}-${Math.random()}`,
      url: URL.createObjectURL(f),
      uploading: true,
    }))
    setItems((prev) => [...prev, ...placeholders])

    await Promise.all(
      validFiles.map(async (file, i) => {
        const ph = placeholders[i]
        try {
          const compressed = await compressImage(file)
          const fd = new FormData()
          fd.append('file', compressed)
          const result = await uploadProductImage(fd)

          setItems((prev) =>
            prev.map((item) =>
              item.id === ph.id
                ? result.success
                  ? { id: result.url!, url: result.url!, finalUrl: result.url!, uploading: false }
                  : { ...item, uploading: false, error: result.error || 'Ошибка загрузки' }
                : item
            )
          )
        } catch {
          setItems((prev) =>
            prev.map((item) =>
              item.id === ph.id ? { ...item, uploading: false, error: 'Ошибка' } : item
            )
          )
        }
      })
    )
  }, [])

  function handleDrop(e: React.DragEvent) {
    e.preventDefault()
    setDraggingOver(false)
    uploadFiles(Array.from(e.dataTransfer.files))
  }

  function handleFileInput(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files?.length) {
      uploadFiles(Array.from(e.target.files))
      e.target.value = ''
    }
  }

  function removeItem(id: string) {
    setItems((prev) => prev.filter((i) => i.id !== id))
  }

  return (
    <div className="space-y-3">
      {/* Hidden textarea for form submission */}
      <textarea
        name="images"
        value={finalUrls.join('\n')}
        readOnly
        className="sr-only"
        aria-hidden
      />

      {/* Thumbnails grid */}
      {items.length > 0 && (
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
          {items.map((item, idx) => (
            <div
              key={item.id}
              className="relative group aspect-square rounded-xl overflow-hidden bg-gray-100 border border-black/[0.07]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.url}
                alt={`Фото ${idx + 1}`}
                className="w-full h-full object-cover"
              />

              {item.uploading && (
                <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center gap-1">
                  <Loader2 size={20} className="text-white animate-spin" />
                  <span className="text-white text-[10px]">Загрузка...</span>
                </div>
              )}

              {item.error && (
                <div className="absolute inset-0 bg-red-500/85 flex items-center justify-center p-2">
                  <p className="text-white text-[10px] text-center leading-tight">{item.error}</p>
                </div>
              )}

              {!item.uploading && (
                <button
                  type="button"
                  onClick={() => removeItem(item.id)}
                  className="absolute top-1 right-1 w-5 h-5 rounded-full bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500"
                >
                  <X size={10} />
                </button>
              )}

              {idx === 0 && !item.uploading && !item.error && (
                <div className="absolute bottom-1 left-1 bg-black/60 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full leading-none">
                  Главное
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Drop zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDraggingOver(true) }}
        onDragLeave={() => setDraggingOver(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed cursor-pointer transition-all duration-150 py-7 ${
          draggingOver
            ? 'border-[#D4500A] bg-[#D4500A]/5'
            : 'border-gray-200 bg-gray-50 hover:border-gray-300 hover:bg-gray-100'
        }`}
      >
        <div className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ${draggingOver ? 'bg-[#D4500A]/10' : 'bg-gray-200'}`}>
          <ImagePlus size={16} className={draggingOver ? 'text-[#D4500A]' : 'text-gray-500'} />
        </div>
        <div className="text-center px-4">
          <p className="text-sm font-medium text-gray-700">
            {draggingOver ? 'Отпустите файлы' : 'Перетащите фото или нажмите'}
          </p>
          <p className="text-xs text-gray-400 mt-0.5">
            JPG, PNG, HEIC — любой размер, сжимается автоматически
          </p>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={handleFileInput}
        />
      </div>

      {finalUrls.length > 0 && (
        <p className="text-xs text-gray-400">
          {finalUrls.length} {finalUrls.length === 1 ? 'фото загружено' : 'фото загружено'} — первое используется как главное
        </p>
      )}
    </div>
  )
}
