import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // Vérification que les variables d'environnement sont définies
    if (!process.env.ADMIN_EMAIL || !process.env.ADMIN_PASSWORD) {
      console.error('Les variables d\'environnement ne sont pas configurées');
      return NextResponse.json(
        { message: 'Erreur de configuration serveur' },
        { status: 500 }
      );
    }

    // Vérification des identifiants (pseudo ou email)
    const isValidEmail = email === process.env.ADMIN_EMAIL || email === 'MyProfilCookie';
    const isValidPassword = password === process.env.ADMIN_PASSWORD;

    if (isValidEmail && isValidPassword) {
      // Créer une réponse avec redirection
      const response = NextResponse.json(
        { success: true },
        { status: 200 }
      );
      
      // Définir le cookie
      response.cookies.set('isAdmin', 'true', {
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 7 jours
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax'
      });

      return response;
    }

    // Ne pas révéler quelle partie des identifiants est incorrecte
    return NextResponse.json(
      { message: 'Identifiants incorrects' },
      { status: 401 }
    );
  } catch (error) {
    console.error('Erreur lors de l\'authentification:', error);
    return NextResponse.json(
      { message: 'Une erreur est survenue' },
      { status: 500 }
    );
  }
} 