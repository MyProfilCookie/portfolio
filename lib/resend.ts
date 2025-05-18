import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendContactNotification(contact: {
  name: string
  email: string
  message: string
}) {
  try {
    await resend.emails.send({
      from: 'Contact Form <contact@votredomaine.com>',
      to: process.env.ADMIN_EMAIL!,
      subject: `Nouveau message de ${contact.name}`,
      html: `
        <h2>Nouveau message de contact</h2>
        <p><strong>Nom :</strong> ${contact.name}</p>
        <p><strong>Email :</strong> ${contact.email}</p>
        <p><strong>Message :</strong></p>
        <p>${contact.message}</p>
      `,
    })
  } catch (error) {
    console.error('Error sending contact notification:', error)
  }
}

export async function sendPaymentConfirmation(payment: {
  client: {
    firstName: string
    email: string
  }
  planName: string
  amount: number
}) {
  try {
    await resend.emails.send({
      from: 'Votre Entreprise <no-reply@votredomaine.com>',
      to: payment.client.email,
      subject: 'Confirmation de paiement',
      html: `
        <h2>Merci pour votre paiement !</h2>
        <p>Bonjour ${payment.client.firstName},</p>
        <p>Nous confirmons la réception de votre paiement de ${payment.amount}€ pour le plan "${payment.planName}".</p>
        <p>Nous vous contacterons prochainement pour démarrer notre collaboration.</p>
        <p>Cordialement,<br>L'équipe</p>
      `,
    })
  } catch (error) {
    console.error('Error sending payment confirmation:', error)
  }
} 