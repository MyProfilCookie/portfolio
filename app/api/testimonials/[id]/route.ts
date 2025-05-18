import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { testimonialSchema } from '@/lib/validations'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { ZodError } from 'zod'

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const { approved, featured, order } = body

    const testimonial = await prisma.testimonial.update({
      where: { id: params.id },
      data: {
        ...(approved !== undefined && { approved }),
        ...(featured !== undefined && { featured }),
        ...(order !== undefined && { order }),
      },
    })

    return NextResponse.json(testimonial)
  } catch (error) {
    console.error('Erreur lors de la mise à jour du témoignage:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la mise à jour du témoignage' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.testimonial.delete({
      where: { id: params.id },
    })

    return NextResponse.json(
      { message: 'Témoignage supprimé avec succès' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Erreur lors de la suppression du témoignage:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la suppression du témoignage' },
      { status: 500 }
    )
  }
} 