// ═══════════════════════════════════════
// SIMPLE PORTFOLIO - CLEAN & PROFESSIONAL
// ═══════════════════════════════════════

document.addEventListener('DOMContentLoaded', () => {

  // ══ LOADING SCREEN ══
  const loader = document.getElementById('loader');
  window.addEventListener('load', () => {
    setTimeout(() => {
      loader.classList.add('hide');
      document.body.style.overflow = 'auto';
    }, 1200);
  });
  document.body.style.overflow = 'hidden';

  // ══ THEME TOGGLE ══
  const themeBtn = document.getElementById('themeBtn');
  let dark = true;
  themeBtn.addEventListener('click', () => {
    dark = !dark;
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
    themeBtn.textContent = dark ? '☀️' : '🌙';
  });

  // ══ HERO · SUBTLE POINTER PARALLAX ══
  const heroVisual = document.querySelector('.hero-visual');
  const heroDeco = document.querySelector('.hero-deco');
  const finePointer = window.matchMedia('(pointer:fine)').matches;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (heroVisual && heroDeco && finePointer && !reduceMotion) {
    heroVisual.addEventListener('mousemove', (e) => {
      const r = heroVisual.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      heroDeco.style.setProperty('--px', (x * 14).toFixed(1) + 'px');
      heroDeco.style.setProperty('--py', (y * 14).toFixed(1) + 'px');
    });
    heroVisual.addEventListener('mouseleave', () => {
      heroDeco.style.setProperty('--px', '0px');
      heroDeco.style.setProperty('--py', '0px');
    });
  }

  // ══ SCROLL REVEAL ══
  const revEls = document.querySelectorAll('.rev');
  const ro = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('show');
        ro.unobserve(e.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
  revEls.forEach(el => ro.observe(el));

  // ══ SKILL BAR ANIMATION ══
  const skillObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.querySelectorAll('.sk-fill').forEach(bar => {
          const width = bar.getAttribute('data-w');
          bar.style.transform = `scaleX(${width})`;
          bar.classList.add('animate');
        });
        skillObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.2 });
  document.querySelectorAll('.skill-card').forEach(s => skillObs.observe(s));

  // ══ ACTIVE NAV & SCROLL EFFECTS ══
  const sections = document.querySelectorAll('section[id]');
  const navAs = document.querySelectorAll('.nav-links a');
  const nav = document.getElementById('nav');

  function updateNav() {
    const scrollY = window.scrollY;
    let cur = '';
    sections.forEach(s => {
      if (scrollY >= s.offsetTop - 200) cur = s.id;
    });
    navAs.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + cur));
    nav.classList.toggle('scrolled', scrollY > 60);
  }
  window.addEventListener('scroll', updateNav);
  updateNav();

  // ══ MOUSE PARALLAX FOR BACKGROUND SHAPES ══
  const shapes = document.querySelectorAll('.float-shape');
  document.addEventListener('mousemove', (e) => {
    const { clientX, clientY } = e;
    const x = (clientX - window.innerWidth / 2) / 25;
    const y = (clientY - window.innerHeight / 2) / 25;
    
    shapes.forEach((shape, index) => {
      const depth = (index + 1) * 0.8;
      shape.style.transform = `translate3d(${x * depth}px, ${y * depth}px, 0)`;
    });
  });

  // ══ MOBILE MENU ══
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');

  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('nav-active');
    menuToggle.classList.toggle('toggle-active');
  });

  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('nav-active');
      menuToggle.classList.remove('toggle-active');
    });
  });

  // ══ CONTACT FORM ══
  const sendBtn = document.getElementById('sendBtn');
  const charCount = document.querySelector('.char-count');
  const textarea = document.querySelector('textarea[name="message"]');
  const contactForm = document.getElementById('contactForm');

  if (textarea && charCount) {
    textarea.addEventListener('input', () => {
      const len = textarea.value.length;
      charCount.textContent = len + '/500';
      charCount.style.color = len > 450 ? 'var(--acc2)' : 'var(--muted)';
      if (len > 500) textarea.value = textarea.value.substring(0, 500);
    });
  }

  if (sendBtn) {
    sendBtn.addEventListener('click', function(e) {
      if (!contactForm) return;
      const inputs = contactForm.querySelectorAll('input[required], textarea[required]');
      let valid = true;
      inputs.forEach(input => {
        if (!input.value.trim()) {
          valid = false;
          input.style.borderColor = 'var(--acc2)';
          setTimeout(() => input.style.borderColor = '', 2000);
        }
      });
      if (valid) {
        this.innerHTML = '<span>✅ Message Sent!</span>';
        this.classList.add('success');
        setTimeout(() => {
          this.innerHTML = '<span>Send Message →</span>';
          this.classList.remove('success');
          if (contactForm) contactForm.reset();
          if (charCount) charCount.textContent = '0/500';
        }, 3000);
      } else {
        this.innerHTML = '<span>❌ Please fill all fields</span>';
        this.classList.add('error');
        setTimeout(() => {
          this.innerHTML = '<span>Send Message →</span>';
          this.classList.remove('error');
        }, 2500);
      }
    });
  }

  // ══ SMOOTH SCROLL ══
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

});
