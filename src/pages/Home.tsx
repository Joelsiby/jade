import { useState } from 'react'
import '../App.css'

export default function Home() {
  const [introFinished, setIntroFinished] = useState(false)
  const [count, setCount] = useState(0)

  return (
    <main className="relative min-h-screen w-full bg-[#FDFBF7]">
      {!introFinished && (
        <div onClick={() => setIntroFinished(true)}>Intro Placeholder (Click to skip)</div>
      )}

      {/* Main Content (fades in after intro) */}
      <div 
        className={`transition-opacity duration-1000 ease-in-out ${
          introFinished ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="container mx-auto px-4 py-20 flex flex-col items-center justify-center min-h-screen">
          <h1 className="text-5xl font-serif text-amber-900 mb-8">Jade Theme</h1>
          <div className="card bg-white/50 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-amber-900/10">
            <button 
              onClick={() => setCount((count) => count + 1)}
              className="px-6 py-3 bg-amber-800 text-white rounded-lg hover:bg-amber-900 transition-colors"
            >
              count is {count}
            </button>
            <p className="mt-6 text-amber-950/70">
              Edit <code>src/pages/Home.tsx</code> and save to test HMR
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
