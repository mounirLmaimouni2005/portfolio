'use client';

import { motion } from 'framer-motion';
import Reveal from '../Reveal';
import SectionHeading from './SectionHeading';
import { skills } from '@/lib/data';

export default function Skills() {
  return (
    <section id="skills" className="relative px-[6%] py-28">
      <div className="mx-auto max-w-[1100px]">
        <SectionHeading
          label="Expertise"
          title="Skills & Proficiency"
          desc="Technologies I work with daily and how well I've honed them through hands-on projects."
        />

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {skills.map((s, i) => (
            <Reveal key={s.name} delay={(i % 4) * 0.08} className="h-full">
              <div className="glass group h-full rounded-2xl p-7 transition-all duration-300 hover:-translate-y-2 hover:shadow-lift">
                <span className="mb-4 block text-[2rem]">{s.icon}</span>
                <h3 className="mb-3.5 font-display text-[0.98rem] font-semibold text-[var(--c-text)]">
                  {s.name}
                </h3>
                <div className="h-1.5 overflow-hidden rounded-full bg-[var(--c-border)]">
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: s.level / 100 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                    style={{ transformOrigin: 'left' }}
                    className="h-full rounded-full bg-gradient-to-r from-accent to-accent-hover"
                  />
                </div>
                <p className="mt-2 text-right font-mono text-[0.72rem] font-semibold text-muted">
                  {s.level}%
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
