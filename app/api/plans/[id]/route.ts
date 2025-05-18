import { NextResponse } from 'next/server';

const plans = {
  'price_starter': {
    title: 'Pack Starter',
    price: '390',
    description: 'Un site vitrine simple, professionnel et rapide à mettre en ligne.',
    features: [
      "Jusqu'à 2 pages (Accueil, À propos, Contact)",
      "Responsive (mobile/tablette)",
      "Formulaire de contact",
      "Design personnalisé",
      "Déploiement sur Vercel"
    ]
  },
  'price_pro': {
    title: 'Pack Pro',
    price: '790',
    description: 'Un site web complet avec des fonctionnalités avancées.',
    features: [
      "Jusqu'à 5 pages",
      "Responsive (mobile/tablette)",
      "Formulaire de contact avancé",
      "Design personnalisé",
      "Intégration de médias",
      "Optimisation SEO",
      "Déploiement sur Vercel"
    ]
  },
  'price_premium': {
    title: 'Pack Premium',
    price: '1490',
    description: 'Un site web sur mesure avec des fonctionnalités premium.',
    features: [
      "Pages illimitées",
      "Responsive (mobile/tablette)",
      "Formulaire de contact avancé",
      "Design personnalisé",
      "Intégration de médias",
      "Optimisation SEO",
      "Blog intégré",
      "Espace membre",
      "Déploiement sur Vercel"
    ]
  }
};

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const plan = plans[params.id as keyof typeof plans];

  if (!plan) {
    return NextResponse.json(
      { error: 'Plan non trouvé' },
      { status: 404 }
    );
  }

  return NextResponse.json(plan);
} 