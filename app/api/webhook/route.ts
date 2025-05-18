import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { PrismaClient } from '@prisma/client';
import { Resend } from 'resend';

const prisma = new PrismaClient();
const resend = new Resend(process.env.RESEND_API_KEY);

if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_WEBHOOK_SECRET) {
  throw new Error('Stripe configuration is missing');
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2025-03-31.basil',
});

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get('stripe-signature');

  if (!signature) {
    return NextResponse.json(
      { error: 'Missing stripe-signature header' },
      { status: 400 }
    );
  }

  try {
    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET || ''
    );

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      
      // Mettre à jour le paiement
      const payment = await prisma.payment.update({
        where: { stripeId: session.id },
        data: {
          status: 'completed',
          amount: session.amount_total ? session.amount_total / 100 : 0,
        },
        include: {
          client: true,
        },
      });

      // Envoyer l'email de confirmation
      if (!payment.emailSent) {
        await resend.emails.send({
          from: 'noreply@votredomaine.com',
          to: payment.client.email,
          subject: 'Confirmation de votre paiement',
          html: `
            <h1>Merci pour votre achat !</h1>
            <p>Bonjour ${payment.client.firstName},</p>
            <p>Nous confirmons votre paiement pour le plan ${payment.planName}.</p>
            <p>Montant : ${payment.amount} ${payment.currency}</p>
            <p>Numéro de transaction : ${payment.stripeId}</p>
            <p>Date : ${new Date().toLocaleDateString('fr-FR')}</p>
            <br/>
            <p>Si vous avez des questions, n'hésitez pas à nous contacter.</p>
            <p>Cordialement,<br/>L'équipe</p>
          `,
        });

        // Marquer l'email comme envoyé
        await prisma.payment.update({
          where: { id: payment.id },
          data: { emailSent: true },
        });
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Erreur webhook:', error);
    return NextResponse.json(
      { error: 'Webhook error' },
      { status: 400 }
    );
  }
} 