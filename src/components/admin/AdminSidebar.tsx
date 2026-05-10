'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { LayoutDashboard, Package, ShoppingBag, Users, LogOut, ExternalLink } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { cn } from '@/lib/utils'

const navItems = [
  { href: '/admin/orders', label: 'Заявки', icon: ShoppingBag },
  { href: '/admin/products', label: 'Товары', icon: Package },
  { href: '/admin/clients', label: 'Клиенты', icon: Users },
]

export default function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()

  async function handleLogout() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/admin/login')
  }

  return (
    <aside className="w-56 bg-gray-900 min-h-screen flex flex-col shrink-0">
      <div className="p-5 border-b border-white/10">
        <Link href="/" className="inline-flex items-center gap-1 group">
          <span className="text-xl font-black text-white tracking-tight">
            UNI<span className="text-orange-500">ON</span>
          </span>
          <span className="ml-1 text-xs text-gray-500 group-hover:text-gray-300 transition-colors">admin</span>
        </Link>
      </div>

      <nav className="flex-1 p-3 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors',
                isActive
                  ? 'bg-orange-500 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-white/10'
              )}
            >
              <item.icon size={17} />
              {item.label}
            </Link>
          )
        })}
      </nav>

      <div className="p-3 border-t border-white/10 space-y-1">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
        >
          <ExternalLink size={17} />
          Открыть сайт
        </Link>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-400 hover:text-red-400 hover:bg-white/10 transition-colors"
        >
          <LogOut size={17} />
          Выйти
        </button>
      </div>
    </aside>
  )
}
