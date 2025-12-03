import { createFileRoute } from '@tanstack/react-router'
import {
  Cloudy,
  Droplets,
  Home,
  Info,
  ShipWheel,
  Sparkle,
  Waves,
} from 'lucide-react'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-50">
      <div className="mx-auto max-w-6xl px-5 pb-16 pt-10 space-y-14">
        <section className="grid gap-10 lg:grid-cols-[1.1fr,0.9fr] items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-800 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.16em] text-cyan-200">
              <Sparkle className="h-4 w-4 text-orange-300" />
              Blobfish & Beaver Mission Control
            </div>
            <h1 className="text-balance text-4xl font-semibold leading-tight sm:text-5xl">
              A cozy observatory for a melancholy blobfish and an overachieving
              beaver. Built to deploy fast with AWS + CloudFront.
            </h1>
            <p className="text-pretty text-slate-300">
              Explore their vibes, compare their skill trees, and grab a
              deployment checklist so you can ship this tiny universe to the
              edge. No backend, just joyful React + TanStack Router.
            </p>

            <div className="grid gap-3 sm:grid-cols-3">
              {[
                {
                  label: 'Blobfish morale',
                  value: '42%',
                  icon: <Droplets className="h-4 w-4" />,
                  tone: 'from-pink-400/30 to-orange-300/30 text-pink-100',
                },
                {
                  label: 'Beaver output',
                  value: '99.9%',
                  icon: <Home className="h-4 w-4" />,
                  tone: 'from-emerald-400/30 to-cyan-300/30 text-emerald-100',
                },
                {
                  label: 'Static vibes',
                  value: 'Edge-ready',
                  icon: <Waves className="h-4 w-4" />,
                  tone: 'from-indigo-400/30 to-sky-300/30 text-sky-100',
                },
              ].map((card) => (
                <div
                  key={card.label}
                  className={`rounded-2xl border border-slate-800 bg-gradient-to-br ${card.tone} p-[1px]`}
                >
                  <div className="h-full rounded-[15px] bg-slate-950/80 px-3 py-4">
                    <div className="flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-slate-400">
                      {card.icon}
                      {card.label}
                    </div>
                    <div className="mt-2 text-2xl font-semibold">{card.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-sky-500/10 blur-3xl" />
            <div className="relative rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-800/60 via-slate-900/70 to-slate-950/80 p-6 shadow-2xl shadow-sky-900/50 backdrop-blur">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-pink-500/20 text-2xl">
                    🫠
                  </span>
                  <div>
                    <div className="text-sm text-pink-100/90">Blobfish</div>
                    <div className="text-lg font-semibold text-pink-50">
                      Feelsy Aquanaut
                    </div>
                  </div>
                </div>
                <span className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300">
                  Pressure: 800+ meters
                </span>
              </div>

              <div className="my-5 h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent" />

              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-500/20 text-2xl">
                    🦫
                  </span>
                  <div>
                    <div className="text-sm text-emerald-100/90">Beaver</div>
                    <div className="text-lg font-semibold text-emerald-50">
                      Dam Architect
                    </div>
                  </div>
                </div>
                <span className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300">
                  Shift: Night ops
                </span>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {[
                  {
                    title: 'Team mood',
                    text: 'Alternates between “little soggy” and “productively damp.”',
                  },
                  {
                    title: 'Favorite tasks',
                    text: 'Blobfish: morale memes. Beaver: structural PRs with bite.',
                  },
                  {
                    title: 'Edge mission',
                    text: 'Serve this experience with single-digit latency worldwide.',
                  },
                  {
                    title: 'Tech stack',
                    text: 'React + TanStack Router + Tailwind + vibes.',
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4"
                  >
                    <div className="text-xs uppercase tracking-[0.12em] text-slate-400">
                      {item.title}
                    </div>
                    <div className="mt-1 text-sm text-slate-200">{item.text}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 shadow-xl shadow-slate-950/40">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-orange-500/20 text-orange-100">
              <ShipWheel className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.16em] text-orange-100/80">
                Goofy crew rituals
              </p>
              <h2 className="text-xl font-semibold text-orange-50">
                How blobfish & beaver stay inspired between deploys
              </h2>
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {[
              {
                title: 'Hydration break',
                desc: 'Blobfish rates the office humidity. Anything below 90% gets a sad face sticker.',
              },
              {
                title: 'Dam stand-up',
                desc: 'Beaver shares “yesterday I chewed, today I will also chew.” Team applauds.',
              },
              {
                title: 'Vibe checks',
                desc: 'Lo-fi ocean beats, glow-stick tail slaps, and a ritual chant: “cache is king.”',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-slate-800 bg-slate-950/50 p-4"
              >
                <p className="text-sm uppercase tracking-[0.14em] text-slate-400">
                  {item.title}
                </p>
                <p className="mt-2 text-slate-100">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1fr,1fr]">
          <div className="rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900/80 via-slate-900/60 to-slate-950/70 p-6 shadow-lg">
            <div className="flex items-center gap-3">
              <Cloudy className="h-5 w-5 text-sky-300" />
              <p className="text-xs uppercase tracking-[0.16em] text-slate-400">
                Blobfish feelings report
              </p>
            </div>
            <h3 className="mt-3 text-2xl font-semibold">Mostly gooey with hints of hope</h3>
            <p className="mt-2 text-slate-300">
              Hovercraft of emotions: soft, squishy, still shipping. Every deploy
              uplifts morale by 3.2%.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-slate-200">
              <li>• React hydration makes blobfish feel less dry.</li>
              <li>• Edge caching reduces exposure to daylight (good).</li>
              <li>• Color palette calibrated for maximum cozy ocean vibes.</li>
            </ul>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-gradient-to-br from-emerald-900/60 via-slate-900/60 to-slate-950/80 p-6 shadow-lg">
            <div className="flex items-center gap-3">
              <Info className="h-5 w-5 text-emerald-200" />
              <p className="text-xs uppercase tracking-[0.16em] text-slate-400">
                Beaver build log
              </p>
            </div>
            <h3 className="mt-3 text-2xl font-semibold">Dam uptime: five stars</h3>
            <p className="mt-2 text-slate-300">
              Beavers love deterministic builds. They chew through branches,
              merge PRs, and leave no breaking changes behind.
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {[
                'Prefers declarative infrastructure & tidy logs.',
                'Tailwind class stacking is treated like log stacking.',
                'CloudFront invalidations scheduled between snack breaks.',
                'Swears by least-privilege IAM policies (and bark).',
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-emerald-700/40 bg-emerald-900/30 px-4 py-3 text-sm text-emerald-50"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
