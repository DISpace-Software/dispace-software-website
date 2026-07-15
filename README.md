# DISpace Software Website

Premium static website for DISpace Software and its flagship product, SeatMap.

The project is intentionally lightweight: no build step is required for the public website. The main site is static HTML/CSS/JS, while the SeatMap beta is a prebuilt React/Vite application embedded as static assets inside `seatmap-app/`.

## What This Project Contains

- Company website for DISpace Software.
- Multilingual main-site copy: Russian, English, Bulgarian.
- Flagship product section for SeatMap.
- SeatMap beta launch page.
- SeatMap product guide page.
- Static SeatMap demo app with mock API.
- Guided onboarding for the SeatMap beta.
- Team section with real names, roles, and photos.
- SEO files for crawling and indexing.
- Hosting support for Apache/Superhosting and Vercel-style routing.

## Project Structure

```text
.
├── index.html                  # Main DISpace Software website
├── styles.css                  # Main website styles and responsive layout
├── script.js                   # Main website interactions and language switcher
├── seatmap-beta.html           # SeatMap beta landing/launch page
├── seatmap-guide.html          # SeatMap product guide page
├── product-pages.css           # Shared styles for SeatMap product pages
├── seatmap-app/
│   ├── index.html              # Static wrapper for the SeatMap beta app
│   ├── mock-api.js             # Demo API layer for beta mode
│   ├── pro-demo.js             # SeatMap Pro order/kitchen/waiter demo layer
│   ├── training-demo.js        # Guided Basic/Pro training walkthrough
│   ├── pro-demo.css            # SeatMap Pro demo styles
│   ├── training-demo.css       # Guided training overlay styles
│   └── assets/                 # Built React/Vite assets
├── assets/
│   ├── brand/                  # DISpace logo assets
│   ├── hero/                   # Main hero visuals
│   ├── seatmap/                # SeatMap product imagery
│   └── team/                   # Team portraits
├── .htaccess                   # Apache/Superhosting routing and caching
├── vercel.json                 # Vercel rewrites for SPA routes
├── robots.txt                  # Search crawler rules
├── sitemap.xml                 # Public URL map for search engines
└── README.md
```

## Local Preview

Because this is a static site, the simplest local server is enough:

```bash
python3 -m http.server 5173 --bind 127.0.0.1
```

Open:

```text
http://127.0.0.1:5173/
```

Important pages:

```text
http://127.0.0.1:5173/
http://127.0.0.1:5173/seatmap-beta.html
http://127.0.0.1:5173/seatmap-guide.html
http://127.0.0.1:5173/seatmap-app/index.html?route=reservation&tour=1
```

## SeatMap Beta Routes

The beta app uses client-side routes:

```text
/reservation
/admin
/menu
/privacy
```

For local preview with `python3 -m http.server`, use:

```text
/seatmap-app/index.html?route=reservation&tour=1
```

On production hosting, `.htaccess` and `vercel.json` rewrite the short routes to `seatmap-app/index.html`.

## SeatMap Demo Credentials

The admin login helper inside the beta shows demo credentials automatically.

Current demo values:

```text
Email: admin@seatmap.local
Password: demo
```

The beta runs through `mock-api.js`, so it is for presentation and product walkthroughs, not production data.

## Main Files To Edit

Use these files for normal content/design work:

- Main site content: `index.html`
- Main site translations: `script.js`
- Main site styling: `styles.css`
- SeatMap beta landing page: `seatmap-beta.html`
- SeatMap guide content: `seatmap-guide.html`
- SeatMap beta enhancement layer: `seatmap-app/beta-enhance.js`
- SeatMap beta visual layer: `seatmap-app/beta-luxury.css`

Avoid editing `seatmap-app/assets/index-*.js` directly unless you are replacing the built SeatMap app bundle.

## Language System

The main site language switcher is implemented in `script.js`.

Current languages:

- `ru` Russian
- `en` English
- `bg` Bulgarian

The visible HTML is Russian by default. On page load, `script.js` applies the selected language from localStorage.

## SEO Notes

The site includes:

- descriptive titles and meta descriptions;
- Open Graph and Twitter cards;
- canonical URLs;
- hreflang alternates;
- JSON-LD structured data for Organization, WebSite, SoftwareApplication, and FAQPage;
- `robots.txt`;
- `sitemap.xml`.

Target search themes:

- DISPACE
- DISpace Software
- DISpacesoft / DISpasesoft spelling variants
- SeatMap
- restaurant SaaS
- restaurant operating system
- restaurant management system
- hospitality CRM
- smart restaurant reservation platform
- SaaS системы для ресторанов
- системы управления ресторанами
- системи за управление на ресторанти

SEO cannot guarantee first place in Google by code alone. Ranking also depends on domain age, backlinks, content depth, indexing speed, performance, real traffic, and Google Search Console setup.

## Deployment

### Superhosting / Apache

Upload the project contents to the domain web root, usually:

```text
public_html/
```

Keep `.htaccess` in the root. It provides:

- route rewrites for SeatMap SPA pages;
- gzip/deflate compression where available;
- cache expiration for CSS, JS, and images;
- directory listing disabled.

### Vercel

The included `vercel.json` rewrites SPA routes:

```text
/reservation -> /seatmap-app/index.html
/admin       -> /seatmap-app/index.html
/menu        -> /seatmap-app/index.html
/privacy     -> /seatmap-app/index.html
```

## Production Checklist

Before publishing:

- Confirm domain in `sitemap.xml`, canonical URLs, and structured data.
- Submit `https://dispacesoft.com/sitemap.xml` in Google Search Console.
- Add Google Search Console verification if available.
- Add analytics only if the owner wants tracking.
- Test mobile layout on iPhone and Android widths.
- Test SeatMap beta with `?tour=1`.
- Hard refresh after deploy to avoid stale CSS/JS.

## Code Quality Rules

- Keep edits scoped.
- Do not edit generated Vite bundle assets manually unless rebuilding/replacing the app.
- Prefer semantic HTML for SEO.
- Keep images compressed before adding large production assets.
- Keep all public links relative unless they must be absolute SEO URLs.
- Update cache-busting query strings in `seatmap-app/index.html` when changing `beta-enhance.js` or `beta-luxury.css`.

## Current Team Roster

```text
01 Stepan Sert       - Founder & Product Architect
02 Dmitriy Kara      - CTO Chief Technology Officer
03 Valentin Kara     - Senior Product Engineer
04 Oleksiy Nikolaev  - Senior Platform Engineer
05 Svetlana Kara     - Growth & Partnerships Lead
06 Tatianna Bilyk    - Customer Success Manager
07 Elizaveta Militan - Head of Product Design
```

## Useful Git Commands

```bash
git status --short
git add .
git commit -m "Describe the change"
git push
```
