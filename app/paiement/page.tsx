"use client";

import { motion } from 'framer-motion';
import { CreditCard, Shield, Clock, ArrowLeft, Mail } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import AstronautIcon from '@/components/astronaut-icon';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function PaiementPage() {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [plan, setPlan] = useState<{
    title: string;
    price: string;
    description: string;
    features: string[];
  } | null>(null);

  useEffect(() => {
    const planId = searchParams.get('plan');
    if (!planId) {
      setError('Aucun plan sélectionné');
      setLoading(false);
      return;
    }

    // Récupérer les détails du plan depuis l'API
    fetch(`/api/plans/${planId}`)
      .then(res => res.json())
      .then(data => {
        setPlan(data);
        setLoading(false);
      })
      .catch(err => {
        setError('Erreur lors du chargement du plan');
        setLoading(false);
      });
  }, [searchParams]);

  const handlePayment = async () => {
    try {
      const planId = searchParams.get('plan');
      if (!planId) return;

      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId: planId,
          planName: plan?.title,
        }),
      });

      const { sessionId } = await response.json();
      const stripe = await stripePromise;
      await stripe?.redirectToCheckout({ sessionId });
    } catch (error) {
      setError('Erreur lors du paiement');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-500 mb-4">Erreur</h2>
          <p className="text-gray-400 mb-6">{error}</p>
          <Link 
            href="/tarifs"
            className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour aux tarifs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white relative overflow-hidden pb-36">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 relative pt-32">
        <motion.div 
          className="text-center mb-24"
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
              <AstronautIcon className="w-48 h-48" page="paiement" />
            </div>
          </motion.div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 text-transparent bg-clip-text">
            Finaliser votre paiement 🚀
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mb-8">
            Vous êtes sur le point de souscrire au plan {plan?.title}
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="p-8 rounded-lg bg-gray-900/50 backdrop-blur-sm border border-gray-800 shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-center border-b border-gray-800 pb-4">
              Récapitulatif de votre commande
            </h2>

            <div className="space-y-4 mb-8">
              <div className="flex justify-between items-center py-2">
                <div>
                  <h3 className="font-medium">Plan {plan?.title}</h3>
                  <p className="text-sm text-gray-400">Pack complet</p>
                </div>
                <span className="font-medium">{plan?.price}€</span>
              </div>

              <div className="border-t border-gray-800 pt-4">
                <h4 className="font-medium mb-2">Prestations incluses :</h4>
                <ul className="space-y-2 text-gray-400">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    Développement sur mesure
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    Design UX/UI personnalisé
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    Intégration responsive
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    Tests et optimisation
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    Support technique (6 mois)
                  </li>
                </ul>
              </div>

              <div className="border-t border-gray-800 pt-4">
                <h4 className="font-medium mb-2">Services additionnels :</h4>
                <ul className="space-y-2 text-gray-400">
                  <li className="flex justify-between items-center">
                    <span>Hébergement (1 an)</span>
                    <span>Inclus</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span>Nom de domaine (1 an)</span>
                    <span>Inclus</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span>SSL/HTTPS</span>
                    <span>Inclus</span>
                  </li>
                </ul>
              </div>

              <div className="border-t border-gray-800 pt-4 mt-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-400">Sous-total HT</span>
                  <span>{plan?.price}€</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-400">TVA (20%)</span>
                  <span>{(Number(plan?.price) * 0.2).toFixed(2)}€</span>
                </div>
                <div className="flex justify-between items-center text-lg font-bold mt-4 pt-4 border-t border-gray-800">
                  <span>Total TTC</span>
                  <span className="text-cyan-400">{(Number(plan?.price) * 1.2).toFixed(2)}€</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 p-4 rounded-lg mt-8">
              <h4 className="font-medium mb-2 text-cyan-400">Garanties incluses :</h4>
              <ul className="grid grid-cols-2 gap-4 text-sm">
                <li className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-cyan-400" />
                  <span>Satisfaction garantie</span>
                </li>
                <li className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-cyan-400" />
                  <span>Support 6 mois</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="p-6 rounded-lg bg-gray-900/50 backdrop-blur-sm border border-gray-800">
            <h3 className="text-xl font-bold mb-4">Processus de travail</h3>
            <ol className="space-y-3">
              <li className="flex items-start gap-2">
                <div className="w-6 h-6 rounded-full bg-cyan-400/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-cyan-400">1</span>
                </div>
                <span>Consultation initiale et analyse des besoins</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-6 h-6 rounded-full bg-cyan-400/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-cyan-400">2</span>
                </div>
                <span>Proposition de design et validation</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-6 h-6 rounded-full bg-cyan-400/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-cyan-400">3</span>
                </div>
                <span>Développement et tests</span>
              </li>
            </ol>
          </div>

          <div className="p-6 rounded-lg bg-gray-900/50 backdrop-blur-sm border border-gray-800">
            <h3 className="text-xl font-bold mb-4">Questions fréquentes</h3>
            <div className="space-y-3">
              <div>
                <p className="font-medium">Quand commencera le projet ?</p>
                <p className="text-sm text-gray-400">Dès réception du paiement, nous planifierons la première consultation.</p>
              </div>
              <div>
                <p className="font-medium">Puis-je modifier mon choix ?</p>
                <p className="text-sm text-gray-400">Oui, vous pouvez changer de plan avant le début du développement.</p>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-lg bg-gray-900/50 backdrop-blur-sm border border-gray-800">
            <h3 className="text-xl font-bold mb-4">Témoignages</h3>
            <div className="space-y-3">
              <div className="relative">
                <div className="absolute -top-3 -left-3 text-4xl text-cyan-400">&ldquo;</div>
                <p className="text-sm text-gray-400 italic">&ldquo;Un processus de paiement simple et sécurisé. Très professionnel !&rdquo;</p>
                <p className="text-sm font-medium mt-2">- Marie L.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white/5 p-6 rounded-lg border border-white/10">
            <Shield className="w-12 h-12 text-cyan-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Sécurité et Confidentialité</h3>
            <p className="text-gray-400">
              Protection maximale de vos données. Paiements sécurisés via Stripe. Conformité RGPD garantie.
            </p>
          </div>
          
          <div className="bg-white/5 p-6 rounded-lg border border-white/10">
            <Mail className="w-12 h-12 text-cyan-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Service Client</h3>
            <p className="text-gray-400">
              Support prioritaire avec réponse garantie en moins de 24h. Suivi personnalisé de votre projet.
            </p>
          </div>
          
          <div className="bg-white/5 p-6 rounded-lg border border-white/10">
            <Clock className="w-12 h-12 text-cyan-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Notre Engagement</h3>
            <p className="text-gray-400">
              Respect des délais. Garantie satisfaction. Transaction sécurisée.
            </p>
          </div>
        </div>

        <div className="mt-16 text-center">
          <button
            onClick={handlePayment}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium hover:shadow-[0_0_20px_rgba(34,211,238,0.3)] transition-all duration-300 transform hover:scale-105"
          >
            <CreditCard className="w-5 h-5" />
            <span>Payer maintenant</span>
          </button>
          <Link 
            href="/tarifs"
            className="block mt-6 text-cyan-400 hover:text-cyan-300 transition-colors duration-300"
          >
            <ArrowLeft className="w-4 h-4 inline mr-2" />
            Retour aux tarifs
          </Link>
        </div>
      </div>
    </main>
  );
} 