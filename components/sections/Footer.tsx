import { navLinks } from '@/lib/data';

export default function Footer() {
  return (
    <footer className="border-t border-hairline px-[6%] py-10 text-center">
      <p className="text-[0.82rem] leading-[1.8] text-muted">
        © 2025 <span className="text-accent">Mounir L Maimouni</span> · Full Stack Developer · Built
        with passion and modern technologies.
      </p>
      <div className="mt-3 flex justify-center gap-6">
        {navLinks.map((l) => (
          <a
            key={l.href}
            href={l.href}
            className="text-[0.78rem] text-muted transition-colors hover:text-accent"
          >
            {l.label}
          </a>
        ))}
      </div>
    </footer>
  );
}
