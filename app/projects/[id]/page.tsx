import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Github, ExternalLink, Code, Rocket, Star } from 'lucide-react';
import AstronautIcon from '@/components/astronaut-icon';
import { Badge } from '@/components/ui/badge';

// Données des projets
const projects = [
  {
    id: 'portfolio',
    title: 'Portfolio Personnel',
    description: 'Un portfolio moderne et interactif développé avec Next.js et Framer Motion.',
    longDescription: 'Ce portfolio présente mes projets et compétences avec des animations fluides et un design moderne. Il utilise les dernières technologies web pour offrir une expérience utilisateur exceptionnelle.',
    imageUrl: '/images/portfolio.jpg',
    githubUrl: 'https://github.com/votre-username/portfolio',
    liveUrl: 'https://votre-portfolio.com',
    technologies: ['Next.js', 'React', 'TypeScript', 'Framer Motion', 'Tailwind CSS'],
    features: [
      'Design responsive et moderne',
      'Animations fluides avec Framer Motion',
      'Optimisation des performances',
      'Mode sombre/clair',
      'Formulaire de contact interactif'
    ],
    price: 1500
  },
  {
    id: 'ecommerce',
    title: 'Plateforme E-commerce',
    description: 'Une plateforme e-commerce complète avec panier et paiement intégré.',
    longDescription: 'Cette plateforme e-commerce offre une expérience d\'achat fluide avec gestion des produits, panier d\'achat et intégration des paiements. Elle inclut également un tableau de bord administrateur pour la gestion des commandes.',
    imageUrl: '/images/ecommerce.jpg',
    githubUrl: 'https://github.com/votre-username/ecommerce',
    liveUrl: 'https://votre-ecommerce.com',
    technologies: ['Next.js', 'React', 'Node.js', 'MongoDB', 'Stripe'],
    features: [
      'Catalogue de produits dynamique',
      'Système de panier d\'achat',
      'Intégration des paiements Stripe',
      'Tableau de bord administrateur',
      'Gestion des commandes en temps réel'
    ],
    price: 2500
  },
  {
    id: 'social-network',
    title: 'Réseau Social',
    description: 'Un réseau social moderne avec messagerie en temps réel.',
    longDescription: 'Ce réseau social permet aux utilisateurs de partager des moments, suivre leurs amis et communiquer en temps réel. Il inclut des fonctionnalités avancées comme les stories et les notifications push.',
    imageUrl: '/images/social.jpg',
    githubUrl: 'https://github.com/votre-username/social-network',
    liveUrl: 'https://votre-reseau-social.com',
    technologies: ['React', 'Firebase', 'Redux', 'Socket.io', 'WebRTC'],
    features: [
      'Feed d\'actualités personnalisé',
      'Messagerie en temps réel',
      'Stories éphémères',
      'Notifications push',
      'Partage de médias'
    ],
    price: 3000
  }
];

export default function ProjectPage({ params }: { params: { id: string } }) {
  const project = projects.find(p => p.id === params.id);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-cyan-400">Projet non trouvé</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-cyan-950/20 to-black">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Link 
            href="/projects"
            className="inline-flex items-center text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            <ArrowLeft className="mr-2" size={20} />
            Retour aux projets
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex justify-center mb-8"
        >
          <motion.div 
            className="relative"
            whileHover={{ scale: 1.05 }}
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <motion.div
              className="absolute -inset-4 bg-cyan-500/20 rounded-full blur-xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <AstronautIcon page="projects" />
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="relative aspect-video rounded-xl overflow-hidden">
              <Image
                src={project.imageUrl}
                alt={project.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h1 className="text-4xl font-bold text-cyan-400 mb-4">{project.title}</h1>
            <p className="text-cyan-400/80 mb-6">{project.longDescription}</p>

            <div className="flex flex-wrap gap-2 mb-8">
              {project.technologies.map((tech, index) => (
                <Badge key={index} text={tech} />
              ))}
            </div>

            <div className="space-y-4 mb-8">
              <h2 className="text-xl font-semibold text-cyan-400">Fonctionnalités</h2>
              <ul className="space-y-2">
                {project.features.map((feature, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                    className="flex items-center text-cyan-400/80"
                  >
                    <Star className="mr-2 text-cyan-400" size={16} />
                    {feature}
                  </motion.li>
                ))}
              </ul>
            </div>

            <div className="flex gap-4">
              <Link
                href={project.githubUrl}
                target="_blank"
                className="inline-flex items-center px-4 py-2 rounded-lg bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20 transition-colors"
              >
                <Github className="mr-2" size={20} />
                Code source
              </Link>
              <Link
                href={project.liveUrl}
                target="_blank"
                className="inline-flex items-center px-4 py-2 rounded-lg bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20 transition-colors"
              >
                <ExternalLink className="mr-2" size={20} />
                Voir le projet
              </Link>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-16 p-8 rounded-xl border border-cyan-500/20 bg-black/40 backdrop-blur-lg"
        >
          <h2 className="text-2xl font-bold text-cyan-400 mb-4">Tarif</h2>
          <p className="text-cyan-400/80 mb-6">
            Le développement de ce projet est estimé à {project.price}€. Ce tarif inclut :
          </p>
          <ul className="space-y-2 mb-8">
            <li className="flex items-center text-cyan-400/80">
              <Code className="mr-2 text-cyan-400" size={20} />
              Développement complet
            </li>
            <li className="flex items-center text-cyan-400/80">
              <Rocket className="mr-2 text-cyan-400" size={20} />
              Déploiement et configuration
            </li>
            <li className="flex items-center text-cyan-400/80">
              <Star className="mr-2 text-cyan-400" size={20} />
              Support et maintenance
            </li>
          </ul>
          <Link
            href={`/tarifs?project=${project.id}`}
            className="inline-flex items-center px-6 py-3 rounded-lg bg-cyan-500 text-black font-medium hover:bg-cyan-400 transition-colors"
          >
            Commander ce projet
          </Link>
        </motion.div>
      </div>
    </div>
  );
} 