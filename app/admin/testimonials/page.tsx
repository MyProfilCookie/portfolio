'use client'

import { useState, useEffect, useCallback } from 'react'
import {
  Plus, Pencil, Trash, Star, Check, X,
  ArrowUp, ArrowDown, Loader2
} from 'lucide-react'
import { Testimonial as PrismaTestimonial } from '@prisma/client'
import TestimonialForm from '@/components/testimonial-form'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { toast } from 'sonner'

interface TestimonialWithDates extends Omit<PrismaTestimonial, 'createdAt' | 'updatedAt'> {
  createdAt: string
  updatedAt: string
}

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<TestimonialWithDates[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [processing, setProcessing] = useState<string | null>(null)

  const fetchTestimonials = useCallback(async () => {
    try {
      const response = await fetch(`/api/testimonials?page=${page}&limit=10`)
      const data = await response.json()
      setTestimonials(data.testimonials)
      setTotalPages(data.pagination.totalPages)
    } catch (error) {
      console.error('Erreur lors de la récupération des témoignages:', error)
      toast.error('Erreur lors de la récupération des témoignages')
    } finally {
      setLoading(false)
    }
  }, [page])

  useEffect(() => {
    fetchTestimonials()
  }, [fetchTestimonials])

  const handleApprove = async (id: string) => {
    try {
      setProcessing(id)
      const testimonial = testimonials.find((t) => t.id === id)
      if (!testimonial) return

      const response = await fetch(`/api/testimonials/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ approved: !testimonial.approved }),
      })

      if (response.ok) {
        setTestimonials((prev) =>
          prev.map((t) => t.id === id ? { ...t, approved: !t.approved } : t)
        )
        toast.success(`Témoignage ${testimonial.approved ? 'désapprouvé' : 'approuvé'}`)
      } else {
        toast.error('Erreur lors de la mise à jour du statut')
      }
    } catch (error) {
      console.error(error)
      toast.error('Erreur lors de la mise à jour du statut')
    } finally {
      setProcessing(null)
    }
  }

  const handleFeature = async (id: string) => {
    try {
      setProcessing(id)
      const testimonial = testimonials.find((t) => t.id === id)
      if (!testimonial) return

      const response = await fetch(`/api/testimonials/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ featured: !testimonial.featured }),
      })

      if (response.ok) {
        setTestimonials((prev) =>
          prev.map((t) => t.id === id ? { ...t, featured: !t.featured } : t)
        )
        toast.success(`Témoignage ${testimonial.featured ? 'retiré des' : 'ajouté aux'} témoignages mis en avant`)
      } else {
        toast.error('Erreur lors de la mise à jour du statut')
      }
    } catch (error) {
      console.error(error)
      toast.error('Erreur lors de la mise à jour du statut')
    } finally {
      setProcessing(null)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce témoignage ?')) return
    try {
      setProcessing(id)
      const response = await fetch(`/api/testimonials/${id}`, { method: 'DELETE' })

      if (response.ok) {
        setTestimonials((prev) => prev.filter((t) => t.id !== id))
        toast.success('Témoignage supprimé avec succès')
      } else {
        toast.error('Erreur lors de la suppression du témoignage')
      }
    } catch (error) {
      console.error(error)
      toast.error('Erreur lors de la suppression du témoignage')
    } finally {
      setProcessing(null)
    }
  }

  const handleReorder = async (id: string, direction: 'up' | 'down') => {
    try {
      setProcessing(id)
      const testimonial = testimonials.find((t) => t.id === id)
      if (!testimonial) return

      const newOrder = direction === 'up' ? testimonial.order - 1 : testimonial.order + 1

      const response = await fetch(`/api/testimonials/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ order: newOrder }),
      })

      if (response.ok) {
        await fetchTestimonials()
      } else {
        toast.error('Erreur lors de la réorganisation')
      }
    } catch (error) {
      console.error(error)
      toast.error('Erreur lors de la réorganisation')
    } finally {
      setProcessing(null)
    }
  }

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Témoignages</h1>

      <div className="grid gap-6">
        {testimonials.map((testimonial) => (
          <Card key={testimonial.id} className={testimonial.approved ? '' : 'opacity-75'}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xl font-medium">
                Témoignage de {testimonial.name}
              </CardTitle>
              <div className="flex items-center gap-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${testimonial.approved ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                  {testimonial.approved ? 'Approuvé' : 'En attente'}
                </span>
                <div className="flex gap-1">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="icon" onClick={() => handleApprove(testimonial.id)} disabled={processing === testimonial.id}>
                    {processing === testimonial.id ? <Loader2 className="h-4 w-4 animate-spin" /> : testimonial.approved ? <X className="h-4 w-4" /> : <Check className="h-4 w-4" />}
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleFeature(testimonial.id)} disabled={processing === testimonial.id} className={testimonial.featured ? 'text-yellow-400' : ''}>
                    <Star className={`h-4 w-4 ${testimonial.featured ? 'fill-yellow-400' : ''}`} />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleReorder(testimonial.id, 'up')} disabled={processing === testimonial.id}>
                    <ArrowUp className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleReorder(testimonial.id, 'down')} disabled={processing === testimonial.id}>
                    <ArrowDown className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(testimonial.id)} disabled={processing === testimonial.id} className="text-red-400 hover:text-red-600">
                    {processing === testimonial.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <X className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>{testimonial.role}</span>
                  <span>{testimonial.company}</span>
                  <span>{new Date(testimonial.createdAt).toLocaleDateString('fr-FR', {
                    day: 'numeric', month: 'long', year: 'numeric'
                  })}</span>
                </div>
                <p className="text-sm whitespace-pre-line">{testimonial.message}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8 flex justify-center gap-2">
        <Button variant="outline" onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}>
          Précédent
        </Button>
        <Button variant="outline" onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages}>
          Suivant
        </Button>
      </div>
    </div>
  )
}