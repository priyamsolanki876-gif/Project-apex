export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-black text-white p-4">
      <div className="w-full max-w-md border border-neutral-800 rounded-xl p-8 bg-neutral-900/50 backdrop-blur-md">
        <h1 className="text-2xl font-bold tracking-tight mb-2">APEX ENGINE // INITIALIZED</h1>
        <p className="text-neutral-400 text-sm mb-6">Simulation running at peak efficiency.</p>
        <div className="w-full h-1 bg-neutral-800 rounded-full overflow-hidden">
          <div className="h-full bg-white animate-pulse w-1/3"></div>
        </div>
      </div>
    </main>
  );
}
  
