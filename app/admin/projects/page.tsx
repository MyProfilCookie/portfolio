/* eslint-disable @next/next/no-img-element */
'use client'

import { useState, useEffect } from 'react'
import { Plus, Pencil, Trash } from 'lucide-react'
import { Project, Technology } from '@prisma/client'
import ProjectForm from '@/components/project-form'
import { getProjects, createProject, updateProject, deleteProject } from './actions'
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

type ProjectWithTechnologies = Project & {
  technologies: Technology[]
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<ProjectWithTechnologies[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState<ProjectWithTechnologies | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadProjects()
  }, [])

  async function loadProjects() {
    try {
      const response = await fetch('/api/projects')
      if (!response.ok) throw new Error('Erreur lors du chargement des projets')
      const data = await response.json()
      setProjects(data)
    } catch (error) {
      console.error('Error loading projects:', error)
      setError('Une erreur est survenue lors du chargement des projets')
    } finally {
      setIsLoading(false)
    }
  }

  const handleCreate = () => {
    setSelectedProject(null)
    setIsFormOpen(true)
  }

  const handleEdit = (project: ProjectWithTechnologies) => {
    setSelectedProject(project)
    setIsFormOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce projet ?')) return

    try {
      const response = await fetch(`/api/projects/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) throw new Error('Erreur lors de la suppression')

      setProjects(projects.filter(p => p.id !== id))
    } catch (error) {
      console.error('Error deleting project:', error)
      alert('Une erreur est survenue lors de la suppression du projet')
    }
  }

  const handleFormSubmit = async (formData: FormData) => {
    try {
      const url = selectedProject 
        ? `/api/projects/${selectedProject.id}`
        : '/api/projects'

      const response = await fetch(url, {
        method: selectedProject ? 'PATCH' : 'POST',
        body: formData,
      })

      if (!response.ok) throw new Error('Erreur lors de l\'enregistrement')

      await loadProjects()
      setIsFormOpen(false)
      setSelectedProject(null)
    } catch (error) {
      console.error('Error saving project:', error)
      alert('Une erreur est survenue lors de l\'enregistrement du projet')
    }
  }

  if (isLoading) {
    return <div>Chargement...</div>
  }

  if (error) {
    return <div className="text-red-500">Erreur: {error}</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-cyan-200 text-transparent bg-clip-text">
          Projets
        </h1>
        <Button onClick={() => setIsFormOpen(true)} className="bg-gradient-to-r from-cyan-500 to-cyan-400 text-white hover:from-cyan-600 hover:to-cyan-500">
          Ajouter un projet
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <Card key={project.id} className="border-cyan-500/20 bg-black/30 backdrop-blur-sm group hover:border-cyan-500/40 transition-colors">
            <div className="flex items-start space-x-4">
              <div className="h-12 w-12 flex-shrink-0">
                <div className="h-12 w-12 rounded-full bg-cyan-500/10 overflow-hidden ring-1 ring-cyan-500/20">
                  {project.imageUrl && (
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="h-full w-full object-cover"
                    />
                  )}
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-foreground truncate">
                    {project.title}
                  </h3>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleEdit(project)}
                      className="text-cyan-400/70 hover:text-cyan-400 transition-colors p-2"
                    >
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(project.id)}
                      className="text-red-400/70 hover:text-red-400 transition-colors p-2"
                    >
                      <Trash className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                  {project.description}
                </p>
                <div className="mt-2 flex flex-wrap gap-1">
                  {project.technologies.slice(0, 2).map((tech) => (
                    <Badge 
                      key={tech.id} 
                      text={tech.name}
                      variant="default"
                    />
                  ))}
                  {project.technologies.length > 2 && (
                    <span className="text-xs text-muted-foreground">
                      +{project.technologies.length - 2}
                    </span>
                  )}
                </div>
                <div className="mt-2 flex items-center space-x-4 text-xs text-muted-foreground">
                  <span>Ordre: {project.order}</span>
                  <span className={`px-2 py-0.5 rounded-full ${
                    project.featured
                      ? 'bg-green-500/20 text-green-400'
                      : 'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {project.featured ? 'Mis en avant' : 'Standard'}
                  </span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {isFormOpen && (
        <ProjectForm
          project={selectedProject || undefined}
          onSubmit={handleFormSubmit}
          onCancel={() => {
            setIsFormOpen(false)
            setSelectedProject(null)
          }}
        />
      )}
    </div>
  )
} 