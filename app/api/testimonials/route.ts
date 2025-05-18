import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const testimonialSchema = z.object({
  name: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  role: z.string().min(2, 'Le rôle doit contenir au moins 2 caractères'),
  company: z.string().min(2, 'Le nom de l\'entreprise doit contenir au moins 2 caractères'),
  message: z.string().min(10, 'Le témoignage doit contenir au moins 10 caractères'),
  rating: z.number().min(1).max(5),
  imageUrl: z.string().optional(),
})

// GET /api/testimonials
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const approved = searchParams.get('approved')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const skip = (page - 1) * limit

    const where = approved ? { approved: approved === 'true' } : {}

    const [testimonials, total] = await Promise.all([
      prisma.testimonial.findMany({
        where,
        skip,
        take: limit,
        orderBy: {
          createdAt: 'desc'
        }
      }),
      prisma.testimonial.count({ where })
    ])

    return NextResponse.json({
      success: true,
      testimonials,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Erreur lors de la récupération des témoignages:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des témoignages' },
      { status: 500 }
    )
  }
}

// POST /api/testimonials
export async function POST(request: Request) {
  try {
    await prisma.$connect()
    console.log('✅ Connexion à la base de données réussie')

    const body = await request.json()
    console.log('📝 Données reçues:', body)
    
    const validatedData = testimonialSchema.parse(body)
    console.log('✅ Données validées:', validatedData)

    const testimonial = await prisma.testimonial.create({
      data: {
        ...validatedData,
        approved: false,
        featured: false,
        order: 0,
      },
    })

    console.log('✅ Témoignage créé:', testimonial)

    return NextResponse.json({ 
      message: 'Témoignage envoyé avec succès',
      data: testimonial 
    }, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('❌ Erreur de validation:', error.errors)
      return NextResponse.json(
        { error: 'Données invalides', details: error.errors },
        { status: 400 }
      )
    }

    console.error('❌ Erreur détaillée:', error)
    return NextResponse.json(
      { error: 'Erreur lors de l\'envoi du témoignage' },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}

// PATCH /api/testimonials
export async function PATCH(request: Request) {
  try {
    const data = await request.json()
    const { id, ...updateData } = data

    if (!id) {
      return NextResponse.json(
        { error: 'ID du témoignage requis' },
        { status: 400 }
      )
    }

    const testimonial = await prisma.testimonial.update({
      where: { id },
      data: updateData,
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

// DELETE /api/testimonials
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { error: 'ID du témoignage requis' },
        { status: 400 }
      )
    }

    await prisma.testimonial.delete({
      where: { id },
    })
    return NextResponse.json({ message: 'Témoignage supprimé avec succès' })
  } catch (error) {
    console.error('Erreur lors de la suppression du témoignage:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la suppression du témoignage' },
      { status: 500 }
    )
  }
} 