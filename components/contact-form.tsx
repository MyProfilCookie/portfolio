"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Send } from "lucide-react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Message envoyé avec succès!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        toast.error(data.error || "Erreur lors de l'envoi du message");
      }
    } catch (error) {
      console.error('Erreur lors de l\'envoi du message:', error);
      toast.error("Une erreur est survenue lors de l'envoi du message");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.form 
      onSubmit={handleSubmit} 
      className="space-y-6 w-full max-w-md bg-white/80 dark:bg-background/30 border border-cyan-200 dark:border-cyan-500/20 rounded-lg p-6 shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      whileHover={{ 
        boxShadow: "0 0 20px rgba(34,211,238,0.15)",
        borderColor: "rgba(34,211,238,0.4)"
      }}
    >
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Input
          placeholder="Nom"
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
          placeholder="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="bg-white/50 dark:bg-background/50 border-cyan-200 dark:border-cyan-900/50 focus:border-cyan-600 dark:focus:border-cyan-500 text-slate-800 dark:text-white h-14 transition-all duration-300"
        />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Textarea
          placeholder="Message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          minLength={10}
          className="bg-white/50 dark:bg-background/50 border-cyan-200 dark:border-cyan-900/50 focus:border-cyan-600 dark:focus:border-cyan-500 text-slate-800 dark:text-white min-h-[200px] transition-all duration-300"
        />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <Button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full bg-cyan-600 hover:bg-cyan-700 text-white dark:bg-cyan-600 dark:hover:bg-cyan-700 font-medium text-lg py-6 h-auto rounded-full transition-all duration-300 hover:shadow-[0_0_15px_rgba(34,211,238,0.3)] hover:scale-105 flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <Send className="w-5 h-5" />
              </motion.span>
              <span>Envoi en cours...</span>
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              <span>Envoyer le message</span>
            </>
          )}
        </Button>
      </motion.div>
    </motion.form>
  );
}