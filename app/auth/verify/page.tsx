import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Vérifiez votre email',
  description: 'Un lien de connexion a été envoyé à votre adresse email',
}

export default function VerifyPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-lg text-center">
        <div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Vérifiez votre email
          </h2>
          <div className="mt-8 space-y-4">
            <p className="text-gray-600">
              Un lien de connexion a été envoyé à votre adresse email.
            </p>
            <p className="text-gray-600">
              Cliquez sur le lien dans l'email pour vous connecter.
            </p>
            <p className="text-sm text-gray-500 mt-4">
              Si vous ne recevez pas l'email dans les prochaines minutes, vérifiez votre dossier spam.
            </p>
            <p className="text-gray-400">Votre compte a été vérifié avec succès. Vous pouvez maintenant vous connecter à l&apos;interface d&apos;administration.</p>
          </div>
        </div>
      </div>
    </div>
  )
} 