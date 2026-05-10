import { Zap, Package, Palette, BadgeCheck, Truck, HeartHandshake } from 'lucide-react'

const advantages = [
  {
    icon: Zap,
    title: 'Быстрое производство',
    description: 'Выполняем заказы от 7 рабочих дней. Срочные тиражи — от 3 дней.',
    color: 'text-orange-500',
    bg: 'bg-orange-50',
  },
  {
    icon: Package,
    title: 'Любые тиражи',
    description: 'Принимаем заказы от 50 штук. Скидки на крупные партии от 500 единиц.',
    color: 'text-blue-500',
    bg: 'bg-blue-50',
  },
  {
    icon: Palette,
    title: 'Бесплатный дизайн',
    description: 'Наши дизайнеры адаптируют ваш логотип и создадут макет под утверждение.',
    color: 'text-purple-500',
    bg: 'bg-purple-50',
  },
  {
    icon: BadgeCheck,
    title: 'Гарантия качества',
    description: 'Проверяем каждую партию перед отправкой. Заменяем брак за наш счёт.',
    color: 'text-emerald-500',
    bg: 'bg-emerald-50',
  },
  {
    icon: Truck,
    title: 'Доставка по России',
    description: 'Отправляем в любой город. Работаем с СДЭК, Деловыми линиями и Почтой России.',
    color: 'text-red-500',
    bg: 'bg-red-50',
  },
  {
    icon: HeartHandshake,
    title: 'Персональный менеджер',
    description: 'За каждым заказом закреплён менеджер, который ведёт вас от заявки до доставки.',
    color: 'text-yellow-500',
    bg: 'bg-yellow-50',
  },
]

export default function AdvantagesSection() {
  return (
    <section id="advantages" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="section-title">Почему выбирают Union</h2>
          <p className="section-subtitle">
            Мы производим мерч для крупных корпораций и стартапов с одинаковой отдачей
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {advantages.map((item) => (
            <div key={item.title} className="p-6 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
              <div className={`${item.bg} ${item.color} w-12 h-12 rounded-xl flex items-center justify-center mb-4`}>
                <item.icon size={22} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
