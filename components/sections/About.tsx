import Reveal from '../Reveal';
import SectionHeading from './SectionHeading';
import { aboutParagraphs, techStack, whatIDo } from '@/lib/data';

export default function About() {
  return (
    <section id="about" className="relative px-[6%] py-28">
      <div className="mx-auto max-w-[1100px]">
        <SectionHeading
          label="About Me"
          title={
            <>
              Passionate about building
              <br />
              things that matter.
            </>
          }
        />

        <div className="grid gap-16 md:grid-cols-2">
          <Reveal className="space-y-4">
            {aboutParagraphs.map((p, i) => (
              <p key={i} className="text-[1.02rem] leading-[1.85] text-muted">
                {p}
              </p>
            ))}
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mb-5 font-mono text-[0.72rem] uppercase tracking-[0.12em] text-muted">
              Tech Stack &amp; Tools
            </p>
            <div className="flex flex-wrap gap-2.5">
              {techStack.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-hairline bg-[var(--c-surface)] px-4 py-2 font-mono text-[0.76rem] text-[var(--c-text)] shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:border-accent hover:text-accent"
                >
                  {t}
                </span>
              ))}
            </div>

            <p className="mb-5 mt-8 font-mono text-[0.72rem] uppercase tracking-[0.12em] text-muted">
              What I Do
            </p>
            <div className="flex flex-wrap gap-2.5">
              {whatIDo.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-hairline bg-[var(--c-surface)] px-4 py-2 font-mono text-[0.76rem] text-[var(--c-text)] shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:border-accent hover:text-accent"
                >
                  {t}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
