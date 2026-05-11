'use client'

import { useState } from 'react'

interface Props {
  src: string
  name: string
}

export default function ClientLogo({ src, name }: Props) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <span className="text-xs font-bold text-[#A8A8A8]" style={{ letterSpacing: '-0.01em' }}>
        {name}
      </span>
    )
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={name}
      className="max-h-7 w-auto object-contain opacity-50 hover:opacity-80 transition-opacity"
      onError={() => setFailed(true)}
    />
  )
}
