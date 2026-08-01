import React, { useEffect, useMemo, useRef, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';
import { Toaster } from 'sonner';
import { Nav } from './components/Nav';
import { Footer } from './components/Footer';
import { Landing } from './pages/Landing';
import { About } from './pages/About';
import { Terms } from './pages/Terms';
import { Privacy } from './pages/Privacy';
import { Blank } from './pages/Blank';

type Chip = {
  left: number;
  top: number;
  w: number;
  h: number;
  rotate: number;
  depth: number;
  opacity: number;
};

function ReticleCursor() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const sx = useSpring(x, { stiffness: 900, damping: 46, mass: 0.35 });
  const sy = useSpring(y, { stiffness: 900, damping: 46, mass: 0.35 });
  const ringX = useSpring(x, { stiffness: 190, damping: 22, mass: 0.5 });
  const ringY = useSpring(y, { stiffness: 190, damping: 22, mass: 0.5 });

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return;

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      const target = e.target as HTMLElement | null;
      setActive(
        Boolean(
          target?.closest(
            'a, button, input, textarea, select, [role="button"], [role="tab"], label'
          )
        )
      );
    };
    const onLeave = () => setVisible(false);
    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseout', onLeave);
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseout', onLeave);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
    };
  }, [x, y]);

  if (!visible) return null;

  const color = active ? 'var(--brand)' : 'var(--ink)';
  const ringSize = active ? 44 : 30;
  const tick = active ? 9 : 6;

  return (
    <div aria-hidden="true" className="hidden [@media(pointer:fine)]:block">
      {/* rotating aiming ring */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[100]"
        style={{ x: ringX, y: ringY }}>
        
        <motion.div
          className="relative"
          animate={{
            width: pressed ? ringSize - 6 : ringSize,
            height: pressed ? ringSize - 6 : ringSize,
            rotate: reduce ? 0 : active ? 315 : 0
          }}
          transition={{
            width: { type: 'spring', stiffness: 420, damping: 26 },
            height: { type: 'spring', stiffness: 420, damping: 26 },
            rotate: { type: 'spring', stiffness: 130, damping: 18 }
          }}
          style={{ x: '-50%', y: '-50%' }}>
          
          {/* four arc segments of the reticle */}
          <div
            className="absolute inset-0 rounded-full border-2 transition-colors duration-200"
            style={{
              borderColor: color,
              opacity: active ? 1 : 0.55,
              clipPath:
              'polygon(0 0, 34% 0, 34% 100%, 0 100%, 0 0, 100% 0, 100% 34%, 0 34%, 0 0, 66% 0, 66% 100%, 100% 100%, 100% 66%, 0 66%)'
            }} />
          
          {/* crosshair ticks */}
          <span
            className="absolute left-1/2 top-0 -translate-x-1/2 transition-colors duration-200"
            style={{ width: 1.5, height: tick, background: color, marginTop: -tick - 3 }} />
          
          <span
            className="absolute bottom-0 left-1/2 -translate-x-1/2 transition-colors duration-200"
            style={{ width: 1.5, height: tick, background: color, marginBottom: -tick - 3 }} />
          
          <span
            className="absolute left-0 top-1/2 -translate-y-1/2 transition-colors duration-200"
            style={{ height: 1.5, width: tick, background: color, marginLeft: -tick - 3 }} />
          
          <span
            className="absolute right-0 top-1/2 -translate-y-1/2 transition-colors duration-200"
            style={{ height: 1.5, width: tick, background: color, marginRight: -tick - 3 }} />
          
        </motion.div>
      </motion.div>

      {/* locked-on pulse */}
      {active && !reduce &&
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[100]"
        style={{ x: ringX, y: ringY }}>
        
          <motion.span
          className="absolute rounded-full border"
          style={{ borderColor: 'var(--brand)', x: '-50%', y: '-50%' }}
          initial={{ width: 30, height: 30, opacity: 0.6 }}
          animate={{ width: 66, height: 66, opacity: 0 }}
          transition={{ duration: 1.1, repeat: Infinity, ease: 'easeOut' }} />
        
        </motion.div>
      }

      {/* precise center dot */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[100]"
        style={{ x: sx, y: sy }}>
        
        <motion.span
          className="absolute rounded-full transition-colors duration-200"
          style={{ background: color, x: '-50%', y: '-50%' }}
          animate={{ width: pressed ? 8 : active ? 5 : 4, height: pressed ? 8 : active ? 5 : 4 }}
          transition={{ type: 'spring', stiffness: 500, damping: 24 }} />
        
      </motion.div>
    </div>);

}

function AmbientChips() {
  const reduce = useReducedMotion();
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);

  const chips = useMemo<Chip[]>(() => {
    const out: Chip[] = [];
    let seed = 7;
    const rand = () => {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    };
    for (let i = 0; i < 26; i++) {
      out.push({
        left: rand() * 100,
        top: rand() * 100,
        w: 26 + rand() * 46,
        h: 14 + rand() * 22,
        rotate: -18 + rand() * 36,
        depth: 0.25 + rand() * 1.1,
        opacity: 0.05 + rand() * 0.07
      });
    }
    return out;
  }, []);

  useEffect(() => {
    if (reduce) return;
    if (!window.matchMedia('(pointer: fine)').matches) return;

    const update = () => {
      rafRef.current = null;
      setOffset((prev) => prev);
    };

    const onScrollOrMove = (e: Event) => {
      if (rafRef.current !== null) return;
      rafRef.current = window.requestAnimationFrame(() => {
        rafRef.current = null;
        const scroll = window.scrollY;
        const mouse =
        e.type === 'mousemove' ?
        {
          x: ((e as MouseEvent).clientX / window.innerWidth - 0.5) * 2,
          y: ((e as MouseEvent).clientY / window.innerHeight - 0.5) * 2
        } :
        null;
        setOffset((prev) => ({
          x: mouse ? mouse.x * 14 : prev.x,
          y: -(scroll * 0.04)
        }));
      });
    };

    window.addEventListener('scroll', onScrollOrMove, { passive: true });
    window.addEventListener('mousemove', onScrollOrMove);
    update();
    return () => {
      window.removeEventListener('scroll', onScrollOrMove);
      window.removeEventListener('mousemove', onScrollOrMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [reduce]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 hidden overflow-hidden md:block">
      
      {chips.map((chip, i) =>
      <div
        key={i}
        className="absolute border border-ink/20 bg-ink/10"
        style={{
          left: `${chip.left}%`,
          top: `${chip.top}%`,
          width: chip.w,
          height: chip.h,
          opacity: chip.opacity,
          transform: `translate3d(${offset.x * chip.depth}px, ${
          offset.y * chip.depth}px, 0) rotate(${
          chip.rotate}deg)`,
          transition: reduce ? 'none' : 'transform 700ms cubic-bezier(0.22, 1, 0.36, 1)'
        }} />

      )}
    </div>);

}

function ScrollManager() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      window.requestAnimationFrame(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
      return;
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [location.pathname, location.hash]);

  return null;
}

export function App() {
  return (
    <BrowserRouter>
      <div className="rt-cursor-host relative min-h-screen w-full bg-paper text-ink">
        <AmbientChips />
        <ReticleCursor />
        <ScrollManager />
        <Nav />
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="relative z-10">
          
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/about" element={<About />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/rettrivo" element={<Blank />} />
            <Route path="*" element={<Landing />} />
          </Routes>
        </motion.main>
        <Footer />
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: 'var(--ink)',
              color: '#F5F6F3',
              border: 'none',
              borderRadius: 0,
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: '12px',
              letterSpacing: '0.04em'
            }
          }} />
        
      </div>
    </BrowserRouter>);

}