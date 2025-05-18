import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { projectSchema } from '@/lib/validations'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const json = await request.json()
    const validatedData = projectSchema.parse(json)

    const project = await prisma.project.update({
      where: { id: params.id },
      data: {
        title: validatedData.title,
        description: validatedData.description,
        imageUrl: validatedData.imageUrl,
        githubUrl: validatedData.githubUrl,
        liveUrl: validatedData.liveUrl,
        order: validatedData.order,
        featured: validatedData.featured,
        technologies: {
          set: [], // Déconnecter toutes les technologies existantes
          connect: validatedData.technologies.map((tech) => ({ id: tech })),
        },
      },
      include: {
        technologies: true,
      },
    })

    return NextResponse.json(project)
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError && error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Projet non trouvé' },
        { status: 404 }
      )
    }
    console.error('Error updating project:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.project.delete({
      where: { id: params.id },
    })

    return new NextResponse(null, { status: 204 })
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError && error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Projet non trouvé' },
        { status: 404 }
      )
    }
    console.error('Error deleting project:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
} 