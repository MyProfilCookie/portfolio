'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Mail } from 'lucide-react'

export default function VerifyRequest() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-gray-900 to-black p-4">
      <Card className="w-full max-w-md border-cyan-800 bg-gray-900/50 text-white">
        <CardHeader className="space-y-1">
          <div className="flex justify-center">
            <Mail className="h-12 w-12 text-cyan-500" />
          </div>
          <CardTitle className="text-2xl font-bold text-center">Vérifiez votre email</CardTitle>
          <CardDescription className="text-center text-gray-400">
            Un lien de connexion a été envoyé à votre adresse email
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-center text-gray-300">
            Cliquez sur le lien dans l&apos;email pour vous connecter à votre compte administrateur.
          </p>
          <p className="text-center text-sm text-gray-400">
            Si vous ne recevez pas l&apos;email dans les prochaines minutes, vérifiez votre dossier spam.
          </p>
        </CardContent>
      </Card>
    </div>
  )
} 