import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { Project, ContactMessage } from '@prisma/client';

export async function GET() {
  try {
    // Récupération des statistiques
    const [
      projectsCount,
      unreadMessagesCount,
      pendingTestimonialsCount,
      clientsCount,
      recentProjects,
      recentMessages
    ] = await Promise.all([
      prisma.project.count(),
      prisma.contactMessage.count({ where: { read: false } }),
      prisma.testimonial.count({ where: { approved: false } }),
      prisma.client.count(),
      prisma.project.findMany({
        take: 3,
        orderBy: { createdAt: 'desc' },
        select: {
          title: true,
          createdAt: true
        }
      }),
      prisma.contactMessage.findMany({
        take: 3,
        orderBy: { createdAt: 'desc' },
        select: {
          name: true,
          createdAt: true,
          read: true
        }
      })
    ]);

    // Formatage des dates
    const formatDate = (date: Date) => {
      const now = new Date();
      const diff = now.getTime() - date.getTime();
      const hours = Math.floor(diff / (1000 * 60 * 60));
      
      if (hours < 24) {
        return `Il y a ${hours} heure${hours > 1 ? 's' : ''}`;
      } else {
        return date.toLocaleDateString('fr-FR', {
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        });
      }
    };

    // Formatage des activités récentes
    const recentActivity = recentProjects.map((project: Pick<Project, 'title' | 'createdAt'>) => ({
      type: 'project',
      title: `Nouveau projet : ${project.title}`,
      date: formatDate(project.createdAt)
    }));

    // Formatage des messages récents
    const formattedMessages = recentMessages.map((message: Pick<ContactMessage, 'name' | 'createdAt' | 'read'>) => ({
      name: message.name,
      date: formatDate(message.createdAt),
      read: message.read
    }));

    return NextResponse.json({
      projects: projectsCount,
      unreadMessages: unreadMessagesCount,
      pendingTestimonials: pendingTestimonialsCount,
      clients: clientsCount,
      recentActivity,
      recentMessages: formattedMessages
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des statistiques:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des statistiques' },
      { status: 500 }
    );
  }
} 