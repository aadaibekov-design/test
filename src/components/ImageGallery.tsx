'use client'

import { useState } from 'react'
import Image from 'next/image'
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react'

interface Props {
  images: string[]
  name: string
}

export default function ImageGallery({ images, name }: Props) {
  const [active, setActive] = useState(0)
  const [lightbox, setLightbox] = useState(false)
  const [lbIndex, setLbIndex] = useState(0)

  function openLightbox(idx: number) {
    setLbIndex(idx)
    setLightbox(true)
  }

  function lbPrev() { setLbIndex((i) => (i - 1 + images.length) % images.length) }
  function lbNext() { setLbIndex((i) => (i + 1) % images.length) }

  return (
    <>
      <div className="space-y-3">
        {/* Main image */}
        <div
          className="relative aspect-square rounded-2xl overflow-hidden cursor-zoom-in group"
          style={{ background: 'linear-gradient(150deg, #EDEAE4 0%, #E4E0D9 100%)' }}
          onClick={() => openLightbox(active)}
        >
          <Image
            src={images[active]}
            alt={name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            priority
          />
          <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <ZoomIn size={14} color="white" />
          </div>
          {images.length > 1 && (
            <div className="absolute bottom-3 right-3 bg-black/40 backdrop-blur-sm text-white text-xs font-medium px-2 py-1 rounded-full">
              {active + 1} / {images.length}
            </div>
          )}
        </div>

        {/* Thumbnails */}
        {images.length > 1 && (
          <div className="grid grid-cols-5 gap-2">
            {images.map((img, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActive(i)}
                className={`relative aspect-square rounded-xl overflow-hidden transition-all duration-150 ${
                  i === active
                    ? 'ring-2 ring-[#D4500A] ring-offset-2'
                    : 'opacity-60 hover:opacity-100'
                }`}
                style={{ background: '#EDEAE4' }}
              >
                <Image src={img} alt={`${name} ${i + 1}`} fill className="object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
          onClick={() => setLightbox(false)}
        >
          <button
            onClick={() => setLightbox(false)}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-10"
          >
            <X size={18} />
          </button>

          {images.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); lbPrev() }}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-10"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); lbNext() }}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-10"
              >
                <ChevronRight size={20} />
              </button>
            </>
          )}

          <div
            className="relative w-full max-w-3xl max-h-[85vh] mx-8"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[lbIndex]}
              alt={`${name} ${lbIndex + 1}`}
              width={1200}
              height={1200}
              className="w-full h-full object-contain rounded-xl max-h-[85vh]"
            />
          </div>

          {images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => { e.stopPropagation(); setLbIndex(i) }}
                  className={`w-1.5 h-1.5 rounded-full transition-all ${i === lbIndex ? 'bg-white w-4' : 'bg-white/40'}`}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </>
  )
}
