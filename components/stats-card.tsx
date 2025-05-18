import { motion } from 'framer-motion';

interface StatsCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: React.ReactNode;
}

export function StatsCard({ title, value, description, icon }: StatsCardProps) {
  return (
    <motion.div
      className="relative p-6 rounded-xl border border-cyan-500/20 bg-black/40 backdrop-blur-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-cyan-400/80">{title}</p>
          <motion.p 
            className="mt-2 text-3xl font-bold text-cyan-400"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            {value}
          </motion.p>
          {description && (
            <p className="mt-2 text-sm text-cyan-400/60">{description}</p>
          )}
        </div>
        {icon && (
          <motion.div 
            className="text-cyan-400"
            animate={{
              rotate: [0, 5, -5, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {icon}
          </motion.div>
        )}
      </div>
      <motion.div
        className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.5, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
      />
    </motion.div>
  );
} 