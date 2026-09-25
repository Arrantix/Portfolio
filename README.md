# Kevin Weidner / Arrantix

A bilingual portfolio for web development, AI, and interactive experiments.
Static HTML, CSS, and JavaScript, deployable directly to GitHub Pages.

## Preview

Serve this directory with any static HTTP server, for example:

```sh
python -m http.server 4173 --bind 127.0.0.1
```

Open `http://127.0.0.1:4173/index-de.html` (German) or `index.html` (English).
The project and playground pages are available in both languages.

## Edit

- `scripts/build.mjs`: bilingual page content and shared HTML templates.
- `styles.css`: design tokens, typography, layouts, and responsive states.
- `contact.css`: contact layout and form styles.
- `scripts.js`: progressively enhanced mobile navigation and language anchors.
- `contact.js`: existing EmailJS integration and local form feedback.
- `assets/`: original project screenshots, favicon, and locally hosted fonts.

After changing page content or templates, regenerate the committed HTML:

```sh
node scripts/build.mjs
```

No npm install or build service is needed to view or publish the site. Navigation,
projects, notes, language links, and direct email links work without JavaScript.
The contact form needs JavaScript and the existing EmailJS provider to be available.
Keep EmailJS service/template/public client IDs aligned with the provider account.
The local arithmetic check is a UX check, not a server-side anti-abuse boundary;
provider-side domain restrictions and rate limits remain the provider's responsibility.

## Design

The portfolio uses charcoal surfaces, warm white typography, a restrained lime
accent, and project visuals. The PC Dashboard preview is a stylized SVG based
on the application interface; the other project images are screenshots. The
small three-block identity comes from the game projects. Project evidence takes
priority over generic skill claims.
Space Grotesk and IBM Plex Mono are hosted locally with their OFL licenses in
`assets/fonts/`. Motion is limited to short hover feedback and respects reduced
motion. German and English pages share one template and have explicit routes.

## Verification

```sh
node --check scripts.js
node --check contact.js
node --test tests/site.test.mjs
```

Browser checks use development-only dependencies:

```sh
npm ci --ignore-scripts
npx playwright install chromium
npm run test:browser
```

Start the local preview first. `PORTFOLIO_PREVIEW_URL` can select another local
port; `PORTFOLIO_BROWSER` can point to an existing Chrome/Chromium executable.
The browser tests cover all ten pages at 320, 390, 768, and 1440 pixels, axe
accessibility checks, keyboard navigation, no-JavaScript fallback, reduced motion,
and mocked contact success and failure. Screenshots and the report go into the
ignored `test-results/` directory. No real messages are sent by the tests.

Before publishing, preview all pages at small, medium, and large widths, check
keyboard navigation and language switches, and exercise contact success/failure
with a mocked provider. Local tests must not send real messages. Publishing does
not establish that the external EmailJS account is currently configured correctly.
