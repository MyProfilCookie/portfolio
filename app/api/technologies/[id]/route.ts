import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { technologySchema } from '@/lib/validations'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { ZodError } from 'zod'

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const json = await request.json()
    const validatedData = technologySchema.parse(json)

    const technology = await prisma.technology.update({
      where: { id: params.id },
      data: validatedData,
      include: {
        projects: true,
      },
    })

    return NextResponse.json(technology)
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: 'Données invalides', details: error.errors },
        { status: 400 }
      )
    }
    if (error instanceof PrismaClientKnownRequestError && error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Technologie non trouvée' },
        { status: 404 }
      )
    }
    console.error('Error updating technology:', error)
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
    await prisma.technology.delete({
      where: { id: params.id },
    })

    return new NextResponse(null, { status: 204 })
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError && error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Technologie non trouvée' },
        { status: 404 }
      )
    }
    console.error('Error deleting technology:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
} 