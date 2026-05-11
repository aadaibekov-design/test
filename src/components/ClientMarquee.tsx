'use client'

import { useState } from 'react'
import type { Client } from '@/lib/types'

interface Props {
  clients: Client[]
}

function ClientTile({ client }: { client: Client }) {
  const [imgFailed, setImgFailed] = useState(false)

  return (
    <div className="flex-shrink-0 flex items-center justify-center h-14 px-8 rounded-2xl border border-black/[0.07] bg-white mx-2 min-w-[120px] hover:border-black/[0.18] transition-colors duration-200">
      {client.logo_url && !imgFailed ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={client.logo_url}
          alt={client.name}
          className="max-h-7 max-w-[100px] w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100"
          onError={() => setImgFailed(true)}
        />
      ) : (
        <span
          className="text-[11px] font-black text-[#5A5A5A] uppercase whitespace-nowrap"
          style={{ letterSpacing: '0.08em' }}
        >
          {client.name}
        </span>
      )}
    </div>
  )
}

export default function ClientMarquee({ clients }: Props) {
  // Duplicate for seamless loop
  const items = [...clients, ...clients]

  return (
    <div className="relative">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to right, white, transparent)' }} />
      <div className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to left, white, transparent)' }} />

      <div
        className="flex"
        style={{
          animation: 'marquee 30s linear infinite',
          width: 'max-content',
        }}
      >
        {items.map((client, i) => (
          <ClientTile key={`${client.id}-${i}`} client={client} />
        ))}
      </div>

    </div>
  )
}
