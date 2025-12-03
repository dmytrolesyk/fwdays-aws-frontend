import { createFileRoute } from '@tanstack/react-router'
import { Compass, Heart, Map, Shell } from 'lucide-react'

export const Route = createFileRoute('/about')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-50">
      <div className="mx-auto max-w-5xl px-5 pb-16 pt-10 space-y-10">
        <header className="space-y-3">
          <p className="inline-flex items-center gap-2 rounded-full border border-slate-800 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.14em] text-sky-200">
            <Map className="h-4 w-4" />
            Field Notes
          </p>
          <h1 className="text-4xl font-semibold leading-tight">
            Lore, science-ish facts, and feelings
          </h1>
          <p className="max-w-3xl text-slate-300">
            Blobfish and beavers should never have met, yet here they are sharing
            a single-page app. Consider this a dossier of all the damp details we
            unearthed while building this little AWS deployment playground.
          </p>
        </header>

        <section className="grid gap-6 lg:grid-cols-[1fr,0.9fr]">
          <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 shadow-lg">
            <div className="flex items-center gap-3">
              <Shell className="h-5 w-5 text-pink-200" />
              <p className="text-xs uppercase tracking-[0.14em] text-slate-400">
                Blobfish dossier
              </p>
            </div>
            <h2 className="mt-3 text-2xl font-semibold">Soft, squishy, misunderstood</h2>
            <p className="mt-3 text-slate-200">
              Deep under 800+ meters of pressure, blobfish look perfectly normal.
              Bring them topside and physics turns them into a pink frown emoji.
              We celebrate the frown as a reminder to keep prod stable.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-slate-200">
              <li>• Lacks a swim bladder; floats via extremely low-density flesh.</li>
              <li>• Natural predator: being photographed and memed.</li>
              <li>• Thrives in environments with consistent pressure (like CI/CD).</li>
            </ul>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-emerald-900/40 p-6 shadow-lg">
            <div className="flex items-center gap-3">
              <Heart className="h-5 w-5 text-emerald-100" />
              <p className="text-xs uppercase tracking-[0.14em] text-slate-400">
                Beaver dossier
              </p>
            </div>
            <h2 className="mt-3 text-2xl font-semibold">The original civil engineer</h2>
            <p className="mt-3 text-slate-200">
              Beavers reroute rivers, build resilient dams, and never leave a log
              unstacked. We stan this level of infra discipline.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-slate-200">
              <li>• Teeth grow forever; so does the feature backlog.</li>
              <li>• Dams slow water, prevent erosion — like caching for rivers.</li>
              <li>• Communicates outages by tail-slapping the water. Effective.</li>
            </ul>
          </div>
        </section>

        <section className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 shadow-xl shadow-slate-950/40">
          <div className="flex flex-wrap items-center gap-3">
            <Compass className="h-5 w-5 text-orange-200" />
            <p className="text-xs uppercase tracking-[0.14em] text-slate-400">
              Expedition log
            </p>
          </div>
          <h2 className="mt-3 text-2xl font-semibold text-orange-50">
            How we ended up in CloudFront territory
          </h2>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            {[
              {
                title: 'Route the crew',
                body: 'TanStack Router handles navigation so blobfish never gets lost (again).',
              },
              {
                title: 'Style the sea',
                body: 'Tailwind + OKLCH palette for neon-underwater vibes without muddy colors.',
              },
              {
                title: 'Deploy to the edge',
                body: 'S3 hosts the build, CloudFront flings it worldwide. Beaver approved.',
              },
            ].map((item) => (
              <article
                key={item.title}
                className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4"
              >
                <p className="text-sm uppercase tracking-[0.12em] text-slate-400">
                  {item.title}
                </p>
                <p className="mt-2 text-slate-100">{item.body}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
