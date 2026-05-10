import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const products = [
  {
    label: 'Худи',
    sub: 'от 850 ₽',
    bg: '#E8E5DE',
    tag: 'Хит',
  },
  {
    label: 'Футболка',
    sub: 'от 420 ₽',
    bg: '#DDE5E0',
    tag: null,
  },
  {
    label: 'Кепка',
    sub: 'от 340 ₽',
    bg: '#E5DFDA',
    tag: null,
  },
  {
    label: 'Термокружка',
    sub: 'от 520 ₽',
    bg: '#DDDFE8',
    tag: 'Новинка',
  },
]

const stats = [
  { n: '100+', l: 'видов продукции' },
  { n: '500+', l: 'выполненных заказов' },
  { n: 'от 50', l: 'штук в тираже' },
  { n: '7 дней', l: 'срок производства' },
]

export default function Hero() {
  return (
    <section className="pt-16 min-h-screen flex flex-col justify-center" style={{ background: 'var(--bg)' }}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-16 w-full">

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left — copy */}
          <div>
            <div className="eyebrow">Корпоративный мерч</div>

            <h1
              className="font-black text-[#0A0A0A] leading-[1.0]"
              style={{ fontSize: 'clamp(3rem, 7vw, 5.5rem)', letterSpacing: '-0.045em' }}
            >
              Мерч для<br />
              вашей<br />
              <span style={{ color: 'var(--amber)' }}>команды</span>
            </h1>

            <p
              className="mt-7 text-[#5A5A5A] max-w-md leading-relaxed"
              style={{ fontSize: '1.0625rem', letterSpacing: '-0.01em' }}
            >
              Union Industry создаёт брендированную продукцию для бизнеса.
              От футболок до корпоративных наборов — любые тиражи, под ключ.
            </p>

            <div className="mt-9 flex flex-col sm:flex-row gap-3">
              <Link href="/catalog" className="btn-primary py-3 px-7 text-sm">
                Смотреть каталог
                <ArrowRight size={16} />
              </Link>
              <a href="#request" className="btn-secondary py-3 px-7 text-sm">
                Получить расчёт
              </a>
            </div>

            {/* Stats */}
            <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-6 lg:gap-4 pt-10 border-t border-black/[0.08]">
              {stats.map((s) => (
                <div key={s.l}>
                  <div
                    className="font-black text-[#0A0A0A] text-xl"
                    style={{ letterSpacing: '-0.04em' }}
                  >
                    {s.n}
                  </div>
                  <div className="text-[#A8A8A8] text-xs mt-0.5 leading-snug">{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — product cards */}
          <div className="grid grid-cols-2 gap-3">
            {products.map((p) => (
              <div
                key={p.label}
                className="relative rounded-2xl aspect-square flex flex-col justify-between p-5 overflow-hidden group cursor-default transition-transform duration-200 hover:-translate-y-1"
                style={{ background: p.bg }}
              >
                {p.tag && (
                  <span
                    className="self-start text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-[#0A0A0A] text-white"
                  >
                    {p.tag}
                  </span>
                )}
                {!p.tag && <span />}
                <div>
                  <div
                    className="font-black text-[#0A0A0A] text-lg"
                    style={{ letterSpacing: '-0.03em' }}
                  >
                    {p.label}
                  </div>
                  <div className="text-[#0A0A0A]/40 text-sm mt-0.5">{p.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
