import Link from 'next/link'
import { Mail, Phone, MapPin } from 'lucide-react'

export default function Footer() {
  return (
    <footer style={{ background: '#030309', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <Link href="/" className="inline-block mb-4">
              <span className="text-xl font-black text-white" style={{ letterSpacing: '-0.05em' }}>
                UNI<span className="text-orange-500">ON</span>
              </span>
            </Link>
            <p className="text-sm text-gray-500 max-w-xs leading-relaxed">
              Производим корпоративный мерч и брендированную продукцию для компаний по всей России. Быстро, качественно, с гарантией.
            </p>
          </div>

          <div>
            <h3
              className="text-white font-semibold mb-4 text-sm"
              style={{ letterSpacing: '-0.01em' }}
            >
              Навигация
            </h3>
            <ul className="space-y-2.5 text-sm">
              {[
                { href: '/catalog', label: 'Каталог' },
                { href: '/#advantages', label: 'Преимущества' },
                { href: '/#how-it-works', label: 'Как работаем' },
                { href: '/#clients', label: 'Клиенты' },
                { href: '/#request', label: 'Оставить заявку' },
              ].map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-gray-500 hover:text-white transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3
              className="text-white font-semibold mb-4 text-sm"
              style={{ letterSpacing: '-0.01em' }}
            >
              Контакты
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2.5">
                <Phone size={13} className="text-orange-500 shrink-0" />
                <a href="tel:+74951234567" className="text-gray-500 hover:text-white transition-colors">
                  +7 (495) 123-45-67
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail size={13} className="text-orange-500 shrink-0" />
                <a href="mailto:hello@union-merch.ru" className="text-gray-500 hover:text-white transition-colors">
                  hello@union-merch.ru
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin size={13} className="text-orange-500 shrink-0 mt-0.5" />
                <span className="text-gray-500">Москва, Россия</span>
              </li>
            </ul>
          </div>
        </div>

        <div
          className="mt-12 pt-6 flex flex-col sm:flex-row justify-between gap-2 text-xs text-gray-600"
          style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
        >
          <p>© {new Date().getFullYear()} Union. Все права защищены.</p>
          <p>ИНН 7701234567 · ООО «Юнион»</p>
        </div>
      </div>
    </footer>
  )
}
