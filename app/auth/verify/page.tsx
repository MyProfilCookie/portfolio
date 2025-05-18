import { Metadata } from 'next'
import VerifyClient from '@/components/VerifyClient'

export const metadata: Metadata = {
  title: 'Vérifiez votre email',
  description: 'Un lien de connexion a été envoyé à votre adresse email',
}

export default function VerifyPage() {
  return <VerifyClient />
}