"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import AstronautIcon from "@/components/astronaut-icon";
import { motion } from "framer-motion";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col justify-center items-center relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.02] z-[-1]" />
      
      <motion.div 
        className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 text-center"
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
            <AstronautIcon className="w-32 h-32" page="home" />
          </div>
        </motion.div>
        
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 text-transparent bg-clip-text">
          404
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mb-12">
          Oups ! On dirait que vous vous êtes perdu dans l&apos;espace...
        </p>

        <div className="flex items-center justify-center gap-4">
          <Link href="/">
            <Button className="bg-transparent border-2 border-cyan-500 text-cyan-400 hover:bg-cyan-950 hover:text-cyan-300 px-6 py-4 h-auto text-lg rounded-full transition-all duration-300 hover:shadow-[0_0_20px_rgba(34,211,238,0.3)]">
              <Home className="mr-2 h-5 w-5" />
              Retour à l&apos;accueil
            </Button>
          </Link>
          <Button 
            onClick={() => window.history.back()}
            variant="outline"
            className="border-cyan-500/50 text-cyan-400 hover:bg-cyan-950 hover:text-cyan-300 px-6 py-4 h-auto text-lg rounded-full"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Page précédente
          </Button>
        </div>
      </motion.div>

      <div className="mt-16 text-sm text-gray-500">
        © MyProfilCookie
      </div>
    </main>
  );
} 