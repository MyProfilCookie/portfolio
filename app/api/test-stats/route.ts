import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // Test de connexion à la base de données
    await prisma.$connect();
    console.log('✅ Connexion à la base de données réussie');

    // Récupération des compteurs
    const projectsCount = await prisma.project.count();
    console.log('📊 Nombre de projets:', projectsCount);

    const unreadMessagesCount = await prisma.contactMessage.count({
      where: { read: false }
    });
    console.log('📬 Messages non lus:', unreadMessagesCount);

    const pendingTestimonialsCount = await prisma.testimonial.count({
      where: { approved: false }
    });
    console.log('⭐ Témoignages en attente:', pendingTestimonialsCount);

    const testimonialsCount = await prisma.testimonial.count();
    console.log('⭐ Témoignages:', testimonialsCount);

    const clientsCount = await prisma.client.count();
    console.log('👥 Nombre de clients:', clientsCount);

    return NextResponse.json({
      success: true,
      counts: {
        projects: projectsCount,
        unreadMessages: unreadMessagesCount,
        pendingTestimonials: pendingTestimonialsCount,
        testimonials: testimonialsCount,
        clients: clientsCount
      }
    });
  } catch (error) {
    console.error('❌ Erreur:', error);
    return NextResponse.json({ error: 'Erreur lors du test' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
} 