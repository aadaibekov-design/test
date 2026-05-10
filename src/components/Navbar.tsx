'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

const links = [
  { href: '/#catalog', label: 'Каталог' },
  { href: '/#advantages', label: 'Преимущества' },
  { href: '/#how-it-works', label: 'Как работаем' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#F7F5F2]/90 backdrop-blur-xl border-b border-black/[0.07]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex flex-col leading-none group">
            <span className="font-black text-[#0A0A0A] tracking-[0.06em] text-sm uppercase">
              Union
            </span>
            <span className="font-light text-[#0A0A0A]/40 tracking-[0.12em] text-[9px] uppercase" style={{ letterSpacing: '0.18em' }}>
              Industry
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-[#5A5A5A] hover:text-[#0A0A0A] transition-colors"
                style={{ letterSpacing: '-0.01em' }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/catalog"
              className="text-sm font-medium text-[#5A5A5A] hover:text-[#0A0A0A] transition-colors"
              style={{ letterSpacing: '-0.01em' }}
            >
              Весь каталог
            </Link>
            <a href="#request" className="btn-primary py-2 px-5">
              Оставить заявку
            </a>
          </div>

          <button
            className="md:hidden text-[#0A0A0A]/60 hover:text-[#0A0A0A] p-2 transition-colors"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-[#F7F5F2] border-t border-black/[0.07] px-5 pb-5">
          <nav className="flex flex-col gap-0.5 mt-3">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="py-2.5 text-[#5A5A5A] hover:text-[#0A0A0A] transition-colors text-sm font-medium"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link href="/catalog" className="py-2.5 text-[#5A5A5A] hover:text-[#0A0A0A] transition-colors text-sm font-medium" onClick={() => setOpen(false)}>
              Весь каталог
            </Link>
          </nav>
          <a href="#request" className="btn-primary w-full mt-4" onClick={() => setOpen(false)}>
            Оставить заявку
          </a>
        </div>
      )}
    </header>
  )
}
