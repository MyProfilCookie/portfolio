import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { read } = await request.json();

    const message = await prisma.contactMessage.update({
      where: { id: params.id },
      data: { read },
    });

    return new NextResponse(
      JSON.stringify(message),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    console.error('Erreur lors de la mise à jour du message:', error);
    return new NextResponse(
      JSON.stringify({ error: 'Erreur lors de la mise à jour du message' }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.contactMessage.delete({
      where: { id: params.id },
    });

    return new NextResponse(
      JSON.stringify({ message: 'Message supprimé avec succès' }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    console.error('Erreur lors de la suppression du message:', error);
    return new NextResponse(
      JSON.stringify({ error: 'Erreur lors de la suppression du message' }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
} 