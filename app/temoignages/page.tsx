/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import TestimonialForm from "@/components/testimonial-form";
import dynamic from 'next/dynamic';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  message: string;
  rating: number;
  imageUrl?: string;
  featured: boolean;
}

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch("/api/testimonials?approved=true");

        if (!response.ok) throw new Error(`Erreur HTTP: ${response.status}`);

        const data = await response.json();

        // Vérification finale simplifiée
        if (data?.testimonials) {
          setTestimonials(data.testimonials);
        } else {
          setTestimonials([]);
        }

      } catch (error) {
        console.error("Erreur API :", error);
        setTestimonials([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-cyan-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-950 py-32">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center mb-8"
          >
            <div className="relative group">
              <div className="absolute -inset-8 bg-cyan-500/20 rounded-full blur-2xl group-hover:bg-cyan-500/30 transition-colors duration-300" />
              <AstronautIcon
                className="w-32 h-32"
                page="temoignages"
              />
            </div>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text mb-4"
          >
            Témoignages
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg text-gray-400"
          >
            Découvrez ce que mes clients disent de mon travail
          </motion.p>
        </div>

        {/* Featured Testimonials */}
        {testimonials.some((t) => t.featured) && (
          <div className="mb-16">
            <h2 className="text-2xl font-semibold text-cyan-400 mb-8">
              Témoignages mis en avant
            </h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
              {testimonials
                .filter((t) => t.featured)
                .map((testimonial, index) => (
                  <motion.div
                    key={testimonial.id}
                    className="bg-gradient-to-b from-cyan-500/10 to-transparent border border-cyan-500/20 rounded-xl p-8 backdrop-blur-sm hover:shadow-2xl hover:shadow-cyan-500/20 transition-all"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <div className="flex items-center gap-4 mb-4">
                      {testimonial.imageUrl && (
                        <img
                          src={testimonial.imageUrl}
                          alt={testimonial.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                      )}
                      <div>
                        <h3 className="font-medium text-white">
                          {testimonial.name}
                        </h3>
                        <p className="text-sm text-gray-400">
                          {testimonial.role} chez {testimonial.company}
                        </p>
                      </div>
                    </div>
                    <div className="flex mb-4">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <Star
                          key={i}
                          className="w-5 h-5 text-yellow-400 fill-yellow-400"
                        />
                      ))}
                    </div>
                    <p className="text-gray-300">{testimonial.message}</p>
                  </motion.div>
                ))}
            </div>
          </div>
        )}

        {/* Other Testimonials */}
        <div className="mb-20">
          <h2 className="text-2xl font-semibold text-cyan-400 mb-8 text-center">
            Tous les témoignages
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {testimonials
              .filter((t) => !t.featured)
              .map((testimonial, index) => (
                <motion.div
                  key={testimonial.id}
                  className="group relative bg-gradient-to-b from-gray-900/50 to-transparent border border-gray-800 rounded-xl p-6 backdrop-blur-sm hover:border-cyan-500/30 transition-all"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-4">
                      {testimonial.imageUrl && (
                        <img
                          src={testimonial.imageUrl}
                          alt={testimonial.name}
                          className="w-14 h-14 rounded-full object-cover border-2 border-cyan-500/30"
                        />
                      )}
                      <div>
                        <h3 className="font-medium text-white text-lg">
                          {testimonial.name}
                        </h3>
                        <p className="text-sm text-cyan-400/80">
                          {testimonial.role} · {testimonial.company}
                        </p>
                      </div>
                    </div>
                    <div className="flex mb-3">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <Star
                          key={i}
                          className="w-5 h-5 text-yellow-400 fill-yellow-400"
                        />
                      ))}
                    </div>
                    <p className="text-gray-300 text-pretty leading-relaxed">
                      &ldquo;{testimonial.message}&rdquo;
                    </p>
                  </div>
                </motion.div>
              ))}
          </div>
        </div>

        {/* Add Testimonial Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-2xl font-semibold text-cyan-400 mb-4">
              Partagez votre expérience
            </h2>
            <p className="text-gray-400">
              Votre avis est important pour moi et aide d&rsquo;autres clients potentiels
            </p>
          </div>
          <div className="flex justify-center">
            <TestimonialForm />
          </div>
        </motion.div>
      </div>
    </div>
  );
}

const AstronautIcon = dynamic(
  () => import('@/components/astronaut-icon'),
  {
    ssr: false,
    loading: () => <div className="w-32 h-32 bg-cyan-500/10 rounded-full animate-pulse" />
  }
);