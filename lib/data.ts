export const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

export const heroFeatures = [
  {
    key: 'problem-solver',
    title: 'Problem Solver',
    desc: 'I enjoy solving real-world development challenges.',
    icon: 'lightbulb',
  },
  {
    key: 'clean-code',
    title: 'Clean Code',
    desc: 'Writing maintainable and scalable applications.',
    icon: 'code',
  },
  {
    key: 'always-learning',
    title: 'Always Learning',
    desc: 'Constantly improving my skills and exploring modern technologies.',
    icon: 'graduation',
  },
  {
    key: 'open',
    title: 'Open to Opportunities',
    desc: 'Available for internships, freelance and junior positions.',
    icon: 'briefcase',
  },
] as const;

export const availability = {
  label: 'Available for',
  roles: ['Internships', 'Freelance', 'Junior Roles'],
  desc: 'Ready to collaborate on impactful projects.',
};

export const aboutParagraphs = [
  "I'm Mounir L Maimouni, a Full Stack Developer based in Morocco with a passion for crafting clean, functional, and high-performance web applications.",
  'I specialize in building end-to-end web solutions — from dynamic front-end interfaces to robust back-end systems with PHP & MySQL. Every project I deliver is fast, scalable, and user-friendly.',
  "Whether it's a rental platform, an e-commerce store, or a service website, I bring creativity, precision, and performance to every project, ensuring exceptional user experiences across all devices.",
];

export const techStack = [
  'HTML5',
  'CSS3 / Sass',
  'JavaScript',
  'PHP',
  'SQL / MySQL',
  'Responsive Design',
  'REST APIs',
  'Git / GitHub',
  'Bootstrap',
  'WordPress',
  'VS Code',
];

export const whatIDo = [
  'Full Stack Development',
  'E-Commerce Solutions',
  'Responsive Design',
  'API Integration',
  'Database Architecture',
  'SEO Optimization',
];

export const skills = [
  { name: 'HTML5 & Semantic', level: 95, icon: '🌐' },
  { name: 'CSS3 / Sass', level: 92, icon: '🎨' },
  { name: 'JavaScript ES6+', level: 88, icon: '⚡' },
  { name: 'PHP & Frameworks', level: 85, icon: '🐘' },
  { name: 'SQL / MySQL', level: 86, icon: '🗄️' },
  { name: 'Responsive Design', level: 95, icon: '📱' },
  { name: 'REST APIs', level: 82, icon: '🔌' },
  { name: 'Git / GitHub', level: 90, icon: '📦' },
];

export const projects = [
  {
    num: '01',
    title: 'House Location Platform',
    desc: 'A full-featured rental property platform. Users can browse apartments and houses, filter by location, price, and bedrooms, and contact landlords directly. Includes admin dashboard, multilingual support, and photo galleries.',
    tags: ['PHP', 'MySQL', 'JavaScript', 'Bootstrap'],
    tint: 'from-blue-500/20 to-indigo-500/10',
  },
  {
    num: '02',
    title: 'Urban Oak — E-Commerce',
    desc: 'A modern, minimalist e-commerce platform for a fashion brand. Features product catalog with filters, shopping cart, user authentication, order management, and a clean checkout flow.',
    tags: ['HTML/CSS', 'JavaScript', 'PHP', 'PayPal API'],
    tint: 'from-emerald-500/20 to-teal-500/10',
  },
  {
    num: '03',
    title: 'Master & Blade — Barbers',
    desc: 'A premium barber shop website with a dark, bold aesthetic. Showcases services, booking system, team profiles, gallery, and social media integration — crafted for maximum visual impact.',
    tags: ['WordPress', 'Responsive', 'Frontend', 'Custom Theme'],
    tint: 'from-slate-500/20 to-blue-500/10',
  },
];

export const contactItems = [
  { icon: '📧', label: 'Email', value: 'mounirmaimouni21@gmail.com', href: 'mailto:mounirmaimouni21@gmail.com' },
  { icon: '📱', label: 'Phone', value: '+212 650 957 336', href: 'tel:+212650957336' },
  { icon: '📍', label: 'Location', value: 'Morocco 🇲🇦', href: null },
  { icon: '💬', label: 'WhatsApp', value: 'Chat with me', href: 'https://wa.me/212650957336' },
];

export const socials = [
  { label: 'Instagram', href: 'https://instagram.com/mounirmaimouni' },
  { label: 'Facebook', href: 'https://facebook.com/mounirmaimouni' },
  { label: 'GitHub', href: 'https://github.com/mounirmaimouni' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/mounirmaimouni' },
];
