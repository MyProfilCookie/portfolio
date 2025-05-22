"use client";

import ContactForm from "@/components/contact-form";
import { Mail, Phone, MapPin, Clock, Calendar, MessageSquare, Video, Coffee, ArrowRight, Check } from "lucide-react";
import { motion } from "framer-motion";
import AstronautIcon from "@/components/astronaut-icon";
import Link from "next/link";
import { Toaster } from "sonner";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-black text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.02] z-[-1]" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 relative pt-20 sm:pt-32">
        <motion.div 
          className="text-center mb-12 sm:mb-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="flex justify-center items-center mb-8 sm:mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative group">
              <div className="absolute -inset-6 sm:-inset-8 bg-cyan-500/20 rounded-full blur-2xl group-hover:bg-cyan-500/30 transition-colors duration-300" />
              <AstronautIcon className="w-24 h-24 sm:w-32 sm:h-32" page="contact" />
            </div>
          </motion.div>
          
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 text-transparent bg-clip-text">
            Contactez-moi
          </h1>
          
          <p className="text-lg sm:text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mb-6 sm:mb-8 px-2">
            Discutons de votre projet et voyons comment je peux vous aider à développer votre site web 
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            <div className="flex items-center gap-2 text-cyan-400">
              <Mail className="w-6 h-6 sm:w-8 sm:h-8" />
              <span className="text-base sm:text-lg font-medium">Email</span>
            </div>
            
            <div className="flex items-center gap-2 text-blue-400">
              <Phone className="w-6 h-6 sm:w-8 sm:h-8" />
              <span className="text-base sm:text-lg font-medium">Téléphone</span>
            </div>
            
            <div className="flex items-center gap-2 text-purple-400">
              <MapPin className="w-6 h-6 sm:w-8 sm:h-8" />
              <span className="text-base sm:text-lg font-medium">Localisation</span>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8 mb-12 sm:mb-20">
          <div className="space-y-3 sm:space-y-4">
            <div className="p-4 sm:p-6 rounded-lg bg-gray-900/50 backdrop-blur-sm border border-gray-800">
              <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Informations de contact</h2>
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-cyan-400" />
                  <span className="text-sm sm:text-base">contact@example.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-blue-400" />
                  <span className="text-sm sm:text-base">+33 6 12 34 56 78</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-purple-400" />
                  <span className="text-sm sm:text-base">Paris, France</span>
                </div>
              </div>
            </div>

            <div className="p-4 sm:p-6 rounded-lg bg-gray-900/50 backdrop-blur-sm border border-gray-800">
              <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Disponibilité</h2>
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-cyan-400" />
                  <div>
                    <span className="font-medium text-sm sm:text-base">Horaires de travail</span>
                    <p className="text-xs sm:text-sm text-gray-400">Lundi - Vendredi, 9h - 18h</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-blue-400" />
                  <div>
                    <span className="font-medium text-sm sm:text-base">Délai de réponse</span>
                    <p className="text-xs sm:text-sm text-gray-400">Sous 24h ouvrées</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 sm:p-6 rounded-lg bg-gray-900/50 backdrop-blur-sm border border-gray-800">
              <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Modes de contact</h2>
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center gap-3">
                  <MessageSquare className="w-5 h-5 text-cyan-400" />
                  <div>
                    <span className="font-medium text-sm sm:text-base">Chat en direct</span>
                    <p className="text-xs sm:text-sm text-gray-400">Pour une réponse rapide</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Video className="w-5 h-5 text-blue-400" />
                  <div>
                    <span className="font-medium text-sm sm:text-base">Visioconférence</span>
                    <p className="text-xs sm:text-sm text-gray-400">Pour les discussions détaillées</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Coffee className="w-5 h-5 text-purple-400" />
                  <div>
                    <span className="font-medium text-sm sm:text-base">Rencontre en personne</span>
                    <p className="text-xs sm:text-sm text-gray-400">Sur Paris et sa région</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 sm:p-6 rounded-lg bg-gray-900/50 backdrop-blur-sm border border-gray-800">
            <ContactForm />
          </div>
        </div>

        {/* Process Section */}
        <div className="mb-12 sm:mb-20">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-10">Comment ça marche ?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            <div className="p-4 sm:p-6 rounded-lg bg-gradient-to-b from-cyan-500/10 to-transparent border border-cyan-500/20">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-cyan-400/10 flex items-center justify-center mb-3 sm:mb-4">
                <span className="text-lg sm:text-xl font-bold text-cyan-400">1</span>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2">Premier contact</h3>
              <p className="text-sm sm:text-base text-gray-400 mb-3 sm:mb-4">Envoyez-moi un message avec les détails de votre projet</p>
              <div className="flex items-center text-cyan-400">
                <Check className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                <span className="text-xs sm:text-sm">Réponse sous 24h</span>
              </div>
            </div>

            <div className="p-4 sm:p-6 rounded-lg bg-gradient-to-b from-blue-500/10 to-transparent border border-blue-500/20">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-blue-400/10 flex items-center justify-center mb-3 sm:mb-4">
                <span className="text-lg sm:text-xl font-bold text-blue-400">2</span>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2">Discussion détaillée</h3>
              <p className="text-sm sm:text-base text-gray-400 mb-3 sm:mb-4">Nous planifions un appel pour approfondir vos besoins</p>
              <div className="flex items-center text-blue-400">
                <Check className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                <span className="text-xs sm:text-sm">Devis gratuit</span>
              </div>
            </div>

            <div className="p-4 sm:p-6 rounded-lg bg-gradient-to-b from-purple-500/10 to-transparent border border-purple-500/20">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-purple-400/10 flex items-center justify-center mb-3 sm:mb-4">
                <span className="text-lg sm:text-xl font-bold text-purple-400">3</span>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2">Démarrage</h3>
              <p className="text-sm sm:text-base text-gray-400 mb-3 sm:mb-4">Nous définissons ensemble le planning et les étapes</p>
              <div className="flex items-center text-purple-400">
                <Check className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                <span className="text-xs sm:text-sm">Suivi régulier</span>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-12 sm:mb-20">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-10">Questions fréquentes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 max-w-4xl mx-auto">
            <div className="p-4 sm:p-6 rounded-lg bg-gray-900/50 backdrop-blur-sm border border-gray-800">
              <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">Quel est le délai de réalisation ?</h3>
              <p className="text-sm text-gray-400">Le délai varie selon la complexité du projet. Je vous fournirai une estimation précise après notre première discussion.</p>
            </div>
            <div className="p-4 sm:p-6 rounded-lg bg-gray-900/50 backdrop-blur-sm border border-gray-800">
              <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">Comment se déroule la collaboration ?</h3>
              <p className="text-sm text-gray-400">Nous commençons par un appel de découverte, puis je vous propose un devis détaillé. Le développement se fait par étapes avec des points réguliers.</p>
            </div>
            <div className="p-4 sm:p-6 rounded-lg bg-gray-900/50 backdrop-blur-sm border border-gray-800">
              <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">Quelles sont les méthodes de paiement ?</h3>
              <p className="text-sm text-gray-400">J&apos;accepte les virements bancaires et les paiements par carte. Le paiement se fait en plusieurs fois selon l&apos;avancement du projet.</p>
            </div>
            <div className="p-4 sm:p-6 rounded-lg bg-gray-900/50 backdrop-blur-sm border border-gray-800">
              <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">Proposez-vous un support après-vente ?</h3>
              <p className="text-sm text-gray-400">Oui, je propose 6 mois de support technique gratuit après la livraison du projet, incluant les corrections de bugs et les petites modifications.</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-0">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">Prêt à démarrer ?</h2>
          <p className="text-sm sm:text-base text-gray-400 mb-6 sm:mb-8 px-2">Découvrez mes réalisations ou contactez-moi directement pour discuter de votre projet</p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
            <Link 
              href="/projects" 
              className="px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium text-sm sm:text-base hover:shadow-[0_0_20px_rgba(34,211,238,0.3)] transition-all duration-300"
            >
              Voir mes projets
            </Link>
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="px-5 sm:px-6 py-2.5 sm:py-3 rounded-full border border-cyan-500 text-cyan-400 font-medium text-sm sm:text-base hover:bg-cyan-500/10 transition-all duration-300 mt-3 sm:mt-0"
            >
              Me contacter
            </button>
          </div>
        </div>
      </div>
      <Toaster position="top-center" />
    </main>
  );
}