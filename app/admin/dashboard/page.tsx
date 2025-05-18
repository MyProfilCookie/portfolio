"use client";

import { motion } from 'framer-motion';
import { 
  Code2, 
  MessageSquare, 
  Star, 
  Users, 
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { useEffect, useState } from 'react';

interface Stats {
  projects: number;
  unreadMessages: number;
  pendingTestimonials: number;
  clients: number;
  recentActivity: Array<{
    type: string;
    title: string;
    date: string;
  }>;
  recentMessages: Array<{
    name: string;
    date: string;
    read: boolean;
  }>;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats>({
    projects: 0,
    unreadMessages: 0,
    pendingTestimonials: 0,
    clients: 0,
    recentActivity: [],
    recentMessages: []
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/admin/stats');
        const data = await response.json();
        console.log('Données reçues de l\'API:', data);
        setStats(data);
      } catch (error) {
        console.error('Erreur lors de la récupération des statistiques:', error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="space-y-8 min-h-screen bg-background text-foreground bg-gradient-to-b from-black to-gray-950">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-cyan-200 text-transparent bg-clip-text">
          Tableau de bord
        </h1>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 bg-gradient-to-b from-black to-gray-950">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="p-6 rounded-lg bg-gradient-to-b from-black to-gray-950 border border-cyan-500/20"
        >
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-muted-foreground">Projets</p>
            <div className="p-3 rounded-full bg-cyan-400/10">
              <Code2 className="w-6 h-6 text-cyan-400" />
            </div>
          </div>
          <p className="text-4xl font-bold text-cyan-400 mb-4">{stats.projects}</p>
          <div className="flex items-center text-green-400 text-sm">
            <ArrowUpRight className="w-4 h-4 mr-1" />
            <span>+2 ce mois</span>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="p-6 rounded-lg bg-gradient-to-b from-black to-gray-950 border border-blue-500/20"
        >
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-muted-foreground">Messages non lus</p>
            <div className="p-3 rounded-full bg-blue-400/10">
              <MessageSquare className="w-6 h-6 text-blue-400" />
            </div>
          </div>
          <p className="text-4xl font-bold text-blue-400 mb-4">{stats.unreadMessages}</p>
          <div className="flex items-center text-red-400 text-sm">
            <ArrowDownRight className="w-4 h-4 mr-1" />
            <span>-3 ce mois</span>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="p-6 rounded-lg bg-gradient-to-b from-black to-gray-950 border border-purple-500/20"
        >
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-muted-foreground">Témoignages en attente</p>
            <div className="p-3 rounded-full bg-purple-400/10">
              <Star className="w-6 h-6 text-purple-400" />
            </div>
          </div>
          <p className="text-4xl font-bold text-purple-400 mb-4">{stats.pendingTestimonials}</p>
          <div className="flex items-center text-green-400 text-sm">
            <ArrowUpRight className="w-4 h-4 mr-1" />
            <span>+1 ce mois</span>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="p-6 rounded-lg bg-gradient-to-b from-black to-gray-950 border border-pink-500/20"
        >
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-muted-foreground">Clients</p>
            <div className="p-3 rounded-full bg-pink-400/10">
              <Users className="w-6 h-6 text-pink-400" />
            </div>
          </div>
          <p className="text-4xl font-bold text-pink-400 mb-4">{stats.clients}</p>
          <div className="flex items-center text-green-400 text-sm">
            <ArrowUpRight className="w-4 h-4 mr-1" />
            <span>+5 ce mois</span>
          </div>
        </motion.div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 bg-gradient-to-b from-black to-gray-950">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="p-6 rounded-lg bg-gradient-to-b from-black to-gray-950 border border-cyan-500/20"
        >
          <h2 className="text-lg font-semibold mb-4 text-cyan-400">Activité récente</h2>
          <div className="space-y-4">
            {stats.recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start gap-4 p-4 rounded-lg bg-cyan-500/5 hover:bg-cyan-500/10 transition-colors">
                <div className="p-2 rounded-full bg-cyan-400/10">
                  <TrendingUp className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <p className="font-medium text-foreground">{activity.title}</p>
                  <p className="text-sm text-muted-foreground">{activity.date}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="p-6 rounded-lg bg-gradient-to-b from-black to-gray-950 border border-blue-500/20"
        >
          <h2 className="text-lg font-semibold mb-4 text-blue-400">Messages récents</h2>
          <div className="space-y-4">
            {stats.recentMessages.map((message, index) => (
              <div key={index} className="flex items-start gap-4 p-4 rounded-lg bg-blue-500/5 hover:bg-blue-500/10 transition-colors">
                <div className="p-2 rounded-full bg-blue-400/10">
                  <MessageSquare className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Nouveau message de {message.name}</p>
                  <p className="text-sm text-muted-foreground">{message.date}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
} 