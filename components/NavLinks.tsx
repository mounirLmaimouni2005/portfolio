'use client';

// Header navigation items (kept local to the header so the footer is untouched).
export const NAV_ITEMS = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Technologies', href: '#technologies' },
  { label: 'Contact', href: '#contact' },
] as const;

export default function NavLinks({ className = '' }: { className?: string }) {
  return (
    <ul className={`flex items-center gap-6 lg:gap-10 ${className}`}>
      {NAV_ITEMS.map((item) => (
        <li key={item.href}>
          <a
            href={item.href}
            className="group relative inline-block py-1 text-[0.95rem] font-medium tracking-[0.005em] text-[#111827] outline-none transition-colors duration-300 hover:text-accent focus-visible:text-accent dark:text-[var(--c-text)]"
          >
            {item.label}
            <span
              aria-hidden
              className="pointer-events-none absolute -bottom-0.5 left-0 h-[2px] w-full origin-left scale-x-0 rounded-full bg-accent transition-transform duration-300 ease-out group-hover:scale-x-100 group-focus-visible:scale-x-100"
            />
          </a>
        </li>
      ))}
    </ul>
  );
}
