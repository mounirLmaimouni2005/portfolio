import Reveal from '../Reveal';

export default function SectionHeading({
  label,
  title,
  desc,
}: {
  label: string;
  title: React.ReactNode;
  desc?: string;
}) {
  return (
    <div className="mb-14">
      <Reveal>
        <div className="mb-3 inline-flex items-center gap-2.5 font-mono text-[0.72rem] uppercase tracking-[0.15em] text-accent">
          <span className="h-[2px] w-6 rounded bg-accent" />
          {label}
        </div>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="font-display text-[clamp(2rem,3.8vw,3rem)] font-bold leading-[1.15] tracking-[-0.04em] text-[var(--c-text)]">
          {title}
        </h2>
      </Reveal>
      {desc && (
        <Reveal delay={0.16}>
          <p className="mt-4 max-w-[540px] text-[1rem] leading-[1.8] text-muted">{desc}</p>
        </Reveal>
      )}
    </div>
  );
}
