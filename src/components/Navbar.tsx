'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

const links = [
  { href: '/#catalog', label: 'Каталог' },
  { href: '/#advantages', label: 'Преимущества' },
  { href: '/#how-it-works', label: 'Как работаем' },
  { href: '/#clients', label: 'Клиенты' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 border-b"
      style={{
        background: 'rgba(6,6,15,0.82)',
        backdropFilter: 'blur(24px) saturate(180%)',
        borderColor: 'rgba(255,255,255,0.07)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <span
              className="text-xl font-black text-white"
              style={{ letterSpacing: '-0.05em' }}
            >
              UNI<span className="text-orange-500">ON</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-gray-400 hover:text-white transition-colors"
                style={{ letterSpacing: '-0.01em' }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/catalog"
              className="text-sm font-medium text-gray-400 hover:text-white transition-colors"
              style={{ letterSpacing: '-0.01em' }}
            >
              Весь каталог
            </Link>
            <a href="#request" className="btn-primary text-sm py-2 px-5">
              Оставить заявку
            </a>
          </div>

          <button
            className="md:hidden text-gray-400 hover:text-white p-2 transition-colors"
            onClick={() => setOpen(!open)}
            aria-label="Меню"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <div
          className="md:hidden border-t px-4 pb-5"
          style={{ background: 'rgba(6,6,15,0.97)', borderColor: 'rgba(255,255,255,0.07)' }}
        >
          <nav className="flex flex-col gap-1 mt-3">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="py-2.5 text-gray-300 hover:text-white transition-colors text-sm font-medium"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/catalog"
              className="py-2.5 text-gray-300 hover:text-white transition-colors text-sm font-medium"
              onClick={() => setOpen(false)}
            >
              Весь каталог
            </Link>
          </nav>
          <a href="#request" className="btn-primary w-full mt-4 text-sm" onClick={() => setOpen(false)}>
            Оставить заявку
          </a>
        </div>
      )}
    </header>
  )
}
