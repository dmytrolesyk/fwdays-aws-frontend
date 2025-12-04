import { createFileRoute } from '@tanstack/react-router'
import { Drama, Laugh, Music2, Popcorn, Sparkles, Tv } from 'lucide-react'

export const Route = createFileRoute('/pop')({
  component: PopCulturePage,
})

function PopCulturePage() {
  const shoutouts = [
    {
      title: 'Angry Beavers (1997)',
      body: 'Norbert and Daggett basically invented sibling code reviews. One builds, one breaks, both end up in slapstick CI.',
      icon: <Tv className="h-5 w-5 text-amber-200" />,
    },
    {
      title: 'Blobfish Meme Era',
      body: 'Every “Monday face” post owes royalties to blobfish. Peak 2013 internet energy: pure, unfiltered blep.',
      icon: <Laugh className="h-5 w-5 text-pink-200" />,
    },
    {
      title: 'Lo-fi Beavers',
      body: 'Imagine a beaver lo-fi channel: dam-building beats to study/chew wood to. 10-hour loop, zero ads.',
      icon: <Music2 className="h-5 w-5 text-emerald-200" />,
    },
    {
      title: 'Cameos in SpongeBob?',
      body: 'No official blobfish cameo yet, but spiritually it shows up every time Squidward sighs.',
      icon: <Drama className="h-5 w-5 text-sky-200" />,
    },
  ]

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-50">
      <div className="mx-auto max-w-5xl px-5 pb-16 pt-10 space-y-10">
        <header className="space-y-3">
          <p className="inline-flex items-center gap-2 rounded-full border border-slate-800 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.16em] text-cyan-200">
            <Popcorn className="h-4 w-4" />
            Pop culture splash zone
          </p>
          <h1 className="text-4xl font-semibold leading-tight">
            Blobfish & Beavers in TV, memes, and questionable lore
          </h1>
          <p className="max-w-3xl text-slate-300">
            Because every great static site deserves easter eggs. Here are the
            shows, memes, and musical moods that keep our aquatic duo relevant.
          </p>
        </header>

        <section className="grid gap-4 md:grid-cols-2">
          {shoutouts.map((item) => (
            <article
              key={item.title}
              className="rounded-3xl border border-slate-800 bg-slate-900/70 p-5 shadow-lg"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-800">
                  {item.icon}
                </span>
                <div>
                  <p className="text-xs uppercase tracking-[0.14em] text-slate-400">
                    Reference
                  </p>
                  <h2 className="text-lg font-semibold text-slate-50">
                    {item.title}
                  </h2>
                </div>
              </div>
              <p className="mt-3 text-sm text-slate-200">{item.body}</p>
            </article>
          ))}
        </section>

        <section className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 shadow-xl shadow-slate-950/40">
          <div className="flex items-center gap-3">
            <Sparkles className="h-5 w-5 text-pink-200" />
            <p className="text-xs uppercase tracking-[0.14em] text-slate-400">
              Bonus headcanon
            </p>
          </div>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {[
              'Blobfish secretly runs a mood-board Tumblr full of beaver dam aesthetics.',
              'Beaver keeps a VHS box set of Angry Beavers and insists it’s “for research”.',
              'Together they pitched a crossover episode: “Dam It, We’re Late for Deploy.”',
              'Their band name is “The Damp Parameters.” First single drops when CI passes.',
            ].map((line) => (
              <div
                key={line}
                className="rounded-2xl border border-slate-800 bg-slate-950/60 px-4 py-3 text-sm text-slate-100"
              >
                {line}
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
