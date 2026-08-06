import Reveal from '../Reveal';
import SectionHeading from './SectionHeading';
import { projects } from '@/lib/data';

export default function Projects() {
  return (
    <section id="projects" className="relative px-[6%] py-28">
      <div className="mx-auto max-w-[1100px]">
        <SectionHeading
          label="Portfolio"
          title="Featured Projects"
          desc="Real-world web applications built with care, performance, and great user experience in mind."
        />

        <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => (
            <Reveal key={p.num} delay={i * 0.1} className="h-full">
              <article className="group h-full overflow-hidden rounded-3xl border border-hairline bg-[var(--c-surface)] shadow-soft transition-all duration-500 hover:-translate-y-3 hover:shadow-lift">
                <div className={`relative h-52 overflow-hidden bg-gradient-to-br ${p.tint}`}>
                  <div className="grid-texture absolute inset-0 opacity-30" />
                  <span className="absolute right-4 top-2 font-display text-[5rem] font-extrabold leading-none text-[var(--c-text)] opacity-[0.06]">
                    {p.num}
                  </span>
                  <div className="absolute inset-0 grid place-items-center px-6 text-center">
                    <span className="font-display text-lg font-bold tracking-tight text-[var(--c-text)]/70">
                      {p.title.split('—')[0].trim()}
                    </span>
                  </div>
                </div>
                <div className="p-7">
                  <h3 className="mb-2.5 font-display text-[1.2rem] font-extrabold tracking-tight text-[var(--c-text)]">
                    {p.title}
                  </h3>
                  <p className="text-[0.9rem] leading-[1.75] text-muted">{p.desc}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-full bg-[var(--accent-soft)] px-2.5 py-1 font-mono text-[0.65rem] tracking-wide text-accent"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
