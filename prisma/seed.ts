import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Création des technologies
  const technologies = await Promise.all([
    prisma.technology.create({
      data: {
        name: 'React',
        icon: 'react',
      },
    }),
    prisma.technology.create({
      data: {
        name: 'Next.js',
        icon: 'nextjs',
      },
    }),
    prisma.technology.create({
      data: {
        name: 'TypeScript',
        icon: 'typescript',
      },
    }),
    prisma.technology.create({
      data: {
        name: 'Tailwind CSS',
        icon: 'tailwind',
      },
    }),
    prisma.technology.create({
      data: {
        name: 'Prisma',
        icon: 'prisma',
      },
    }),
    prisma.technology.create({
      data: {
        name: 'Node.js',
        icon: 'nodejs',
      },
    }),
    prisma.technology.create({
      data: {
        name: 'MongoDB',
        icon: 'mongodb',
      },
    }),
    prisma.technology.create({
      data: {
        name: 'PostgreSQL',
        icon: 'postgresql',
      },
    }),
    prisma.technology.create({
      data: {
        name: 'Firebase',
        icon: 'firebase',
      },
    }),
  ])

  // Création des projets
  const projects = [
    {
      title: 'Autistudy',
      description: 'Une application web pour aider les personnes autistes à apprendre et à se développer. Plateforme éducative adaptée avec des exercices personnalisés et un suivi des progrès.',
      imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3',
      githubUrl: 'https://github.com/MyProfilCookie/autistudy',
      liveUrl: 'https://autistudy.vercel.app',
      featured: true,
      order: 1,
      techs: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Prisma', 'PostgreSQL'],
    },
    {
      title: 'E-commerce Platform',
      description: 'Une plateforme e-commerce complète avec gestion des produits, panier et paiement. Interface moderne et responsive.',
      imageUrl: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da',
      githubUrl: 'https://github.com/MyProfilCookie/ecommerce',
      liveUrl: 'https://ecommerce.example.com',
      featured: true,
      order: 2,
      techs: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Stripe', 'PostgreSQL'],
    },
    {
      title: 'Blog Personnel',
      description: 'Un blog personnel avec système de gestion de contenu et commentaires. Design élégant et performances optimisées.',
      imageUrl: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643',
      githubUrl: 'https://github.com/MyProfilCookie/Blog-perso',
      liveUrl: 'https://blog.example.com',
      featured: true,
      order: 3,
      techs: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL'],
    },
    {
      title: 'Portfolio Artistique',
      description: 'Un portfolio en ligne pour artistes avec galerie d\'images et formulaire de contact.',
      imageUrl: 'https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d',
      githubUrl: 'https://github.com/MyProfilCookie/portfolio-art',
      liveUrl: 'https://portfolio-art.example.com',
      featured: false,
      order: 4,
      techs: ['React', 'Firebase', 'Tailwind CSS'],
    },
    {
      title: 'Task Manager',
      description: 'Application de gestion de tâches avec fonctionnalités collaboratives et temps réel.',
      imageUrl: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b',
      githubUrl: 'https://github.com/MyProfilCookie/task-manager',
      liveUrl: 'https://task-manager.example.com',
      featured: false,
      order: 5,
      techs: ['React', 'Node.js', 'MongoDB'],
    },
    {
      title: 'Chat Application',
      description: 'Application de chat en temps réel avec support des messages privés et des groupes.',
      imageUrl: 'https://images.unsplash.com/photo-1611606063065-ee7946f0787a',
      githubUrl: 'https://github.com/MyProfilCookie/chat-app',
      liveUrl: 'https://chat.example.com',
      featured: false,
      order: 6,
      techs: ['React', 'Node.js', 'Socket.io'],
    },
    {
      title: 'Weather Dashboard',
      description: 'Dashboard météo avec prévisions détaillées et visualisations de données.',
      imageUrl: 'https://images.unsplash.com/photo-1592210454359-9043f067919b',
      githubUrl: 'https://github.com/MyProfilCookie/weather-dashboard',
      liveUrl: 'https://weather.example.com',
      featured: false,
      order: 7,
      techs: ['React', 'TypeScript', 'Node.js'],
    },
    {
      title: 'Recipe Book',
      description: 'Application de recettes de cuisine avec fonctionnalités de recherche et de partage.',
      imageUrl: 'https://images.unsplash.com/photo-1466637574441-749b8f19452f',
      githubUrl: 'https://github.com/MyProfilCookie/recipe-book',
      liveUrl: 'https://recipes.example.com',
      featured: false,
      order: 8,
      techs: ['Next.js', 'MongoDB', 'Tailwind CSS'],
    },
    {
      title: 'Fitness Tracker',
      description: 'Application de suivi d\'activité physique avec visualisation des progrès.',
      imageUrl: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438',
      githubUrl: 'https://github.com/MyProfilCookie/fitness-tracker',
      liveUrl: 'https://fitness.example.com',
      featured: false,
      order: 9,
      techs: ['React', 'Firebase', 'TypeScript'],
    },
    {
      title: 'Budget Manager',
      description: 'Application de gestion de budget personnel avec graphiques et analyses.',
      imageUrl: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f',
      githubUrl: 'https://github.com/MyProfilCookie/budget-manager',
      liveUrl: 'https://budget.example.com',
      featured: false,
      order: 10,
      techs: ['Next.js', 'PostgreSQL', 'Prisma'],
    },
    {
      title: 'Movie Database',
      description: 'Base de données de films avec système de recommandations.',
      imageUrl: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba',
      githubUrl: 'https://github.com/MyProfilCookie/movie-db',
      liveUrl: 'https://movies.example.com',
      featured: false,
      order: 11,
      techs: ['React', 'Node.js', 'MongoDB'],
    },
    {
      title: 'Learning Platform',
      description: 'Plateforme d\'apprentissage en ligne avec cours vidéo et quiz.',
      imageUrl: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8',
      githubUrl: 'https://github.com/MyProfilCookie/learning-platform',
      liveUrl: 'https://learn.example.com',
      featured: false,
      order: 12,
      techs: ['Next.js', 'PostgreSQL', 'TypeScript'],
    },
  ]

  // Création des projets
  for (const project of projects) {
    await prisma.project.create({
      data: {
        title: project.title,
        description: project.description,
        imageUrl: project.imageUrl,
        githubUrl: project.githubUrl,
        liveUrl: project.liveUrl,
        featured: project.featured,
        order: project.order,
        technologies: {
          connect: technologies
            .filter(tech => project.techs.includes(tech.name))
            .map(tech => ({ id: tech.id })),
        },
      },
    })
  }

  // Création des témoignages
  await prisma.testimonial.create({
    data: {
      name: 'Jean Dupont',
      role: 'CEO',
      company: 'TechCorp',
      message: 'Un développeur exceptionnel qui a su transformer notre vision en réalité. Je recommande vivement ses services !',
      rating: 5,
      approved: true,
      featured: true,
      order: 1,
    },
  })

  await prisma.testimonial.create({
    data: {
      name: 'Marie Martin',
      role: 'Directrice Marketing',
      company: 'DigitalAgency',
      message: 'Une collaboration très professionnelle et des résultats qui dépassent nos attentes.',
      rating: 5,
      approved: true,
      featured: false,
      order: 2,
    },
  })

  // Création des messages de contact
  await prisma.contactMessage.create({
    data: {
      name: 'Pierre Durand',
      email: 'pierre@example.com',
      subject: 'Demande de devis',
      message: 'Bonjour, je souhaiterais avoir plus d\'informations sur vos services.',
      read: false,
    },
  })

  console.log('✅ Base de données initialisée avec succès')
}

main()
  .catch((e) => {
    console.error('❌ Erreur lors de l\'initialisation de la base de données:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 