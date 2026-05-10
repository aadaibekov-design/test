import Link from 'next/link'
import { ArrowRight, Zap } from 'lucide-react'

const mockupProducts = [
  { label: 'Худи', color: 'bg-purple-700', emoji: '🧥' },
  { label: 'Кепка', color: 'bg-orange-600', emoji: '🧢' },
  { label: 'Рюкзак', color: 'bg-emerald-700', emoji: '🎒' },
  { label: 'Термокружка', color: 'bg-blue-700', emoji: '☕' },
]

export default function Hero() {
  return (
    <section className="bg-gray-900 pt-16 min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <div>
            <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/30 text-orange-400 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
              <Zap size={14} />
              Производство от 7 дней
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight">
              Мерч для вашей{' '}
              <span className="text-orange-500">команды</span>
            </h1>

            <p className="mt-6 text-lg text-gray-400 max-w-lg">
              Union создаёт брендированную продукцию для бизнеса — от футболок до наборов на конференцию. Любые тиражи, любая сложность.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link href="/catalog" className="btn-primary">
                Смотреть каталог
                <ArrowRight size={18} />
              </Link>
              <a href="#request" className="btn-secondary">
                Получить расчёт
              </a>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-6 pt-8 border-t border-white/10">
              <div>
                <div className="text-2xl font-black text-white">100+</div>
                <div className="text-sm text-gray-500 mt-0.5">видов продукции</div>
              </div>
              <div>
                <div className="text-2xl font-black text-white">500+</div>
                <div className="text-sm text-gray-500 mt-0.5">выполненных заказов</div>
              </div>
              <div>
                <div className="text-2xl font-black text-white">от 50</div>
                <div className="text-sm text-gray-500 mt-0.5">штук минимум</div>
              </div>
            </div>
          </div>

          {/* Right — product grid mockup */}
          <div className="grid grid-cols-2 gap-4">
            {mockupProducts.map((item) => (
              <div
                key={item.label}
                className={`${item.color} rounded-2xl p-8 flex flex-col items-center justify-center aspect-square`}
              >
                <span className="text-5xl">{item.emoji}</span>
                <span className="mt-3 text-white/80 text-sm font-medium">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
