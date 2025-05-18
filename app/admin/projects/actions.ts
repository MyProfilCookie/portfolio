'use server'

import { revalidatePath } from 'next/cache'
import { prisma } from '@/lib/prisma'

export async function getProjects() {
  try {
    const projects = await prisma.project.findMany({
      include: {
        technologies: true
      },
      orderBy: {
        order: 'asc'
      }
    })
    return { success: true, data: projects }
  } catch (error) {
    console.error('Error fetching projects:', error)
    return { success: false, error: 'Erreur lors de la récupération des projets' }
  }
}

export async function createProject(formData: FormData) {
  try {
    const title = formData.get('title') as string
    const description = formData.get('description') as string
    const imageUrl = formData.get('imageUrl') as string
    const githubUrl = formData.get('githubUrl') as string
    const liveUrl = formData.get('liveUrl') as string
    const order = parseInt(formData.get('order') as string)
    const featured = formData.get('featured') === 'on'
    
    const project = await prisma.project.create({
      data: {
        title,
        description,
        imageUrl,
        githubUrl,
        liveUrl,
        order,
        featured
      },
      include: {
        technologies: true
      }
    })
    
    revalidatePath('/admin/projects')
    return { success: true, data: project }
  } catch (error) {
    console.error('Error creating project:', error)
    return { success: false, error: 'Erreur lors de la création du projet' }
  }
}

export async function updateProject(id: string, formData: FormData) {
  try {
    const title = formData.get('title') as string
    const description = formData.get('description') as string
    const imageUrl = formData.get('imageUrl') as string
    const githubUrl = formData.get('githubUrl') as string
    const liveUrl = formData.get('liveUrl') as string
    const order = parseInt(formData.get('order') as string)
    const featured = formData.get('featured') === 'on'
    
    const project = await prisma.project.update({
      where: { id },
      data: {
        title,
        description,
        imageUrl,
        githubUrl,
        liveUrl,
        order,
        featured
      },
      include: {
        technologies: true
      }
    })
    
    revalidatePath('/admin/projects')
    return { success: true, data: project }
  } catch (error) {
    console.error('Error updating project:', error)
    return { success: false, error: 'Erreur lors de la mise à jour du projet' }
  }
}

export async function deleteProject(id: string) {
  try {
    await prisma.project.delete({
      where: { id }
    })
    
    revalidatePath('/admin/projects')
    return { success: true }
  } catch (error) {
    console.error('Error deleting project:', error)
    return { success: false, error: 'Erreur lors de la suppression du projet' }
  }
} 