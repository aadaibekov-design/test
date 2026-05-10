import { ClipboardList, Calculator, Brush, PackageCheck } from 'lucide-react'

const steps = [
  {
    number: '01',
    icon: ClipboardList,
    title: 'Оставьте заявку',
    description: 'Заполните форму на сайте или напишите нам. Укажите примерный тираж и интересующую продукцию.',
  },
  {
    number: '02',
    icon: Calculator,
    title: 'Получите предложение',
    description: 'Менеджер свяжется в течение 2 часов и подготовит коммерческое предложение с точными ценами.',
  },
  {
    number: '03',
    icon: Brush,
    title: 'Утвердите дизайн',
    description: 'Наш дизайнер подготовит макет нанесения. Вносим правки до полного согласования — бесплатно.',
  },
  {
    number: '04',
    icon: PackageCheck,
    title: 'Получите заказ',
    description: 'Производим в срок и доставляем в любую точку России. Проверяем качество перед отгрузкой.',
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24" style={{ background: 'var(--bg2)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-orange-500 text-sm font-semibold uppercase tracking-widest mb-3">
            Процесс
          </p>
          <h2 className="section-title">Как мы работаем</h2>
          <p className="section-subtitle">Простой процесс от заявки до получения готового мерча</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <div key={step.number} className="relative">
                {index < steps.length - 1 && (
                  <div
                    className="hidden lg:block absolute top-8 left-full w-full h-px z-0"
                    style={{
                      background: 'linear-gradient(90deg, rgba(249,115,22,0.4), transparent)',
                    }}
                  />
                )}
                <div
                  className="relative rounded-2xl p-6 transition-all duration-200 hover:-translate-y-1 cursor-default"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)',
                  }}
                >
                  <div className="flex items-center gap-3 mb-5">
                    <span
                      className="text-orange-500 font-black text-3xl leading-none"
                      style={{ letterSpacing: '-0.05em' }}
                    >
                      {step.number}
                    </span>
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center"
                      style={{
                        background: 'rgba(249,115,22,0.1)',
                        border: '1px solid rgba(249,115,22,0.2)',
                      }}
                    >
                      <Icon size={16} color="#fb923c" />
                    </div>
                  </div>
                  <h3
                    className="font-bold text-white mb-2"
                    style={{ letterSpacing: '-0.02em' }}
                  >
                    {step.title}
                  </h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{step.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
