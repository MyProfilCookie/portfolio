"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import AstronautIcon from "@/components/astronaut-icon";
import TechIcon from "@/components/tech-icon";
import { AtSign, TrendingUp, Sparkles, Code, Rocket, Star, Github, ExternalLink, Server, Cloud, Palette, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import "./styles/animations.css";

const mainNav = [
  { name: 'Accueil', href: '/' },
  { name: 'Projets', href: '/projects' },
  { name: 'Tarifs', href: '/tarifs' },
  { name: 'Contact', href: '/contact' },
]

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-black to-gray-950">
      {/* Hero Section */}
      <section className="min-h-[90vh] flex items-center relative overflow-hidden px-2 sm:px-4">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 to-transparent opacity-50" />

        <div className="max-w-7xl mx-auto px-2 sm:px-6 md:px-8 py-8 sm:py-16 md:py-20 flex flex-col md:flex-row items-center justify-between relative">
          <div className="w-full md:w-1/2 mb-6 sm:mb-10 md:mb-0 flex items-center justify-center">
            <div className="relative">
              <div className="absolute -inset-4 bg-cyan-500/20 rounded-full blur-xl opacity-30" />
              <AstronautIcon page="home" className="w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] md:w-[400px] md:h-[400px]" />
            </div>
          </div>
          <div className="w-full md:w-1/2 space-y-3 sm:space-y-6 text-center md:text-left">
            <motion.h1
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold relative leading-tight"
            >
              <div>
                <span className="text-cyan-400 inline-block">Je suis</span>
                <br />
                <span className="text-cyan-400 break-words md:break-normal inline-block relative group">
                  MyProfilCookie
                  <div className="absolute -top-2 -right-2 text-cyan-300">
                    <Sparkles className="w-6 h-6" />
                  </div>
                </span>
                <span className="block text-lg sm:text-2xl md:text-3xl font-normal mt-2 md:mt-4">
                  <span className="gradient-text inline-block">
                    - Développeur Fullstack
                  </span>
                </span>
              </div>
            </motion.h1>
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-lg mx-auto md:mx-0 px-2 sm:px-0">
              Développeur web passionné, je transforme vos idées en applications web modernes et performantes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link href="/contact" className="inline-block w-full sm:w-auto">
                <Button className="bg-transparent border-2 border-cyan-500 text-cyan-400 hover:bg-cyan-950 hover:text-cyan-300 px-3 sm:px-6 md:px-8 py-2 sm:py-4 md:py-6 h-auto text-sm sm:text-base md:text-lg rounded-full w-full sm:w-auto transition-colors">
                  <span className="mr-2">Me contacter</span>
                  <span>→</span>
                </Button>
              </Link>
              <div className="flex items-center justify-center gap-2 text-cyan-400">
                <Code className="w-5 h-5" />
                <Rocket className="w-5 h-5" />
                <Star className="w-5 h-5" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-6 sm:py-16 md:py-20 relative px-2 sm:px-4">
        <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/5 to-transparent" />
        <div className="max-w-7xl mx-auto px-2 sm:px-6 md:px-8 relative">
          <div className="text-center mb-8 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-cyan-400 to-cyan-200 text-transparent bg-clip-text">Services Premium</h2>
            <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
              Des solutions sur mesure pour répondre à vos besoins spécifiques
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8 md:gap-12">
            <div className="bg-background/30 border border-cyan-500/20 rounded-xl p-4 sm:p-6 transition-all duration-300 hover:border-cyan-500/40">
              <div className="h-10 w-10 sm:h-16 sm:w-16 rounded-full bg-cyan-950/50 flex items-center justify-center mb-3 sm:mb-4">
                <AtSign className="h-5 w-5 sm:h-8 sm:w-8 text-cyan-400" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2">Disponible pour vos projets web</h3>
              <p className="text-sm sm:text-base text-muted-foreground">Création de sites web, applications et solutions digitales sur mesure.</p>
              <p className="text-cyan-400 mt-3 sm:mt-4 text-sm sm:text-base">Réponse sous 48h garantie</p>
            </div>

            <div className="bg-background/30 border border-cyan-500/20 rounded-xl p-4 sm:p-6 transition-all duration-300 hover:border-cyan-500/40">
              <div className="h-10 w-10 sm:h-16 sm:w-16 rounded-full bg-cyan-950/50 flex items-center justify-center mb-3 sm:mb-4">
                <TrendingUp className="h-5 w-5 sm:h-8 sm:w-8 text-cyan-400" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2">Expertise technique</h3>
              <p className="text-sm sm:text-base text-muted-foreground">Développement sur mesure avec les technologies les plus récentes et performantes.</p>
              <div className="mt-3 sm:mt-4 flex flex-wrap gap-2 sm:gap-4">
                <span className="py-0.5 px-1.5 sm:py-1.5 sm:px-3 rounded-full bg-cyan-950/50 text-cyan-400 text-xs sm:text-sm transition-colors duration-300 hover:bg-cyan-900/50">Next.js</span>
                <span className="py-0.5 px-1.5 sm:py-1.5 sm:px-3 rounded-full bg-cyan-950/50 text-cyan-400 text-xs sm:text-sm transition-colors duration-300 hover:bg-cyan-900/50">MongoDB</span>
                <span className="py-0.5 px-1.5 sm:py-1.5 sm:px-3 rounded-full bg-cyan-950/50 text-cyan-400 text-xs sm:text-sm transition-colors duration-300 hover:bg-cyan-900/50">React</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-6 sm:py-16 md:py-20 relative px-2 sm:px-4">
        <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/5 to-transparent" />
        <div className="max-w-7xl mx-auto px-2 sm:px-6 md:px-8 relative">
          <div className="text-center mb-8 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-cyan-400 to-cyan-200 text-transparent bg-clip-text">Projets Récents</h2>
            <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
              Découvrez mes dernières réalisations et explorez mon portfolio
            </p>
            <Link href="/projects" className="inline-block mt-4">
              <Button variant="outline" size="lg" className="border-cyan-800 text-cyan-400 hover:bg-cyan-950 hover:text-cyan-300">
                Voir tous les projets
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8 md:gap-12">
            {/* Autistudy */}
            <div className="bg-background/30 border border-cyan-500/20 rounded-lg p-6 sm:p-8 relative overflow-hidden group">
              <div className="relative z-10">
                <div className="aspect-video relative overflow-hidden rounded-lg mb-4">
                  <Image
                    src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1000&auto=format&fit=crop"
                    alt="Autistudy - Application d'apprentissage"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold mb-2 text-cyan-400">Autistudy</h3>
                <p className="text-muted-foreground mb-4">Une application web pour aider les personnes autistes à apprendre et à se développer.</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-2 py-1 text-xs rounded-full bg-cyan-950/50 text-cyan-400 border border-cyan-800">Next.js</span>
                  <span className="px-2 py-1 text-xs rounded-full bg-cyan-950/50 text-cyan-400 border border-cyan-800">TypeScript</span>
                  <span className="px-2 py-1 text-xs rounded-full bg-cyan-950/50 text-cyan-400 border border-cyan-800">Tailwind CSS</span>
                </div>
                <div className="flex space-x-4">
                  <Link href="https://github.com/MyProfilCookie/Blog-perso" target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="sm" className="border-cyan-800 text-cyan-400 hover:bg-cyan-950 hover:text-cyan-300">
                      <Github className="mr-2 h-4 w-4" />
                      GitHub
                    </Button>
                  </Link>
                  <Link href="https://autistudy.vercel.app" target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="sm" className="border-cyan-800 text-cyan-400 hover:bg-cyan-950 hover:text-cyan-300">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Live Demo
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            {/* E-commerce */}
            <div className="bg-background/30 border border-cyan-500/20 rounded-lg p-6 sm:p-8 relative overflow-hidden group">
              <div className="relative z-10">
                <div className="aspect-video relative overflow-hidden rounded-lg mb-4">
                  <Image
                    src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=1000&auto=format&fit=crop"
                    alt="E-commerce - Plateforme de vente en ligne"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold mb-2 text-cyan-400">E-commerce</h3>
                <p className="text-muted-foreground mb-4">Une plateforme e-commerce complète avec gestion des produits, panier et paiement.</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-2 py-1 text-xs rounded-full bg-cyan-950/50 text-cyan-400 border border-cyan-800">React</span>
                  <span className="px-2 py-1 text-xs rounded-full bg-cyan-950/50 text-cyan-400 border border-cyan-800">Node.js</span>
                  <span className="px-2 py-1 text-xs rounded-full bg-cyan-950/50 text-cyan-400 border border-cyan-800">MongoDB</span>
                </div>
                <div className="flex space-x-4">
                  <Link href="https://github.com/example/ecommerce" target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="sm" className="border-cyan-800 text-cyan-400 hover:bg-cyan-950 hover:text-cyan-300">
                      <Github className="mr-2 h-4 w-4" />
                      GitHub
                    </Button>
                  </Link>
                  <Link href="https://ecommerce.example.com" target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="sm" className="border-cyan-800 text-cyan-400 hover:bg-cyan-950 hover:text-cyan-300">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Live Demo
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Blog Personnel */}
            <div className="bg-background/30 border border-cyan-500/20 rounded-lg p-6 sm:p-8 relative overflow-hidden group">
              <div className="relative z-10">
                <div className="aspect-video relative overflow-hidden rounded-lg mb-4">
                  <Image
                    src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=1000&auto=format&fit=crop"
                    alt="Blog Personnel - Plateforme de blogging"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold mb-2 text-cyan-400">Blog Personnel</h3>
                <p className="text-muted-foreground mb-4">Un blog personnel avec système de gestion de contenu et commentaires.</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-2 py-1 text-xs rounded-full bg-cyan-950/50 text-cyan-400 border border-cyan-800">Next.js</span>
                  <span className="px-2 py-1 text-xs rounded-full bg-cyan-950/50 text-cyan-400 border border-cyan-800">TypeScript</span>
                  <span className="px-2 py-1 text-xs rounded-full bg-cyan-950/50 text-cyan-400 border border-cyan-800">Prisma</span>
                </div>
                <div className="flex space-x-4">
                  <Link href="https://github.com/example/blog" target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="sm" className="border-cyan-800 text-cyan-400 hover:bg-cyan-950 hover:text-cyan-300">
                      <Github className="mr-2 h-4 w-4" />
                      GitHub
                    </Button>
                  </Link>
                  <Link href="https://blog.example.com" target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="sm" className="border-cyan-800 text-cyan-400 hover:bg-cyan-950 hover:text-cyan-300">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Live Demo
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Portfolio Artistique */}
            <div className="bg-background/30 border border-cyan-500/20 rounded-lg p-6 sm:p-8 relative overflow-hidden group">
              <div className="relative z-10">
                <div className="aspect-video relative overflow-hidden rounded-lg mb-4">
                  <Image
                    src="https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?q=80&w=1000&auto=format&fit=crop"
                    alt="Portfolio Artistique - Galerie d&apos;art en ligne"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold mb-2 text-cyan-400">Portfolio Artistique</h3>
                <p className="text-muted-foreground mb-4">Un portfolio en ligne pour artistes avec galerie d&apos;images et formulaire de contact.</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-2 py-1 text-xs rounded-full bg-cyan-950/50 text-cyan-400 border border-cyan-800">React</span>
                  <span className="px-2 py-1 text-xs rounded-full bg-cyan-950/50 text-cyan-400 border border-cyan-800">Firebase</span>
                  <span className="px-2 py-1 text-xs rounded-full bg-cyan-950/50 text-cyan-400 border border-cyan-800">Tailwind CSS</span>
                </div>
                <div className="flex space-x-4">
                  <Link href="https://github.com/example/portfolio" target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="sm" className="border-cyan-800 text-cyan-400 hover:bg-cyan-950 hover:text-cyan-300">
                      <Github className="mr-2 h-4 w-4" />
                      GitHub
                    </Button>
                  </Link>
                  <Link href="https://portfolio.example.com" target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="sm" className="border-cyan-800 text-cyan-400 hover:bg-cyan-950 hover:text-cyan-300">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Live Demo
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-12 sm:py-16 md:py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 relative">
          <div className="text-center mb-8 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-cyan-400 to-cyan-200 text-transparent bg-clip-text">Expertise Technique</h2>
            <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
              Un large éventail de technologies et d&apos;outils pour répondre à vos besoins
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8">
            {[
              { name: "Frontend", icon: Code, skills: ["React", "Next.js", "TypeScript", "Tailwind CSS"] },
              { name: "Backend", icon: Server, skills: ["Node.js", "Express", "MongoDB", "PostgreSQL"] },
              { name: "DevOps", icon: Cloud, skills: ["Docker", "AWS", "CI/CD", "Git"] },
              { name: "UI/UX", icon: Palette, skills: ["Figma", "Adobe XD", "Responsive Design", "Accessibilité"] }
            ].map((category, index) => (
              <div key={category.name} className="bg-background/30 border border-cyan-500/20 rounded-lg p-4 sm:p-6 relative overflow-hidden group">
                <div className="relative z-10">
                  <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-cyan-950/50 flex items-center justify-center mb-3">
                    <category.icon className="h-5 w-5 sm:h-6 sm:w-6 text-cyan-400" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-cyan-400">{category.name}</h3>
                  <ul className="space-y-2">
                    {category.skills.map((skill) => (
                      <li key={skill} className="text-sm text-muted-foreground flex items-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mr-2" />
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action - Laissez un avis */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="py-12 sm:py-16 md:py-20 relative"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 relative">
          <div className="text-center mb-8 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-cyan-400 to-cyan-200 text-transparent bg-clip-text">
              Laissez votre avis
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
              Partagez votre expérience et aidez d&apos;autres clients à me découvrir
            </p>
            <Link href="/temoignages" className="inline-block mt-4">
              <Button
                variant="outline"
                size="lg"
                className="border-cyan-800 text-cyan-400 hover:bg-cyan-950 hover:text-cyan-300"
              >
                Écrire un témoignage
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </motion.section>

      {/* Testimonials Section */}
      <section className="py-12 sm:py-16 md:py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/5 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 relative">
          <div className="text-center mb-8 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-cyan-400 to-cyan-200 text-transparent bg-clip-text">Avis Clients</h2>
            <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
              Ce que mes clients disent de leur expérience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-8">
            {[
              {
                name: "Sarah Martin",
                role: "Directrice Marketing",
                company: "TechStart",
                image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1000&auto=format&fit=crop",
                text: "Un travail exceptionnel ! Le site web créé a dépassé toutes nos attentes. Très professionnel et réactif."
              },
              {
                name: "Thomas Dubois",
                role: "CEO",
                company: "Innovate Solutions",
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop",
                text: "Une collaboration parfaite. Le développeur a su comprendre nos besoins et les transformer en une solution efficace."
              },
              {
                name: "Marie Laurent",
                role: "Fondatrice",
                company: "Art Gallery",
                image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1000&auto=format&fit=crop",
                text: "Mon portfolio artistique est magnifique ! L&apos;interface est intuitive et met parfaitement en valeur mon travail."
              }
            ].map((testimonial) => (
              <div key={testimonial.name} className="bg-background/30 border border-cyan-500/20 rounded-lg p-6 relative overflow-hidden group">
                <div className="relative z-10">
                  <div className="flex items-center mb-4">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                      <Image
                        src={testimonial.image}
                        alt={testimonial.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold text-cyan-400">{testimonial.name}</h3>
                      <p className="text-sm text-muted-foreground">{testimonial.role} chez {testimonial.company}</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground italic">&quot;{testimonial.text}&quot;</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-12 sm:py-16 md:py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 relative">
          <div className="text-center mb-8 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-cyan-400 to-cyan-200 text-transparent bg-clip-text">Solutions Tarifaires</h2>
            <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
              Des offres adaptées à tous les budgets et besoins
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-8">
            {[
              {
                name: "Pack Starter",
                price: "370€",
                description: "Un site vitrine simple, professionnel et rapide à mettre en ligne",
                features: ["Site vitrine simple", "Design responsive", "Formulaire de contact", "Optimisation SEO basique"]
              },
              {
                name: "Pack Pro",
                recommandation: "★★★★★",
                price: "790€",
                description: "Un site web complet avec des fonctionnalités avancées.",
                features: ["Site web complet", "Backend personnalisé", "Base de données", "API REST", "Support prioritaire"]
              },
              {
                name: "Pack Premium",
                price: "1490€",
                description: "Un site web sur mesure avec des fonctionnalités premium.",
                features: ["Site web complet", "Backend personnalisé", "Base de données", "API REST", "Support prioritaire"]
              },
              {
                name: "Enterprise",
                price: "Sur mesure",
                description: "Solutions complexes et sur mesure",
                features: ["Application web complète", "Architecture scalable", "Intégration de services", "Maintenance continue", "Support 24/7"]
              }
            ].map((plan) => (
              <div
                key={plan.name}
                className={`bg-background/30 border rounded-lg p-6 relative overflow-hidden group ${plan.name === "Pack Pro"
                    ? "border-cyan-500 scale-105"
                    : "border-cyan-500/20"
                  }`}
              >
                <div className="relative z-10">
                  <h3 className="text-xl font-bold mb-2 text-cyan-400">
                    {plan.name}
                    {plan.name === "Pack Pro" && (
                      <span className="ml-2 text-sm bg-cyan-500/20 text-cyan-400 px-2 py-1 rounded-full">
                        Recommandé
                      </span>
                    )}
                  </h3>
                  <p className="text-3xl font-bold mb-2">{plan.price}</p>
                  <p className="text-sm text-muted-foreground mb-4">{plan.description}</p>
                  <ul className="space-y-2 mb-6">
                    {plan.features.map((feature) => (
                      <li key={feature} className="text-sm text-muted-foreground flex items-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mr-2" />
                        {feature}
                      </li>
                    ))}
                    {plan.recommandation && (
                      <li key={`recommandation-${plan.name}`} className="text-sm text-muted-foreground flex items-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mr-2" />
                        {plan.recommandation}
                      </li>
                    )}
                  </ul>
                  <Link href="/contact" className="inline-block w-full">
                    <Button className={`w-full ${plan.name === "Pack Pro"
                        ? "bg-cyan-500 text-white hover:bg-cyan-600"
                        : "bg-transparent border border-cyan-500 text-cyan-400 hover:bg-cyan-950"
                      }`}>
                      Choisir ce plan
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12 sm:py-16 md:py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 to-transparent" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 text-center relative">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-cyan-400 to-cyan-200 text-transparent bg-clip-text">Démarrons Votre Projet</h2>
          <p className="text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8 max-w-2xl mx-auto">
            Discutons de votre projet et voyons comment je peux vous aider à le réaliser
          </p>
          <Link href="/contact" className="inline-block w-full sm:w-auto">
            <Button className="bg-transparent border-2 border-cyan-500 text-cyan-400 hover:bg-cyan-950 hover:text-cyan-300 px-6 sm:px-8 py-4 sm:py-6 h-auto text-base sm:text-lg rounded-full w-full sm:w-auto group transition-all duration-300 hover:shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:scale-105">
              <span>Contactez-moi</span>
              <motion.span
                className="ml-2"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >→</motion.span>
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
}