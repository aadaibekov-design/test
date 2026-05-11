import Link from 'next/link'
import { ArrowRight, ArrowUpRight } from 'lucide-react'

const stats = [
  { n: '100+',   l: 'видов продукции' },
  { n: '500+',   l: 'выполненных заказов' },
  { n: 'от 50',  l: 'штук в тираже' },
  { n: '7 дней', l: 'срок производства' },
]

export default function Hero() {
  return (
    <section className="pt-16 min-h-screen flex flex-col justify-center" style={{ background: 'var(--bg)' }}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-16 w-full">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* ── LEFT — copy ─────────────────────────────── */}
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
              <Link href="/catalog" className="btn-primary py-3 px-7">
                Смотреть каталог
                <ArrowRight size={16} />
              </Link>
              <a href="#request" className="btn-secondary py-3 px-7">
                Получить расчёт
              </a>
            </div>

            <div
              className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-5 pt-10 border-t border-black/[0.08]"
            >
              {stats.map((s) => (
                <div key={s.l}>
                  <div className="font-black text-[#0A0A0A] text-xl" style={{ letterSpacing: '-0.04em' }}>
                    {s.n}
                  </div>
                  <div className="text-[#A8A8A8] text-xs mt-0.5 leading-snug">{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT — bento grid ───────────────────────── */}
          <div
            className="grid gap-2.5"
            style={{
              gridTemplateColumns: '1.45fr 1fr',
              gridTemplateRows: '180px 180px auto',
            }}
          >
            {/* 1 — LARGE (spans 2 rows) */}
            <div
              className="relative rounded-2xl overflow-hidden flex flex-col justify-between p-6 group cursor-default"
              style={{
                gridRow: 'span 2',
                background: 'linear-gradient(150deg, #EBE7DF 0%, #DDD9CF 100%)',
              }}
            >
              {/* Faded big letter backdrop */}
              <span
                className="absolute right-4 top-4 font-black text-[#0A0A0A]/[0.05] select-none pointer-events-none leading-none"
                style={{ fontSize: '9rem', letterSpacing: '-0.06em' }}
                aria-hidden
              >
                01
              </span>

              <div>
                <span className="inline-flex items-center gap-1.5 bg-[#0A0A0A] text-white text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full">
                  ХИТ
                </span>
              </div>

              <div>
                <div
                  className="font-black text-[#0A0A0A] leading-none mb-1"
                  style={{ fontSize: '2.25rem', letterSpacing: '-0.04em' }}
                >
                  Худи
                </div>
                <div className="text-[#0A0A0A]/40 text-sm mb-4">Брендированный, от 50 шт.</div>
                <div className="flex items-center justify-between">
                  <span className="font-black text-[#0A0A0A] text-lg" style={{ letterSpacing: '-0.04em' }}>
                    от 850 ₸
                  </span>
                  <div className="w-8 h-8 rounded-full bg-[#0A0A0A] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowUpRight size={14} color="white" />
                  </div>
                </div>
              </div>
            </div>

            {/* 2 — small top-right */}
            <div
              className="relative rounded-2xl overflow-hidden flex flex-col justify-between p-5 group cursor-default"
              style={{ background: 'linear-gradient(150deg, #DCE9E2 0%, #D0E0D8 100%)' }}
            >
              <span
                className="absolute right-3 top-3 font-black text-[#0A0A0A]/[0.05] select-none leading-none"
                style={{ fontSize: '5rem', letterSpacing: '-0.06em' }}
                aria-hidden
              >
                02
              </span>
              <div />
              <div>
                <div className="font-black text-[#0A0A0A] text-xl" style={{ letterSpacing: '-0.04em' }}>
                  Футболка
                </div>
                <div className="text-[#0A0A0A]/40 text-sm mt-0.5">от 420 ₸</div>
              </div>
            </div>

            {/* 3 — small bottom-right */}
            <div
              className="relative rounded-2xl overflow-hidden flex flex-col justify-between p-5 group cursor-default"
              style={{ background: 'linear-gradient(150deg, #E5DFDA 0%, #DBD3CB 100%)' }}
            >
              <span
                className="absolute right-3 top-3 font-black text-[#0A0A0A]/[0.05] select-none leading-none"
                style={{ fontSize: '5rem', letterSpacing: '-0.06em' }}
                aria-hidden
              >
                03
              </span>
              <div />
              <div>
                <div className="font-black text-[#0A0A0A] text-xl" style={{ letterSpacing: '-0.04em' }}>
                  Кепка
                </div>
                <div className="text-[#0A0A0A]/40 text-sm mt-0.5">от 340 ₸</div>
              </div>
            </div>

            {/* 4 — WIDE bottom (spans 2 cols) */}
            <div
              className="relative rounded-2xl overflow-hidden flex items-center justify-between px-6 py-5 group cursor-default"
              style={{
                gridColumn: 'span 2',
                background: 'linear-gradient(150deg, #DDE0EC 0%, #D5D9E8 100%)',
              }}
            >
              <span
                className="absolute right-6 top-1/2 -translate-y-1/2 font-black text-[#0A0A0A]/[0.05] select-none leading-none"
                style={{ fontSize: '6rem', letterSpacing: '-0.06em' }}
                aria-hidden
              >
                04
              </span>

              <div className="flex items-center gap-4">
                <div>
                  <span className="inline-flex items-center gap-1 bg-[#0A0A0A] text-white text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full mb-2">
                    НОВИНКА
                  </span>
                  <div className="font-black text-[#0A0A0A] text-xl" style={{ letterSpacing: '-0.04em' }}>
                    Термокружка
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 relative z-10">
                <span className="font-black text-[#0A0A0A] text-lg" style={{ letterSpacing: '-0.04em' }}>
                  от 520 ₸
                </span>
                <Link
                  href="/catalog"
                  className="flex items-center gap-2 bg-[#0A0A0A] text-white text-xs font-semibold px-4 py-2.5 rounded-full hover:bg-[#D4500A] transition-colors"
                  style={{ letterSpacing: '-0.01em' }}
                >
                  В каталог <ArrowRight size={12} />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
