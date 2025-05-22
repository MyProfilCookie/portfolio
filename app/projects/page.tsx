"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { Star, Code, Rocket, Github, ExternalLink, Sparkles, ArrowRight } from "lucide-react";
import "../styles/animations.css";
import ProjectCard from '@/components/project-card'
import AstronautIcon from '@/components/astronaut-icon'
import { useEffect, useState } from "react";
import { Project, Technology } from "@prisma/client";
import Link from "next/link";

type ProjectWithTechnologies = Project & {
  technologies: Technology[];
};

const FloatingParticle = ({ delay = 0, size = 4, duration = 20 }) => (
  <motion.div
    className="absolute rounded-full bg-white/20"
    style={{ width: size, height: size }}
    initial={{ opacity: 0, scale: 0 }}
    animate={{
      opacity: [0, 1, 0],
      scale: [0, 1, 0],
      y: [-20, 0, 20],
    }}
    transition={{
      duration,
      delay,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  />
);

const GlowingOrb = ({ size = 100, delay = 0, style = {} }) => (
  <motion.div
    className="absolute rounded-full bg-gradient-to-r from-cyan-400/20 to-blue-500/20 blur-xl"
    style={{ width: size, height: size, ...style }}
    initial={{ opacity: 0, scale: 0.5 }}
    animate={{
      opacity: [0.3, 0.6, 0.3],
      scale: [0.8, 1, 0.8],
    }}
    transition={{
      duration: 4,
      delay,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  />
);

const SparkleEffect = ({ delay = 0 }) => (
  <motion.div
    className="absolute"
    initial={{ opacity: 0, scale: 0 }}
    animate={{
      opacity: [0, 1, 0],
      scale: [0, 1, 0],
      rotate: [0, 180, 360],
    }}
    transition={{
      duration: 2,
      delay,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  >
    <Star className="w-4 h-4 text-yellow-400" />
  </motion.div>
);

export default function ProjectsPage() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const [projects, setProjects] = useState<ProjectWithTechnologies[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const response = await fetch('/api/projects');
        if (!response.ok) throw new Error('Failed to fetch projects');
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchProjects();
  }, []);

  return (
    <main className="min-h-screen bg-black text-white relative overflow-hidden">
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
              <AstronautIcon className="w-24 h-24 sm:w-32 sm:h-32" page="projects" />
            </div>
          </motion.div>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 text-transparent bg-clip-text">
            Mes Projets
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mb-6 sm:mb-8 px-2">
            Découvrez mes réalisations et explorez mon univers créatif
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            <div className="flex items-center gap-2 text-cyan-400">
              <Code className="w-6 h-6 sm:w-8 sm:h-8" />
              <span className="text-base sm:text-lg font-medium">Développement</span>
            </div>

            <div className="flex items-center gap-2 text-blue-400">
              <Rocket className="w-6 h-6 sm:w-8 sm:h-8" />
              <span className="text-base sm:text-lg font-medium">Innovation</span>
            </div>

            <div className="flex items-center gap-2 text-purple-400">
              <Star className="w-6 h-6 sm:w-8 sm:h-8" />
              <span className="text-base sm:text-lg font-medium">Créativité</span>
            </div>
          </div>
        </motion.div>

        {isLoading ? (
          <div className="flex justify-center items-center min-h-[300px] sm:min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 sm:h-16 sm:w-16 border-t-2 border-b-2 border-cyan-500"></div>
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 px-2 sm:px-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + index * 0.1 }}
                whileHover={{ y: -5 }}
                className="w-full"
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </main>
  );
}