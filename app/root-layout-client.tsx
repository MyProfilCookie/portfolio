'use client'

import { ThemeProvider } from '@/components/ui/theme-provider'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import BackgroundGrid from '@/components/background-grid'

export default function RootLayoutClient({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-950">
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem={false}
        disableTransitionOnChange
      >
        {/* <BackgroundGrid /> */}
        <div className="relative">
          {/* <div className="fixed inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.02] z-[-1]" /> */}
          <Navbar />
          <main className="pt-30 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:4rem_4rem] bg-black text-white relative overflow-hidden">
            {children}
          </main>
          <Footer />
        </div>
      </ThemeProvider>
    </div>
  )
} 