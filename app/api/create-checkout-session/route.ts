import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { PrismaClient } from '@prisma/client';
import { Resend } from 'resend';

const prisma = new PrismaClient();
const resend = new Resend(process.env.RESEND_API_KEY);

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not defined');
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2025-03-31.basil',
});

export async function POST(req: Request) {
  try {
    const { 
      priceId, 
      firstName,
      lastName,
      email,
      phone,
      address,
      siret,
      planName
    } = await req.json();

    if (!priceId || !firstName || !lastName || !email || !phone || !address) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Créer ou mettre à jour le client
    const client = await prisma.client.upsert({
      where: { email },
      update: {
        firstName,
        lastName,
        phone,
        address,
        siret,
      },
      create: {
        firstName,
        lastName,
        email,
        phone,
        address,
        siret,
      },
    });

    // Créer la session Stripe
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/tarifs`,
      customer_email: email,
      metadata: {
        clientId: client.id,
        planId: priceId,
        planName,
      },
    });

    // Créer l'enregistrement de paiement
    await prisma.payment.create({
      data: {
        amount: session.amount_total ? session.amount_total / 100 : 0,
        currency: session.currency || 'EUR',
        status: 'pending',
        stripeId: session.id,
        planId: priceId,
        planName,
        clientId: client.id,
      },
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (error) {
    console.error('Erreur lors de la création de la session:', error);
    
    if (error instanceof Stripe.errors.StripeError) {
      return NextResponse.json(
        { error: error.message },
        { status: error.statusCode || 500 }
      );
    }
    
    return NextResponse.json(
      { error: 'Erreur lors de la création de la session de paiement' },
      { status: 500 }
    );
  }
} 