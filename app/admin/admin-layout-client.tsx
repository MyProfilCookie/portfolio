'use client'

import { Inter } from 'next/font/google'
import Link from 'next/link'
import { 
  LayoutDashboard, 
  Code2, 
  Star, 
  MessageSquare,
  Settings,
  LogOut
} from 'lucide-react'
import { useRouter } from 'next/navigation'

const inter = Inter({ subsets: ['latin'] })

const navigation = [
  { name: 'Tableau de bord', href: '/admin', icon: LayoutDashboard },
  { name: 'Projets', href: '/admin/projects', icon: Code2 },
  { name: 'Technologies', href: '/admin/technologies', icon: Settings },
  { name: 'Témoignages', href: '/admin/testimonials', icon: Star },
  { name: 'Messages', href: '/admin/messages', icon: MessageSquare },
]

export default function AdminLayoutClient({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()

  const handleLogout = () => {
    document.cookie = 'isAdmin=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
    router.push('/')
  }

  return (
    <div className={inter.className}>
      <div className="min-h-screen bg-gradient-to-b from-black to-gray-950">
        {/* Navbar */}
        <nav className="fixed top-0 z-50 w-full bg-gradient-to-b from-black to-gray-950 border border-purple-500/20">
          <div className="px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-cyan-200 text-transparent bg-clip-text">
                MyProfilCookie
              </span>
            </div>
            <div className="flex items-center gap-6">
              <Link href="/" className="text-muted-foreground hover:text-cyan-400 transition-colors">
                Accueil
              </Link>
              <Link href="/projets" className="text-muted-foreground hover:text-cyan-400 transition-colors">
                Projets
              </Link>
              <Link href="/tarifs" className="text-muted-foreground hover:text-cyan-400 transition-colors">
                Tarifs
              </Link>
              <Link href="/contact" className="text-muted-foreground hover:text-cyan-400 transition-colors">
                Contact
              </Link>
            </div>
          </div>
        </nav>

        {/* Main Layout */}
        <div className="flex pt-16"> {/* Added pt-16 for navbar spacing */}
          {/* Sidebar */}
          <div className="fixed left-0 w-64 h-[calc(100vh-4rem)] overflow-y-auto bg-gradient-to-b from-black to-gray-950 border-r border-purple-500/20">
            <div className="h-full flex flex-col">
              <div className="flex-1 flex flex-col overflow-y-auto">
                <nav className="flex-1 px-2 py-4 space-y-1">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-muted-foreground hover:bg-cyan-500/10 hover:text-cyan-400 transition-colors"
                    >
                      <item.icon
                        className="mr-3 h-5 w-5 text-muted-foreground group-hover:text-cyan-400"
                        aria-hidden="true"
                      />
                      {item.name}
                    </Link>
                  ))}
                </nav>
                <div className="p-4 border-t border-cyan-500/20">
                  <button
                    onClick={handleLogout}
                    className="flex items-center px-2 py-2 text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-md w-full transition-colors"
                  >
                    <LogOut className="mr-3 h-5 w-5" />
                    Déconnexion
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Main content */}
          <div className="flex-1 ml-64"> {/* Added ml-64 to offset sidebar */}
            <main className="p-6">
              {children}
            </main>
          </div>
        </div>
      </div>
    </div>
  )
} 