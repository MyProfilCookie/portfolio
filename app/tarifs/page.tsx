/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/no-unescaped-entities */
"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Star, Code, Rocket, Check, ArrowRight, AtSign, TrendingUp, Sparkles, Github, ExternalLink, ArrowLeft, CreditCard, Shield, Clock, Search, Image, Video, MessageSquare } from "lucide-react";
import "../styles/animations.css";
import Link from "next/link";
import { useState } from "react";
import { loadStripe } from '@stripe/stripe-js';
import { PricingCard } from '@/components/pricing-card';
import AstronautIcon from '@/components/astronaut-icon'

const FloatingParticle = ({ delay = 0, size = 4, duration = 20 }) => (
  <motion.div
    className="absolute rounded-full bg-white/20"
    style={{ width: size, height: size }}
    initial={{ opacity: 0, scale: 0 }}
    animate={{
      opacity: [0, 1, 0],
      scale: [0, 1, 0],
      y: [-20, 0, 20],
    }}
    transition={{
      duration,
      delay,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  />
);

const GlowingOrb = ({ size = 100, delay = 0, style = {} }) => (
  <motion.div
    className="absolute rounded-full bg-gradient-to-r from-cyan-400/20 to-blue-500/20 blur-xl"
    style={{ width: size, height: size, ...style }}
    initial={{ opacity: 0, scale: 0.5 }}
    animate={{
      opacity: [0.3, 0.6, 0.3],
      scale: [0.8, 1, 0.8],
    }}
    transition={{
      duration: 4,
      delay,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  />
);

const SparkleEffect = ({ delay = 0 }) => (
  <motion.div
    className="absolute"
    initial={{ opacity: 0, scale: 0 }}
    animate={{
      opacity: [0, 1, 0],
      scale: [0, 1, 0],
      rotate: [0, 180, 360],
    }}
    transition={{
      duration: 2,
      delay,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  >
    <Star className="w-4 h-4 text-yellow-400" />
  </motion.div>
);

interface PricingDetailProps {
  title: string;
  description: string;
  features: string[];
  price: string;
  stripePriceId: string;
  onClose: () => void;
}

const PricingDetail = ({ title, description, features, price, stripePriceId, onClose }: PricingDetailProps) => {
  const handlePayment = () => {
    window.location.href = `/paiement?plan=${stripePriceId}`;
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-background/30 border border-cyan-500/20 rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
      >
        <div className="flex justify-between items-start mb-6">
          <h3 className="text-2xl font-bold">{title}</h3>
          <button 
            onClick={onClose}
            className="text-cyan-400 hover:text-cyan-300"
          >
            ✕
          </button>
        </div>
        
        <p className="text-muted-foreground mb-6">{description}</p>
        
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div>
            <h4 className="text-lg font-semibold mb-3">Ce qui est inclus</h4>
            <ul className="space-y-2">
              {features.map((feature: string, index: number) => (
                <li key={index} className="flex items-start">
                  <Check className="w-5 h-5 text-cyan-400 mr-2 flex-shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-3">Processus de travail</h4>
            <ol className="space-y-2 list-decimal list-inside">
              <li>Consultation initiale et analyse des besoins</li>
              <li>Proposition de design et validation</li>
              <li>Développement et tests</li>
              <li>Déploiement et formation</li>
              <li>Support post-lancement</li>
            </ol>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-8">
          <div className="text-2xl font-bold">{price}€</div>
          <button
            onClick={handlePayment}
            className="bg-cyan-400 text-black py-2 px-6 rounded-full flex items-center gap-2 hover:bg-cyan-300"
          >
            <CreditCard className="w-4 h-4" />
            <span>Payer maintenant</span>
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default function TarifsPage() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const plans = [
    {
      id: 'starter',
      title: 'Pack Starter',
      price: '390',
      description: 'Un site vitrine simple, professionnel et rapide à mettre en ligne.',
      features: [
        "Jusqu'à 2 pages (Accueil, À propos, Contact)",
        "Responsive (mobile/tablette)",
        "Formulaire de contact",
        "Design personnalisé",
        "Déploiement sur Vercel"
      ],
      highlight: 'Idéal pour les indépendants et associations.',
      stripePriceId: 'price_starter'
    },
    {
      id: 'pro',
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
      ],
      highlight: 'Parfait pour les petites entreprises.',
      recommended: true,
      stripePriceId: 'price_pro'
    },
    {
      id: 'premium',
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
      ],
      highlight: 'Solution complète pour les entreprises en croissance.',
      stripePriceId: 'price_premium'
    }
  ];

  const selectedPlanData = selectedPlan ? plans.find(plan => plan.id === selectedPlan) : null;

  return (
    <main className="min-h-screen bg-black text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 relative pt-32">
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="flex justify-center items-center mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative group">
              <div className="absolute -inset-8 bg-cyan-500/20 rounded-full blur-2xl group-hover:bg-cyan-500/30 transition-colors duration-300" />
              <AstronautIcon className="w-32 h-32" page="pricing" />
            </div>
          </motion.div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 text-transparent bg-clip-text">
            Solutions Tarifaires
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mb-8">
            Des offres adaptées à tous les budgets et besoins
          </p>

          <div className="flex items-center justify-center gap-6">
            <div className="flex items-center gap-2 text-cyan-400">
              <CreditCard className="w-8 h-8" />
              <span className="text-lg font-medium">Paiement sécurisé</span>
            </div>
            
            <div className="flex items-center gap-2 text-blue-400">
              <Shield className="w-8 h-8" />
              <span className="text-lg font-medium">Garantie satisfait</span>
            </div>
            
            <div className="flex items-center gap-2 text-purple-400">
              <Clock className="w-8 h-8" />
              <span className="text-lg font-medium">Livraison rapide</span>
            </div>
          </div>
        </motion.div>

        <div className="mb-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            <div className="p-6 rounded-lg bg-gray-900/50 backdrop-blur-sm border border-gray-800">
              <h3 className="text-xl font-semibold mb-4 text-cyan-400">Processus de travail</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="mt-1 p-1 rounded-full bg-cyan-400/10">
                    <AtSign className="w-4 h-4 text-cyan-400" />
                  </div>
                  <div>
                    <span className="font-medium">Consultation initiale</span>
                    <p className="text-sm text-gray-400">Discussion approfondie de vos besoins et objectifs</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1 p-1 rounded-full bg-cyan-400/10">
                    <Code className="w-4 h-4 text-cyan-400" />
                  </div>
                  <div>
                    <span className="font-medium">Développement</span>
                    <p className="text-sm text-gray-400">Création de votre site avec des technologies modernes</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1 p-1 rounded-full bg-cyan-400/10">
                    <Rocket className="w-4 h-4 text-cyan-400" />
                  </div>
                  <div>
                    <span className="font-medium">Déploiement</span>
                    <p className="text-sm text-gray-400">Mise en ligne et optimisation des performances</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-lg bg-gray-900/50 backdrop-blur-sm border border-gray-800">
              <h3 className="text-xl font-semibold mb-4 text-blue-400">Technologies utilisées</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="mt-1 p-1 rounded-full bg-blue-400/10">
                    <Code className="w-4 h-4 text-blue-400" />
                  </div>
                  <div>
                    <span className="font-medium">Next.js & React</span>
                    <p className="text-sm text-gray-400">Pour une expérience utilisateur fluide et moderne</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1 p-1 rounded-full bg-blue-400/10">
                    <TrendingUp className="w-4 h-4 text-blue-400" />
                  </div>
                  <div>
                    <span className="font-medium">Tailwind CSS</span>
                    <p className="text-sm text-gray-400">Design responsive et personnalisé</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1 p-1 rounded-full bg-blue-400/10">
                    <Sparkles className="w-4 h-4 text-blue-400" />
                  </div>
                  <div>
                    <span className="font-medium">Animations</span>
                    <p className="text-sm text-gray-400">Interactions fluides et élégantes</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-lg bg-gray-900/50 backdrop-blur-sm border border-gray-800">
              <h3 className="text-xl font-semibold mb-4 text-purple-400">Garanties</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="mt-1 p-1 rounded-full bg-purple-400/10">
                    <Shield className="w-4 h-4 text-purple-400" />
                  </div>
                  <div>
                    <span className="font-medium">Support 6 mois</span>
                    <p className="text-sm text-gray-400">Assistance technique et maintenance incluses</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1 p-1 rounded-full bg-purple-400/10">
                    <Clock className="w-4 h-4 text-purple-400" />
                  </div>
                  <div>
                    <span className="font-medium">Délais respectés</span>
                    <p className="text-sm text-gray-400">Livraison dans les temps convenus</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1 p-1 rounded-full bg-purple-400/10">
                    <CreditCard className="w-4 h-4 text-purple-400" />
                  </div>
                  <div>
                    <span className="font-medium">Paiement sécurisé</span>
                    <p className="text-sm text-gray-400">Paiement en plusieurs fois possible</p>
                  </div>
                </li>
              </ul>
            </div>
      </div>
      
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1 }}
              >
        <PricingCard 
                  title={plan.title}
                  price={plan.price}
                  description={plan.description}
                  features={plan.features}
                  highlight={plan.highlight}
                  recommended={plan.recommended}
                  stripePriceId={plan.stripePriceId}
                  onSelect={() => setSelectedPlan(plan.id)}
                />
              </motion.div>
            ))}
          </div>

          <div className="mt-20 text-center">
            <h2 className="text-3xl font-bold mb-6">Questions fréquentes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="p-6 rounded-lg bg-gray-900/50 backdrop-blur-sm border border-gray-800">
                <h3 className="text-xl font-semibold mb-3">Combien de temps pour réaliser mon projet ?</h3>
                <p className="text-gray-400">Le délai moyen est de 2 à 4 semaines selon la complexité. Un planning détaillé vous sera fourni lors de la consultation initiale.</p>
              </div>
              <div className="p-6 rounded-lg bg-gray-900/50 backdrop-blur-sm border border-gray-800">
                <h3 className="text-xl font-semibold mb-3">Comment se déroule le paiement ?</h3>
                <p className="text-gray-400">Le paiement se fait en plusieurs fois : 30% à la commande, 40% au développement et 30% à la livraison.</p>
              </div>
              <div className="p-6 rounded-lg bg-gray-900/50 backdrop-blur-sm border border-gray-800">
                <h3 className="text-xl font-semibold mb-3">Puis-je modifier mon site après la livraison ?</h3>
                <p className="text-gray-400">Oui, je vous forme à la gestion du contenu et reste disponible pour les modifications techniques pendant 6 mois.</p>
              </div>
              <div className="p-6 rounded-lg bg-gray-900/50 backdrop-blur-sm border border-gray-800">
                <h3 className="text-xl font-semibold mb-3">Le référencement est-il inclus ?</h3>
                <p className="text-gray-400">Oui, tous les sites sont optimisés pour le SEO avec les meilleures pratiques actuelles.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Témoignages clients</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Découvrez ce que mes clients disent de mon travail</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-lg bg-gray-900/50 backdrop-blur-sm border border-gray-800 relative">
              <div className="absolute -top-3 -left-3 text-4xl text-cyan-400">"</div>
              <p className="text-gray-300 mb-4">Un travail exceptionnel ! Le site est exactement ce que je voulais, moderne et facile à utiliser. Le support est très réactif.</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center justify-center text-white font-bold">
                  ML
                </div>
                <div>
                  <div className="font-medium">Marie Laurent</div>
                  <div className="text-sm text-gray-400">Photographe</div>
                </div>
              </div>
            </div>
            
            <div className="p-6 rounded-lg bg-gray-900/50 backdrop-blur-sm border border-gray-800 relative">
              <div className="absolute -top-3 -left-3 text-4xl text-blue-400">"</div>
              <p className="text-gray-300 mb-4">Très professionnel et à l'écoute. Le résultat dépasse mes attentes. Je recommande vivement !</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold">
                  TD
                </div>
                <div>
                  <div className="font-medium">Thomas Dubois</div>
                  <div className="text-sm text-gray-400">Restaurant Le Gourmet</div>
                </div>
              </div>
            </div>
            
            <div className="p-6 rounded-lg bg-gray-900/50 backdrop-blur-sm border border-gray-800 relative">
              <div className="absolute -top-3 -left-3 text-4xl text-purple-400">"</div>
              <p className="text-gray-300 mb-4">Un vrai professionnel qui sait s'adapter aux besoins. Le site est rapide et le design est superbe.</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-400 to-pink-500 flex items-center justify-center text-white font-bold">
                  SB
                </div>
                <div>
                  <div className="font-medium">Sophie Bernard</div>
                  <div className="text-sm text-gray-400">Agence immobilière</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Services complémentaires</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Des options supplémentaires pour enrichir votre projet</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="p-6 rounded-lg bg-gradient-to-b from-cyan-500/10 to-transparent border border-cyan-500/20 hover:border-cyan-500/40 transition-colors">
              <div className="w-12 h-12 rounded-full bg-cyan-400/10 flex items-center justify-center mb-4">
                <Search className="w-6 h-6 text-cyan-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2">SEO Avancé</h3>
              <p className="text-sm text-gray-400">Optimisation poussée pour les moteurs de recherche</p>
              <div className="mt-4 text-cyan-400 font-semibold">+290€</div>
            </div>

            <div className="p-6 rounded-lg bg-gradient-to-b from-blue-500/10 to-transparent border border-blue-500/20 hover:border-blue-500/40 transition-colors">
              <div className="w-12 h-12 rounded-full bg-blue-400/10 flex items-center justify-center mb-4">
                <Image className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Shooting photo</h3>
              <p className="text-sm text-gray-400">Session photo professionnelle pour votre site</p>
              <div className="mt-4 text-blue-400 font-semibold">+390€</div>
            </div>

            <div className="p-6 rounded-lg bg-gradient-to-b from-purple-500/10 to-transparent border border-purple-500/20 hover:border-purple-500/40 transition-colors">
              <div className="w-12 h-12 rounded-full bg-purple-400/10 flex items-center justify-center mb-4">
                <Video className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Vidéo promotionnelle</h3>
              <p className="text-sm text-gray-400">Création d'une vidéo de présentation</p>
              <div className="mt-4 text-purple-400 font-semibold">+490€</div>
            </div>

            <div className="p-6 rounded-lg bg-gradient-to-b from-pink-500/10 to-transparent border border-pink-500/20 hover:border-pink-500/40 transition-colors">
              <div className="w-12 h-12 rounded-full bg-pink-400/10 flex items-center justify-center mb-4">
                <MessageSquare className="w-6 h-6 text-pink-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Chat en direct</h3>
              <p className="text-sm text-gray-400">Intégration d'un système de chat client</p>
              <div className="mt-4 text-pink-400 font-semibold">+190€</div>
            </div>
          </div>
        </div>

        {selectedPlanData && (
          <PricingDetail
            title={selectedPlanData.title}
            description={selectedPlanData.description}
            features={selectedPlanData.features}
            price={selectedPlanData.price}
            stripePriceId={selectedPlanData.stripePriceId}
            onClose={() => setSelectedPlan(null)}
          />
        )}
      </div>
    </main>
  );
}