'use client'

import { useState, useEffect } from 'react'
import { 
  Code2, 
  Star, 
  MessageSquare,
  Users,
  BarChart,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react'
import { Card } from '@/components/ui/card'

interface Stats {
  projects: number;
  unreadMessages: number;
  pendingTestimonials: number;
  testimonials: number;
  clients: number;
}

interface DashboardCard {
  title: string;
  value: number;
  icon: React.ReactNode;
  description: string;
  color: string;
  trend: {
    value: string;
    isPositive: boolean;
  };
}

interface Testimonial {
  id: string;
  name: string;
  message: string;
  approved: boolean;
  role?: string;
  company?: string;
  createdAt: Date;
}

export default function AdminDashboard() {
  const [isLoading, setIsLoading] = useState(true)
  const [stats, setStats] = useState<Stats>({
    projects: 0,
    unreadMessages: 0,
    pendingTestimonials: 0,
    testimonials: 0,
    clients: 0
  })
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [allTestimonials, setAllTestimonials] = useState<Testimonial[]>([])

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/test-stats');
        const data = await response.json();
        if (data.success) {
          setStats(data.counts);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des statistiques:', error);
      } finally {
        setIsLoading(false)
      }
    }
    fetchStats();

    const fetchTestimonials = async () => {
      try {
        const response = await fetch('/api/testimonials?approved=false');
        const data = await response.json();
        setTestimonials(data.testimonials);
      } catch (error) {
        console.error('Erreur lors de la récupération des témoignages:', error);
      }
    };
    fetchTestimonials();

    const fetchAllTestimonials = async () => {
      try {
        const response = await fetch('/api/testimonials');
        const data = await response.json();
        setAllTestimonials(data.testimonials);
      } catch (error) {
        console.error('Erreur lors de la récupération des témoignages:', error);
      }
    };
    fetchAllTestimonials();
  }, [])

  const cards: DashboardCard[] = [
    {
      title: 'Projets',
      value: stats.projects,
      icon: <BarChart className="h-6 w-6" />,
      description: 'Projets en cours',
      color: 'from-purple-400 to-purple-600',
      trend: { value: '+2 ce mois', isPositive: true }
    },
    {
      title: 'Messages',
      value: stats.unreadMessages,
      icon: <MessageSquare className="h-6 w-6" />,
      description: 'Messages non lus',
      color: 'from-green-400 to-green-600',
      trend: { value: '-3 ce mois', isPositive: false }
    },
    {
      title: 'Témoignages (en attente)',
      value: stats.pendingTestimonials,
      icon: <Star className="h-6 w-6" />,
      description: 'Témoignages en attente',
      color: 'from-yellow-400 to-yellow-600',
      trend: { value: '+1 ce mois', isPositive: true }
    },
    {
      title: 'Témoignages (total)',
      value: stats.testimonials,
      icon: <Star className="h-6 w-6 text-purple-400" />,
      description: 'Tous les témoignages',
      color: 'from-purple-400 to-purple-600',
      trend: { value: '', isPositive: true }
    },
    {
      title: 'Clients',
      value: stats.clients,
      icon: <Users className="h-6 w-6" />,
      description: 'Clients',
      color: 'from-pink-400 to-pink-600',
      trend: { value: '+5 ce mois', isPositive: true }
    },
  ]

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-cyan-400/70 animate-pulse">Chargement...</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-cyan-200 text-transparent bg-clip-text">
        Tableau de bord
      </h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {cards.map((card, index) => (
          <Card key={index} className="relative overflow-hidden border-cyan-500/20 bg-black/30 backdrop-blur-sm group hover:border-cyan-500/40 transition-colors">
            <div className="p-6 flex flex-col space-y-2">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-2 rounded-lg bg-gradient-to-br ${card.color} bg-opacity-10`}>
                  {card.icon}
                </div>
                <span className="text-4xl font-bold text-foreground/90 group-hover:text-foreground transition-colors">
                  {card.value}
                </span>
              </div>
              <div>
                <h3 className="font-medium text-foreground/90 group-hover:text-foreground transition-colors">
                  {card.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {card.description}
                </p>
              </div>
              <div className={`flex items-center text-sm ${card.trend.isPositive ? 'text-green-400' : 'text-red-400'}`}>
                {card.trend.isPositive ? (
                  <ArrowUpRight className="w-4 h-4 mr-1" />
                ) : (
                  <ArrowDownRight className="w-4 h-4 mr-1" />
                )}
                <span>{card.trend.value}</span>
              </div>
            </div>
            <div 
              className={`absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity bg-gradient-to-br ${card.color}`}
              aria-hidden="true"
            />
          </Card>
        ))}
      </div>
      <div className="mt-8">
        <h2 className="text-lg font-bold mb-4">Témoignages en attente</h2>
        {testimonials.length === 0 ? (
          <p className="text-muted-foreground">Aucun témoignage en attente.</p>
        ) : (
          <ul className="space-y-4">
            {testimonials.map((t) => (
              <li key={t.id} className="p-4 border rounded bg-black/20">
                <p className="font-semibold">{t.name}</p>
                <p className="text-sm text-muted-foreground">{t.message}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-6">Tous les témoignages ({allTestimonials.length})</h2>
        {allTestimonials.length === 0 ? (
          <p className="text-muted-foreground">Aucun témoignage trouvé.</p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {allTestimonials.map((t) => (
              <Card key={t.id} className="p-4 border rounded bg-black/20">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-semibold">{t.name}</p>
                    {t.role && t.company && (
                      <p className="text-sm text-muted-foreground">
                        {t.role} - {t.company}
                      </p>
                    )}
                  </div>
                  <span className={`px-2 py-1 rounded text-xs ${
                    t.approved 
                      ? 'bg-green-500/20 text-green-400'
                      : 'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {t.approved ? 'Approuvé' : 'En attente'}
                  </span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{t.message}</p>
                <p className="mt-2 text-xs text-muted-foreground">
                  {new Date(t.createdAt).toLocaleDateString('fr-FR')}
                </p>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
} 