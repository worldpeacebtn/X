import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { Suspense } from "react";

export default function App() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden">

      {/* 3D Background */}
      <Canvas className="absolute inset-0 w-full h-full !z-0">
        <Suspense fallback={null}>
          <Stars radius={80} depth={50} count={5000} factor={4} saturation={0} fade />
          <OrbitControls enableZoom={false} enablePan={false} />
        </Suspense>
      </Canvas>

      {/* Content */}
      <div className="relative z-10 p-6 md:p-12">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            X42 | Witness Briefing
          </h1>
          <p className="text-gray-300 mt-2">
            Preliminary Public Disclosure – for Safety, Legal Preservation & Documentation
          </p>
        </header>

        <section className="max-w-3xl mx-auto space-y-10">

          <div className="rounded-xl bg-white/5 border border-purple-500/20 p-6 shadow-lg backdrop-blur">
            <h2 className="text-2xl font-semibold text-purple-300 mb-2">1. Identity</h2>
            <p>
              Witness X – anonymized spokesperson for multiple victims of digital, structural
              and organized exploitation cases. Working on safety-tech, reconstruction and early-warning systems.
            </p>
          </div>

          <div className="rounded-xl bg-white/5 border border-blue-500/20 p-6 shadow-lg backdrop-blur">
            <h2 className="text-2xl font-semibold text-blue-300 mb-2">2. Situation Overview</h2>
            <p>
              Documented overlap of criminal actors, digital interference, homelessness risk,
              resource deprivation, and attempts at discrediting victims.
            </p>
          </div>

          <div className="rounded-xl bg-white/5 border border-pink-500/20 p-6 shadow-lg backdrop-blur">
            <h2 className="text-2xl font-semibold text-pink-300 mb-2">3. Needed Protection</h2>
            <ul className="list-disc ml-4 mt-1 space-y-1">
              <li>Safe room</li>
              <li>Legal shielding from misclassification</li>
              <li>Controlled evidence transfer</li>
              <li>Digital restoration and project safeguarding</li>
            </ul>
          </div>

        </section>

        <footer className="text-center mt-20 text-gray-400 text-sm">
          © X42 – Civic Protection & Digital Witness Network
        </footer>
      </div>
    </div>
  );
}
