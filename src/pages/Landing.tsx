import React, { useEffect, useRef, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform
} from
  'framer-motion';
import { toast } from 'sonner';
import {
  ArrowRightIcon,
  CheckCircle2Icon,
  CpuIcon,
  DatabaseIcon,
  FileSpreadsheetIcon,
  FileTextIcon,
  ImageIcon,
  LayersIcon,
  MessageSquareIcon,
  SearchIcon,
  ShieldCheckIcon,
  TableIcon,
  XIcon
} from
  'lucide-react';

/* ------------------------------------------------------------------ types */

type DocPlaceholder = {
  id: string;
  type: string;
  Icon: typeof FileTextIcon;
  x: number;
  y: number;
  rotate: number;
  w: number;
  answer?: boolean;
};

type Stage = {
  code: string;
  title: string;
  copy: string;
};

type Capability = {
  code: string;
  title: string;
  note?: string;
  items: string[];
};

type ContactErrors = Partial<Record<'name' | 'email' | 'company' | 'message' | 'captcha', string>>;

/* ------------------------------------------------------- shared utilities */

function Eyebrow({ children }: { children: React.ReactNode; }) {
  return (
    <div className="flex items-center gap-2">
      <span aria-hidden="true" className="h-2.5 w-2.5 border border-marker bg-marker" />
      <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-soft">
        {children}
      </span>
    </div>);

}

function Reveal({
  children,
  delay = 0,
  y = 18,
  className = ''





}: { children: React.ReactNode; delay?: number; y?: number; className?: string; }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: reduce ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}>

      {children}
    </motion.div>);

}

function Tilt({
  children,
  className = '',
  strength = 8




}: { children: React.ReactNode; className?: string; strength?: number; }) {
  const reduce = useReducedMotion();
  const rx = useSpring(useMotionValue(0), { stiffness: 180, damping: 18 });
  const ry = useSpring(useMotionValue(0), { stiffness: 180, damping: 18 });
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent) => {
    if (reduce || !ref.current) return;
    if (!window.matchMedia('(pointer: fine)').matches) return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    ry.set(px * strength * 2);
    rx.set(-py * strength * 2);
  };

  const reset = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 900 }}
      className={className}>

      {children}
    </motion.div>);

}

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function ImagePlaceholder({
  label,
  className = ''



}: { label: string; className?: string; }) {
  return (
    <div
      className={[
        'relative flex items-center justify-center border border-line bg-[repeating-linear-gradient(135deg,#EDEFEB_0px,#EDEFEB_10px,#F5F6F3_10px,#F5F6F3_20px)]',
        className].
        join(' ')}
      role="img"
      aria-label={label}>

      <div className="flex flex-col items-center gap-2 px-4 text-center">
        <ImageIcon className="h-6 w-6 text-ink/25" aria-hidden="true" />
        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft">
          {label}
        </span>
      </div>
    </div>);

}

/* ------------------------------------------------------------- 4.1 · hero */

const DOCS: DocPlaceholder[] = [
  { id: 'DOC_0122', type: 'CONTRACT.PDF', Icon: FileTextIcon, x: 2, y: 6, rotate: -7, w: 168 },
  { id: 'DOC_0318', type: 'TICKET.JSON', Icon: MessageSquareIcon, x: 22, y: 0, rotate: 5, w: 150 },
  { id: 'DOC_0417', type: 'POLICY.PDF', Icon: FileTextIcon, x: 30, y: 34, rotate: -2, w: 320, answer: true },
  { id: 'DOC_0592', type: 'SHEET.XLSX', Icon: FileSpreadsheetIcon, x: 68, y: 4, rotate: 8, w: 158 },
  { id: 'DOC_0733', type: 'WIKI.MD', Icon: LayersIcon, x: 84, y: 40, rotate: -6, w: 142 },
  { id: 'DOC_0811', type: 'TABLE.SQL', Icon: TableIcon, x: 6, y: 52, rotate: 6, w: 152 },
  { id: 'DOC_0904', type: 'DECK.PDF', Icon: FileTextIcon, x: 60, y: 66, rotate: -9, w: 164 },
  { id: 'DOC_1042', type: 'DB.SNAPSHOT', Icon: DatabaseIcon, x: 42, y: 78, rotate: 3, w: 146 }];


function IndexWall() {
  const reduce = useReducedMotion();

  return (
    <div className="relative h-[420px] w-full sm:h-[460px] lg:h-[520px]">
      {DOCS.map((doc, i) => {
        const isAnswer = Boolean(doc.answer);
        return (
          <motion.div
            key={doc.id}
            initial={{ opacity: 0, y: reduce ? 0 : 26, rotate: doc.rotate, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, rotate: doc.rotate, scale: 1 }}
            transition={{
              delay: reduce ? 0 : 0.15 + i * 0.09,
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1]
            }}
            className="absolute"
            style={{
              left: `${doc.x}%`,
              top: `${doc.y}%`,
              width: doc.w,
              maxWidth: '78%',
              zIndex: isAnswer ? 20 : 10 - i
            }}>

            <Tilt strength={isAnswer ? 5 : 9}>
              {isAnswer ?
                <AnswerCard doc={doc} /> :

                <div className="border border-line bg-paper-raised/80 p-3 opacity-70 blur-[1.2px] shadow-[0_12px_28px_-24px_rgba(20,24,26,0.5)]">
                  <div className="flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.12em] text-ink-soft">
                    <span>{doc.id}</span>
                    <doc.Icon className="h-3 w-3" aria-hidden="true" />
                  </div>
                  <div className="mt-2 space-y-1.5" aria-hidden="true">
                    <div className="h-1.5 w-full bg-ink/12" />
                    <div className="h-1.5 w-5/6 bg-ink/10" />
                    <div className="h-1.5 w-2/3 bg-ink/10" />
                    <div className="h-1.5 w-4/5 bg-ink/[0.08]" />
                  </div>
                  <div className="mt-3 font-mono text-[9px] text-ink-soft/70">{doc.type}</div>
                </div>
              }
            </Tilt>
          </motion.div>);

      })}
    </div>);

}

function AnswerCard({ doc }: { doc: DocPlaceholder; }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={{ filter: reduce ? 'none' : 'blur(3px)' }}
      animate={{ filter: 'blur(0px)' }}
      transition={{ delay: reduce ? 0 : 1.35, duration: 0.7 }}
      className="relative border border-ink/15 bg-paper-raised p-4 shadow-[0_28px_50px_-30px_rgba(20,24,26,0.55)]">

      <span
        aria-hidden="true"
        className="absolute -top-[7px] left-4 h-[7px] w-[26px] border border-b-0 border-ink/15 bg-brand" />

      <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft">
        <span>{doc.id} · {doc.type}</span>
        <span className="text-brand">CONF 94%</span>
      </div>
      <p className="mt-3 font-display text-base leading-snug text-ink">
        Vendor termination requires{' '}
        <span className="relative inline-block">
          <span className="relative z-10">60 days' written notice</span>
          <motion.span
            aria-hidden="true"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: reduce ? 0 : 1.9, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="absolute bottom-0 left-0 h-[7px] w-full origin-left bg-brand/30" />

        </span>{' '}
        for contracts above $250k.
      </p>
      <div className="mt-3 flex items-center gap-2 border-t border-line pt-3 font-mono text-[10px] text-ink-soft">
        <CheckCircle2Icon className="h-3.5 w-3.5 text-brand" aria-hidden="true" />
        SOURCE · MSA_2019.PDF · P.14 §7.2
      </div>
    </motion.div>);

}

const STAT_CHIPS = [
  { label: 'Sub-second retrieval', meta: 'RUN 00:00:00.3s' },
  { label: 'Source-cited answers', meta: 'CITE 1:1' },
  { label: 'Enterprise access control', meta: 'ACL AWARE' },
  { label: 'Connects existing systems', meta: 'NO MIGRATION' }];


function HeroLine({ children, delay }: { children: React.ReactNode; delay: number; }) {
  const reduce = useReducedMotion();
  return (
    <span className="block overflow-hidden">
      <motion.span
        className="block"
        initial={{ y: reduce ? 0 : '105%', opacity: reduce ? 0 : 1 }}
        animate={{ y: '0%', opacity: 1 }}
        transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}>

        {children}
      </motion.span>
    </span>);

}

function Hero() {
  const reduce = useReducedMotion();

  return (
    <section id="hero" className="relative overflow-hidden border-b border-line pt-32 sm:pt-36">
      {/* colour scaffolding */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 hidden w-[46%] bg-[#E4EDE7] lg:block" />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[46%] top-0 hidden h-full w-[3px] bg-marker/70 lg:block" />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[3px] bg-brand" />


      <div className="relative mx-auto max-w-6xl px-6 pb-16">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.98fr)_minmax(0,1.02fr)]">
          <div>
            <Reveal>
              <div className="inline-flex items-center gap-2 border border-brand/30 bg-brand/[0.07] px-3 py-1.5">
                <span aria-hidden="true" className="h-2.5 w-2.5 border border-marker bg-marker" />
                <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-brand">
                  Enterprise RAG platform
                </span>
              </div>
            </Reveal>

            <h1 className="mt-6 font-display text-[2.5rem] font-bold leading-[0.98] tracking-[-0.03em] sm:text-[3.4rem] lg:text-[4.1rem]">
              <HeroLine delay={0.1}>
                <span className="text-ink">Enterprise</span>{' '}
                <span className="relative inline-block text-ink">
                  Knowledge,
                  <motion.span
                    aria-hidden="true"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: reduce ? 0 : 1.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute -bottom-1 left-0 h-[6px] w-full origin-left bg-marker/70" />

                </span>
              </HeroLine>
              <HeroLine delay={0.22}>
                <span className="font-accent text-[1.14em] font-normal italic tracking-[-0.01em] text-brand">
                  Instantly Accessible
                </span>
              </HeroLine>
              <HeroLine delay={0.34}>
                <span className="text-ink">Through </span>
                <span className="relative ml-1 inline-block bg-brand px-3 pb-1 text-paper">
                  AI.
                </span>
              </HeroLine>
            </h1>

            <Reveal delay={0.5}>
              <p className="mt-7 max-w-lg border-l-2 border-brand/40 pl-4 text-[1.06rem] leading-relaxed text-ink-soft">
                Enterprise RAG that turns thousands of internal documents into one intelligent answer engine.

              </p>
            </Reveal>

            <Reveal delay={0.58}>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => scrollToId('platform')}
                  className="group flex items-center gap-2 bg-brand px-6 py-3.5 text-sm font-semibold text-paper shadow-[4px_4px_0_0_var(--ink)] transition-all hover:bg-brand-deep hover:shadow-[2px_2px_0_0_var(--ink)]">

                  See It Retrieve
                  <ArrowRightIcon
                    className="h-4 w-4 transition-transform group-hover:translate-x-1"
                    aria-hidden="true" />

                </button>
                <button
                  type="button"
                  onClick={() => scrollToId('contact')}
                  className="border-2 border-ink px-6 py-3.5 text-sm font-semibold text-ink transition-colors hover:bg-ink hover:text-paper">

                  Talk to sales
                </button>
              </div>
            </Reveal>
          </div>

          <div className="relative">
            <IndexWall />
          </div>
        </div>

        <Reveal delay={0.15} className="mt-6">
          <ul className="grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {STAT_CHIPS.map((chip, i) => {
              const accent = i % 2 === 0 ? 'var(--brand)' : 'var(--marker)';
              return (
                <li
                  key={chip.label}
                  className="group relative bg-paper-raised p-5 transition-colors hover:bg-paper">

                  <span
                    aria-hidden="true"
                    className="absolute left-0 top-0 h-full w-[3px]"
                    style={{ backgroundColor: accent }} />

                  <div className="font-display text-[1.08rem] font-semibold leading-tight">
                    {chip.label}
                  </div>
                  <div
                    className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.14em]"
                    style={{ color: accent }}>

                    {chip.meta}
                  </div>
                </li>);

            })}
          </ul>
        </Reveal>
      </div>
    </section>);

}

/* -------------------------------------------------------- 4.2 · a problem */

const PROBLEMS = [
  'Knowledge is scattered across wikis, drives, ticketing systems, and databases that never talk to each other.',
  'Employees lose hours every week searching, and often rewrite work that already exists.',
  'Legacy keyword search matches strings, not meaning, so it returns lists instead of answers.',
  'Decisions slow down while people wait on whoever happens to remember where the document lives.'];


function Problem() {
  return (
    <section id="problem" className="relative overflow-hidden border-b border-line bg-paper">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/2 lg:block"
        style={{
          background: 'linear-gradient(120deg, transparent 0 42%, #EDEFEB 42% 100%)',
          clipPath: 'polygon(18% 0, 100% 0, 100% 100%, 0 100%)'
        }} />

      <div className="relative mx-auto grid max-w-6xl gap-12 px-6 py-24 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-20">
        <div className="lg:pr-10">
          <Reveal>
            <Eyebrow>The problem</Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-6 max-w-md font-display text-3xl font-bold leading-[1.08] tracking-[-0.02em] sm:text-[2.9rem]">
              The answer exists, Finding it doesn't
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-6 max-w-sm font-mono text-[11px] uppercase leading-relaxed tracking-[0.14em] text-ink-soft">
              INDEXED_BUT_UNREACHABLE, the information exists. Nobody can retrieve it on demand.
            </p>
          </Reveal>
        </div>
        <div className="lg:pt-14">
          <ul className="space-y-8">
            {PROBLEMS.map((item, i) =>
              <Reveal key={item} delay={i * 0.07}>
                <li className="border-t border-line pt-5">
                  <span className="font-mono text-[11px] tracking-[0.14em] text-marker">
                    {i === 0
                      ? '01 — Scattered by Design'
                      : i === 1
                        ? '02 — The Hidden Tax'
                        : i === 2
                          ? '03 — Strings, Not Meaning'
                          : '04 — Bottlenecked by Memory'}
                  </span>
                  <p className="mt-2 max-w-md text-[1.02rem] leading-relaxed text-ink">{item}</p>
                </li>
              </Reveal>
            )}
          </ul>
        </div>
      </div>
    </section>);

}

/* --------------------------------------------------- 4.3 · the RAG pipeline */

const STAGES: Stage[] = [
  {
    code: '01 · INGEST',
    title: 'Enterprise Data Sources',
    copy: 'Connect document stores, wikis, ticketing systems, and databases without migrating them.'
  },
  {
    code: '02 · INDEX',
    title: 'Knowledge Indexing',
    copy: 'Content is parsed, chunked, and indexed with structure and permissions preserved.'
  },
  {
    code: '03 · RETRIEVE',
    title: 'Semantic Retrieval',
    copy: 'A question is matched on meaning, returning the passages that actually answer it.'
  },
  {
    code: '04 · GENERATE',
    title: 'AI Answer Generation',
    copy: 'The answer is written only from retrieved passages, each one cited back to its source.'
  },
  {
    code: '05 · INSIGHT',
    title: 'Intelligent Business Insights',
    copy: 'Query patterns reveal what teams need, what is missing, and where knowledge decays.'
  }];


function StageCard({ stage, index }: { stage: Stage; index: number; }) {
  return (
    <article className="flex h-full w-[78vw] shrink-0 flex-col justify-between border border-line bg-paper-raised p-6 sm:w-[360px]">
      <div>
        <div className="flex items-center justify-between">
          <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-brand">
            {stage.code}
          </span>
          <span className="h-3 w-3 border border-ink/30 bg-paper" aria-hidden="true" />
        </div>
        <h3 className="mt-5 font-display text-2xl font-semibold leading-tight tracking-[-0.01em]">
          {stage.title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-ink-soft">{stage.copy}</p>
      </div>
      <div className="mt-8 border-t border-line pt-4 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft">
        STAGE {index + 1} / {STAGES.length}
      </div>
    </article>);

}

function Pipeline() {
  const trackRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start start', 'end end']
  });
  const x = useTransform(scrollYProgress, [0.04, 0.96], ['2%', '-72%']);
  const lineWidth = useTransform(scrollYProgress, [0.04, 0.96], ['4%', '100%']);

  return (
    <section id="platform" className="border-b border-line bg-paper">
      <div className="mx-auto max-w-6xl px-6 pt-24">
        <Reveal>
          <Eyebrow>The retrieval pipeline</Eyebrow>
        </Reveal>
        <div className="mt-6 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <Reveal delay={0.08}>
            <h2 className="max-w-xl font-display text-3xl font-bold leading-[1.08] tracking-[-0.02em] sm:text-[2.6rem]">
              Five stages between a question and a defensible answer.
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="max-w-sm text-sm leading-relaxed text-ink-soft">
              Every layer of retrieval infrastructure you need. Every answer Rettrivo returns is traceable
              through each stage of the pipeline below.
            </p>
          </Reveal>
        </div>
      </div>

      {/* Desktop: scroll-linked horizontal pipeline */}
      <div ref={trackRef} className="relative hidden h-[320vh] md:block">
        <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
          <div className="mx-auto mb-8 w-full max-w-6xl px-6">
            <div className="relative h-[2px] w-full bg-line">
              <motion.div
                className="absolute inset-y-0 left-0 bg-brand"
                style={{ width: reduce ? '100%' : lineWidth }} />

            </div>
          </div>
          <motion.div
            className="flex items-stretch gap-6 pl-[max(1.5rem,calc((100vw-72rem)/2+1.5rem))]"
            style={{ x: reduce ? '0%' : x }}>

            {STAGES.map((stage, i) =>
              <div key={stage.code} className="flex items-stretch gap-6">
                <StageCard stage={stage} index={i} />
                {i < STAGES.length - 1 &&
                  <div className="flex w-8 shrink-0 items-center" aria-hidden="true">
                    <div className="h-[1px] w-full bg-ink/25" />
                  </div>
                }
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Mobile: vertical pipeline */}
      <ol className="mx-auto max-w-6xl space-y-4 px-6 py-14 md:hidden">
        {STAGES.map((stage, i) =>
          <Reveal key={stage.code} delay={i * 0.05}>
            <li className="relative border-l-2 border-brand pl-5">
              <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-brand">
                {stage.code}
              </span>
              <h3 className="mt-2 font-display text-xl font-semibold">{stage.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{stage.copy}</p>
            </li>
          </Reveal>
        )}
      </ol>
    </section>);

}

/* ------------------------------------------------- 4.4 · capabilities deck */

const CAPABILITIES: Capability[] = [
  {
    code: 'CAP_01',
    title: 'Knowledge Retrieval Engine',
    items: [
      'Semantic search',
      'Context-based retrieval',
      'Document understanding',
      'Knowledge indexing',
      'Information discovery']

  },
  {
    code: 'CAP_02',
    title: 'AI Answer Generation System',
    items: [
      'Natural language answers',
      'Context-aware responses',
      'Source-based generation',
      'Question understanding',
      'Response optimization']

  },
  {
    code: 'CAP_03',
    title: 'Enterprise Knowledge Integration Platform',
    items: [
      'Document ingestion',
      'Data source integration',
      'Knowledge synchronization',
      'Content organization',
      'Information management']

  },
  {
    code: 'CAP_04',
    title: 'Knowledge Intelligence Dashboard',
    note: 'Capability preview',
    items: [
      'Search analytics',
      'Query insights',
      'Usage tracking',
      'Response performance monitoring']

  },
  {
    code: 'CAP_05',
    title: 'AI Knowledge Operations Platform',
    items: [
      'Knowledge management',
      'Retrieval monitoring',
      'Content optimization',
      'Access management',
      'AI workflow monitoring']

  }];


function CapabilityCard({ cap, index, total }: { cap: Capability; index: number; total: number; }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 18%', 'end 34%']
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, index % 2 === 0 ? -3.5 : 3.5]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.25]);

  return (
    <div ref={ref} className="h-[62vh] min-h-[420px]">
      <motion.div
        style={
          reduce ?
            undefined :
            { scale, rotate, opacity, transformOrigin: 'center top', position: 'sticky', top: 120 }
        }
        className={reduce ? '' : 'sticky top-[120px]'}>

        <Tilt strength={4}>
          <article className="grid gap-8 border border-line bg-paper-raised p-6 shadow-[0_30px_60px_-45px_rgba(20,24,26,0.5)] sm:p-9 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)]">
            <div>
              <div className="flex items-center gap-3">
                <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-brand">
                  {cap.code}
                </span>
                <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-soft">
                  {index + 1} / {total}
                </span>
              </div>
              <h3 className="mt-5 font-display text-2xl font-bold leading-tight tracking-[-0.01em] sm:text-[2rem]">
                {cap.title}
              </h3>
              {cap.note &&
                <span className="mt-3 inline-block border border-marker/50 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-marker">
                  {cap.note}
                </span>
              }
              <ul className="mt-6 grid gap-2 sm:grid-cols-2">
                {cap.items.map((item) =>
                  <li key={item} className="flex items-start gap-2 text-sm text-ink-soft">
                    <span
                      aria-hidden="true"
                      className="mt-[7px] h-1.5 w-1.5 shrink-0 border border-brand bg-brand" />

                    {item}
                  </li>
                )}
              </ul>
            </div>
            <img
              src={`/${cap.title}.png`}
              alt={cap.title}
              className="min-h-[180px] w-full object-cover" />

          </article>
        </Tilt>
      </motion.div>
    </div>);

}

function Capabilities() {
  return (
    <section id="capabilities" className="border-b border-line bg-paper">
      <div className="mx-auto max-w-6xl px-6 pt-24">
        <Reveal>
          <Eyebrow>Platform capabilities</Eyebrow>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="mt-6 max-w-2xl font-display text-3xl font-bold leading-[1.08] tracking-[-0.02em] sm:text-[2.6rem]">
            Five layers of retrieval infrastructure, stacked.
          </h2>
        </Reveal>
      </div>
      <div className="mx-auto max-w-5xl px-6 pb-24 pt-14">
        {CAPABILITIES.map((cap, i) =>
          <CapabilityCard key={cap.code} cap={cap} index={i} total={CAPABILITIES.length} />
        )}
      </div>
    </section>);

}

/* ---------------------------------------------------- 4.5 · unique angle */

const LEGACY_RESULTS = [
  { id: 'RESULT_01', title: 'MSA_2019_final_v3.pdf', meta: 'Match: "termination" · 41 pages' },
  { id: 'RESULT_02', title: 'Procurement wiki — Vendors', meta: 'Match: "notice" · last edit 2021' },
  { id: 'RESULT_03', title: 'RE: contract questions (thread)', meta: 'Match: "60 days" · 18 replies' },
  { id: 'RESULT_04', title: 'legal-templates/archive.zip', meta: 'Match: "vendor" · 214 files' },
  { id: 'RESULT_05', title: 'Q3_ops_review.xlsx', meta: 'Match: "contract" · sheet 4' }];


function UniqueAngle() {
  const [mode, setMode] = useState<'legacy' | 'rettrivo'>('rettrivo');

  return (
    <section id="compare" className="border-b border-line bg-paper">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Reveal>
              <Eyebrow>The difference</Eyebrow>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-6 max-w-lg font-display text-3xl font-bold leading-[1.08] tracking-[-0.02em] sm:text-[2.6rem]">
                Search returns documents but Rettrivo returns the answer
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.14}>
            <div
              role="tablist"
              aria-label="Compare traditional search and Rettrivo"
              className="flex w-full max-w-sm border border-line bg-paper-raised p-1">

              {(
                [
                  { key: 'legacy', label: 'Traditional Search' },
                  { key: 'rettrivo', label: 'Rettrivo' }] as
                const).
                map((tab) => {
                  const active = mode === tab.key;
                  return (
                    <button
                      key={tab.key}
                      type="button"
                      role="tab"
                      aria-selected={active}
                      onClick={() => setMode(tab.key)}
                      className={[
                        'relative flex-1 px-3 py-2.5 text-sm font-semibold transition-colors',
                        active ? 'text-paper' : 'text-ink-soft hover:text-ink'].
                        join(' ')}>

                      {active &&
                        <motion.span
                          layoutId="angle-tab"
                          className="absolute inset-0 bg-ink"
                          transition={{ type: 'spring', stiffness: 320, damping: 30 }} />

                      }
                      <span className="relative">{tab.label}</span>
                    </button>);

                })}
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="mt-10">
          <div className="border border-line bg-paper-raised">
            <div className="flex flex-wrap items-center gap-3 border-b border-line px-5 py-4">
              <SearchIcon className="h-4 w-4 text-ink-soft" aria-hidden="true" />
              <span className="font-mono text-xs text-ink">
                "What notice period do we owe a vendor on contracts over $250k?"
              </span>
            </div>
            <div className="min-h-[320px] p-5 sm:p-7">
              <AnimatePresence mode="wait" initial={false}>
                {mode === 'legacy' ?
                  <motion.div
                    key="legacy"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.28 }}>

                    <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-soft">
                      5 of 1,284 results · relevance unknown
                    </p>
                    <ul className="mt-5 divide-y divide-line">
                      {LEGACY_RESULTS.map((r) =>
                        <li key={r.id} className="py-3.5">
                          <div className="font-mono text-[10px] tracking-[0.12em] text-ink-soft/70">
                            {r.id}
                          </div>
                          <div className="mt-1 text-sm text-ink">{r.title}</div>
                          <div className="mt-0.5 font-mono text-[10px] text-ink-soft">{r.meta}</div>
                        </li>
                      )}
                    </ul>
                    <p className="mt-5 text-sm text-ink-soft">
                      You still have to open, read, and reconcile them yourself.
                    </p>
                  </motion.div> :

                  <motion.div
                    key="rettrivo"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.28 }}>

                    <div className="flex flex-wrap items-center gap-4 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-soft">
                      <span className="text-brand">CONF 94%</span>
                      <span>RUN 00:00:00.3s</span>
                      <span>SOURCES 2</span>
                    </div>
                    <p className="mt-5 max-w-2xl font-display text-xl leading-snug sm:text-2xl">
                      Contracts above $250k require{' '}
                      <span className="relative inline-block">
                        <span className="relative z-10">60 days' written notice</span>
                        <span
                          aria-hidden="true"
                          className="absolute bottom-0 left-0 h-[8px] w-full bg-brand/30" />

                      </span>{' '}
                      before termination, delivered to the vendor's registered contact.
                    </p>
                    <ul className="mt-7 grid gap-3 sm:grid-cols-2">
                      {[
                        { doc: 'MSA_2019.PDF', loc: 'p.14 §7.2' },
                        { doc: 'PROCUREMENT_POLICY.PDF', loc: 'p.3 §2.1' }].
                        map((s) =>
                          <li
                            key={s.doc}
                            className="flex items-center gap-3 border border-line px-4 py-3">

                            <FileTextIcon className="h-4 w-4 text-brand" aria-hidden="true" />
                            <span className="font-mono text-[11px] text-ink">
                              {s.doc} · {s.loc}
                            </span>
                          </li>
                        )}
                    </ul>
                    <p className="mt-5 text-sm text-ink-soft">
                      One answer, two citations, permission-checked before it was written.
                    </p>
                  </motion.div>
                }
              </AnimatePresence>
            </div>
          </div>
        </Reveal>
      </div>
    </section>);

}

/* ------------------------------------------------------- + · testimonials */

const TESTIMONIALS = [
  {
    ref: 'VOICE_01',
    quote:
      "We had 40,000 documents and no way to actually use them. Rettrivo made all of it queryable in a week.",
    role: 'Soren Vance ',
    org: 'VP of Operations, Halloway & Finch',
    context: 'ONBOARDED 4 SOURCE SYSTEMS'
  },
  {
    ref: 'VOICE_02',
    quote:
      "Our support team used to escalate anything older than a year. Now they just ask Rettrivo and cite the source in the same reply.",
    role: ' Amara Idowu ',
    org: 'Head of Customer Success, Ferngate',
    context: 'ACL-AWARE RETRIEVAL REQUIRED'
  },
  {
    ref: 'VOICE_03',
    quote:
    "Legal review used to mean someone hunting through a shared drive for the right contract version. That entire step is gone now.",
    role: 'Julian Kestrel ',
    org: 'General Counsel, Northbridge Industrial',
    context: 'FIRST-CONTACT RESOLUTION FOCUS'
  },
  {
    ref: 'VOICE_04',
    quote:
    "It didn't just speed up search, it exposed how much duplicate work we were doing because nobody could find what already existed.",
    role: 'Ines Calloway ',
    org: 'Director of Knowledge Management, Larkspur Analytics',
    context: 'EXISTING DATA WAREHOUSE'
  }];


function Testimonials() {
  const [index, setIndex] = useState(0);
  const active = TESTIMONIALS[index];

  return (
    <section id="testimonials" className="border-b border-line bg-[#EDEFEB]">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <Reveal>
          <Eyebrow>Voices from the field</Eyebrow>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="mt-6 max-w-2xl font-display text-3xl font-bold leading-[1.08] tracking-[-0.02em] sm:text-[2.6rem]">
            Trusted by teams who stopped searching
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-8 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:gap-14">
          <Reveal delay={0.12}>
            <figure className="relative border border-line bg-paper-raised p-7 sm:p-10">
              <span
                aria-hidden="true"
                className="absolute -top-[8px] left-8 h-[8px] w-[34px] border border-b-0 border-line bg-brand" />

              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={active.ref}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}>

                  <div className="flex flex-wrap items-center gap-4 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-soft">
                    <span className="text-brand">{active.ref}</span>
                    <span>{active.context}</span>
                  </div>
                  <blockquote className="mt-6 max-w-2xl font-display text-xl leading-snug text-ink sm:text-[1.65rem]">
                    “{active.quote}”
                  </blockquote>
                  <figcaption className="mt-7 border-t border-line pt-5">
                    <div className="font-display text-base font-semibold">{active.role}</div>
                    <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft">
                      {active.org}
                    </div>
                  </figcaption>
                </motion.div>
              </AnimatePresence>
            </figure>
          </Reveal>

          <div className="flex flex-col justify-between gap-6">
            <ul className="divide-y divide-line border-y border-line">
              {TESTIMONIALS.map((t, i) => {
                const selected = i === index;
                return (
                  <li key={t.ref}>
                    <button
                      type="button"
                      onClick={() => setIndex(i)}
                      aria-pressed={selected}
                      className="group flex w-full items-center gap-3 py-4 text-left">

                      <span
                        aria-hidden="true"
                        className={[
                          'h-3.5 w-3.5 shrink-0 border transition-colors',
                          selected ?
                            'border-brand bg-brand' :
                            'border-ink/30 group-hover:border-brand'].
                          join(' ')} />

                      <span
                        className={[
                          'font-mono text-[11px] uppercase tracking-[0.14em] transition-colors',
                          selected ? 'text-ink' : 'text-ink-soft group-hover:text-ink'].
                          join(' ')}>

                        {t.ref}
                      </span>
                      <span className="truncate text-sm text-ink-soft">{t.role}</span>
                    </button>
                  </li>);

              })}
            </ul>
            <p className="font-mono text-[10px] uppercase leading-relaxed tracking-[0.14em] text-ink-soft">
             Representative feedback based on early access users. Full case studies coming soon.
            
            </p>
          </div>
        </div>
      </div>
    </section>);

}

/* ---------------------------------------------------------------- + · FAQ */

const FAQS = [
  {
    q: 'Do we have to move our data into Rettrivo?',
    a: 'No. Rettrivo indexes your sources in place, document stores, wikis, ticketing systems, and databases stay where they are, and the index stays in sync as content changes.'
  },
  {
    q: 'How does Rettrivo handle permissions?',
    a: 'Retrieval is permission-aware. Rettrivo respects the access controls of each connected source system, so an answer is only generated from content the person asking is already entitled to see.'
  },
  {
    q: 'How do we know an answer is correct?',
    a: 'Every answer is generated only from retrieved passages, and each one carries its citation trail back to the source document, page, and section. If the supporting material is not there, Rettrivo says so instead of guessing.'
  },
  {
    q: 'What does deployment look like?',
    a: 'Most engagements start with a single department and a handful of sources, then expand organization-wide under enterprise licensing. Connector configuration and index build are handled with your IT team.'
  },
  {
    q: 'Is there an API?',
    a: 'A developer API and public documentation are in progress. You can join the notification list in the documentation section above to hear when the reference goes live.'
  },
  {
    q: 'How is this different from the search we already have?',
    a: 'Traditional search returns a ranked list of documents matching keywords. Rettrivo retrieves on meaning and returns one direct answer with its sources, so no one has to open and reconcile five files first.'
  }];


function FaqItem({ item, index }: { item: (typeof FAQS)[number]; index: number; }) {
  const [open, setOpen] = useState(index === 0);
  const id = `faq-panel-${index}`;

  return (
    <li className="border-b border-line">
      <h3>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls={id}
          className="group flex w-full items-start gap-4 py-5 text-left">

          <span className="mt-1 font-mono text-[11px] tracking-[0.14em] text-marker">
            {String(index + 1).padStart(2, '0')}
          </span>
          <span className="flex-1 font-display text-lg font-semibold leading-snug transition-colors group-hover:text-brand">
            {item.q}
          </span>
          <motion.span
            aria-hidden="true"
            animate={{ rotate: open ? 45 : 0 }}
            transition={{ type: 'spring', stiffness: 320, damping: 24 }}
            className="relative mt-1 h-4 w-4 shrink-0">

            <span className="absolute left-1/2 top-0 h-4 w-[1.5px] -translate-x-1/2 bg-ink" />
            <span className="absolute top-1/2 left-0 h-[1.5px] w-4 -translate-y-1/2 bg-ink" />
          </motion.span>
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {open &&
          <motion.div
            id={id}
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden">

            <p className="max-w-2xl pb-6 pl-9 pr-8 text-[1.02rem] leading-relaxed text-ink-soft">
              {item.a}
            </p>
          </motion.div>
        }
      </AnimatePresence>
    </li>);

}

function Faq() {
  return (
    <section id="faq" className="border-b border-line bg-paper">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-24 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.5fr)] lg:gap-16">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <Reveal>
            <Eyebrow>FAQ</Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-6 font-display text-3xl font-bold leading-[1.08] tracking-[-0.02em] sm:text-[2.4rem]">
              The questions evaluators ask first.
            </h2>
          </Reveal>
          <Reveal delay={0.14}>
            <button
              type="button"
              onClick={() => scrollToId('contact')}
              className="mt-7 flex items-center gap-2 border border-ink/20 px-4 py-2.5 text-sm font-semibold transition-colors hover:border-ink hover:bg-ink hover:text-paper">

              Ask something else
              <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
            </button>
          </Reveal>
        </div>
        <Reveal delay={0.1}>
          <ul className="border-t border-line">
            {FAQS.map((item, i) =>
              <FaqItem key={item.q} item={item} index={i} />
            )}
          </ul>
        </Reveal>
      </div>
    </section>);

}

/* ------------------------------------------------------ 4.6 · who it's for */

const AUDIENCES = [
  'Enterprise employees',
  'Knowledge management teams',
  'IT departments',
  'Customer support teams',
  'Research teams',
  'Business analysts',
  'Operations teams',
  'Large organizations'];


function WhoItsFor() {
  return (
    <section id="solutions" className="border-b border-line bg-paper py-24">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <Eyebrow>Who it's for</Eyebrow>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="mt-6 max-w-xl font-display text-3xl font-bold leading-[1.08] tracking-[-0.02em] sm:text-[2.6rem]">
            Built For the Teams Holding It All Together
          </h2>
        </Reveal>
      </div>
      <div className="rt-marquee mt-12 overflow-hidden border-y border-line py-6">
        <div className="rt-marquee-track flex w-max gap-3">
          {[...AUDIENCES, ...AUDIENCES].map((a, i) =>
            <span
              key={`${a}-${i}`}
              className="flex shrink-0 items-center gap-2 rounded-full border border-line bg-paper-raised px-5 py-2.5 text-sm text-ink">

              <span aria-hidden="true" className="h-2 w-2 border border-brand bg-brand" />
              {a}
            </span>
          )}
        </div>
      </div>
    </section>);

}

/* --------------------------------------------------- 4.7 · tech showcase */

function Technology() {
  return (
    <section id="technology" className="border-b border-line bg-[#EDEFEB]">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-12 lg:flex-row lg:items-center lg:justify-between">
        <Reveal>
          <div className="flex items-center gap-3">
            <CpuIcon className="h-4 w-4 text-marker" aria-hidden="true" />
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-soft">
              Infrastructure Trusted by the Enterprise
            </p>
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <ul className="flex flex-wrap items-center gap-3">
            {['GPU-Accelerated', 'Enterprise-Grade', 'Low-Latency'].map((t) =>
              <li
                key={t}
                className="border border-line bg-paper-raised/60 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.12em] text-ink-soft">

                {t}
              </li>
            )}
          </ul>
        </Reveal>
      </div>
    </section>);

}

/* ---------------------------------------------------------- 4.8 · docs */

const DOC_ITEMS = [
  'Knowledge integration APIs',
  'Retrieval documentation',
  'Enterprise deployment guides',
  'Platform SDK references'];


function Docs() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) window.setTimeout(() => inputRef.current?.focus(), 60);
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError('Enter a valid email address.');
      return;
    }
    setError('');
    setOpen(false);
    setEmail('');
    toast.success("You're on the list.");
  };

  return (
    <section id="docs" className="border-b border-line bg-paper">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-24 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <div>
          <Reveal>
            <Eyebrow>Documentation</Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-6 max-w-xl font-display text-3xl font-bold leading-[1.08] tracking-[-0.02em] sm:text-[2.6rem]">
              Developer API &amp; Documentation Coming Soon.
            </h2>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="mt-5 max-w-lg text-[1.02rem] leading-relaxed text-ink-soft">
              We're finishing the public reference for teams that want to embed retrieval directly
              into their own tools and workflows.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="mt-8 bg-brand px-5 py-3 text-sm font-semibold text-paper transition-colors hover:bg-brand-deep">

              Notify me when it's live
            </button>
          </Reveal>
        </div>
        <Reveal delay={0.1}>
          <ul className="divide-y divide-line border-y border-line">
            {DOC_ITEMS.map((item, i) =>
              <li key={item} className="flex items-center gap-3 py-4">
                <span className="font-mono text-[10px] tracking-[0.14em] text-ink-soft">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="text-sm text-ink">{item}</span>
              </li>
            )}
          </ul>
        </Reveal>
      </div>

      <AnimatePresence>
        {open &&
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex items-center justify-center px-4"
            role="dialog"
            aria-modal="true"
            aria-label="Get notified when documentation is live">

            <div className="absolute inset-0 bg-ink/40" onClick={() => setOpen(false)} />
            <motion.form
              onSubmit={submit}
              initial={{ opacity: 0, y: 16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 280, damping: 26 }}
              className="relative w-full max-w-md border border-line bg-paper-raised p-6">

              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="absolute right-4 top-4 text-ink-soft transition-colors hover:text-ink">

                <XIcon className="h-4 w-4" />
              </button>
              <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-soft">
                DOCS_WAITLIST
              </span>
              <h3 className="mt-3 font-display text-xl font-semibold">
                We'll email you the moment docs go live.
              </h3>
              <label htmlFor="docs-email" className="mt-5 block text-sm text-ink-soft">
                Work email
              </label>
              <input
                id="docs-email"
                ref={inputRef}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                aria-invalid={Boolean(error)}
                className="mt-1.5 w-full border border-line bg-paper px-3 py-2.5 text-sm outline-none focus:border-brand" />

              {error &&
                <p role="alert" className="mt-2 font-mono text-[11px] text-marker">
                  {error}
                </p>
              }
              <button
                type="submit"
                className="mt-5 w-full bg-brand px-4 py-3 text-sm font-semibold text-paper transition-colors hover:bg-brand-deep">

                Add me to the list
              </button>
            </motion.form>
          </motion.div>
        }
      </AnimatePresence>
    </section>);

}

/* ------------------------------------------------------- 4.9 · trust ledger */

export const LEDGER = [
  {
    stamp: '2023',
    title: 'Founded',
    copy: 'Founded to solve enterprise knowledge gaps.'
  },
  {
    stamp: '2024',
    title: 'Core Engine Built',
    copy: 'Semantic retrieval engine built and validated.'
  },
  {
    stamp: '2025',
    title: 'Access Model Added',
    copy: ' Permission-aware access control built in.'
  },
  {
    stamp: '2026',
    title: 'Platform Unifieds',
    copy: 'Retrieval, generation, and citation unified.'
  }];


export function Ledger({
  items = LEDGER,
  title,
  eyebrow




}: { items?: typeof LEDGER; title: string; eyebrow: string; }) {
  return (
    <div>
      <Reveal>
        <Eyebrow>{eyebrow}</Eyebrow>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="mt-6 max-w-xl font-display text-3xl font-bold leading-[1.08] tracking-[-0.02em] sm:text-[2.4rem]">
          {title}
        </h2>
      </Reveal>
      <ol className="mt-10 border-l border-line pl-6">
        {items.map((item, i) =>
          <Reveal key={item.title} delay={i * 0.06}>
            <li className="relative pb-9 last:pb-0">
              <span
                aria-hidden="true"
                className="absolute -left-[31px] top-1 h-3.5 w-3.5 border border-brand bg-brand" />

              <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-soft">
                {item.stamp}
              </span>
              <h3 className="mt-1.5 font-display text-lg font-semibold">{item.title}</h3>
              <p className="mt-1.5 max-w-lg text-sm leading-relaxed text-ink-soft">{item.copy}</p>
            </li>
          </Reveal>
        )}
      </ol>
    </div>);

}

function Trust() {
  return (
    <section className="border-b border-line bg-paper">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <div className="relative overflow-hidden rounded-[28px] border border-line bg-paper-raised/70">
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-cover bg-center opacity-90"
            style={{ backgroundImage: 'url("/Who We Are.png")' }} />
          <div className="relative px-6 py-12 sm:px-10 lg:px-12">
            <Ledger eyebrow="Who We Are " title="Founded to fix the problem every large organization has" />
          </div>
        </div>
      </div>
    </section>);

}

/* -------------------------------------------------- 4.10 · ways to work */

const PATHS = [
  {
    code: 'Get Started',
    title: 'Team Access',
    copy: 'A single department indexes its own knowledge and starts answering internal questions.'
  },
  {
    code: 'Talk to Sales',
    title: 'Enterprise Licensing',
    copy: 'Organization-wide deployment with centralized access control and administration.'
  },
  {
    code: 'View API Docs',
    title: 'API Access',
    copy: 'Embed retrieval and cited answer generation directly into your existing products.'
  }];


function WaysToWork() {
  return (
    <section id="ways" className="border-b border-line bg-paper">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <Reveal>
          <Eyebrow>How to work with Rettrivo</Eyebrow>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="mt-6 max-w-lg font-display text-3xl font-bold leading-[1.08] tracking-[-0.02em] sm:text-[2.4rem]">
            Three Ways to Get Started
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-px border border-line bg-line md:grid-cols-3">
          {PATHS.map((p, i) =>
            <Reveal key={p.code} delay={i * 0.07}>
              <button
                type="button"
                onClick={() => scrollToId('contact')}
                className="group flex h-full w-full flex-col justify-between bg-paper-raised p-7 text-left transition-colors hover:bg-paper">

                <div>
                  <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-marker">
                    {p.code}
                  </span>
                  <h3 className="mt-4 font-display text-xl font-semibold">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">{p.copy}</p>
                </div>
                <span className="mt-8 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-brand">
                  Contact us
                  <ArrowRightIcon
                    className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1"
                    aria-hidden="true" />

                </span>
              </button>
            </Reveal>
          )}
        </div>
      </div>
    </section>);

}

/* ------------------------------------------------------------ + · pricing */

type Plan = {
  code: string;
  name: string;
  blurb: string;
  monthly: number | null;
  annual: number | null;
  unit: string;
  features: string[];
  cta: 'checkout' | 'contact';
  ctaLabel: string;
  featured?: boolean;
  checkoutLinks?: {
    monthly?: string;
    annual?: string;
  };
};

const PLANS: Plan[] = [
  {
    code: 'PLAN_01',
    name: 'Team',
    blurb: 'One department indexes its own knowledge and starts answering internal questions.',
    monthly: 49,
    annual: 39,
    unit: 'per user / month',
    features: [
      'Up to 3 connected sources',
      '50,000 indexed documents',
      'Semantic retrieval + cited answers',
      'Standard access control sync',
      'Email support'],

    cta: 'checkout',
    ctaLabel: 'Start checkout',
    checkoutLinks: {
      monthly: 'https://buy.stripe.com/test_8x2aEYckedZ01815Cqgfu00',
      annual: 'https://buy.stripe.com/test_7sY28s9822giaIBc0Ogfu01'
    }
  },
  {
    code: 'PLAN_02',
    name: 'Business',
    blurb: 'Multi-team rollout with deeper integrations and retrieval analytics.',
    monthly: 129,
    annual: 71,
    unit: 'per user / month',
    features: [
      'Up to 15 connected sources',
      '500,000 indexed documents',
      'Knowledge intelligence analytics',
      'SSO + granular permission mapping',
      'Priority support, 1-day response'],

    cta: 'checkout',
    ctaLabel: 'Start checkout',
    featured: true,
    checkoutLinks: {
      monthly: 'https://buy.stripe.com/test_3cI28sbgaaMOdUN4ymgfu02',
      annual: 'https://buy.stripe.com/test_5kQdRa2JEf34g2V9SGgfu03'
    }
  },
  {
    code: 'PLAN_03',
    name: 'Enterprise',
    blurb:
      'Organization-wide licensing, API access, and deployment shaped around your infrastructure.',
    monthly: null,
    annual: null,
    unit: 'custom licensing',
    features: [
      'Unlimited sources and documents',
      'Enterprise licensing + API access',
      'Private or in-region deployment',
      'Security review and DPA support',
      'Named solutions engineer'],

    cta: 'contact',
    ctaLabel: 'Contact sales'
  }];


function Pricing() {
  const [cycle, setCycle] = useState<'monthly' | 'annual'>('monthly');

  const startCheckout = (plan: Plan) => {
    const checkoutUrl = plan.checkoutLinks?.[cycle];
    if (checkoutUrl) {
      window.open(checkoutUrl, '_blank', 'noopener,noreferrer');
      return;
    }
    toast.success(
      `${plan.name} · ${cycle === 'annual' ? 'annual' : 'monthly'} — checkout is UI-only in this build.`
    );
  };

  return (
    <section id="pricing" className="border-b border-line bg-[#EDEFEB]">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Reveal>
              <Eyebrow>Pricing</Eyebrow>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-6 max-w-lg font-display text-3xl font-bold leading-[1.08] tracking-[-0.02em] sm:text-[2.6rem]">
                Pricing Built Around Your Organization
              </h2>
            </Reveal>
          </div>

          <Reveal delay={0.14}>
            <div className="flex flex-col items-start gap-2">
              <div
                role="tablist"
                aria-label="Billing period"
                className="flex border border-line bg-paper-raised p-1">

                {(
                  [
                    { key: 'monthly', label: 'Monthly' },
                    { key: 'annual', label: 'Annually' }] as
                  const).
                  map((tab) => {
                    const selected = cycle === tab.key;
                    return (
                      <button
                        key={tab.key}
                        type="button"
                        role="tab"
                        aria-selected={selected}
                        onClick={() => setCycle(tab.key)}
                        className={[
                          'relative px-5 py-2.5 text-sm font-semibold transition-colors',
                          selected ? 'text-paper' : 'text-ink-soft hover:text-ink'].
                          join(' ')}>

                        {selected &&
                          <motion.span
                            layoutId="pricing-cycle"
                            className="absolute inset-0 bg-ink"
                            transition={{ type: 'spring', stiffness: 320, damping: 30 }} />

                        }
                        <span className="relative">{tab.label}</span>
                      </button>);

                  })}
              </div>
              <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-brand">
                Annual billing saves 20%
              </span>
            </div>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-px border border-line bg-line lg:grid-cols-3">
          {PLANS.map((plan, i) => {
            const price = cycle === 'annual' ? plan.annual : plan.monthly;
            return (
              <Reveal key={plan.code} delay={i * 0.07} className="h-full">
                <article
                  className={[
                    'flex h-full flex-col p-7 sm:p-8',
                    plan.featured ? 'bg-paper-raised' : 'bg-paper-raised/70'].
                    join(' ')}>

                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-soft">
                      {plan.code}
                    </span>
                    {plan.featured &&
                      <span className="border border-brand px-2 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-brand">
                        Most adopted
                      </span>
                    }
                  </div>

                  <h3 className="mt-5 font-display text-2xl font-bold tracking-[-0.01em]">
                    {plan.name}
                  </h3>
                  <p className="mt-2 min-h-[3.5rem] text-sm leading-relaxed text-ink-soft">
                    {plan.blurb}
                  </p>

                  <div className="mt-6 border-y border-line py-5">
                    {price !== null ?
                      <div className="flex items-end gap-2">
                        <span className="font-display text-2xl font-semibold text-ink-soft">$</span>
                        <AnimatePresence mode="popLayout" initial={false}>
                          <motion.span
                            key={`${plan.code}-${cycle}`}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.22 }}
                            className="font-display text-5xl font-bold leading-none tracking-[-0.03em]">

                            {price}
                          </motion.span>
                        </AnimatePresence>
                        <span className="pb-1 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft">
                          {plan.unit}
                        </span>
                      </div> :

                      <div className="flex items-end gap-3">
                        <span className="font-display text-4xl font-bold leading-none tracking-[-0.03em]">
                          Custom
                        </span>
                        <span className="pb-1 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft">
                          {plan.unit}
                        </span>
                      </div>
                    }
                    {price !== null &&
                      <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft">
                        {cycle === 'annual' ? 'Billed annually · 20% saved' : 'Billed monthly'}
                      </p>
                    }
                  </div>

                  <ul className="mt-6 flex-1 space-y-2.5">
                    {plan.features.map((f) =>
                      <li key={f} className="flex items-start gap-2.5 text-sm text-ink-soft">
                        <CheckCircle2Icon
                          className="mt-[3px] h-3.5 w-3.5 shrink-0 text-brand"
                          aria-hidden="true" />

                        {f}
                      </li>
                    )}
                  </ul>

                  {plan.cta === 'checkout' ? (
                    <a
                      href={plan.checkoutLinks?.[cycle] ?? '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={[
                        'group mt-8 inline-flex items-center justify-center gap-2 px-5 py-3.5 text-sm font-semibold transition-colors',
                        'bg-brand text-paper hover:bg-brand-deep'
                      ].join(' ')}>
                      {plan.ctaLabel}
                      <ArrowRightIcon
                        className="h-4 w-4 transition-transform group-hover:translate-x-1"
                        aria-hidden="true" />
                    </a>
                  ) : (
                    <button
                      type="button"
                      onClick={() => scrollToId('contact')}
                      className={[
                        'group mt-8 flex items-center justify-center gap-2 px-5 py-3.5 text-sm font-semibold transition-colors',
                        'border border-ink/20 text-ink hover:border-ink hover:bg-ink hover:text-paper'
                      ].join(' ')}>
                      {plan.ctaLabel}
                      <ArrowRightIcon
                        className="h-4 w-4 transition-transform group-hover:translate-x-1"
                        aria-hidden="true" />
                    </button>
                  )}
                </article>
              </Reveal>);

          })}
        </div>

        <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft">
          Prices are placeholders for review · checkout buttons open Stripe payment links.
        </p>
      </div>
    </section>);

}

/* ------------------------------------------------------- 4.11 · CTA band */

function CtaBand() {
  return (
    <section className="bg-brand">
      <div className="mx-auto grid max-w-6xl gap-8 px-6 py-20 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] lg:items-center">
        <Reveal>
          <h2 className="max-w-2xl font-display text-3xl font-bold leading-[1.08] tracking-[-0.02em] text-paper sm:text-[2.7rem]">
            See Rettrivo answer your hardest internal question.
          </h2>
        </Reveal>
        <Reveal delay={0.08} className="lg:justify-self-end">
          <button
            type="button"
            onClick={() => scrollToId('contact')}
            className="group flex items-center gap-2 bg-paper px-6 py-3.5 text-sm font-semibold text-ink transition-colors hover:bg-paper-raised">

            Start the conversation
            <ArrowRightIcon
              className="h-4 w-4 transition-transform group-hover:translate-x-1"
              aria-hidden="true" />

          </button>
        </Reveal>
      </div>
    </section>);

}

/* ---------------------------------------------------------- 4.12 · contact */

function Contact() {
  const [values, setValues] = useState({ name: '', email: '', company: '', message: '' });
  const [errors, setErrors] = useState<ContactErrors>({});
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [captchaToken, setCaptchaToken] = useState('');
  const captchaRef = useRef<HTMLDivElement>(null);
  const recaptchaSiteKey = '6LeVV24tAAAAAIrGofRCWZr53gS5ioAAAP4ZrT7K';

  useEffect(() => {
    const win = window as Window & typeof globalThis & {
      onRecaptchaCallback?: (token: string) => void;
      onRecaptchaExpired?: () => void;
    };

    win.onRecaptchaCallback = (token: string) => setCaptchaToken(token);
    win.onRecaptchaExpired = () => setCaptchaToken('');

    const existingScript = document.querySelector('script[src="https://www.google.com/recaptcha/api.js"]');
    if (existingScript) return;

    const script = document.createElement('script');
    script.src = 'https://www.google.com/recaptcha/api.js';
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
  }, []);

  const set = (key: keyof typeof values) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValues((v) => ({ ...v, [key]: e.target.value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const next: ContactErrors = {};
    if (!values.name.trim()) next.name = 'Name is required.';
    if (!values.email.trim()) next.email = 'Work email is required.'; else
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim()))
        next.email = 'Enter a valid email address.';
    if (!values.company.trim()) next.company = 'Company is required.';
    if (!values.message.trim()) next.message = 'Tell us a little about your use case.';
    if (!captchaToken) next.captcha = 'Please complete the reCAPTCHA verification.';

    setErrors(next);
    if (Object.keys(next).length) return;

    setSending(true);
    try {
      const resp = await fetch('https://formspree.io/f/meeydzrv', {
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          company: values.company,
          message: values.message,
          captchaToken
        })
      });

      if (!resp.ok) throw new Error(`HTTP ${resp.status}`);

      setSent(true);
      toast.success('Message received. We’ll be in touch.');
      setValues({ name: '', email: '', company: '', message: '' });
      setCaptchaToken('');
    } catch (err) {
      console.error('Contact submit error', err);
      toast.error('Failed to send message — please try again later.');
    } finally {
      setSending(false);
    }
  };

  const field = (
    key: 'name' | 'email' | 'company',
    label: string,
    type = 'text',
    placeholder = '') =>

    <div>
      <label htmlFor={`contact-${key}`} className="block text-sm text-ink-soft">
        {label}
      </label>
      <input
        id={`contact-${key}`}
        type={type}
        value={values[key]}
        onChange={set(key)}
        placeholder={placeholder}
        aria-invalid={Boolean(errors[key])}
        aria-describedby={errors[key] ? `contact-${key}-error` : undefined}
        className={[
          'mt-1.5 w-full border bg-paper px-3 py-2.5 text-sm outline-none transition-colors focus:border-brand',
          errors[key] ? 'border-marker' : 'border-line'].
          join(' ')} />

      {errors[key] &&
        <p id={`contact-${key}-error`} role="alert" className="mt-1.5 font-mono text-[11px] text-marker">
          {errors[key]}
        </p>
      }
    </div>;


  return (
    <section id="contact" className="bg-paper">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-24 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
        <div>
          <Reveal>
            <Eyebrow>Contact</Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-6 max-w-md font-display text-3xl font-bold leading-[1.08] tracking-[-0.02em] sm:text-[2.4rem]">
              Bring us your hardest question.
            </h2>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="mt-5 max-w-sm text-[1.02rem] leading-relaxed text-ink-soft">
              Tell us where your knowledge lives today and what your team keeps failing to find.
              We'll show you how Rettrivo retrieves it.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <ul className="mt-8 space-y-3 border-t border-line pt-6 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-soft">
              <li><strong>Legal Name:</strong> Rettrivo LLC</li>
              <li><strong>Founder Name:</strong> Benjamin Ashford</li>
              <li><strong>Founded Date:</strong> April 28, 2023</li>
              <li><strong>Address:</strong> 600 Wilshire Blvd, Los Angeles, CA 90013, USA</li>
              <li><strong>Phone Number:</strong> +1 (213) 555-0108</li>
              <li>
                <strong>Company Website:</strong>{' '}
                <a href="https://rettrivo.com/" target="_blank" rel="noreferrer" className="underline decoration-current underline-offset-4">
                  https://rettrivo.com
                </a>
              </li>
            </ul>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          {sent ?
            <div className="flex h-full flex-col justify-center border border-brand/40 bg-paper-raised p-8">
              <CheckCircle2Icon className="h-7 w-7 text-brand" aria-hidden="true" />
              <h3 className="mt-4 font-display text-2xl font-semibold">Message received.</h3>
              <p className="mt-2 max-w-sm text-sm leading-relaxed text-ink-soft">
                Thanks, {values.name.trim().split(' ')[0] || 'there'}. A member of the Rettrivo team
                will follow up at {values.email.trim()} shortly.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSent(false);
                  setValues({ name: '', email: '', company: '', message: '' });
                }}
                className="mt-6 self-start border border-ink/20 px-4 py-2.5 text-sm font-semibold transition-colors hover:border-ink hover:bg-ink hover:text-paper">

                Send another message
              </button>
            </div> :

            <form
              onSubmit={submit}
              noValidate
              className="border border-line bg-paper-raised p-6 sm:p-8">

              <div className="grid gap-5 sm:grid-cols-2">
                {field('name', 'Name', 'text', 'Name')}
                {field('email', 'Work email', 'email', 'Email')}
              </div>
              <div className="mt-5">{field('company', 'Company', 'text', 'Company name')}</div>
              <div className="mt-5">
                <label htmlFor="contact-message" className="block text-sm text-ink-soft">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  rows={5}
                  value={values.message}
                  onChange={set('message')}
                  placeholder="Message"
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? 'contact-message-error' : undefined}
                  className={[
                    'mt-1.5 w-full resize-y border bg-paper px-3 py-2.5 text-sm outline-none transition-colors focus:border-brand',
                    errors.message ? 'border-marker' : 'border-line'].
                    join(' ')} />

                {errors.message &&
                  <p
                    id="contact-message-error"
                    role="alert"
                    className="mt-1.5 font-mono text-[11px] text-marker">

                    {errors.message}
                  </p>
                }
              </div>
              <div className="mt-6">
                <div
                  ref={captchaRef}
                  className="g-recaptcha"
                  data-sitekey={recaptchaSiteKey}
                  data-callback="onRecaptchaCallback"
                  data-expired-callback="onRecaptchaExpired" />
                {errors.captcha &&
                  <p className="mt-2 font-mono text-[11px] text-marker">
                    {errors.captcha}
                  </p>
                }
              </div>
              <button
                type="submit"
                disabled={sending}
                aria-busy={sending}
                className="mt-7 w-full bg-brand px-5 py-3.5 text-sm font-semibold text-paper transition-colors hover:bg-brand-deep sm:w-auto">

                {sending ? 'Sending…' : 'Send message'}
              </button>
              <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft">
                Messages are sent via Formspree
              </p>
            </form>
          }
        </Reveal>
      </div>
    </section>);

}

/* ------------------------------------------------------------------- page */

export function Landing() {
  return (
    <div className="w-full bg-paper">
      <Hero />
      <Problem />
      <Pipeline />
      <Capabilities />
      <UniqueAngle />
      <Testimonials />
      <WhoItsFor />
      <Technology />
      <Docs />
      <Trust />
      <WaysToWork />
      <Pricing />
      <Faq />
      <CtaBand />
      <Contact />
    </div>);

}