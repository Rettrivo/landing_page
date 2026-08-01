# Rettrivo.com — Magic Patterns Build Prompt

## 0. One-line brief
Rettrivo is an enterprise RAG (Retrieval-Augmented Generation) platform that turns an organization's scattered internal documents, wikis, and databases into instant, trustworthy AI-generated answers. This site's one job: make a skeptical enterprise buyer believe Rettrivo can find the one correct answer buried in thousands of internal documents, fast.

Audience: IT/knowledge-management leads, ops/business analysts, enterprise buyers evaluating a RAG vendor. Tone: precise, confident, low-hype. This is infrastructure software, not a consumer app — avoid "magical AI" language; lean on retrieval accuracy, validation, and control.

**Do not build a dashboard.** This is the marketing site only.

---

## 1. Design system

### Concept: "The Index Wall"
The signature visual idea: a dense, irregular field of scattered document cards (contracts, tickets, spreadsheets, wiki pages — muted/blurred, like an unsorted archive) that, on scroll, resolve into a single sharp, highlighted line of text — the correct answer, pulled out of the noise. This is the literal metaphor for retrieval, and it should be the one bold, memorable moment on the page. Everything else stays quiet and disciplined around it.

Avoid generic "AI knowledge graph" node-and-line orbs — that's the expected cliché for this niche. Lean into the document/archive/index-card metaphor instead.

### Color palette (Light theme)
- `--paper: #F5F6F3` — base background, cool-neutral off-white (not warm cream)
- `--paper-raised: #FFFFFF` — card/surface background
- `--ink: #14181A` — primary text, near-black with a cool cast
- `--ink-soft: #55605C` — secondary text
- `--line: #DBDFDA` — hairline borders/dividers
- `--brand: #146C43` — "Ledger Green" — primary accent, used for CTAs, active states, the highlighted answer line. Signals verification/correctness.
- `--brand-deep: #0E4E31` — hover/pressed state of brand green
- `--marker: #C1512F` — "Index Rust" — secondary accent, used sparingly: tab markers, small highlight strokes, the technical-showcase section. Never used for large fills.

Do not substitute the common AI-default palettes: no warm cream + terracotta (#D97757-style), no near-black + acid-green, no hairline-serif broadsheet look. This palette is intentionally green/ink/paper — own it.

### Typography
- Display (headlines): **Space Grotesk** — geometric, confident, slightly technical. Set tight, at a clear scale (e.g., 64/48/36/28px desktop steps).
- Body: **Source Sans 3** — quiet, highly readable, does not compete with the display face.
- Utility/mono (doc IDs, tags, timestamps, technical showcase labels): **JetBrains Mono** — reinforces the "index card / ledger" metaphor. Use for small caps labels like `DOC_0417`, `CONF 94%`, `RUN 00:00:00.3s`.

### Layout principle — no repeating grid
Every section must use a different structural device. Do **not** default to a uniform 3-column icon-card grid repeated section after section. Suggested per-section devices (assign distinctly, don't reuse the same one twice):
- Offset/overlapping scattered cards (hero)
- Diagonal split (image bleeding past a hard-edged text column)
- Horizontal scroll-linked pipeline (the RAG workflow diagram)
- Stacked cards that peel/rotate away on scroll (platform capabilities)
- Toggle/tab switcher with a single live preview panel (traditional search vs. Rettrivo)
- Auto-scrolling marquee (target users / logos)
- Vertical ledger/timeline with tab-index markers (company milestones, About page)
- Asymmetric two-thirds/one-third split, not centered (documentation teaser, CTA banner)

### Signature interaction
Custom cursor: replace the default arrow with a small square "index tab" cursor (thin ink-colored outline, fills brand green on hover over any interactive element). This should feel like a cursor for tagging/marking documents, not a generic dot or ring.

---

## 2. File / page structure
Build exactly these pieces, no more, no less:

1. **Landing page** — one single file, all sections in it. Do not split into per-section components/files.
2. **Shared components** — Nav bar, Footer. These are the only components pulled out separately (used across all pages).
3. **Terms & Conditions** — standalone page.
4. **About Us** — standalone page, includes founder + team section.
5. **Privacy Policy** — standalone page.

Stack: React + TypeScript + Tailwind + Framer Motion (match the project's existing stack conventions). Scroll-linked effects via Framer Motion's `useScroll`/`useTransform` or an equivalent scroll-trigger approach.

---

## 3. Navigation (shared component)
- Unique style — explicitly **not** a plain horizontal line-list navbar. Consider a floating pill/capsule nav, or a nav bar with small index-tab-style markers next to each item instead of underlines.
- Order, left to right: **Home** (scrolls to hero/top) → Platform → Capabilities → Solutions → Docs → About → Contact.
- Active section highlighting on scroll (scroll-spy) — active item gets the brand-green tab marker filled in, inactive ones are hollow/outlined.
- All links functional: in-page anchors smooth-scroll on the landing page; About/Terms/Privacy are real page navigations.
- Sticky on scroll, condenses (shrinks height, adds background blur/shadow) after ~80px of scroll.
- Mobile: replace with a distinct off-canvas or full-bleed overlay menu — not a generic hamburger-to-basic-list; carry the index-tab motif into the mobile menu.

---

## 4. Landing page — section by section

### 4.1 Hero
Headline: **"Enterprise Knowledge, Instantly Accessible Through AI."**
Subhead (write ~2 sentences, plain language, no hype): what Rettrivo does — connects internal documents/databases/tools into one place, answers questions in natural language, always shows its source.
Primary CTA: "See a live answer" (scrolls to the RAG workflow demo section). Secondary CTA: "Talk to sales" (opens contact form / scrolls to contact section).
Visual: the "Index Wall" — a scattered field of muted document-card **placeholders** (label them clearly as placeholders, e.g. gray rectangles with a small "IMG" or file-type icon watermark — real screenshots/assets will be swapped in later, do not invent fake product screenshots). On load/scroll, one card sharpens, its text becomes legible, and a green underline "highlights" the answer — this is the page's signature moment.
Small stat chips near the hero (structural nod to reference layout, not literal color): 3–4 metric callouts such as "Sub-second retrieval," "Source-cited answers," "Enterprise-grade access control" — framed as capabilities, not fabricated growth numbers (don't invent specific customer/usage counts we haven't been given).

### 4.2 The problem
Diagonal split layout: short, punchy statement on one side ("Your best answer is probably in a PDF from 2019.") paired with the real problem bullets from the brief (knowledge scattered across systems, employees losing time searching, no contextual understanding in legacy search, slow decisions). Keep this section text-forward and quiet — no cards, no icons grid.

### 4.3 The RAG workflow (technical diagram)
Horizontal, scroll-linked pipeline, five stages revealed left to right as the user scrolls:
**Enterprise Data Sources → Knowledge Indexing → Semantic Retrieval → AI Answer Generation → Intelligent Business Insights**
Each stage: a short label (mono font, e.g. `01 · INGEST`) plus one line of plain-language explanation. Connect stages with an animated line that draws itself in as you scroll (not a static arrow row).

### 4.4 Platform capabilities
Five capabilities from the brief — presented as a stacked-card deck that peels back to reveal the next as you scroll (not a repeating 5-up icon grid):
1. Knowledge Retrieval Engine — semantic search, context-based retrieval, document understanding, knowledge indexing, information discovery
2. AI Answer Generation System — natural language answers, context-aware responses, source-based generation, question understanding, response optimization
3. Enterprise Knowledge Integration Platform — document ingestion, data source integration, knowledge synchronization, content organization, information management
4. Knowledge Intelligence Dashboard *(described here as a capability/preview only — remember, we are not building the actual dashboard)* — search analytics, query insights, usage tracking, response performance monitoring
5. AI Knowledge Operations Platform — knowledge management, retrieval monitoring, content optimization, access management, AI workflow monitoring

### 4.5 Unique angle
A toggle/tab component: "Traditional Search" vs. "Rettrivo" — clicking swaps a single preview panel's content (not two side-by-side cards). Traditional search shows a flat list of low-context results; Rettrivo shows one confident, sourced answer. This dramatizes the differentiation described in the brief.

### 4.6 Who it's for
Auto-scrolling horizontal marquee of target-user tags: Enterprise employees, Knowledge management teams, IT departments, Customer support teams, Research teams, Business analysts, Operations teams, Large organizations. Simple pill tags, continuous scroll, pause on hover.

### 4.7 Technology showcase
Scoped narrowly, exactly as the brief specifies — a compact strip, **not** the site's overall visual identity: "Built to run on enterprise-grade AI infrastructure," with logos/badges for NVIDIA AI Enterprise, TensorRT, NGC AI Models. Keep this visually subordinate (smaller section, muted styling) so it reads as a technical detail, not the brand's main story.

### 4.8 Documentation (coming soon)
Asymmetric two-thirds/one-third layout. Copy: "Developer API & Documentation — Coming Soon." List what it will include (knowledge integration APIs, retrieval docs, enterprise deployment guides, platform SDK references). CTA button: "Notify me when it's live" — functional client-side only: opens a small modal/input, on submit shows a success toast ("You're on the list.") — no backend required.

### 4.9 Trust / credibility strip
Vertical ledger-style timeline (tab-index markers, mono timestamps) with: company founded (April 28, 2023), headquartered in Los Angeles, and 1–2 lines on security/reliability posture. Keep factual and brief — this is a credibility signal, not a highlight reel.

### 4.10 How to work with Rettrivo
Light-touch, three simple paths rather than a full pricing table (no pricing calculator needed): Team / Enterprise Licensing / API Access — one short line each, from the brief's monetization list. Each links down to the contact form.

### 4.11 CTA banner
Full-bleed band, brand-green background, ink-white text: "See Rettrivo answer your hardest internal question." Single CTA button scrolling to contact.

### 4.12 Contact
Fields: Name, Work email, Company, Message. Client-side validation only (required fields, email format). On submit: show a success toast/confirmation state inline — **no backend call**, this is UI-only per current scope.

---

## 5. Footer (shared component)
Build a genuinely distinct footer architecture — not a single "© 2026 Company. All rights reserved." line. Structure:
- **Column 1 — Company identity:** Rettrivo wordmark, one-line description, legal entity block: *Rettrivo LLC · 600 Wilshire Blvd, Los Angeles, CA 90013, USA · +1 (213) 555-0108*.
- **Column 2 — Product:** Platform, Capabilities, Solutions, Technology
- **Column 3 — Resources:** Documentation (Coming Soon), About Us, Contact
- **Column 4 — Legal:** Terms & Conditions, Privacy Policy
- **Social row:** LinkedIn, YouTube, Facebook, X, Pinterest — icon links (functional hrefs, can point to placeholder `#` targets for now), styled to match the index-tab motif rather than generic circle-icon buttons.
- Bottom bar: copyright line + founding note ("Founded 2023").
All footer links and nav-to-section links must actually work (smooth-scroll or route).

---

## 6. About Us page
- Founder section: **Benjamin Ashford, Founder**, short bio paragraph (write a plausible 2–3 sentence founder bio consistent with an enterprise RAG company).
- Team grid: 4–6 placeholder team members. **Photos: placeholder avatars/initials only — no stock photos, no invented realistic headshots.** Each avatar is a simple circular badge with the person's initials on a brand-color background, plus name + role placeholder (e.g., "Head of Engineering").
- Company story: short narrative using the "real-world problem → solution" framing from the brief.
- Milestones: reuse the ledger/timeline device from section 4.9 (founding date, any other milestones you'd like to draft as placeholders clearly marked "placeholder milestone").
- Mission statement, short.

## 7. Terms & Conditions / Privacy Policy pages
Standard SaaS legal-page structure (draft reasonable placeholder legal copy, clearly boilerplate — not legal advice, to be reviewed by an actual lawyer before going live):
- Terms: acceptance of terms, description of service, accounts, acceptable use, intellectual property, disclaimers/limitation of liability, termination, governing law, contact.
- Privacy: what data is collected, how it's used, cookies, third-party services, data retention, user rights, contact.
Simple single-column reading layout for both — legal pages should prioritize legibility over design flourish.

---

## 8. Motion & interaction spec
- Custom cursor (index-tab shape, see §1) across the whole site, all pages.
- Page-load sequence on the hero: staggered entrance of the scattered document cards, then the "answer" card sharpens/highlights (the signature moment — spend the animation budget here).
- Scroll-triggered reveals throughout (fade + slight rise, staggered by ~60–80ms per element) — but don't overdo it section after section; vary the treatment per §1's layout principle so it doesn't feel like one repeated fade-in-up effect everywhere.
- Subtle ambient background: faint drifting document-chip particles (small muted rectangles, low opacity, slow parallax drift tied to scroll position and/or mouse position) — reinforces the archive metaphor, stays in the background, never distracts from foreground content.
- 3D tilt-on-hover for the capability cards and document-card placeholders (mouse-tracked, subtle, spring-based easing — not a flat CSS hover).
- Respect `prefers-reduced-motion`: provide a reduced-motion fallback (simple fades, no parallax/tilt) for every animated element.
- Mobile: simplify — drop the mouse-tracked tilt and ambient particle layer on touch devices, keep scroll-triggered reveals but lighter.

---

## 9. Responsive requirements
Fully responsive at desktop, tablet, and mobile breakpoints. On mobile: nav collapses to the distinct off-canvas menu (§3), the scattered-card hero re-flows into a simpler stacked arrangement (still not a plain grid — keep some overlap/rotation), and the horizontal pipeline/marquee sections become vertical or swipeable.

---

## 10. Content & image handling
- Every image slot in this build should be a clearly-labeled placeholder (gray block, subtle border, file-type icon, or watermark text like "Image placeholder — 1200×800") — real photography/screenshots will be swapped in afterward.
- Do not fabricate specific customer names, logos, testimonials, or usage statistics that weren't provided in the brief. Where the brief gives real content (capabilities, target users, monetization model, founder name, company address), use it as given.
