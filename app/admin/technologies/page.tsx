'use client'

import { useState, useEffect } from 'react'
import { Plus, Pencil, Trash } from 'lucide-react'
import TechnologyForm from './technology-form'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import Image from 'next/image';

interface Technology {
  id: string
  name: string
  icon: string
  createdAt: Date
  updatedAt: Date
}

async function getTechnologies(): Promise<Technology[]> {
  const res = await fetch('/api/technologies')
  if (!res.ok) throw new Error('Failed to fetch technologies')
  return res.json()
}

export default function TechnologiesPage() {
  const [technologies, setTechnologies] = useState<Technology[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [selectedTechnology, setSelectedTechnology] = useState<Technology | null>(null)

  useEffect(() => {
    getTechnologies()
      .then(setTechnologies)
      .finally(() => setIsLoading(false))
  }, [])

  const handleCreate = () => {
    setSelectedTechnology(null)
    setIsFormOpen(true)
  }

  const handleEdit = (technology: Technology) => {
    setSelectedTechnology(technology)
    setIsFormOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette technologie ?')) return

    try {
      const res = await fetch(`/api/technologies/${id}`, {
        method: 'DELETE',
      })

      if (!res.ok) throw new Error('Failed to delete technology')

      setTechnologies(technologies.filter(t => t.id !== id))
    } catch (error) {
      console.error('Error deleting technology:', error)
      alert('Une erreur est survenue lors de la suppression de la technologie')
    }
  }

  const handleFormSubmit = async (formData: any) => {
    try {
      const method = selectedTechnology ? 'PATCH' : 'POST'
      const url = selectedTechnology 
        ? `/api/technologies/${selectedTechnology.id}`
        : '/api/technologies'

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!res.ok) throw new Error('Failed to save technology')

      const savedTechnology = await res.json()

      setTechnologies(prevTechnologies => {
        if (selectedTechnology) {
          return prevTechnologies.map(t => 
            t.id === savedTechnology.id ? savedTechnology : t
          )
        }
        return [...prevTechnologies, savedTechnology]
      })

      setIsFormOpen(false)
      setSelectedTechnology(null)
    } catch (error) {
      console.error('Error saving technology:', error)
      alert('Une erreur est survenue lors de l\'enregistrement de la technologie')
    }
  }

  if (isLoading) {
    return <div className="text-foreground">Chargement...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-cyan-200 text-transparent bg-clip-text">
          Technologies
        </h1>
        <Button onClick={() => setIsFormOpen(true)} className="bg-gradient-to-r from-cyan-500 to-cyan-400 text-white hover:from-cyan-600 hover:to-cyan-500">
          Ajouter une technologie
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {technologies.map((technology) => (
          <Card key={technology.id} className="border-cyan-500/20 bg-black/30 backdrop-blur-sm group hover:border-cyan-500/40 transition-colors">
            <div className="overflow-hidden">
              <div className="h-36 w-full">
                <Image
                  className="h-full w-full object-cover"
                  src={technology.icon}
                  alt={technology.name}
                  width={144}
                  height={144}
                  priority={true}
                />
              </div>
              <div className="p-4">
                <div className="text-sm font-medium text-foreground/90 group-hover:text-foreground transition-colors">
                  {technology.name}
                </div>
                <div className="text-sm text-muted-foreground">
                  {technology.createdAt ? new Date(technology.createdAt).toLocaleDateString() : 'Date non disponible'}
                </div>
              </div>
            </div>
            <div className="p-4 border-t border-cyan-500/20">
              <div className="flex justify-between items-center">
                <button
                  onClick={() => handleEdit(technology)}
                  className="text-cyan-400/70 hover:text-cyan-400 mr-4 transition-colors"
                >
                  <Pencil className="h-5 w-5" />
                </button>
                <button
                  onClick={() => handleDelete(technology.id)}
                  className="text-red-400/70 hover:text-red-400 transition-colors"
                >
                  <Trash className="h-5 w-5" />
                </button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {isLoading && (
        <div className="flex items-center justify-center py-8">
          <div className="text-cyan-400/70 animate-pulse">Chargement...</div>
        </div>
      )}

      {!isLoading && technologies.length === 0 && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">Aucune technologie n&apos;a été ajoutée.</p>
        </div>
      )}

      {isFormOpen && (
        <TechnologyForm
          technology={selectedTechnology}
          onSubmit={handleFormSubmit}
          onCancel={() => {
            setIsFormOpen(false)
            setSelectedTechnology(null)
          }}
        />
      )}
    </div>
  )
}