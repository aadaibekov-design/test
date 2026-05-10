import Link from 'next/link'
import { ArrowRight, Zap, Shirt, Coffee, Tag, Package } from 'lucide-react'

const showcaseItems = [
  {
    label: 'Худи',
    sub: 'от 850 ₽/шт',
    icon: Shirt,
    gradient: 'from-violet-600/25 to-violet-900/50',
    border: 'rgba(139,92,246,0.25)',
    iconColor: '#a78bfa',
  },
  {
    label: 'Кепка',
    sub: 'от 340 ₽/шт',
    icon: Tag,
    gradient: 'from-orange-600/25 to-orange-900/50',
    border: 'rgba(249,115,22,0.25)',
    iconColor: '#fb923c',
  },
  {
    label: 'Рюкзак',
    sub: 'от 1 200 ₽/шт',
    icon: Package,
    gradient: 'from-emerald-600/25 to-emerald-900/50',
    border: 'rgba(52,211,153,0.25)',
    iconColor: '#34d399',
  },
  {
    label: 'Термокружка',
    sub: 'от 520 ₽/шт',
    icon: Coffee,
    gradient: 'from-blue-600/25 to-blue-900/50',
    border: 'rgba(96,165,250,0.25)',
    iconColor: '#60a5fa',
  },
]

export default function Hero() {
  return (
    <section
      className="pt-16 min-h-screen flex items-center relative overflow-hidden"
      style={{ background: 'var(--bg)' }}
    >
      {/* background glows */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden
      >
        <div
          className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full opacity-100"
          style={{
            background: 'radial-gradient(circle, rgba(249,115,22,0.1) 0%, transparent 70%)',
            filter: 'blur(60px)',
            transform: 'translate(-50%, -30%)',
          }}
        />
        <div
          className="absolute bottom-0 right-1/4 w-[500px] h-[400px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%)',
            filter: 'blur(60px)',
            transform: 'translate(30%, 20%)',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div>
            <div
              className="inline-flex items-center gap-2 border text-orange-400 text-sm font-semibold px-4 py-1.5 rounded-full mb-7"
              style={{
                background: 'rgba(249,115,22,0.08)',
                borderColor: 'rgba(249,115,22,0.25)',
              }}
            >
              <Zap size={13} />
              Производство от 7 дней
            </div>

            <h1
              className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-[1.02]"
              style={{ letterSpacing: '-0.045em' }}
            >
              Мерч для вашей{' '}
              <span className="text-orange-500">команды</span>
            </h1>

            <p className="mt-6 text-lg text-gray-400 max-w-lg leading-relaxed" style={{ letterSpacing: '-0.01em' }}>
              Union создаёт брендированную продукцию для бизнеса — от футболок до наборов
              на конференцию. Любые тиражи, любая сложность.
            </p>

            <div className="mt-9 flex flex-col sm:flex-row gap-3">
              <Link href="/catalog" className="btn-primary">
                Смотреть каталог
                <ArrowRight size={17} />
              </Link>
              <a href="#request" className="btn-secondary">
                Получить расчёт
              </a>
            </div>

            <div
              className="mt-10 grid grid-cols-3 gap-6 pt-8 border-t"
              style={{ borderColor: 'rgba(255,255,255,0.08)' }}
            >
              {[
                { n: '100+', l: 'видов продукции' },
                { n: '500+', l: 'выполненных заказов' },
                { n: 'от 50', l: 'штук минимум' },
              ].map((s) => (
                <div key={s.l}>
                  <div
                    className="text-2xl font-black text-white"
                    style={{ letterSpacing: '-0.04em' }}
                  >
                    {s.n}
                  </div>
                  <div className="text-sm text-gray-500 mt-0.5">{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — product showcase */}
          <div className="grid grid-cols-2 gap-3.5">
            {showcaseItems.map((item) => {
              const Icon = item.icon
              return (
                <div
                  key={item.label}
                  className={`relative rounded-2xl p-7 flex flex-col items-start aspect-square bg-gradient-to-br ${item.gradient} transition-transform duration-200 hover:-translate-y-1 cursor-default`}
                  style={{ border: `1px solid ${item.border}` }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-auto"
                    style={{ background: 'rgba(255,255,255,0.08)' }}
                  >
                    <Icon size={18} color={item.iconColor} />
                  </div>
                  <div>
                    <div
                      className="text-white font-bold text-base"
                      style={{ letterSpacing: '-0.02em' }}
                    >
                      {item.label}
                    </div>
                    <div className="text-sm mt-0.5" style={{ color: 'rgba(255,255,255,0.45)' }}>
                      {item.sub}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
