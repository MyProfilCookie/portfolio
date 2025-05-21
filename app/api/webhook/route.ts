import { NextResponse } from "next/server";
import Stripe from "stripe";
import { PrismaClient } from "@prisma/client";
import { Resend } from "resend";

const prisma = new PrismaClient();
const resend = new Resend(process.env.RESEND_API_KEY || "");

export async function POST(req: Request) {
  const stripeSecret = process.env.STRIPE_SECRET_KEY;
  const stripeWebhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!stripeSecret || !stripeWebhookSecret) {
    console.error("Stripe configuration is missing");
    return NextResponse.json(
      { error: "Missing Stripe config" },
      { status: 500 }
    );
  }

  const stripe = new Stripe(stripeSecret, {
    apiVersion: "2025-03-31.basil",
  });

  const body = await req.text();
  const signature = req.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json(
      { error: "Missing stripe-signature header" },
      { status: 400 }
    );
  }

  try {
    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      stripeWebhookSecret
    );

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;

      const payment = await prisma.payment.update({
        where: { stripeId: session.id },
        data: {
          status: "completed",
          amount: session.amount_total ? session.amount_total / 100 : 0,
        },
        include: { client: true },
      });

      if (!payment.emailSent) {
        await resend.emails.send({
          from: "noreply@votredomaine.com",
          to: payment.client.email,
          subject: "Confirmation de votre paiement",
          html: `<p>Merci ${payment.client.firstName}, votre paiement a bien été reçu.</p>`,
        });

        await prisma.payment.update({
          where: { id: payment.id },
          data: { emailSent: true },
        });
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Erreur webhook:", error);
    return NextResponse.json({ error: "Webhook error" }, { status: 400 });
  }
}
