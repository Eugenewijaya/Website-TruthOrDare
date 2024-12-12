import TruthOrDare from '@/components/TruthOrDare'
import { MovingBanner } from '@/components/MovingBanner'
import { Footer } from '@/components/Footer'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <MovingBanner />
      <main className="flex-grow flex flex-col items-center justify-center p-4">
        <h1 className="text-4xl md:text-6xl font-bold text-black mb-8 text-center">Truth or Dare</h1>
        <TruthOrDare />
      </main>
      <Footer />
    </div>
  )
}

