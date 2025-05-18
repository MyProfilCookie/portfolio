'use client';

import { motion } from 'framer-motion';
import { X } from 'lucide-react';

interface PricingDetailProps {
  title: string;
  price: string;
  description: string;
  features: string[];
  onClose: () => void;
}

export function PricingDetail({
  title,
  price,
  description,
  features,
  onClose
}: PricingDetailProps) {
  return (
    <motion.div
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-gray-900 rounded-2xl p-8 max-w-2xl w-full relative"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <motion.h2
          className="text-3xl font-bold text-cyan-400 mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          {title}
        </motion.h2>

        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <span className="text-5xl font-bold text-white">{price}€</span>
          <span className="text-gray-400 ml-2">/ projet</span>
        </motion.div>

        <motion.p
          className="text-gray-300 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {description}
        </motion.p>

        <motion.div
          className="space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="text-xl font-semibold text-white mb-4">Ce qui est inclus :</h3>
          <ul className="space-y-3">
            {features.map((feature, index) => (
              <motion.li
                key={index}
                className="flex items-center gap-3 text-gray-300"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                <div className="w-2 h-2 rounded-full bg-cyan-500" />
                {feature}
              </motion.li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          className="mt-8 flex gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <button
            onClick={onClose}
            className="flex-1 py-3 px-6 rounded-lg bg-gray-800 text-gray-300 hover:bg-gray-700 transition-colors"
          >
            Retour
          </button>
          <button
            className="flex-1 py-3 px-6 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:opacity-90 transition-opacity"
          >
            Choisir ce plan
          </button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
} 