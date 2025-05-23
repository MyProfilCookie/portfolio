'use client'

import { useSearchParams } from 'next/navigation'

export default function VerifyClient() {
    const searchParams = useSearchParams()

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-lg text-center">
                <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                    Vérifiez votre email
                </h2>
                <div className="mt-8 space-y-4">
                    <p className="text-gray-600">
                        Un lien de connexion a été envoyé à votre adresse email.
                    </p>
                    <p className="text-gray-600">
                        Cliquez sur le lien dans l&apos;email pour vous connecter.
                    </p>
                    <p className="text-sm text-gray-500 mt-4">
                        Si vous ne recevez pas l&apos;email dans les prochaines minutes, vérifiez votre dossier spam.
                    </p>
                    <p className="text-gray-400">
                        Votre compte a été vérifié avec succès. Vous pouvez maintenant vous connecter à l&apos;interface d&apos;administration.
                    </p>

                    {searchParams?.get('expired') === 'true' && (
                        <p className="text-yellow-600 mb-4">
                            The verification link has expired. A new one has been sent to your email.
                        </p>
                    )}

                    {searchParams?.get('verified') === 'true' && (
                        <p className="text-green-600 mb-4">
                            Your email has been successfully verified! You can now log in.
                        </p>
                    )}
                </div>
            </div>
        </div>
    )
}