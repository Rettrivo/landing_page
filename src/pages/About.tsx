import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRightIcon } from 'lucide-react';
import { Ledger } from './Landing';

const TEAM = [
  { name: 'Benjamin Ashford', role: 'Founder', image: '/founder.jpg' },
  { name: 'Daniel Carter', role: 'Head of Engineering', image: '/m1.jpg' },
  { name: 'Ethan Brooks', role: 'Head of Retrieval Research', image: '/m2.jpg' },
  { name: 'Sophia Chen', role: 'Head of Enterprise Security', image: '/w1.jpg' },
  { name: 'Maya Patel', role: 'Head of Customer Engineering', image: '/w2.jpg' },
  { name: 'Olivia Rivera', role: 'Head of Product', image: '/w3.jpg' },
];


const MILESTONES = [
{
  stamp: '2023-04-28',
  title: 'Rettrivo LLC founded',
  copy: 'Founded in Los Angeles to make internal enterprise knowledge retrievable on demand.'
},
{
  stamp: 'PLACEHOLDER',
  title: 'First enterprise pilot - placeholder milestone',
  copy: 'Placeholder milestone. Replace with the confirmed date and detail before publishing.'
},
{
  stamp: 'PLACEHOLDER',
  title: 'Retrieval engine v2 - placeholder milestone',
  copy: 'Placeholder milestone. Replace with the confirmed date and detail before publishing.'
},
{
  stamp: 'PLACEHOLDER',
  title: 'Developer API - placeholder milestone',
  copy: 'Placeholder milestone for the upcoming public API and documentation release.'
}];


export function About() {
  const navigate = useNavigate();

  return (
    <div className="w-full bg-paper">
      <section className="border-b border-line pt-36">
        <div className="mx-auto max-w-6xl px-6 pb-20">
          <div className="flex items-center gap-2">
            <span aria-hidden="true" className="h-2.5 w-2.5 border border-marker bg-marker" />
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-soft">
              About Rettrivo
            </span>
          </div>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 max-w-3xl font-display text-4xl font-bold leading-[1.05] tracking-[-0.02em] sm:text-[3.2rem]">
            
            We build the retrieval layer enterprises were missing.
          </motion.h1>
          <p className="mt-6 max-w-xl text-[1.02rem] leading-relaxed text-ink-soft">
            Rettrivo exists because the answer is almost always already written down somewhere
            and almost never findable when it matters.
          </p>
        </div>
      </section>

      {/* Founder - diagonal-ish offset split */}
      <section className="border-b border-line bg-paper-raised">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-20 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1fr)]">
          <div>
            <div className="relative inline-block">
              <img
                src="/founder.jpg"
                alt="Benjamin Ashford, Founder"
                className="h-32 w-32 rounded-full object-cover shadow-sm"
              />
              <span
                aria-hidden="true"
                className="absolute -top-[8px] left-4 h-[8px] w-[28px] bg-marker" />
            </div>
            <h2 className="mt-6 font-display text-2xl font-bold">Benjamin Ashford</h2>
            <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.16em] text-ink-soft">
              Founder
            </p>
          </div>
          <div className="lg:pt-8">
            <p className="max-w-xl text-[1.02rem] leading-relaxed text-ink">
              Benjamin spent a decade building internal search and data platforms for large
              organizations, where he watched the same failure repeat: the document existed, the
              policy existed, the answer existed - and nobody could retrieve it in time.
            </p>
            <p className="mt-4 max-w-xl text-[1.02rem] leading-relaxed text-ink-soft">
              He started Rettrivo in 2023 to treat that as an infrastructure problem rather than a
              search-box problem: index what a company already knows, retrieve on meaning, and
              never return an answer without showing where it came from.
            </p>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="border-b border-line">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-20 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
          <h2 className="font-display text-3xl font-bold leading-[1.08] tracking-[-0.02em] sm:text-[2.4rem]">
            From a real problem to a working answer layer.
          </h2>
          <div className="space-y-4 text-[1.02rem] leading-relaxed text-ink-soft">
            <p>
              <span className="text-ink">The problem:</span> enterprise knowledge is fragmented
              across wikis, drives, ticketing systems, and databases. Employees waste hours
              searching, legacy keyword search has no sense of context, and decisions stall while
              people hunt for a file.
            </p>
            <p>
              <span className="text-ink">The solution:</span> Rettrivo indexes those sources in
              place, retrieves the passages that genuinely answer a question, and generates a single
              plain-language answer with its citations attached - inside the access controls each
              source system already enforces.
            </p>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="border-b border-line bg-paper-raised">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="flex items-center gap-2">
            <span aria-hidden="true" className="h-2.5 w-2.5 border border-marker bg-marker" />
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-soft">
              Team
            </span>
          </div>
          <h2 className="mt-6 max-w-lg font-display text-3xl font-bold leading-[1.08] tracking-[-0.02em] sm:text-[2.4rem]">
            A small team of retrieval and enterprise-infrastructure people.
          </h2>
          <ul className="mt-12 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {TEAM.map((member, i) => (
              <li key={`${member.role}-${i}`} className="bg-paper-raised p-6">
                <div className="flex items-center gap-4">
                  <div className="h-14 w-14 shrink-0 overflow-hidden rounded-full border border-line bg-paper-raised shadow-sm">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div>
                    <div className="font-display text-base font-semibold">{member.name}</div>
                    <div className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft">
                      {member.role}
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft">
            Team photos now appear from the public asset set.
          </p>
        </div>
      </section>

      {/* Milestones */}
      <section className="border-b border-line">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <Ledger eyebrow="Milestones" title="The record so far." items={MILESTONES} />
        </div>
      </section>

      {/* Mission */}
      <section className="bg-brand">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 py-20 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] lg:items-center">
          <div>
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-paper/70">
              Mission
            </span>
            <h2 className="mt-5 max-w-2xl font-display text-3xl font-bold leading-[1.08] tracking-[-0.02em] text-paper sm:text-[2.6rem]">
              Make every answer an organization already owns retrievable in seconds and provable.
            </h2>
          </div>
          <button
            type="button"
            onClick={() => navigate('/#contact')}
            className="group flex w-auto items-center gap-2 justify-self-center bg-paper px-6 py-3.5 text-sm font-semibold text-ink transition-colors hover:bg-paper-raised lg:justify-self-end">
            
            Talk to us
            <ArrowRightIcon
              className="h-4 w-4 transition-transform group-hover:translate-x-1"
              aria-hidden="true" />
            
          </button>
        </div>
      </section>
    </div>);

}