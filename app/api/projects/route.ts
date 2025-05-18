import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// GET /api/projects
export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      include: {
        technologies: true
      },
      orderBy: {
        order: 'asc'
      }
    })
    return NextResponse.json(projects)
  } catch (error) {
    console.error('Error fetching projects:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des projets' },
      { status: 500 }
    )
  }
}

// POST /api/projects
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { title, description, imageUrl, githubUrl, liveUrl, order, featured, technologies } = body

    // Vérifier si les technologies existent, sinon les créer
    const technologyPromises = technologies.map(async (techName: string) => {
      return prisma.technology.upsert({
        where: { name: techName },
        update: {},
        create: {
          name: techName,
          icon: techName.toLowerCase(),
        },
      })
    })

    const createdTechnologies = await Promise.all(technologyPromises)

    const project = await prisma.project.create({
      data: {
        title,
        description,
        imageUrl,
        githubUrl,
        liveUrl,
        order,
        featured,
        technologies: {
          connect: createdTechnologies.map(tech => ({ id: tech.id })),
        },
      },
      include: {
        technologies: true
      }
    })

    return NextResponse.json(project)
  } catch (error) {
    console.error('Error creating project:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la création du projet' },
      { status: 500 }
    )
  }
}

// PATCH /api/projects/[id]
export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const { technologies, ...projectData } = body

    const project = await prisma.project.update({
      where: { id: params.id },
      data: {
        ...projectData,
        technologies: {
          set: technologies.map((id: string) => ({ id }))
        }
      },
      include: {
        technologies: true
      }
    })

    return NextResponse.json(project)
  } catch (error) {
    console.error('Erreur lors de la mise à jour du projet:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la mise à jour du projet' },
      { status: 500 }
    )
  }
}

// DELETE /api/projects/[id]
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.project.delete({
      where: { id: params.id }
    })

    return NextResponse.json({ message: 'Projet supprimé avec succès' })
  } catch (error) {
    console.error('Erreur lors de la suppression du projet:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la suppression du projet' },
      { status: 500 }
    )
  }
} 