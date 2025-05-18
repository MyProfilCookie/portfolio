import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import AstronautIcon from '@/components/astronaut-icon';

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-cyan-950/20 to-black flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full mx-auto p-8 rounded-xl border border-cyan-500/20 bg-black/40 backdrop-blur-lg text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="mb-6"
        >
          <CheckCircle className="w-16 h-16 text-cyan-400 mx-auto" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-3xl font-bold text-cyan-400 mb-4"
        >
          Paiement réussi !
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-cyan-400/80 mb-8"
        >
          Merci pour votre commande. Nous vous contacterons dans les plus brefs délais pour discuter des détails de votre projet.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
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
            <AstronautIcon page="home" />
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Link
            href="/projects"
            className="inline-flex items-center px-6 py-3 rounded-lg bg-cyan-500 text-black font-medium hover:bg-cyan-400 transition-colors"
          >
            Retour aux projets
            <ArrowRight className="ml-2" size={20} />
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
} 