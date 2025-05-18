'use client';

import { motion } from 'framer-motion';
import { Check, Sparkles } from 'lucide-react';
import { useState } from 'react';

interface PricingCardProps {
  title: string;
  price: string;
  description: string;
  features: string[];
  highlight: string;
  recommended?: boolean;
  stripePriceId: string;
  onSelect: () => void;
}

export function PricingCard({
  title,
  price,
  description,
  features,
  highlight,
  recommended = false,
  stripePriceId,
  onSelect
}: PricingCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className={`relative group p-8 rounded-2xl border ${
        recommended
          ? 'border-cyan-500 bg-gradient-to-br from-cyan-900/50 to-cyan-900/20'
          : 'border-gray-800 bg-gray-900/50'
      }`}
      whileHover={{ scale: 1.02 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {recommended && (
        <motion.div
          className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center gap-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Sparkles className="w-4 h-4" />
          <span>Recommandé</span>
        </motion.div>
      )}

      <motion.div
        className={`absolute inset-0 rounded-2xl ${
          recommended ? 'bg-cyan-500/10' : 'bg-gray-500/5'
        }`}
        animate={{
          opacity: isHovered ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
      />

      <div className="relative z-10">
        <motion.h3
          className={`text-2xl font-bold mb-2 ${
            recommended ? 'text-cyan-400' : 'text-white'
          }`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          {title}
        </motion.h3>

        <motion.div
          className="mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <span className="text-4xl font-bold text-white">{price}€</span>
          <span className="text-gray-400"> / projet</span>
        </motion.div>

        <motion.p
          className="text-gray-400 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {description}
        </motion.p>

        <motion.ul
          className="space-y-3 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {features.map((feature, index) => (
            <motion.li
              key={index}
              className="flex items-center gap-3 text-gray-300"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
            >
              <Check className="w-5 h-5 text-cyan-500" />
              {feature}
            </motion.li>
          ))}
        </motion.ul>

        <motion.div
          className="text-sm text-gray-400 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          {highlight}
        </motion.div>

        <motion.button
          className={`w-full py-3 px-6 rounded-lg font-medium transition-colors ${
            recommended
              ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white'
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onSelect}
        >
          Choisir ce plan
        </motion.button>
      </div>
    </motion.div>
  );
}