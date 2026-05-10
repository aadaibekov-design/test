import { Zap, Package, Palette, BadgeCheck, Truck, HeartHandshake } from 'lucide-react'

const advantages = [
  { icon: Zap,            title: 'Быстрое производство',  description: 'Выполняем заказы от 7 рабочих дней. Срочные тиражи — от 3 дней.' },
  { icon: Package,        title: 'Любые тиражи',           description: 'Принимаем заказы от 50 штук. Скидки на крупные партии от 500 единиц.' },
  { icon: Palette,        title: 'Бесплатный дизайн',      description: 'Наши дизайнеры адаптируют ваш логотип и создадут макет под утверждение.' },
  { icon: BadgeCheck,     title: 'Гарантия качества',      description: 'Проверяем каждую партию перед отправкой. Заменяем брак за наш счёт.' },
  { icon: Truck,          title: 'Доставка по России',     description: 'Отправляем в любой город. Работаем с СДЭК, Деловыми линиями и Почтой России.' },
  { icon: HeartHandshake, title: 'Персональный менеджер',  description: 'За каждым заказом закреплён менеджер, который ведёт вас от заявки до доставки.' },
]

export default function AdvantagesSection() {
  return (
    <section id="advantages" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <div className="eyebrow">Преимущества</div>
            <h2 className="section-title">Почему выбирают<br />Union Industry</h2>
          </div>
          <p className="section-subtitle max-w-sm md:text-right">
            Производим мерч для корпораций и стартапов с одинаковой отдачей
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-black/[0.07] rounded-2xl overflow-hidden">
          {advantages.map((item, i) => {
            const Icon = item.icon
            return (
              <div
                key={item.title}
                className="bg-white p-8 hover:bg-[#F7F5F2] transition-colors duration-200 group"
              >
                <div className="w-10 h-10 rounded-lg bg-[#0A0A0A] flex items-center justify-center mb-6 group-hover:bg-[#D4500A] transition-colors duration-200">
                  <Icon size={18} color="white" />
                </div>
                <h3
                  className="font-bold text-[#0A0A0A] mb-2"
                  style={{ letterSpacing: '-0.025em' }}
                >
                  {item.title}
                </h3>
                <p className="text-sm text-[#5A5A5A] leading-relaxed">{item.description}</p>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
