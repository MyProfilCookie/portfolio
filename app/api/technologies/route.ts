import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// GET /api/technologies
export async function GET() {
  try {
    const technologies = await prisma.technology.findMany({
      orderBy: {
        name: 'asc'
      }
    })
    return NextResponse.json(technologies)
  } catch (error) {
    console.error('Erreur lors de la récupération des technologies:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des technologies' },
      { status: 500 }
    )
  }
}

// POST /api/technologies
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const technology = await prisma.technology.create({
      data: body
    })
    return NextResponse.json(technology)
  } catch (error) {
    console.error('Erreur lors de la création de la technologie:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la création de la technologie' },
      { status: 500 }
    )
  }
}

// PATCH /api/technologies/[id]
export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const technology = await prisma.technology.update({
      where: { id: params.id },
      data: body
    })
    return NextResponse.json(technology)
  } catch (error) {
    console.error('Erreur lors de la mise à jour de la technologie:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la mise à jour de la technologie' },
      { status: 500 }
    )
  }
}

// DELETE /api/technologies/[id]
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.technology.delete({
      where: { id: params.id }
    })
    return NextResponse.json({ message: 'Technologie supprimée avec succès' })
  } catch (error) {
    console.error('Erreur lors de la suppression de la technologie:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la suppression de la technologie' },
      { status: 500 }
    )
  }
} 