import { Zap, Package, Palette, BadgeCheck, Truck, HeartHandshake } from 'lucide-react'

const advantages = [
  {
    icon: Zap,
    title: 'Быстрое производство',
    description: 'Выполняем заказы от 7 рабочих дней. Срочные тиражи — от 3 дней.',
    color: '#fb923c',
    glow: 'rgba(249,115,22,0.15)',
  },
  {
    icon: Package,
    title: 'Любые тиражи',
    description: 'Принимаем заказы от 50 штук. Скидки на крупные партии от 500 единиц.',
    color: '#60a5fa',
    glow: 'rgba(59,130,246,0.15)',
  },
  {
    icon: Palette,
    title: 'Бесплатный дизайн',
    description: 'Наши дизайнеры адаптируют ваш логотип и создадут макет под утверждение.',
    color: '#a78bfa',
    glow: 'rgba(139,92,246,0.15)',
  },
  {
    icon: BadgeCheck,
    title: 'Гарантия качества',
    description: 'Проверяем каждую партию перед отправкой. Заменяем брак за наш счёт.',
    color: '#34d399',
    glow: 'rgba(52,211,153,0.15)',
  },
  {
    icon: Truck,
    title: 'Доставка по России',
    description: 'Отправляем в любой город. Работаем с СДЭК, Деловыми линиями и Почтой России.',
    color: '#f87171',
    glow: 'rgba(239,68,68,0.15)',
  },
  {
    icon: HeartHandshake,
    title: 'Персональный менеджер',
    description: 'За каждым заказом закреплён менеджер, который ведёт вас от заявки до доставки.',
    color: '#fbbf24',
    glow: 'rgba(245,158,11,0.15)',
  },
]

export default function AdvantagesSection() {
  return (
    <section id="advantages" className="py-24" style={{ background: 'var(--bg2)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p
            className="text-orange-500 text-sm font-semibold uppercase tracking-widest mb-3"
          >
            Почему Union
          </p>
          <h2 className="section-title">Почему выбирают Union</h2>
          <p className="section-subtitle">
            Производим мерч для корпораций и стартапов с одинаковой отдачей
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {advantages.map((item) => {
            const Icon = item.icon
            return (
              <div key={item.title} className="card-dark group">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-5 transition-all duration-200 group-hover:scale-110"
                  style={{
                    background: item.glow,
                    border: `1px solid ${item.color}33`,
                  }}
                >
                  <Icon size={20} color={item.color} />
                </div>
                <h3
                  className="text-base font-bold text-white mb-2"
                  style={{ letterSpacing: '-0.025em' }}
                >
                  {item.title}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">{item.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
