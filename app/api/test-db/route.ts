import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // Vérification des deux tables
    const [contacts, contactMessages] = await Promise.all([
      prisma.contact.findMany({
        orderBy: {
          createdAt: 'desc'
        }
      }),
      prisma.contactMessage.findMany({
        orderBy: {
          createdAt: 'desc'
        }
      })
    ]);
    
    return new NextResponse(
      JSON.stringify({ 
        status: 'success',
        message: 'Connexion à la base de données réussie',
        contacts,
        contactMessages
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    console.error('Erreur de connexion à la base de données:', error);
    return new NextResponse(
      JSON.stringify({ 
        status: 'error',
        message: 'Erreur de connexion à la base de données',
        error: error instanceof Error ? error.message : 'Erreur inconnue'
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
} 