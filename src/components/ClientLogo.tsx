'use client'

import { useState, useEffect, useRef } from 'react'

interface Props {
  src: string
  name: string
}

export default function ClientLogo({ src, name }: Props) {
  const [status, setStatus] = useState<'loading' | 'ok' | 'fail'>('loading')
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    // If image already loaded/errored before hydration, catch it
    if (imgRef.current) {
      if (imgRef.current.complete) {
        setStatus(imgRef.current.naturalWidth > 0 ? 'ok' : 'fail')
      }
    }
  }, [])

  if (status === 'fail') {
    return (
      <span className="text-xs font-bold text-[#A8A8A8]" style={{ letterSpacing: '-0.01em' }}>
        {name}
      </span>
    )
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      ref={imgRef}
      src={src}
      alt={name}
      className={`max-h-7 w-auto object-contain transition-opacity ${status === 'ok' ? 'opacity-50 hover:opacity-80' : 'opacity-0'}`}
      onLoad={() => setStatus('ok')}
      onError={() => setStatus('fail')}
    />
  )
}
