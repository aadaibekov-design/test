import Link from 'next/link'
import { Mail, Phone, MapPin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-[#050505] border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          <div className="md:col-span-2">
            <Link href="/" className="inline-flex flex-col leading-none mb-5">
              <span className="font-black text-white tracking-[0.06em] text-sm uppercase">Union</span>
              <span className="font-light text-white/25 text-[9px] uppercase" style={{ letterSpacing: '0.18em' }}>Industry</span>
            </Link>
            <p className="text-sm text-white/30 max-w-xs leading-relaxed">
              Производим корпоративный мерч и брендированную продукцию для компаний по всей России. Быстро, качественно, с гарантией.
            </p>
          </div>

          <div>
            <h3 className="text-white/50 font-semibold mb-4 text-xs uppercase tracking-widest">Навигация</h3>
            <ul className="space-y-2.5">
              {[
                { href: '/catalog',         label: 'Каталог' },
                { href: '/#advantages',     label: 'Преимущества' },
                { href: '/#how-it-works',   label: 'Как работаем' },
                { href: '/#clients',        label: 'Клиенты' },
                { href: '/#request',        label: 'Оставить заявку' },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-white/30 hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white/50 font-semibold mb-4 text-xs uppercase tracking-widest">Контакты</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2.5">
                <Phone size={12} color="#D4500A" className="shrink-0" />
                <a href="tel:+74951234567" className="text-sm text-white/30 hover:text-white transition-colors">
                  +7 (495) 123-45-67
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail size={12} color="#D4500A" className="shrink-0" />
                <a href="mailto:hello@union-merch.ru" className="text-sm text-white/30 hover:text-white transition-colors">
                  hello@union-merch.ru
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin size={12} color="#D4500A" className="shrink-0 mt-0.5" />
                <span className="text-sm text-white/30">Москва, Россия</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/[0.05] flex flex-col sm:flex-row justify-between gap-2 text-xs text-white/20">
          <p>© {new Date().getFullYear()} Union Industry. Все права защищены.</p>
          <p>ИНН 7701234567 · ООО «Юнион»</p>
        </div>
      </div>
    </footer>
  )
}
