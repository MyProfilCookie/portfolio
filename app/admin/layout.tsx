'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { LayoutDashboard, Code2, Settings, Star, MessageSquare, LogOut, Menu, X } from 'lucide-react'
import AstronautIcon from '@/components/astronaut-icon'
import { Toaster } from 'sonner'

const navigation = [
  { name: 'Tableau de bord', href: '/admin', icon: LayoutDashboard, emoji: '📊' },
  { name: 'Projets', href: '/admin/projects', icon: Code2, emoji: '💻' },
  { name: 'Technologies', href: '/admin/technologies', icon: Settings, emoji: '⚙️' },
  { name: 'Témoignages', href: '/admin/testimonials', icon: Star, emoji: '⭐' },
  { name: 'Messages', href: '/admin/messages', icon: MessageSquare, emoji: '💬' },
]

const mainNav = [
  { name: 'Accueil', href: '/' },
  { name: 'Projets', href: '/projets' },
  { name: 'Tarifs', href: '/tarifs' },
  { name: 'Contact', href: '/contact' },
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleLogout = () => {
    document.cookie = 'isAdmin=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
    router.push('/')
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-950">
      <Toaster position="top-right" />
      {/* Navbar */}
      <nav className="fixed top-0 z-50 w-full bg-gradient-to-b from-black to-gray-950 border border-purple-500/20">
        <div className="px-4 lg:px-6 py-4">
          <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="relative">
                <AstronautIcon className="w-6 h-6" page="home" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text">
                MyProfilCookie
              </span>
            </Link>
          </div>

            <div className="hidden lg:flex items-center gap-6">
              {mainNav.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-muted-foreground hover:text-cyan-400 transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </div>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-md text-muted-foreground hover:text-cyan-400 focus:outline-none transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-cyan-500/20">
            <div className="px-4 py-2 space-y-1">
              {mainNav.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block px-3 py-2 rounded-md text-base font-medium text-muted-foreground hover:text-cyan-400 hover:bg-cyan-500/10 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>

      <div className="flex pt-16">
        {/* Sidebar */}
        <div className="fixed left-0 w-16 lg:w-64 h-[calc(100vh-4rem)] bg-gradient-to-b from-black to-gray-950 border-r border-cyan-950/20">
          <div className="h-full flex flex-col">
            <div className="flex-1 flex flex-col overflow-y-auto">
              <nav className="flex-1 px-2 py-4 space-y-1">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="group flex items-center justify-center lg:justify-start px-2 py-2 text-sm font-medium rounded-md text-muted-foreground hover:bg-cyan-500/10 hover:text-cyan-400 transition-colors"
                  >
                    <span className="hidden lg:inline">
                      <item.icon
                        className="mr-3 h-5 w-5 text-muted-foreground group-hover:text-cyan-400"
                        aria-hidden="true"
                      />
                    </span>
                    <span className="lg:hidden text-xl" aria-hidden="true">
                      {item.emoji}
                    </span>
                    <span className="hidden lg:inline">{item.name}</span>
                  </Link>
                ))}
              </nav>
              <div className="p-4 border-t border-cyan-500/20">
                <button
                  onClick={handleLogout}
                  className="flex items-center justify-center lg:justify-start px-2 py-2 text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-md w-full transition-colors"
                >
                  <span className="hidden lg:inline">
                    <LogOut className="mr-3 h-5 w-5" />
                  </span>
                  <span className="lg:hidden text-xl" aria-hidden="true">
                    🚪
                  </span>
                  <span className="hidden lg:inline">Déconnexion</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 ml-16 lg:ml-64">
          <main className="p-6">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
} 