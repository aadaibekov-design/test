import Link from 'next/link'
import { Mail, Phone, MapPin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Link href="/" className="inline-block mb-4">
              <span className="text-2xl font-black text-white tracking-tight">
                UNI<span className="text-orange-500">ON</span>
              </span>
            </Link>
            <p className="text-sm text-gray-400 max-w-xs">
              Производим корпоративный мерч и брендированную продукцию для компаний по всей России. Быстро, качественно, с гарантией.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Навигация</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/catalog" className="hover:text-white transition-colors">Каталог</Link></li>
              <li><Link href="/#advantages" className="hover:text-white transition-colors">Преимущества</Link></li>
              <li><Link href="/#how-it-works" className="hover:text-white transition-colors">Как работаем</Link></li>
              <li><Link href="/#clients" className="hover:text-white transition-colors">Клиенты</Link></li>
              <li><Link href="/#request" className="hover:text-white transition-colors">Оставить заявку</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Контакты</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Phone size={14} className="text-orange-500 shrink-0" />
                <a href="tel:+74951234567" className="hover:text-white transition-colors">+7 (495) 123-45-67</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={14} className="text-orange-500 shrink-0" />
                <a href="mailto:hello@union-merch.ru" className="hover:text-white transition-colors">hello@union-merch.ru</a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={14} className="text-orange-500 shrink-0 mt-0.5" />
                <span>Москва, Россия</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 text-xs text-gray-500 flex flex-col sm:flex-row justify-between gap-2">
          <p>© {new Date().getFullYear()} Union. Все права защищены.</p>
          <p>ИНН 7701234567 · ООО «Юнион»</p>
        </div>
      </div>
    </footer>
  )
}
