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
    <section id="how-it-works" className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-white">Как мы работаем</h2>
          <p className="mt-3 text-lg text-gray-400">
            Простой процесс от заявки до получения готового мерча
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div key={step.number} className="relative">
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-full w-full h-px bg-gradient-to-r from-orange-500/50 to-transparent z-0" />
              )}
              <div className="relative bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-orange-500 font-black text-3xl leading-none">{step.number}</span>
                  <div className="bg-orange-500/10 text-orange-400 w-10 h-10 rounded-xl flex items-center justify-center">
                    <step.icon size={18} />
                  </div>
                </div>
                <h3 className="font-bold text-white mb-2">{step.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
