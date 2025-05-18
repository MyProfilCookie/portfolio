'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { AlertCircle } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

export default function AuthError() {
  const searchParams = useSearchParams()
  const error = searchParams.get('error')

  const getErrorMessage = (error: string | null) => {
    switch (error) {
      case 'Configuration':
        return 'Il y a un problème avec la configuration du serveur.'
      case 'AccessDenied':
        return 'Vous n\'avez pas l\'autorisation d\'accéder à cette page.'
      case 'Verification':
        return 'Le lien de vérification a expiré ou a déjà été utilisé.'
      default:
        return 'Une erreur est survenue lors de l&apos;authentification.'
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-gray-900 to-black p-4">
      <Card className="w-full max-w-md border-red-800 bg-gray-900/50 text-white">
        <CardHeader className="space-y-1">
          <div className="flex justify-center">
            <AlertCircle className="h-12 w-12 text-red-500" />
          </div>
          <CardTitle className="text-2xl font-bold text-center">Erreur d&apos;authentification</CardTitle>
          <CardDescription className="text-center text-gray-400">
            {getErrorMessage(error)}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-center">
            <Button asChild variant="outline" className="border-cyan-500 text-cyan-500 hover:bg-cyan-500/10">
              <Link href="/auth/signin">
                Retour à la connexion
              </Link>
            </Button>
          </div>
          <div className="text-red-500 mt-4">
            {error === "Verification" && (
              <p>
                The verification link is invalid or has expired. Please request a new link via email.
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}