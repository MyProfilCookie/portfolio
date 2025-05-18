'use client'

import { useState } from 'react'
import { X } from 'lucide-react'

interface Technology {
  id: string
  name: string
  icon: string
}

interface TechnologyFormProps {
  technology?: Technology | null
  onSubmit: (data: { name: string; icon: string }) => void
  onCancel: () => void
}

export default function TechnologyForm({ technology, onSubmit, onCancel }: TechnologyFormProps) {
  const [name, setName] = useState(technology?.name || '')
  const [icon, setIcon] = useState(technology?.icon || '')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({ name, icon })
  }

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm">
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <div className="relative w-full max-w-md">
          <div className="relative bg-background border border-cyan-500/20 rounded-lg shadow-lg">
            <div className="flex items-center justify-between p-4 border-b border-cyan-500/20">
              <h3 className="text-lg font-medium bg-gradient-to-r from-cyan-400 to-cyan-200 text-transparent bg-clip-text">
                {technology ? 'Modifier la technologie' : 'Nouvelle technologie'}
              </h3>
              <button
                onClick={onCancel}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-4 space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-muted-foreground">
                  Nom
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 block w-full rounded-md border border-cyan-500/20 bg-background/50 px-3 py-2 text-sm placeholder:text-muted-foreground focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                  placeholder="React, Vue, Angular..."
                  required
                />
              </div>

              <div>
                <label htmlFor="icon" className="block text-sm font-medium text-muted-foreground">
                  URL de l&apos;icône
                </label>
                <input
                  type="url"
                  id="icon"
                  value={icon}
                  onChange={(e) => setIcon(e.target.value)}
                  className="mt-1 block w-full rounded-md border border-cyan-500/20 bg-background/50 px-3 py-2 text-sm placeholder:text-muted-foreground focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                  placeholder="https://example.com/icon.png"
                  required
                />
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={onCancel}
                  className="px-4 py-2 text-sm font-medium rounded-md border border-cyan-500/20 text-foreground hover:bg-cyan-500/5 transition-colors"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium rounded-md text-black bg-cyan-400 hover:bg-cyan-300 transition-colors"
                >
                  {technology ? 'Mettre à jour' : 'Créer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
} 