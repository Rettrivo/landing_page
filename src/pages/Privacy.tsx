import React from 'react';

type Section = {heading: string;paragraphs: string[];};

const SECTIONS: Section[] = [
{
  heading: '1. Information We Collect',
  paragraphs: [
  'We collect information you provide directly, such as your name, work email, company, and message content when you contact us or join a waitlist. We also collect limited technical information about your visit, including browser type, device type, referring page, and pages viewed.',
  'For customers using the Rettrivo platform, we process the content and metadata of the sources an organization connects, solely to provide indexing, retrieval, and answer generation for that organization.']

},
{
  heading: '2. How We Use Information',
  paragraphs: [
  'We use information to respond to inquiries, provide and improve the Services, maintain security and reliability, meet contractual and legal obligations, and communicate about product availability where you have asked us to.',
  'We do not sell personal information, and we do not use customer content to train general-purpose models outside the scope of that customer\'s deployment.']

},
{
  heading: '3. Cookies and Similar Technologies',
  paragraphs: [
  'We use a small number of cookies and equivalent technologies to keep the site functioning and to understand aggregate usage. You can control cookies through your browser settings; disabling some cookies may affect site functionality.']

},
{
  heading: '4. Third-Party Services',
  paragraphs: [
  'We rely on third-party providers for hosting, infrastructure, analytics, and communications. These providers process information on our behalf under contractual confidentiality and security obligations, and only as needed to deliver their service.']

},
{
  heading: '5. Data Retention',
  paragraphs: [
  'We retain information for as long as needed to fulfill the purposes described in this policy, to comply with legal obligations, and to resolve disputes. Customer content is retained according to the terms of the applicable agreement and deleted on request or at the end of the engagement.']

},
{
  heading: '6. Security',
  paragraphs: [
  'We apply administrative, technical, and physical safeguards appropriate to the sensitivity of the information we handle. Retrieval respects the access controls of connected source systems, so answers are limited to content the requesting user is already entitled to see.']

},
{
  heading: '7. Your Rights',
  paragraphs: [
  'Depending on your location, you may have the right to access, correct, delete, or restrict processing of your personal information, or to object to certain processing. To exercise these rights, contact us using the details below; we may need to verify your identity before acting on a request.']

},
{
  heading: '8. Contact',
  paragraphs: [
  'Privacy questions and requests may be directed to Rettrivo LLC, 600 Wilshire Blvd, Los Angeles, CA 90013, USA, or by phone at +1 (213) 555-0108.']

}];


export function Privacy() {
  return (
    <div className="w-full bg-paper">
      <article className="mx-auto max-w-3xl px-6 pb-24 pt-36">
        <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-soft">
          Legal · Last updated 2026-07-01
        </span>
        <h1 className="mt-5 font-display text-4xl font-bold leading-[1.08] tracking-[-0.02em]">
          Privacy Policy
        </h1>
        <div className="mt-6 border-l-2 border-marker bg-paper-raised px-4 py-3">
          <p className="text-sm leading-relaxed text-ink-soft">
            Placeholder boilerplate for review. This is not legal advice and must be reviewed by
            qualified counsel before publication.
          </p>
        </div>

        <div className="mt-12 space-y-10">
          {SECTIONS.map((section) =>
          <section key={section.heading}>
              <h2 className="font-display text-xl font-semibold tracking-[-0.01em]">
                {section.heading}
              </h2>
              <div className="mt-3 space-y-3">
                {section.paragraphs.map((p, i) =>
              <p key={i} className="text-[1.02rem] leading-relaxed text-ink-soft">
                    {p}
                  </p>
              )}
              </div>
            </section>
          )}
        </div>
      </article>
    </div>);

}