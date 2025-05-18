import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// GET /api/messages
export async function GET() {
  try {
    const messages = await prisma.contact.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    })
    return NextResponse.json(messages)
  } catch (error) {
    console.error('Erreur lors de la récupération des messages:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des messages' },
      { status: 500 }
    )
  }
}

// POST /api/messages
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const message = await prisma.contact.create({
      data: body
    })
    return NextResponse.json(message)
  } catch (error) {
    console.error('Erreur lors de la création du message:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la création du message' },
      { status: 500 }
    )
  }
}

// PATCH /api/messages/[id]
export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const message = await prisma.contact.update({
      where: { id: params.id },
      data: body
    })
    return NextResponse.json(message)
  } catch (error) {
    console.error('Erreur lors de la mise à jour du message:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la mise à jour du message' },
      { status: 500 }
    )
  }
}

// DELETE /api/messages/[id]
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.contact.delete({
      where: { id: params.id }
    })
    return NextResponse.json({ message: 'Message supprimé avec succès' })
  } catch (error) {
    console.error('Erreur lors de la suppression du message:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la suppression du message' },
      { status: 500 }
    )
  }
} 