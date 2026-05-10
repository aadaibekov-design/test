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
    <section id="how-it-works" className="py-24 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <div className="text-[#D4500A] text-xs font-bold uppercase tracking-[0.12em] mb-3">Процесс</div>
            <h2 className="section-title-inv">Как мы работаем</h2>
          </div>
          <p className="section-subtitle-inv max-w-xs">
            Простой процесс от заявки до получения готового мерча
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <div key={step.number} className="relative">
                {index < steps.length - 1 && (
                  <div
                    className="hidden lg:block absolute top-6 left-full w-full h-px z-0"
                    style={{ background: 'linear-gradient(90deg, rgba(255,255,255,0.12), transparent)' }}
                  />
                )}
                <div className="relative rounded-2xl p-6 border border-white/[0.08] hover:border-white/[0.16] transition-all duration-200 hover:bg-white/[0.03] group">
                  <div className="flex items-center gap-3 mb-5">
                    <span
                      className="text-[#D4500A] font-black text-2xl leading-none"
                      style={{ letterSpacing: '-0.05em' }}
                    >
                      {step.number}
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-white/[0.07] flex items-center justify-center group-hover:bg-white/[0.12] transition-colors">
                      <Icon size={15} color="rgba(255,255,255,0.6)" />
                    </div>
                  </div>
                  <h3
                    className="font-bold text-white mb-2 text-sm"
                    style={{ letterSpacing: '-0.02em' }}
                  >
                    {step.title}
                  </h3>
                  <p className="text-xs text-white/40 leading-relaxed">{step.description}</p>
                </div>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
