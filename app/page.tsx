'use client';

import { useState } from 'react';
import Preloader from '@/components/Preloader';
import Navbar from '@/components/Navbar';
import Hero from '@/components/hero/Hero';
import About from '@/components/sections/About';
import Skills from '@/components/sections/Skills';
import Projects from '@/components/sections/Projects';
import Contact from '@/components/sections/Contact';
import Footer from '@/components/sections/Footer';

function Divider() {
  return (
    <div className="mx-auto h-px max-w-[1100px] bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
  );
}

export default function Home() {
  const [preloaderDone, setPreloaderDone] = useState(false);

  return (
    <>
      {/* Preloader — fixed overlay, removed from DOM on exit complete */}
      {!preloaderDone && (
        <Preloader onExitComplete={() => setPreloaderDone(true)} />
      )}

      <Navbar />
      <main>
        <Hero />
        <About />
        <Divider />
        <Skills />
        <Divider />
        <Projects />
        <Divider />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
