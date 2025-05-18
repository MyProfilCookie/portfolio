import { motion } from 'framer-motion';
import Image from 'next/image';
import { Quote } from 'lucide-react';

interface TestimonialCardProps {
  content: string;
  author: string;
  role: string;
  imageUrl?: string;
}

export function TestimonialCard({ content, author, role, imageUrl }: TestimonialCardProps) {
  return (
    <motion.div
      className="relative p-6 rounded-xl border border-cyan-500/20 bg-black/40 backdrop-blur-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="absolute -top-4 -left-4 text-cyan-400"
        initial={{ scale: 0 }}
        animate={{ scale: 1, rotate: [0, 10, 0] }}
        transition={{ duration: 0.5 }}
      >
        <Quote size={32} />
      </motion.div>
      
      <div className="mt-4">
        <p className="text-cyan-400/80 italic">{content}</p>
        
        <div className="mt-6 flex items-center gap-4">
          {imageUrl && (
            <motion.div
              className="relative h-12 w-12 rounded-full overflow-hidden"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Image
                src={imageUrl}
                alt={author}
                fill
                className="object-cover"
              />
            </motion.div>
          )}
          
          <div>
            <motion.p 
              className="font-medium text-cyan-400"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {author}
            </motion.p>
            <motion.p 
              className="text-sm text-cyan-400/60"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {role}
            </motion.p>
          </div>
        </div>
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