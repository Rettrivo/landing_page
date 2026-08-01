import React from 'react';

type Section = {heading: string;paragraphs: string[];};

const SECTIONS: Section[] = [
{
  heading: '1. Acceptance of Terms',
  paragraphs: [
  'By accessing or using the Rettrivo website, platform, or related services (collectively, the "Services"), you agree to be bound by these Terms & Conditions. If you are entering into these terms on behalf of an organization, you represent that you have the authority to bind that organization.',
  'If you do not agree to these terms, you may not access or use the Services.']

},
{
  heading: '2. Description of Service',
  paragraphs: [
  'Rettrivo provides an enterprise retrieval-augmented generation platform that indexes an organization\'s internal content sources and returns generated answers with references to the underlying source material.',
  'Features described on this website may be in development, in limited release, or subject to change. Availability of any specific capability is governed by your written order or licensing agreement with Rettrivo LLC.']

},
{
  heading: '3. Accounts and Access',
  paragraphs: [
  'Certain parts of the Services require an account. You are responsible for the accuracy of the information you provide, for maintaining the confidentiality of credentials, and for all activity that occurs under your account.',
  'You must notify Rettrivo promptly of any suspected unauthorized access or use of your account.']

},
{
  heading: '4. Acceptable Use',
  paragraphs: [
  'You agree not to misuse the Services, including by attempting to gain unauthorized access, interfering with normal operation, reverse engineering the platform, uploading unlawful or infringing content, or using the Services to process content you do not have the right to process.',
  'Rettrivo may suspend access where use presents a security, legal, or operational risk.']

},
{
  heading: '5. Intellectual Property',
  paragraphs: [
  'The Services, including all software, interfaces, documentation, and trademarks, remain the property of Rettrivo LLC and its licensors. You retain all rights in the content and data you provide to the Services.',
  'No rights are granted other than the limited right to use the Services as described in these terms and any applicable order.']

},
{
  heading: '6. Disclaimers and Limitation of Liability',
  paragraphs: [
  'The Services are provided "as is" without warranties of any kind, whether express or implied, to the maximum extent permitted by applicable law. Generated answers are produced from retrieved source material and should be reviewed before being relied upon for legal, financial, or regulatory decisions.',
  'To the extent permitted by law, Rettrivo LLC will not be liable for indirect, incidental, special, consequential, or punitive damages, or for any loss of data, revenue, or profits arising from use of the Services.']

},
{
  heading: '7. Termination',
  paragraphs: [
  'You may stop using the Services at any time. Rettrivo may suspend or terminate access if these terms are breached, if required by law, or upon expiry or termination of an applicable agreement.',
  'Provisions relating to intellectual property, disclaimers, limitation of liability, and governing law survive termination.']

},
{
  heading: '8. Governing Law',
  paragraphs: [
  'These terms are governed by the laws of the State of California, United States, without regard to its conflict-of-laws rules. The state and federal courts located in Los Angeles County, California will have exclusive jurisdiction over any dispute arising from these terms.']

},
{
  heading: '9. Contact',
  paragraphs: [
  'Questions about these terms may be directed to Rettrivo LLC, 600 Wilshire Blvd, Los Angeles, CA 90013, USA, or by phone at +1 (213) 555-0108.']

}];


export function Terms() {
  return (
    <div className="w-full bg-paper">
      <article className="mx-auto max-w-3xl px-6 pb-24 pt-36">
        <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-soft">
          Legal · Last updated 2026-07-01
        </span>
        <h1 className="mt-5 font-display text-4xl font-bold leading-[1.08] tracking-[-0.02em]">
          Terms &amp; Conditions
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