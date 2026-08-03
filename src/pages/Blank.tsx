import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  ArrowRightIcon,
  CheckCircle2Icon,
  DatabaseIcon,
  FileCheck2Icon,
  GaugeIcon,
  LockKeyholeIcon,
  NetworkIcon,
  ScanSearchIcon,
  ShieldCheckIcon,
  SparklesIcon,
  WorkflowIcon
} from 'lucide-react';

type RevealProps = {
  children: React.ReactNode;
  delay?: number;
  className?: string;
};

function Reveal({ children, delay = 0, className = '' }: RevealProps) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: reduce ? 0 : 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-70px' }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2">
      <span aria-hidden="true" className="h-2.5 w-2.5 border border-marker bg-marker" />
      <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-soft">
        {children}
      </span>
    </div>
  );
}

const WORKFLOW = [
  {
    number: '01',
    label: 'CONNECT',
    title: 'Bring knowledge together',
    copy: 'Rettriv works across the documents, wikis, ticketing systems, and databases your teams already rely on.'
  },
  {
    number: '02',
    label: 'UNDERSTAND',
    title: 'Build a living knowledge index',
    copy: 'Content is organized by meaning and context, so people can ask naturally instead of guessing which words a file contains.'
  },
  {
    number: '03',
    label: 'RETRIEVE',
    title: 'Find the passages that matter',
    copy: 'Semantic retrieval brings the most relevant evidence forward, even when the question does not match the source language exactly.'
  },
  {
    number: '04',
    label: 'ANSWER',
    title: 'Respond with proof attached',
    copy: 'Rettriv turns that evidence into a clear answer and shows the sources behind it, making decisions easier to review.'
  }
];

const CAPABILITIES = [
  {
    icon: ScanSearchIcon,
    code: 'CAPABILITY / 01',
    title: 'Knowledge retrieval that understands intent',
    copy: 'Move beyond keyword lists. Rettriv connects a question to the meaning inside policies, contracts, support history, spreadsheets, and internal guidance.',
    points: ['Context-aware discovery', 'Semantic search across sources', 'Relevant passages, not just file names']
  },
  {
    icon: SparklesIcon,
    code: 'CAPABILITY / 02',
    title: 'Answers people can actually use',
    copy: 'Give every team a practical starting point: a concise natural-language response, the surrounding context, and the source references needed to validate it.',
    points: ['Source-cited responses', 'Plain-language question understanding', 'Answers shaped around business context']
  },
  {
    icon: NetworkIcon,
    code: 'CAPABILITY / 03',
    title: 'One layer over the knowledge you already own',
    copy: 'Rettriv is designed to make existing information more useful without forcing a wholesale migration or asking teams to rebuild how they work.',
    points: ['Connected data sources', 'Knowledge synchronization', 'Organized content across systems']
  },
  {
    icon: WorkflowIcon,
    code: 'CAPABILITY / 04',
    title: 'Knowledge operations with visibility',
    copy: 'See how knowledge is being used, where searches succeed, and where content needs attention so the system improves with the organization.',
    points: ['Query and usage insight', 'Retrieval performance visibility', 'Content and workflow monitoring']
  }
];

const TRUST_SIGNALS = [
  { icon: LockKeyholeIcon, title: 'Access-aware by design', copy: 'Answers respect the permissions that govern the underlying knowledge.' },
  { icon: FileCheck2Icon, title: 'Evidence stays visible', copy: 'Source references make important answers easier to check and share responsibly.' },
  { icon: ShieldCheckIcon, title: 'Governance built into the flow', copy: 'Controlled generation helps keep sensitive information inside the right boundaries.' },
  { icon: GaugeIcon, title: 'Operations stay observable', copy: 'Query activity and retrieval behavior can be reviewed as knowledge work scales.' }
];

const NVIDIA_STACK = [
  { name: 'NVIDIA RAFT', role: 'Retrieval foundation', copy: 'GPU-accelerated vector indexing and similarity search for efficient semantic retrieval at scale.' },
  { name: 'NVIDIA NeMo Framework', role: 'Reasoning and generation', copy: 'Tooling for specialized embedding and generation models tuned to enterprise knowledge work.' },
  { name: 'NVIDIA NeMo Guardrails', role: 'Policy boundary', copy: 'Programmable controls that help filter inputs, outputs, context, and role-based access.' },
  { name: 'NVIDIA Morpheus', role: 'Live operations', copy: 'Real-time telemetry and anomaly detection for query activity, performance, and access patterns.' }
];

export function Blank() {
  return (
    <div className="w-full bg-paper">
      <section className="relative overflow-hidden border-b border-line pt-36">
        <div aria-hidden="true" className="pointer-events-none absolute right-0 top-0 hidden h-full w-[38%] bg-[#E4EDE7] lg:block" />
        <div aria-hidden="true" className="pointer-events-none absolute right-[38%] top-0 hidden h-full w-[3px] bg-marker/70 lg:block" />
        <div className="relative mx-auto grid max-w-6xl gap-14 px-6 pb-20 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-center">
          <div>
            <Reveal>
              <Eyebrow>Rettriv 2.0 / Product</Eyebrow>
            </Reveal>
            <Reveal delay={0.08}>
              <h1 className="mt-6 max-w-3xl font-display text-[2.8rem] font-bold leading-[0.96] tracking-[-0.04em] sm:text-[4rem] lg:text-[4.65rem]">
                The answer is already there. <span className="font-accent font-normal italic text-brand">Rettriv finds it.</span>
              </h1>
            </Reveal>
            <Reveal delay={0.18}>
              <p className="mt-7 max-w-xl border-l-2 border-brand/50 pl-4 text-[1.08rem] leading-relaxed text-ink-soft">
                Rettriv 2.0 turns scattered enterprise knowledge into a dependable answer layer — connecting the systems your teams use, finding the context that matters, and showing the evidence behind every response.
              </p>
            </Reveal>
            <Reveal delay={0.26}>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <a
                  href="https://app.rettrivo.com"
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center gap-2 bg-brand px-6 py-3.5 text-sm font-semibold text-paper shadow-[4px_4px_0_0_var(--ink)] transition-all hover:bg-brand-deep hover:shadow-[2px_2px_0_0_var(--ink)]">
                  Open Rettriv 2.0
                  <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </a>
                <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-soft">Live product access</span>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.16} className="relative min-h-[360px]">
            <div className="absolute left-[8%] top-[9%] w-[72%] rotate-[-6deg] border border-line bg-paper-raised p-4 shadow-[0_24px_50px_-34px_rgba(20,24,26,0.65)] sm:left-[15%] sm:w-[66%]">
              <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft"><span>QUERY_2048</span><span className="text-brand">READY</span></div>
              <p className="mt-7 font-display text-lg leading-snug">“Which contracts require written notice before renewal?”</p>
              <div className="mt-7 border-t border-line pt-3 font-mono text-[10px] uppercase tracking-[0.12em] text-ink-soft">Searching internal knowledge</div>
            </div>
            <div className="absolute bottom-[8%] right-[3%] w-[82%] rotate-[4deg] border border-ink/15 bg-paper-raised p-5 shadow-[0_28px_60px_-36px_rgba(20,24,26,0.7)] sm:right-[9%] sm:w-[78%]">
              <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft"><span>ANSWER / SOURCE-CITED</span><CheckCircle2Icon className="h-4 w-4 text-brand" aria-hidden="true" /></div>
              <p className="mt-4 font-display text-xl leading-snug text-ink">Renewal notices must be submitted 60 days before the contract end date.</p>
              <p className="mt-4 border-t border-line pt-3 font-mono text-[10px] uppercase tracking-[0.1em] text-brand">MSA_2019.PDF · PAGE 14 · SECTION 7.2</p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-b border-line bg-paper-raised">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-20 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] lg:gap-20">
          <Reveal>
            <Eyebrow>The knowledge gap</Eyebrow>
            <h2 className="mt-6 max-w-md font-display text-3xl font-bold leading-[1.05] tracking-[-0.03em] sm:text-[2.7rem]">Your best answer is probably in a file nobody can find quickly.</h2>
          </Reveal>
          <Reveal delay={0.12} className="space-y-5 text-[1.05rem] leading-relaxed text-ink-soft">
            <p>Important knowledge lives across drives, wikis, service desks, databases, and old documents. Each system may work well on its own, but the answer your team needs rarely respects those boundaries.</p>
            <p>Rettriv gives people a more direct path from question to understanding. It helps them spend less time hunting for a file and more time acting on information they can inspect and trust.</p>
            <div className="grid gap-px border border-line bg-line sm:grid-cols-2">
              {['Scattered knowledge', 'Slow manual searching', 'Keyword-only context', 'Decisions without proof'].map((item, index) => (
                <div key={item} className="bg-paper-raised p-4"><span className="font-mono text-[10px] text-marker">0{index + 1}</span><p className="mt-2 font-display text-base font-semibold text-ink">{item}</p></div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-b border-line">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <Reveal><Eyebrow>From question to clarity</Eyebrow><h2 className="mt-6 max-w-2xl font-display text-3xl font-bold leading-[1.05] tracking-[-0.03em] sm:text-[2.7rem]">A retrieval workflow designed around how knowledge work really happens.</h2></Reveal>
          <div className="mt-12 grid gap-px border border-line bg-line md:grid-cols-4">
            {WORKFLOW.map((step, index) => (
              <Reveal key={step.number} delay={index * 0.07} className="h-full bg-paper-raised p-6">
                <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.14em] text-brand"><span>{step.number} · {step.label}</span><span className="h-2 w-2 border border-marker bg-marker" /></div>
                <h3 className="mt-12 font-display text-xl font-semibold leading-tight">{step.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-ink-soft">{step.copy}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-[#EDEFEB]">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)]">
            <Reveal><Eyebrow>Product capabilities</Eyebrow><h2 className="mt-6 max-w-md font-display text-3xl font-bold leading-[1.05] tracking-[-0.03em] sm:text-[2.65rem]">The useful layer between your knowledge and your next decision.</h2><p className="mt-6 max-w-sm leading-relaxed text-ink-soft">Rettriv is built to support the whole knowledge journey — from finding the right context to improving the way information is managed over time.</p></Reveal>
            <div className="space-y-3">
              {CAPABILITIES.map(({ icon: Icon, code, title, copy, points }, index) => (
                <Reveal key={title} delay={index * 0.06}>
                  <article className="border border-line bg-paper-raised p-6 transition-colors hover:border-brand/50 sm:p-7">
                    <div className="flex items-start gap-4"><div className="flex h-10 w-10 shrink-0 items-center justify-center border border-brand/30 bg-brand/[0.07] text-brand"><Icon className="h-5 w-5" aria-hidden="true" /></div><div><p className="font-mono text-[10px] uppercase tracking-[0.14em] text-marker">{code}</p><h3 className="mt-2 font-display text-xl font-semibold">{title}</h3></div></div>
                    <p className="mt-5 max-w-2xl leading-relaxed text-ink-soft">{copy}</p>
                    <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 border-t border-line pt-4">{points.map((point) => <li key={point} className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.08em] text-ink-soft"><span className="h-1.5 w-1.5 bg-brand" />{point}</li>)}</ul>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-paper-raised">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <Reveal><Eyebrow>Enterprise trust</Eyebrow><h2 className="mt-6 max-w-2xl font-display text-3xl font-bold leading-[1.05] tracking-[-0.03em] sm:text-[2.7rem]">Useful answers need boundaries, evidence, and a record of how they were found.</h2></Reveal>
          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {TRUST_SIGNALS.map(({ icon: Icon, title, copy }, index) => (
              <Reveal key={title} delay={index * 0.07} className="flex gap-5 border-t-2 border-ink pt-5"><Icon className="mt-1 h-6 w-6 shrink-0 text-brand" aria-hidden="true" /><div><h3 className="font-display text-xl font-semibold">{title}</h3><p className="mt-2 max-w-md leading-relaxed text-ink-soft">{copy}</p></div></Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-[#EDEFEB]">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <Reveal><div className="flex flex-wrap items-end justify-between gap-6"><div><Eyebrow>Infrastructure / supporting layer</Eyebrow><h2 className="mt-5 max-w-2xl font-display text-2xl font-bold leading-tight sm:text-3xl">Enterprise-grade foundations behind the experience.</h2></div><p className="max-w-sm text-sm leading-relaxed text-ink-soft">The product story is simple for users. Underneath, Rettriv can draw on NVIDIA technologies for retrieval, reasoning, governance, and operational visibility.</p></div></Reveal>
          <div className="mt-10 divide-y divide-line border-y border-line">
            {NVIDIA_STACK.map(({ name, role, copy }, index) => (
              <Reveal key={name} delay={index * 0.05} className="grid gap-3 py-5 sm:grid-cols-[1.05fr_0.8fr_1.5fr] sm:items-center"><div className="flex items-center gap-3"><span className="font-mono text-[10px] text-marker">0{index + 1}</span><span className="font-display font-semibold">{name}</span></div><span className="font-mono text-[10px] uppercase tracking-[0.12em] text-brand">{role}</span><p className="text-sm leading-relaxed text-ink-soft">{copy}</p></Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-brand">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 py-20 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,0.8fr)] lg:items-end">
          <Reveal><p className="font-mono text-[11px] uppercase tracking-[0.22em] text-paper/70">Rettriv 2.0 / Live product</p><h2 className="mt-5 max-w-3xl font-display text-3xl font-bold leading-[1.04] tracking-[-0.03em] text-paper sm:text-[3.2rem]">Make the knowledge your organization already owns easier to find, understand, and prove.</h2></Reveal>
          <Reveal delay={0.12} className="lg:justify-self-end"><a href="https://app.rettrivo.com" target="_blank" rel="noreferrer" className="group inline-flex items-center gap-3 bg-paper px-6 py-3.5 text-sm font-semibold text-ink transition-colors hover:bg-paper-raised">Open Rettriv 2.0 <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" /></a></Reveal>
        </div>
      </section>
    </div>
  );
}
