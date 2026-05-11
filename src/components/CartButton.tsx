'use client'

import { ShoppingBag } from 'lucide-react'
import { useCart } from '@/lib/cart-context'

export default function CartButton() {
  const { totalCount, openCart } = useCart()

  return (
    <button
      onClick={openCart}
      className="relative w-9 h-9 rounded-xl flex items-center justify-center border border-black/[0.10] hover:border-black/[0.20] hover:bg-black/[0.04] transition-all duration-150"
    >
      <ShoppingBag size={16} className="text-[#0A0A0A]" />
      {totalCount > 0 && (
        <span className="absolute -top-1.5 -right-1.5 bg-[#D4500A] text-white text-[9px] font-black rounded-full min-w-[17px] h-[17px] flex items-center justify-center px-0.5 leading-none">
          {totalCount > 99 ? '99+' : totalCount}
        </span>
      )}
    </button>
  )
}
