'use client';

import { motion } from 'framer-motion';
import { Code, CreditCard, Mail } from 'lucide-react';

interface AstronautIconProps {
  className?: string;
  page?: "home" | "projects" | "pricing" | "contact" | "paiement" | "temoignages";
}

export default function AstronautIcon({
  className = "w-24 h-24",
  page = 'home'
}: AstronautIconProps) {
  const getIcon = () => {
    switch (page) {
      case 'projects':
        return <Code className="w-full h-full text-cyan-400" />;
      case 'pricing':
        return <CreditCard className="w-full h-full text-cyan-400" />;
      case 'contact':
        return <Mail className="w-full h-full text-cyan-400" />;
      case 'paiement':

        return (
          <svg
            viewBox="0 0 200 200"
            className="w-full h-full text-cyan-400"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Fond de la carte */}
            <motion.rect
              x="40"
              y="60"
              width="120"
              height="80"
              rx="10"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
            {/* Puce de la carte */}
            <motion.rect
              x="55"
              y="80"
              width="25"
              height="20"
              rx="2"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            />
            {/* Lignes de données */}
            <motion.g
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1, duration: 0.5 }}
            >
              <rect x="90" y="85" width="40" height="3" fill="currentColor" />
              <rect x="90" y="92" width="60" height="3" fill="currentColor" />
            </motion.g>
            {/* Effet brillant */}
            <motion.path
              d="M40 60 L160 140"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              opacity="0.3"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: [0, 0.3, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 1
              }}
            />
          </svg>
        );
      case 'temoignages':
        return (
          <svg
            viewBox="0 0 24 24"
            className="w-full h-full text-cyan-400"
            xmlns="http://www.w3.org/2000/svg"
          >
            <motion.path
              d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
            <motion.g
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <path d="M7 9H17" stroke="currentColor" strokeWidth="1.5" />
              <path d="M7 13H13" stroke="currentColor" strokeWidth="1.5" />
            </motion.g>
          </svg>
        );
      default:
        return (
          <svg
            className="w-full h-full text-cyan-400"
            viewBox="0 0 512 512"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M419.54,242.6a51.9,51.9,0,0,1,11.15,32.32v52.17a5.59,5.59,0,1,0,11.17,0V274.92a62.94,62.94,0,0,0-13.53-39.21,5.58,5.58,0,1,0-8.79,6.89Z" fill="currentColor" />
            <path d="M77.27,330.35a5.58,5.58,0,0,0,5.59-5.58V274.92a52.3,52.3,0,0,1,13.22-34.8,5.59,5.59,0,1,0-8.35-7.42,63.45,63.45,0,0,0-16,42.22v49.85A5.58,5.58,0,0,0,77.27,330.35Z" fill="currentColor" />
            <path d="M102.87,218.43a35.43,35.43,0,0,0,11.57,11.44,5.58,5.58,0,1,0,5.81-9.54,24.29,24.29,0,0,1-7.9-7.82,66.47,66.47,0,0,1-8.91-22.14A21.48,21.48,0,0,1,108.29,172a127.78,127.78,0,0,1,10.07-10.31c0,1.46-.08,2.92-.08,4.38a137.11,137.11,0,0,0,23,76.2,5.59,5.59,0,0,0,9.31-6.19,126.55,126.55,0,1,1,210.44.63,5.59,5.59,0,0,0,9.27,6.25,137.09,137.09,0,0,0,23.44-76.89c0-1.46,0-2.92-.08-4.38A127.78,127.78,0,0,1,403.71,172a21.48,21.48,0,0,1,4.85,18.39,66.47,66.47,0,0,1-8.91,22.14,23.81,23.81,0,0,1-4.92,5.67,5.59,5.59,0,0,0,7.2,8.55,35.48,35.48,0,0,0,7.2-8.3,77.74,77.74,0,0,0,10.39-25.85,32.61,32.61,0,0,0-7.34-27.89,166.5,166.5,0,0,0-20-19.06C382.31,79.34,325,28.33,256,28.33s-126.31,51-136.2,117.3a165.71,165.71,0,0,0-20,19.06,32.61,32.61,0,0,0-7.34,27.89A77.74,77.74,0,0,0,102.87,218.43Z" fill="currentColor" />
            <path d="M248.89,93.44a5.59,5.59,0,1,0,0-11.17H232.73a76.44,76.44,0,0,0-17.13,2l-.54.13A76.7,76.7,0,0,0,157,148.29a189.35,189.35,0,0,0-1.83,24.77c0,.5,0,1,.05,1.49v.17a62,62,0,0,0,61.6,57.08h78.4a62,62,0,0,0,61.6-57.08v-.17c0-.5.05-1,.05-1.49A189.35,189.35,0,0,0,355,148.29a76.7,76.7,0,0,0-58.09-63.94,5,5,0,0,0-.53-.12,76,76,0,0,0-17.14-2h-1.65a5.59,5.59,0,1,0,0,11.17h1.65q3,0,5.84.27L275,106.79a12.74,12.74,0,0,1-10.12,4.95H247.17a12.74,12.74,0,0,1-10.12-4.95L226.89,93.71q2.88-.27,5.84-.27Zm-20.66,20.2a23.82,23.82,0,0,0,18.94,9.28h17.66a23.82,23.82,0,0,0,18.94-9.28L297.44,96A65.47,65.47,0,0,1,344,149.8a180.89,180.89,0,0,1,1.73,23.3c0,.22,0,.43,0,.57v.21a50.79,50.79,0,0,1-50.46,46.75H216.8a50.82,50.82,0,0,1-50.47-46.88c0-.22,0-.43,0-.65A180.89,180.89,0,0,1,168,149.8,65.47,65.47,0,0,1,214.56,96Z" fill="currentColor" />
            <path d="M154.88,273.21a5.59,5.59,0,0,0,5.59-5.59,10.06,10.06,0,0,1,10.05-10.05h171a10.06,10.06,0,0,1,10,10.05,5.59,5.59,0,1,0,11.17,0,21.24,21.24,0,0,0-21.22-21.22h-171a21.24,21.24,0,0,0-21.22,21.22A5.58,5.58,0,0,0,154.88,273.21Z" fill="currentColor" />
            <path d="M196.77,139.75a5.59,5.59,0,0,0,7.67-1.87c.57-.93,1.17-1.88,1.79-2.84a5.58,5.58,0,1,0-9.36-6.09c-.69,1.05-1.34,2.1-2,3.12A5.59,5.59,0,0,0,196.77,139.75Z" fill="currentColor" />
            <path d="M194.33,193.87a5.59,5.59,0,1,0,6.83-8.84c-.43-.35-10.47-8.7-5.3-28a5.59,5.59,0,1,0-10.79-2.89C177.89,181,193.65,193.36,194.33,193.87Z" fill="currentColor" />
            <path d="M70.72,483.67a5.58,5.58,0,0,0,5.58-5.59v-48a171.21,171.21,0,0,1,15.52-71.86c20-43,49.18-58.41,64.79-63.78a58.77,58.77,0,0,1,9.93-2.59h36.35l11.05,18a27.39,27.39,0,0,0,23.2,13,5.59,5.59,0,0,0,0-11.17A16.17,16.17,0,0,1,223.45,304L216,291.89h80L288.55,304a16.17,16.17,0,0,1-13.69,7.65,5.59,5.59,0,1,0,0,11.17,27.39,27.39,0,0,0,23.2-13l11.05-18h36.36c4.33.61,47.6,8.14,74.71,66.37a171.21,171.21,0,0,1,15.52,71.86v48a5.59,5.59,0,1,0,11.17,0v-48a182.52,182.52,0,0,0-16.56-76.58c-30.73-66-81.69-72.54-83.84-72.79a4.49,4.49,0,0,0-.64,0H166.17a4.49,4.49,0,0,0-.64,0A64.77,64.77,0,0,0,153,283.92c-17.28,5.94-49.52,22.88-71.29,69.62a182.52,182.52,0,0,0-16.56,76.58v48A5.59,5.59,0,0,0,70.72,483.67Z" fill="currentColor" />
            <path d="M365.64,481.36a5.58,5.58,0,0,0,5.58-5.58V420a52.56,52.56,0,0,0-52.49-52.5H194.82a52.56,52.56,0,0,0-52.5,52.5v55.8a5.59,5.59,0,0,0,11.18,0V420a41.37,41.37,0,0,1,41.32-41.33H318.73A41.37,41.37,0,0,1,360.05,420v55.8A5.58,5.58,0,0,0,365.64,481.36Z" fill="currentColor" />
            <path d="M210.11,452A22.09,22.09,0,0,1,188.05,430a5.59,5.59,0,0,0-11.17,0,33.17,33.17,0,1,0,24.66-32.12,5.59,5.59,0,0,0,2.88,10.8A22.07,22.07,0,1,1,210.11,452Z" fill="currentColor" />
            <path d="M266.65,427.12v5.7a5.59,5.59,0,1,0,11.18,0v-5.7a5.59,5.59,0,0,0-11.18,0Z" fill="currentColor" />
            <path d="M295.66,427.12v5.7a5.59,5.59,0,1,0,11.17,0v-5.7a5.59,5.59,0,0,0-11.17,0Z" fill="currentColor" />
            <path d="M324.66,427.12v5.7a5.59,5.59,0,1,0,11.17,0v-5.7a5.59,5.59,0,0,0-11.17,0Z" fill="currentColor" />
          </svg>
        );
    }
  };

  return (
    <motion.div
      className={`relative ${className}`}
      animate={{
        y: [0, -10, 0],
        rotate: [0, 5, 0],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-2xl"
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
      <motion.div
        className="relative z-10"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        {getIcon()}
      </motion.div>
      <motion.div
        className="absolute -inset-4 bg-cyan-500/10 rounded-full blur-xl"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </motion.div>
  );
}