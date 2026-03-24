# Feature Specification: KechBnb Promotional Website

**Feature Branch**: `001-kechbnb-website`
**Created**: 2026-03-24
**Status**: Draft

## User Scenarios & Testing *(mandatory)*

### User Story 1 — Landlord Discovers KechBnb and Submits a Lead (Priority: P1)

A landlord in Marrakech (or considering investing there) lands on the KechBnb homepage via
Google search, social media, or word of mouth. They read the value proposition, understand
the 20% commission model, scroll through social proof, and submit the "Obtenir une estimation
gratuite" contact form to request a callback or proposal.

**Why this priority**: This is the primary conversion event. Every other page exists to support
this journey. Without a working lead capture flow, the website delivers zero business value.

**Independent Test**: Can be fully tested by visiting the homepage, navigating to the contact
page, filling the form, and confirming submission — delivers the core business goal independently.

**Acceptance Scenarios**:

1. **Given** a landlord visits the homepage, **When** they read the hero section,
   **Then** they understand KechBnb's value proposition and the 20% commission model
   within 5 seconds (headline + subheadline visible above the fold on all devices).
2. **Given** a landlord clicks any CTA button, **When** they arrive on the contact page,
   **Then** they see a clearly labelled form with fields for name, phone, email,
   neighborhood, and an optional message.
3. **Given** a landlord submits the contact form with valid data, **When** the form is
   submitted, **Then** they see a success confirmation message in their current language
   (French or English), and KechBnb receives the lead via the configured form service.
4. **Given** a landlord submits the form with missing required fields, **When** they attempt
   submission, **Then** inline validation highlights the missing fields without losing
   already-entered data.

---

### User Story 2 — Landlord Evaluates KechBnb's Services in Detail (Priority: P2)

A landlord who is partially convinced wants to understand exactly what KechBnb does before
committing to contact. They navigate to the Services page and the How It Works page to read
a full breakdown of the management offering.

**Why this priority**: Trust is the second most critical conversion driver. A landlord who
cannot find the answer to "what exactly do you do?" will leave without converting.

**Independent Test**: Navigate to Services page — verify all service categories are listed
with clear descriptions. Navigate to How It Works — verify the onboarding steps are numbered
and understandable without any prior context.

**Acceptance Scenarios**:

1. **Given** a landlord visits the Services page, **When** they read it,
   **Then** they can identify all included services: listing creation, guest communication,
   cleaning coordination, dynamic pricing, maintenance, and interior design assistance —
   all presented as included in the 20% commission.
2. **Given** a landlord visits the How It Works page, **When** they read it,
   **Then** they see a numbered step-by-step process from initial contact to first booking,
   with no more than 6 steps.
3. **Given** a landlord reads either page, **When** they reach the end,
   **Then** a CTA ("Obtenir une estimation gratuite") is visible without scrolling back up.

---

### User Story 3 — Landlord Builds Trust via Social Proof and Portfolio (Priority: P3)

A skeptical landlord wants evidence that KechBnb delivers results. They look for testimonials,
statistics, and the interior design portfolio.

**Why this priority**: Social proof is a conversion multiplier. It reduces friction for
landlords who are already interested but need reassurance.

**Independent Test**: Visit homepage social proof section and Interior Design page — verify
testimonials, mock statistics, and at least one portfolio image placeholder are present.

**Acceptance Scenarios**:

1. **Given** a landlord scrolls the homepage, **When** they reach the social proof section,
   **Then** they see at least 3 landlord testimonials and at least 3 headline statistics
   (e.g., average occupancy rate, properties managed, average revenue uplift).
2. **Given** a landlord visits the Interior Design page, **When** they view it,
   **Then** they see a gallery of "after" property photos with captions and a CTA to enquire.
3. **Given** a landlord reads a testimonial, **When** they examine it,
   **Then** it includes a name, property type, and a quoted result
   (e.g., "My apartment now generates 40% more than my previous long-term lease").

---

### User Story 4 — Landlord Finds KechBnb via Blog / SEO (Priority: P4)

A landlord searches for advice on Airbnb management in Marrakech and finds a KechBnb blog
article via a search engine. They read the article, discover the service, and navigate to
the contact page.

**Why this priority**: Blog content drives organic search traffic and positions KechBnb as
an authority in Marrakech short-term rental management.

**Independent Test**: Visit the blog index — verify it lists articles by category; open one
article — verify it renders fully with a CTA at the bottom linking to the contact page.

**Acceptance Scenarios**:

1. **Given** a visitor lands on the blog index, **When** they view it,
   **Then** they see articles organised by category (e.g., Tips for Landlords,
   Marrakech Market, Guest Experience).
2. **Given** a visitor reads a blog article, **When** they reach the end,
   **Then** a CTA linking to the contact page is visible.
3. **Given** 3 starter articles are published, **When** a search engine crawls the site,
   **Then** each article has a unique title, meta description, and minimum 400 words.

---

### User Story 5 — Landlord Switches Language (Priority: P5)

A non-French-speaking landlord or international investor visits in French and switches to
English via the language toggle.

**Why this priority**: Marrakech attracts international real estate investors. English support
broadens the addressable market without requiring a second website.

**Independent Test**: Toggle language on any page — verify all visible text switches to English
including navigation, CTAs, and form labels.

**Acceptance Scenarios**:

1. **Given** a visitor is on any page in French, **When** they click the language toggle,
   **Then** all visible content (navigation, headings, body text, CTAs, form labels)
   displays in English without a full page reload.
2. **Given** a visitor has switched to English, **When** they navigate to another page,
   **Then** the selected language is preserved throughout the session.
3. **Given** a visitor is on the contact form in English, **When** they submit the form,
   **Then** success/error messages display in English.

---

### Edge Cases

- What if the contact form service is unavailable? The form MUST display a user-friendly
  error message and suggest an alternative (phone number or direct email address).
- What if a visitor has JavaScript disabled? All page content MUST be readable; the language
  toggle may degrade to a link-based fallback; the contact form MUST function via standard HTML POST.
- What if a visitor's browser does not support WebP? The site MUST serve JPEG/PNG fallback
  via `<picture>` element srcset.
- What if a visitor is on a slow connection (2G/3G)? The hero text and CTA MUST be visible
  before images finish loading.

---

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The site MUST display all content in French by default.
- **FR-002**: A language toggle MUST allow switching between French and English on every page,
  persisting the selection for the duration of the session.
- **FR-003**: The homepage MUST contain: hero section (headline + subheadline + CTA),
  services overview, social proof section (statistics + testimonials), and a footer CTA.
- **FR-004**: The Services page MUST list all included services with individual descriptions,
  making explicit that all are covered by the 20% commission.
- **FR-005**: The How It Works page MUST present the landlord onboarding process as a numbered
  sequence of no more than 6 steps, from first contact to first booking.
- **FR-006**: The Interior Design page MUST display a photo gallery of "after" property images
  with descriptive captions, and MUST include a CTA linking to the contact page.
- **FR-007**: The Contact page MUST contain a form with these fields:
  full name (required), phone number (required), email address (required),
  property neighborhood/district (required), number of properties (optional),
  message (optional).
- **FR-008**: The contact form MUST submit to a third-party form service and display a
  confirmation message upon successful submission.
- **FR-009**: The FAQ page MUST display client-provided questions and answers in an expandable
  accordion format.
- **FR-010**: The Blog MUST support multiple categories; each article MUST display: title,
  publication date, category, full body, and a CTA at the bottom.
- **FR-011**: The blog index MUST list all articles with title, category, date, and excerpt.
- **FR-012**: Every page MUST contain a navigation bar linking to all main pages + language
  toggle, and a footer with contact details and social media links.
- **FR-013**: Every page MUST include at least one CTA pointing to the contact form.
- **FR-014**: The site MUST be deployable as a fully static bundle with no server-side runtime.
- **FR-015**: The contact form MUST perform client-side validation and display inline error
  messages for missing or malformed required fields.

### Key Entities

- **Page**: One of 7 required pages. Attributes: title (FR + EN), meta description (FR + EN),
  URL slug, content sections.
- **Service**: A management service. Attributes: name (FR + EN), description, icon.
  All included in 20% commission.
- **Testimonial**: A landlord review. Attributes: landlord name, property type, quote, result stat.
- **Statistic**: A headline metric. Attributes: value, label, optional disclaimer.
- **Portfolio Item**: Interior design showcase. Attributes: after-photo, caption, property type.
- **FAQ Item**: Question-answer pair. Attributes: question (FR + EN), answer (FR + EN).
- **Blog Article**: Content piece. Attributes: title, slug, category, publication date,
  excerpt, full body, meta description.
- **Lead**: Contact form submission. Attributes: name, phone, email, neighborhood,
  number of properties (optional), message (optional).

---

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A first-time visitor can identify KechBnb's service offering and commission rate
  within 5 seconds of landing on the homepage on any device.
- **SC-002**: A landlord can complete and submit the contact form in under 2 minutes on mobile.
- **SC-003**: The site achieves Lighthouse Performance ≥ 90 on mobile and ≥ 95 on desktop.
- **SC-004**: All 7 pages display correctly on screen widths from 320px to 1920px with no
  horizontal scrolling.
- **SC-005**: The language toggle switches all visible content between French and English
  within 300ms with no full page reload.
- **SC-006**: All 7 pages pass WCAG 2.1 Level AA automated checks.
- **SC-007**: The contact form delivers lead data to KechBnb for 100% of valid submissions.
- **SC-008**: Each of the 3 starter blog articles contains minimum 400 words, a unique title,
  and a unique meta description.
- **SC-009**: The site renders all content meaningfully with JavaScript disabled.

---

## Assumptions

- The client will provide the logo file (SVG or PNG) before the design phase.
- The client will provide FAQ question-answer pairs before content integration begins.
- The client will provide "after" interior design photos before the Interior Design page is
  populated; placeholder slots are used until then.
- Mock testimonials and statistics are used at launch and will be replaced with real data
  as the business grows. All mock data is marked as illustrative in codebase comments.
- Formspree (free tier) is used for the contact form; the client will provide the endpoint.
- Blog articles are managed as static files; no CMS is required at launch.
- The 3 starter blog articles will be drafted in French and translated to English.
- Social media footer links use placeholder hrefs until the client provides actual URLs.
- Scope is Marrakech only; no multi-city expansion is in scope.
