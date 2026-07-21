# Victoria-Alabaster International Women Ministry — Website

A modern, responsive React + Vite + Tailwind website for Victoria-Alabaster
International Women Ministry, an NGO-style organization supporting women,
widows, single mothers, and youth.

## Tech Stack

- **React 18** + **Vite** — fast dev/build tooling
- **Tailwind CSS** — utility-first styling with a custom brand theme
- **React Router v6** — client-side routing across 7 pages
- **React Icons (Fa6 set)** — iconography
- **Framer Motion** — scroll reveals and subtle page/hover animations

## Getting Started

```bash
npm install
npm run dev       # start local dev server (http://localhost:5173)
npm run build     # production build → dist/
npm run preview   # preview the production build locally
```

## Project Structure

```
src/
├── components/
│   ├── layout/
│   │   ├── Navbar.jsx          # sticky nav with mobile menu
│   │   ├── Footer.jsx
│   │   └── Layout.jsx          # page shell + scroll-to-top
│   └── common/
│       ├── PageHero.jsx        # reusable inner-page hero banner
│       ├── SectionHeading.jsx  # eyebrow + title + thread divider
│       ├── Cards.jsx           # IconCard, ProfileCard, NumberedImpactCard, SimpleNeedCard
│       ├── Reveal.jsx          # scroll-triggered fade/slide-up wrapper
│       ├── ThreadMotif.jsx     # signature "thread" SVG motif
│       └── VisualPlaceholder.jsx # brand-colored illustrated placeholders (swap for real photos)
├── data/
│   └── content.js              # ALL site copy & content lives here — edit freely
├── pages/
│   ├── Home.jsx
│   ├── About.jsx
│   ├── Needs.jsx
│   ├── Projects.jsx
│   ├── Media.jsx
│   ├── Contact.jsx
│   ├── Donate.jsx
│   └── NotFound.jsx
├── App.jsx                     # route definitions
├── main.jsx
└── index.css                   # Tailwind directives + base styles + button/utility classes
```

## Brand Tokens (tailwind.config.js)

| Token         | Hex       | Usage                          |
|---------------|-----------|---------------------------------|
| `green`       | `#0F5132` | Primary — headers, buttons, nav |
| `gold`        | `#D4AF37` | Secondary — accents, CTAs       |
| `beige`       | `#F8F4EE` | Section backgrounds             |
| `ink`         | `#333333` | Body text                       |

Fonts: **Fraunces** (display/headings) + **Inter** (body), loaded via Google Fonts in `index.html`.

## Replacing Placeholder Imagery

Real photography wasn't available for this build, so `VisualPlaceholder.jsx`
renders tasteful brand-colored SVG illustrations as stand-ins (hero, office,
shelter, founder, community, etc.). To swap in real photos:

1. Drop image files into `src/assets/`.
2. Replace `<VisualPlaceholder variant="..." />` usages with `<img src={...} className="w-full h-full object-cover" />`.
3. The gradient gallery tiles in `Media.jsx` and `Home.jsx` (`galleryItems` in `content.js`) can be swapped the same way.

## Things to Wire Up Before Launch

- **Contact form** (`src/pages/Contact.jsx`): currently validates and shows a
  success state client-side only. Connect `handleSubmit` to your email
  service or backend API (e.g. Formspree, SendGrid, or a custom endpoint).
- **Donate button** (`src/pages/Donate.jsx`): has a placeholder "coming soon"
  state. Wire it to your payment processor (Stripe, Paystack, PayPal, etc.)
  when ready.
- **Google Maps embed** (`src/pages/Contact.jsx`): currently uses a generic
  Lagos query string. Replace with your exact office address or a proper
  Google Maps embed URL/API key.
- **YouTube videos** (`src/pages/Media.jsx`): replace placeholder video IDs
  with your real YouTube video IDs.
- **Social links** (`src/components/layout/Footer.jsx`): replace `href="#"`
  with real social media URLs.

## Editing Content

Nearly all text content (nav links, support areas, projects, team bios,
office addresses, donation copy, gallery captions, testimonials) lives in
**`src/data/content.js`**. Edit that single file to update copy across the
entire site without touching component code.
