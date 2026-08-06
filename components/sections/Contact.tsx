'use client';

import { FormEvent, useState } from 'react';
import Reveal from '../Reveal';
import SectionHeading from './SectionHeading';
import { contactItems, socials } from '@/lib/data';

export default function Contact() {
  const [status, setStatus] = useState<'idle' | 'sent' | 'error'>('idle');

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const valid = Array.from(form.querySelectorAll('[required]')).every(
      (el) => (el as HTMLInputElement).value.trim() !== '',
    );
    if (!valid) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 2500);
      return;
    }
    setStatus('sent');
    form.reset();
    setTimeout(() => setStatus('idle'), 3000);
  };

  return (
    <section id="contact" className="relative px-[6%] py-28">
      <div className="mx-auto max-w-[1100px]">
        <SectionHeading
          label="Get In Touch"
          title={
            <>
              Let&apos;s Build Something
              <br />
              Amazing Together.
            </>
          }
        />

        <div className="grid gap-16 md:grid-cols-[1fr_1.1fr]">
          <Reveal>
            <p className="mb-8 text-[1.02rem] leading-[1.85] text-muted">
              Have a project in mind or want to collaborate? I&apos;m always open to discussing new
              ideas, freelance work, or interesting opportunities. Let&apos;s create something
              exceptional.
            </p>
            <div className="flex flex-col gap-4">
              {contactItems.map((c) => {
                const inner = (
                  <div className="flex items-center gap-4 rounded-2xl border border-hairline bg-[var(--c-surface)] p-[18px] shadow-soft transition-all duration-300 hover:translate-x-2 hover:border-accent">
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-[var(--accent-soft)] text-xl">
                      {c.icon}
                    </span>
                    <span>
                      <span className="block font-mono text-[0.65rem] uppercase tracking-[0.1em] text-muted">
                        {c.label}
                      </span>
                      <span className="mt-0.5 block text-[0.92rem] font-semibold text-[var(--c-text)]">
                        {c.value}
                      </span>
                    </span>
                  </div>
                );
                return c.href ? (
                  <a key={c.label} href={c.href} target={c.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">
                    {inner}
                  </a>
                ) : (
                  <div key={c.label}>{inner}</div>
                );
              })}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-hairline bg-[var(--c-surface)] px-5 py-2.5 text-[0.82rem] font-semibold text-[var(--c-text)] shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-accent hover:text-accent"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <form onSubmit={onSubmit} className="glass rounded-3xl p-7">
              <Field label="Your Name" name="name" placeholder="John Doe" />
              <Field label="Email Address" name="email" type="email" placeholder="john@example.com" />
              <Field label="Subject" name="subject" placeholder="Project Inquiry" />
              <div className="mb-5">
                <label className="mb-2.5 block font-mono text-[0.68rem] uppercase tracking-[0.12em] text-muted">
                  Message
                </label>
                <textarea
                  name="message"
                  required
                  placeholder="Tell me about your project..."
                  className="min-h-[130px] w-full resize-y rounded-2xl border-2 border-hairline bg-[var(--c-surface)] px-4 py-3.5 text-[0.95rem] text-[var(--c-text)] outline-none transition focus:border-accent focus:ring-4 focus:ring-accent/10"
                />
              </div>
              <button
                type="submit"
                className={`btn-sweep w-full rounded-full px-8 py-4 text-[0.95rem] font-bold text-white shadow-lift transition-all duration-300 hover:-translate-y-1 ${
                  status === 'sent' ? 'bg-success' : status === 'error' ? 'bg-red-500' : 'bg-ink dark:bg-accent'
                }`}
              >
                {status === 'sent' ? '✅ Message Sent!' : status === 'error' ? '❌ Please fill all fields' : 'Send Message →'}
              </button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = 'text',
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div className="mb-5">
      <label className="mb-2.5 block font-mono text-[0.68rem] uppercase tracking-[0.12em] text-muted">
        {label}
      </label>
      <input
        type={type}
        name={name}
        required
        placeholder={placeholder}
        className="w-full rounded-2xl border-2 border-hairline bg-[var(--c-surface)] px-4 py-3.5 text-[0.95rem] text-[var(--c-text)] outline-none transition focus:border-accent focus:ring-4 focus:ring-accent/10"
      />
    </div>
  );
}
