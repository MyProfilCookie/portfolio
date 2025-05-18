"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Star, Send, CheckCircle } from "lucide-react";

export default function TestimonialForm() {
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    company: "",
    message: "",
    rating: 5,
    imageUrl: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRatingChange = (rating: number) => {
    setFormData((prev) => ({
      ...prev,
      rating,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/testimonials", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success("Témoignage soumis avec succès !");
        setIsSubmitted(true);
        setFormData({
          name: "",
          role: "",
          company: "",
          message: "",
          rating: 5,
          imageUrl: "",
        });
      } else {
        const errorData = await response.json();
        toast.error(errorData.error || "Erreur lors de la soumission");
      }
    } catch (error) {
      toast.error("Erreur de connexion");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl w-full">
      {isSubmitted ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-green-500/20 border border-green-500/30 rounded-xl p-8 backdrop-blur-sm"
        >
          <div className="flex items-center gap-4">
            <CheckCircle className="w-12 h-12 text-green-400" />
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-green-100">
                Merci pour votre avis !
              </h3>
              <p className="text-green-300">
                Votre témoignage est en cours de modération et sera visible sous 48h.
              </p>
              <p className="text-sm text-green-400/80 mt-4">
                Pour une validation express, contactez-moi directement par email.
              </p>
            </div>
          </div>
        </motion.div>
      ) : (
        <motion.form
          onSubmit={handleSubmit}
          className="space-y-6 w-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Input
              placeholder="Votre nom"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              minLength={2}
              className="bg-white/50 dark:bg-background/50 border-cyan-200 dark:border-cyan-900/50 focus:border-cyan-600 dark:focus:border-cyan-500 text-slate-800 dark:text-white h-14 transition-all duration-300"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Input
              placeholder="Votre rôle"
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
              minLength={2}
              className="bg-white/50 dark:bg-background/50 border-cyan-200 dark:border-cyan-900/50 focus:border-cyan-600 dark:focus:border-cyan-500 text-slate-800 dark:text-white h-14 transition-all duration-300"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Input
              placeholder="Votre entreprise"
              name="company"
              value={formData.company}
              onChange={handleChange}
              required
              minLength={2}
              className="bg-white/50 dark:bg-background/50 border-cyan-200 dark:border-cyan-900/50 focus:border-cyan-600 dark:focus:border-cyan-500 text-slate-800 dark:text-white h-14 transition-all duration-300"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <div className="space-y-2">
              <label className="text-sm text-muted-foreground">Note</label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <button
                    key={rating}
                    type="button"
                    onClick={() => handleRatingChange(rating)}
                    className="focus:outline-none"
                  >
                    <Star
                      className={`w-6 h-6 ${rating <= formData.rating
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300"
                        }`}
                    />
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Textarea
              placeholder="Votre témoignage"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              minLength={10}
              className="bg-white/50 dark:bg-background/50 border-cyan-200 dark:border-cyan-900/50 focus:border-cyan-600 dark:focus:border-cyan-500 text-slate-800 dark:text-white min-h-[150px] transition-all duration-300"
            />
          </motion.div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-cyan-600 hover:bg-cyan-700 text-lg py-6"
          >
            {isSubmitting ? "Envoi en cours..." : "Envoyer le témoignage"}
          </Button>
        </motion.form>
      )}
    </div>
  );
}