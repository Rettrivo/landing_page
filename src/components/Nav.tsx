import React, { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { MenuIcon, XIcon } from 'lucide-react';

type NavItem = {
  label: string;
  kind: 'section' | 'route';
  target: string;
};

const NAV_ITEMS: NavItem[] = [
{ label: 'Home', kind: 'section', target: 'hero' },
{ label: 'Platform', kind: 'section', target: 'platform' },
{ label: 'Capabilities', kind: 'section', target: 'capabilities' },
{ label: 'Solutions', kind: 'section', target: 'solutions' },
{ label: 'Contact', kind: 'section', target: 'contact' },
{ label: 'About', kind: 'route', target: '/about' }];


const SPY_IDS = ['hero', 'platform', 'capabilities', 'solutions', 'docs', 'contact'];

export function Nav() {
  const [condensed, setCondensed] = useState(false);
  const [activeId, setActiveId] = useState('hero');
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const onLanding = location.pathname === '/';
  const onBlankPage = location.pathname === '/rettrivo';

  useEffect(() => {
    const onScroll = () => setCondensed(window.scrollY > 80);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!onLanding) return;
    const sections = SPY_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => Boolean(el)
    );
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.
        filter((e) => e.isIntersecting).
        sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveId(visible.target.id);
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.25, 0.5, 1] }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [onLanding, location.pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const go = useCallback(
    (item: NavItem) => {
      setMenuOpen(false);
      if (item.kind === 'route') {
        navigate(item.target);
        return;
      }
      if (!onLanding) {
        navigate(`/#${item.target}`);
        return;
      }
      const el = document.getElementById(item.target);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    },
    [navigate, onLanding]
  );

  const isActive = (item: NavItem) =>
  item.kind === 'route' ? location.pathname === item.target : onLanding && activeId === item.target;

  const goToRettrivoCta = useCallback(() => {
    setMenuOpen(false);
    if (onBlankPage) {
      window.open('https://app.rettrivo.com/', '_blank', 'noopener,noreferrer');
      return;
    }
    navigate('/rettrivo');
  }, [navigate, onBlankPage]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4">
        <motion.nav
          aria-label="Primary"
          animate={{
            marginTop: condensed ? 6 : 10,
            paddingTop: condensed ? 4 : 6,
            paddingBottom: condensed ? 4 : 6
          }}
          transition={{ type: 'spring', stiffness: 240, damping: 28 }}
          className={[
          'flex w-full max-w-5xl items-center justify-between gap-3 rounded-full border px-2.5 sm:px-4',
          condensed ?
          'border-line bg-paper-raised/85 shadow-[0_10px_30px_-18px_rgba(20,24,26,0.35)] backdrop-blur-md' :
          'border-transparent bg-paper-raised/40 backdrop-blur-sm'].
          join(' ')}>
          
          <button
            type="button"
            onClick={() => go(NAV_ITEMS[0])}
            className="flex items-center transition-transform duration-200 lg:origin-left"
            aria-label="Rettrivo home">
            <img
              src="/Logo.svg"
              alt="Rettrivo"
              className="h-12 w-auto max-w-[260px] sm:h-14 lg:h-14 lg:scale-110 xl:scale-[1.2] transition-transform duration-200"
            />
          </button>

          <ul className="hidden items-center gap-1 lg:flex">
            {NAV_ITEMS.map((item) => {
              const active = isActive(item);
              return (
                <li key={item.label}>
                  <button
                    type="button"
                    onClick={() => go(item)}
                    aria-current={active ? 'page' : undefined}
                    className={[
                    'group flex items-center gap-2 rounded-full px-3 py-1.5 text-sm transition-colors',
                    active ? 'text-ink' : 'text-ink-soft hover:text-ink'].
                    join(' ')}>
                    
                    <span
                      aria-hidden="true"
                      className={[
                      'h-2 w-2 border transition-colors',
                      active ?
                      'border-brand bg-brand' :
                      'border-ink/40 bg-transparent group-hover:border-brand'].
                      join(' ')} />
                    
                    {item.label}
                  </button>
                </li>);

            })}
          </ul>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={goToRettrivoCta}
              className="hidden rounded-full bg-brand px-4 py-2 text-sm font-semibold text-paper transition-colors hover:bg-brand-deep sm:block">
              {onBlankPage ? 'Open Rettrivo' : 'Rettriv 2.0'}
            </button>
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-line bg-paper-raised text-ink lg:hidden"
              aria-label="Open menu"
              aria-expanded={menuOpen}>
              
              <MenuIcon className="h-4 w-4" />
            </button>
          </div>
        </motion.nav>
      </header>

      <AnimatePresence>
        {menuOpen &&
        <motion.div
          key="mobile-menu"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[60] lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Menu">
          
            <div className="absolute inset-0 bg-ink/30" onClick={() => setMenuOpen(false)} />
            <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 260, damping: 30 }}
            className="absolute inset-y-0 right-0 flex w-full max-w-sm flex-col bg-paper-raised">
            
              <div className="flex items-center justify-between border-b border-line px-6 py-5">
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-soft">
                  INDEX / NAVIGATION
                </span>
                <button
                type="button"
                onClick={() => setMenuOpen(false)}
                className="flex h-9 w-9 items-center justify-center border border-line"
                aria-label="Close menu">
                
                  <XIcon className="h-4 w-4" />
                </button>
              </div>
              <ul className="flex-1 overflow-y-auto py-2">
                {NAV_ITEMS.map((item, i) => {
                const active = isActive(item);
                return (
                  <li key={item.label} className="border-b border-line/70">
                      <button
                      type="button"
                      onClick={() => go(item)}
                      className="flex w-full items-center justify-between px-6 py-4 text-left">
                      
                        <span className="flex items-center gap-4">
                          <span
                          aria-hidden="true"
                          className={[
                          'h-4 w-4 border',
                          active ? 'border-brand bg-brand' : 'border-ink/30'].
                          join(' ')} />
                        
                          <span className="font-display text-xl">{item.label}</span>
                        </span>
                        <span className="font-mono text-[11px] text-ink-soft">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                      </button>
                    </li>);

              })}
              </ul>
              <div className="border-t border-line px-6 py-5">
                <button
                  type="button"
                  onClick={goToRettrivoCta}
                  className="w-full bg-brand px-4 py-3 text-sm font-semibold text-paper">
                  {onBlankPage ? 'Open Rettrivo' : 'Rettrivo'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        }
      </AnimatePresence>
    </>);

}