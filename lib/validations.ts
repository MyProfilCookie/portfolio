import { z } from 'zod'

export const projectSchema = z.object({
  title: z.string().min(1, 'Le titre est requis'),
  description: z.string().min(10, 'La description doit faire au moins 10 caractères'),
  imageUrl: z.string().url('L\'URL de l\'image doit être valide'),
  githubUrl: z.string().url('L\'URL GitHub doit être valide').optional().nullable(),
  liveUrl: z.string().url('L\'URL du site doit être valide').optional().nullable(),
  order: z.number().int().min(0).default(0),
  featured: z.boolean().default(false),
  technologies: z.array(z.string().cuid('ID de technologie invalide')),
})

export const technologySchema = z.object({
  name: z.string().min(1, 'Le nom est requis'),
  icon: z.string().min(1, 'L\'icône est requise'),
})

export const contactSchema = z.object({
  name: z.string().min(2, 'Le nom doit faire au moins 2 caractères'),
  email: z.string().email('L\'email doit être valide'),
  message: z.string().min(10, 'Le message doit faire au moins 10 caractères'),
})

export const testimonialSchema = z.object({
  name: z.string().min(2, 'Le nom doit faire au moins 2 caractères'),
  role: z.string().min(2, 'Le rôle doit faire au moins 2 caractères'),
  company: z.string().min(2, 'Le nom de l\'entreprise doit faire au moins 2 caractères'),
  message: z.string().min(10, 'Le message doit faire au moins 10 caractères'),
  imageUrl: z.string().url('L\'URL de l\'image doit être valide').optional().nullable(),
  rating: z.number().int().min(1).max(5).default(5),
  featured: z.boolean().default(false),
  order: z.number().int().min(0).default(0),
}) 