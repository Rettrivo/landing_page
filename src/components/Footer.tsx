import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowRightIcon, FacebookIcon, LinkedinIcon, YoutubeIcon } from 'lucide-react';

type FooterLink = {label: string;kind: 'section' | 'route';target: string;};

const PRODUCT: FooterLink[] = [
{ label: 'Platform', kind: 'section', target: 'platform' },
{ label: 'Retrieval pipeline', kind: 'section', target: 'platform' },
{ label: 'Capabilities', kind: 'section', target: 'capabilities' },
{ label: 'vs. Traditional search', kind: 'section', target: 'compare' },
{ label: 'Technology', kind: 'section', target: 'technology' }];


const SOLUTIONS: FooterLink[] = [
{ label: 'Solutions', kind: 'section', target: 'solutions' },
{ label: 'The problem we solve', kind: 'section', target: 'problem' },
{ label: 'Customer voices', kind: 'section', target: 'testimonials' },
{ label: 'Ways to work with us', kind: 'section', target: 'ways' },
{ label: 'Pricing', kind: 'section', target: 'pricing' }];


const RESOURCES: FooterLink[] = [
{ label: 'FAQ', kind: 'section', target: 'faq' },
{ label: 'Company record', kind: 'route', target: '/about' },
{ label: 'About Us', kind: 'route', target: '/about' },
{ label: 'Contact', kind: 'section', target: 'contact' }];


const LEGAL: FooterLink[] = [
{ label: 'Terms & Conditions', kind: 'route', target: '/terms' },
{ label: 'Privacy Policy', kind: 'route', target: '/privacy' }];


function XLogo({ className }: {className?: string;}) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>);

}

function PinterestLogo({ className }: {className?: string;}) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M12.017 2C6.484 2 2 6.484 2 12.017c0 4.244 2.64 7.87 6.366 9.33-.087-.79-.166-2.006.035-2.87.182-.78 1.173-4.97 1.173-4.97s-.3-.6-.3-1.486c0-1.39.807-2.43 1.81-2.43.855 0 1.267.642 1.267 1.41 0 .86-.546 2.145-.828 3.336-.236.998.5 1.812 1.484 1.812 1.78 0 3.15-1.878 3.15-4.59 0-2.4-1.726-4.078-4.19-4.078-2.853 0-4.528 2.14-4.528 4.352 0 .862.332 1.786.746 2.288a.3.3 0 0 1 .07.288c-.077.318-.248.998-.28 1.137-.045.19-.253.23-.463.14-1.29-.6-2.096-2.48-2.096-3.99 0-3.25 2.362-6.235 6.81-6.235 3.573 0 6.35 2.546 6.35 5.95 0 3.553-2.24 6.415-5.35 6.415-1.045 0-2.027-.543-2.363-1.185l-.643 2.45c-.232.897-.86 2.02-1.28 2.706A10.02 10.02 0 0 0 12.017 22C17.55 22 22 17.55 22 12.017 22 6.484 17.55 2 12.017 2z" />
    </svg>);

}

const SOCIALS = [
{ label: 'LinkedIn', href: 'https://www.linkedin.com/company/rettriivo/', Icon: LinkedinIcon },
{ label: 'YouTube', href: 'https://www.youtube.com/@Rettrivo', Icon: YoutubeIcon },
{ label: 'Facebook', href: 'https://www.facebook.com/Rettrivo/', Icon: FacebookIcon },
{ label: 'X', href: 'https://x.com/Rettrivo', Icon: XLogo },
{ label: 'Pinterest', href: 'https://www.pinterest.com/Rettrivo/', Icon: PinterestLogo }];


export function Footer() {
  const navigate = useNavigate();
  const location = useLocation();

  const go = (link: FooterLink) => {
    if (link.kind === 'route') {
      navigate(link.target);
      return;
    }
    if (location.pathname !== '/') {
      navigate(`/#${link.target}`);
      return;
    }
    document.getElementById(link.target)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const column = (title: string, links: FooterLink[], index: number) =>
  <div>
      <div className="mb-4 flex items-center gap-2">
        <span aria-hidden="true" className="h-2.5 w-2.5 border border-ink/40" />
        <h3 className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-soft">
          {String(index).padStart(2, '0')} · {title}
        </h3>
      </div>
      <ul className="space-y-2.5">
        {links.map((link) =>
      <li key={link.label}>
            <button
          type="button"
          onClick={() => go(link)}
          className="group flex items-center gap-2 text-left text-sm text-ink transition-colors hover:text-brand">
          
              <span
            aria-hidden="true"
            className="h-[1px] w-0 bg-brand transition-all duration-200 group-hover:w-3" />
          
              {link.label}
            </button>
          </li>
      )}
      </ul>
    </div>;


  return (
    <footer className="relative z-10 border-t border-line bg-paper-raised">
      {/* Top strip - closing prompt */}
      <div className="border-b border-line">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-10 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-soft">
              Still evaluating?
            </span>
            <p className="mt-2 max-w-xl font-display text-xl font-semibold leading-snug sm:text-2xl">
              Send us the internal question your current search can never answer.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => go({ label: 'Contact', kind: 'section', target: 'contact' })}
              className="group flex items-center gap-2 bg-brand px-5 py-3 text-sm font-semibold text-paper transition-colors hover:bg-brand-deep">
              
              Talk to sales
              <ArrowRightIcon
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
                aria-hidden="true" />
              
            </button>
            <button
              type="button"
              onClick={() => go({ label: 'FAQ', kind: 'section', target: 'faq' })}
              className="border border-ink/20 px-5 py-3 text-sm font-semibold transition-colors hover:border-ink hover:bg-ink hover:text-paper">
              
              Read the FAQ
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr_0.9fr]">
        <div>
          <div className="flex items-center">
            <img src="/Logo.svg" alt="Rettrivo" className="h-20 w-auto max-w-[420px]" />
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-soft">
            Rettrivo turns your company's buried knowledge into instant, cited answers,  so your team stops searching and starts asking.
          </p>
        </div>

        {column('Product', PRODUCT, 1)}
        {column('Solutions', SOLUTIONS, 2)}
        {column('Resources', RESOURCES, 3)}
        {column('Legal', LEGAL, 4)}
      </div>

      <div className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-3 px-6 py-6">
          <span className="mr-2 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-soft">
            Social
          </span>
          {SOCIALS.map(({ label, href, Icon }) =>
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noreferrer"
            aria-label={label}
            className="group relative flex items-center gap-2 border border-line px-3 py-1.5 text-xs text-ink transition-colors hover:border-brand hover:text-brand">
            
              <span
              aria-hidden="true"
              className="absolute -top-[5px] left-2 h-[5px] w-[10px] border border-b-0 border-line transition-colors group-hover:border-brand group-hover:bg-brand" />
            
              <Icon className="h-3.5 w-3.5" />
              {label}
            </a>
          )}
        </div>
      </div>

      <div className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 py-5 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-soft sm:flex-row sm:items-center sm:justify-between">
          <span>© 2026 Rettrivo LLC. All rights reserved</span>
          <span>Founded 2023 · Enterprise RAG infrastructure</span>
        </div>
      </div>
    </footer>);

}