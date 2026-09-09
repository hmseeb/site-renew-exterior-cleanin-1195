# Renew Exterior Cleaning — Jacksonville, FL

A production-ready, single-page marketing website for **Renew Exterior Cleaning**, a pressure
washing and soft washing company serving Jacksonville and the First Coast.

Built with vanilla HTML, CSS and JavaScript — no build step, no dependencies, no frameworks.

## Running locally

Open `index.html` directly in a browser, or serve the folder:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Files

| File | Purpose |
| --- | --- |
| `index.html` | Entry point — the entire single-page site |
| `styles.css` | Design tokens, layout, components, responsive rules |
| `script.js` | Mobile nav, scroll spy, reveal animations, stat counters, form validation |
| `favicon.svg` | Scalable favicon placeholder (water-droplet mark) |
| `site.webmanifest` | PWA/manifest metadata |
| `robots.txt` | Crawler directives + sitemap reference |
| `sitemap.xml` | Single-URL sitemap |

## Sections

Hero with call-to-action · Trust stats · Services (6) · Process · About ·
Testimonials · Service area · FAQ · CTA banner · Contact with quote form · Footer

## SEO

The site targets local search for "pressure washing Jacksonville" and related terms:

- Descriptive title, meta description and keywords
- Open Graph and Twitter card tags
- `HomeAndConstructionBusiness` JSON-LD with NAP, geo, hours, service catalog and rating
- `FAQPage` JSON-LD so FAQ answers are eligible for rich results
- Semantic landmarks (`header`, `nav`, `main`, `section`, `footer`), one `h1`, ordered headings
- Descriptive, business-specific alt text on every image
- `robots.txt` + `sitemap.xml`

## Accessibility

Skip link, visible focus rings, ARIA-labelled nav toggle, `role="alert"` form errors,
keyboard-operable menu (Escape to close), and a `prefers-reduced-motion` fallback that
disables animation.

## Notes

- The quote form is **front-end only** — it validates input and shows a confirmation, but no
  backend or third-party API is wired up. Connect it to a form endpoint or CRM before launch.
- Contact details, address and review counts are placeholders for the real business data and
  should be confirmed before the site goes live.
- Photography is sourced from Pexels and chosen per section for topical relevance.
