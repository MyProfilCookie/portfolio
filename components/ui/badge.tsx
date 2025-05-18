import { motion } from 'framer-motion';

interface BadgeProps {
  text: string;
  variant?: 'default' | 'success' | 'warning' | 'error';
}

const variants = {
  default: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
  success: 'bg-green-500/10 text-green-400 border-green-500/20',
  warning: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  error: 'bg-red-500/10 text-red-400 border-red-500/20',
};

export function Badge({ text, variant = 'default' }: BadgeProps) {
  return (
    <motion.span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${variants[variant]}`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05 }}
    >
      {text}
    </motion.span>
  );
}
