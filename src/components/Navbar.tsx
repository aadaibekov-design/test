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
    <header className="fixed top-0 left-0 right-0 z-50 bg-gray-900/95 backdrop-blur-sm border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-black text-white tracking-tight">
              UNI<span className="text-orange-500">ON</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <Link href="/catalog" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
              Весь каталог
            </Link>
            <a href="#request" className="btn-primary text-sm py-2 px-5">
              Оставить заявку
            </a>
          </div>

          <button
            className="md:hidden text-white p-2"
            onClick={() => setOpen(!open)}
            aria-label="Меню"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-gray-900 border-t border-white/10 px-4 pb-4">
          <nav className="flex flex-col gap-1 mt-3">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="py-2 text-gray-300 hover:text-white transition-colors"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link href="/catalog" className="py-2 text-gray-300 hover:text-white transition-colors" onClick={() => setOpen(false)}>
              Весь каталог
            </Link>
          </nav>
          <a href="#request" className="btn-primary w-full mt-3 text-sm" onClick={() => setOpen(false)}>
            Оставить заявку
          </a>
        </div>
      )}
    </header>
  )
}
