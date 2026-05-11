'use client'

import { X, Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/lib/cart-context'
import { formatPrice } from '@/lib/utils'

export default function CartDrawer() {
  const { items, removeItem, updateQty, clearCart, totalCount, totalPrice, isOpen, closeCart } =
    useCart()

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm"
          onClick={closeCart}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full z-[70] w-full max-w-[420px] bg-white flex flex-col shadow-2xl transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-black/[0.07]">
          <div className="flex items-center gap-2.5">
            <ShoppingBag size={18} className="text-[#0A0A0A]" />
            <span className="font-black text-[#0A0A0A]" style={{ letterSpacing: '-0.03em' }}>
              Корзина
            </span>
            {totalCount > 0 && (
              <span className="ml-1 bg-[#D4500A] text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {totalCount}
              </span>
            )}
          </div>
          <button
            onClick={closeCart}
            className="w-8 h-8 rounded-full hover:bg-black/[0.06] flex items-center justify-center transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="w-16 h-16 rounded-full bg-[#F7F5F2] flex items-center justify-center mb-4">
                <ShoppingBag size={24} className="text-[#A8A8A8]" />
              </div>
              <p className="font-semibold text-[#0A0A0A]" style={{ letterSpacing: '-0.02em' }}>
                Корзина пуста
              </p>
              <p className="text-sm text-[#A8A8A8] mt-1">Добавьте товары из каталога</p>
              <Link
                href="/catalog"
                onClick={closeCart}
                className="mt-5 btn-primary py-2.5 px-5 text-sm"
              >
                Перейти в каталог
                <ArrowRight size={14} />
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {items.map((item) => {
                const img =
                  item.image ||
                  `https://placehold.co/80x80/EDEAE4/0A0A0A?text=${encodeURIComponent(item.name)}`
                return (
                  <div
                    key={item.id}
                    className="flex items-start gap-3 p-3 rounded-xl bg-[#F7F5F2] border border-black/[0.05]"
                  >
                    <div className="relative w-14 h-14 rounded-lg overflow-hidden flex-shrink-0 bg-[#EDEAE4]">
                      <Image src={img} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p
                        className="text-sm font-bold text-[#0A0A0A] truncate"
                        style={{ letterSpacing: '-0.02em' }}
                      >
                        {item.name}
                      </p>
                      {item.category && (
                        <p className="text-[10px] text-[#D4500A] font-bold uppercase mt-0.5" style={{ letterSpacing: '0.08em' }}>
                          {item.category}
                        </p>
                      )}
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => updateQty(item.id, item.quantity - 1)}
                            className="w-6 h-6 rounded-full border border-black/15 flex items-center justify-center hover:border-black/30 transition-colors"
                          >
                            <Minus size={10} />
                          </button>
                          <span className="text-sm font-bold w-5 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQty(item.id, item.quantity + 1)}
                            className="w-6 h-6 rounded-full border border-black/15 flex items-center justify-center hover:border-black/30 transition-colors"
                          >
                            <Plus size={10} />
                          </button>
                        </div>
                        <span
                          className="text-sm font-black text-[#0A0A0A]"
                          style={{ letterSpacing: '-0.03em' }}
                        >
                          от {formatPrice(item.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="w-6 h-6 flex items-center justify-center text-[#A8A8A8] hover:text-red-500 transition-colors flex-shrink-0 mt-0.5"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-black/[0.07] px-6 py-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#5A5A5A]">Итого (ориентировочно)</span>
              <span
                className="text-xl font-black text-[#0A0A0A]"
                style={{ letterSpacing: '-0.04em' }}
              >
                от {formatPrice(totalPrice)}
              </span>
            </div>

            <a
              href="/#request"
              onClick={closeCart}
              className="btn-primary w-full py-3.5"
            >
              Оформить заявку
              <ArrowRight size={15} />
            </a>

            <button
              onClick={clearCart}
              className="w-full text-xs text-[#A8A8A8] hover:text-red-500 transition-colors py-1"
            >
              Очистить корзину
            </button>
          </div>
        )}
      </div>
    </>
  )
}
