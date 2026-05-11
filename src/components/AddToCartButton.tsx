'use client'

import { ShoppingBag, Check } from 'lucide-react'
import { useState } from 'react'
import { useCart } from '@/lib/cart-context'
import type { CartItem } from '@/lib/cart-context'

interface Props {
  item: Omit<CartItem, 'quantity'>
  variant?: 'circle' | 'full'
}

export default function AddToCartButton({ item, variant = 'circle' }: Props) {
  const { addItem, openCart } = useCart()
  const [added, setAdded] = useState(false)

  function handleClick() {
    addItem(item)
    setAdded(true)
    setTimeout(() => setAdded(false), 1400)
    openCart()
  }

  if (variant === 'full') {
    return (
      <button
        onClick={handleClick}
        className={`w-full flex items-center justify-center gap-2 py-3 px-5 rounded-xl font-semibold text-sm transition-all duration-200 ${
          added
            ? 'bg-emerald-500 text-white'
            : 'bg-[#0A0A0A] text-white hover:bg-[#D4500A]'
        }`}
        style={{ letterSpacing: '-0.01em' }}
      >
        {added ? (
          <>
            <Check size={15} />
            Добавлено
          </>
        ) : (
          <>
            <ShoppingBag size={15} />
            В корзину
          </>
        )}
      </button>
    )
  }

  return (
    <button
      onClick={handleClick}
      className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
        added
          ? 'bg-emerald-500 text-white scale-110'
          : 'bg-[#0A0A0A] text-white hover:bg-[#D4500A]'
      }`}
      title="Добавить в корзину"
    >
      {added ? <Check size={13} /> : <ShoppingBag size={13} />}
    </button>
  )
}
