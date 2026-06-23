# Commercial Refrigeration Landing Pages — Setup Guide

Three standalone, fast-loading landing pages built for Google Ads traffic:

1. `commercial-refrigeration-repairs.html` — broad equipment repairs (display fridges, bar coolers, ice machines, prep units, blast chillers, etc.)
2. `cool-room-freezer-repairs.html` — specialist cool room / freezer room repairs (compressors, seals, refrigerant, controls)
3. `cool-room-freezer-installations.html` — design, supply & install of new cool rooms / freezer rooms

Shared files: `styles.css` and `script.js` (used by all three — keep them in the same folder as the HTML files).

## 1. Replace the placeholders

Search each HTML file for these bracketed placeholders and replace with your real details (find & replace across all 3 files at once if you can):

| Placeholder | Replace with |
|---|---|
| `[BUSINESS NAME]` | Your business name |
| `[PHONE NUMBER]` | Your phone number, e.g. `(02) 1234 5678` |
| `tel:+610000000000` | Your number in international format, e.g. `tel:+61212345678` |
| `[EMAIL ADDRESS]` / `info@yourdomain.com.au` | Your contact email |
| `[STREET ADDRESS]`, `[SUBURB]`, `[POSTCODE]` | Your business address |
| `[ABN NUMBER]` | Your ABN |
| `https://www.yourdomain.com.au/...` | Your real domain (canonical & og:url tags) |

There are also a few **sample numbers** in the hero "readout" panel and trust strip (e.g. "3,200+ jobs completed", "47 min avg response") — these are placeholders to show the design. Replace them with your real stats, or remove the line entirely if you'd rather not state a number yet.

## 2. Real photos & reviews

- The dark "Before & After" section has **dashed placeholder boxes** — swap these for `<img>` tags with real job photos. Commercial buyers respond strongly to real on-site proof.
- The testimonial cards are clearly **sample content** — replace with real customer reviews, names/roles, and star ratings as you collect them.

## 3. Make the quote form actually send somewhere

Right now the form shows a friendly "Request received" message but doesn't send the data anywhere — that logic lives in `script.js` under `[data-quote-form]`. To go live, pick one:

- **Easiest:** use a form backend like Formspree, Basin, or similar — change the `<form>` tag to add `action="https://your-endpoint" method="POST"` and remove/adjust the JS handler.
- **If you move this into WordPress/Elementor:** swap out the form section for Elementor's native Form widget (it has built-in email notification + CRM integrations), and you can discard the JS form-handling block.
- **Custom backend:** replace the `fetch`-free handler in `script.js` with an actual `fetch()` POST to your API/CRM.

## 4. Connect Google Ads / GA4 tracking

`script.js` already pushes `phone_click` and `quote_form_submit` events to `window.dataLayer` — this is safe even before you've installed any tag (it just becomes a plain array). Once you:

1. Add your GA4 / Google tag snippet to the `<head>` of each page, and
2. Set up a Conversion Action in Google Ads,

...you can uncomment the two `gtag('event', 'conversion', ...)` lines in `script.js` and drop in your `AW-CONVERSION_ID/LABEL` to fire phone-click and form-submit conversions directly. This is the cleanest way to optimise Google Ads bidding off real call/lead data.

## 5. Hosting options

- **Quickest:** upload the 5 files (3 HTML + CSS + JS) to any static host (Netlify, Vercel, cPanel, S3, etc.) and point your Google Ads final URLs at them.
- **WordPress/Elementor:** hand these files to your developer as the approved design/copy reference — the layout, sections and copy can be rebuilt as Elementor sections/widgets, or the HTML can be dropped into an Elementor HTML widget / a custom page template.

## 6. What's already built in

- Mobile-first, no layout frameworks — loads fast (one CSS file, one JS file, no images required to render).
- Sticky bottom "Call Now / Get a Quote" bar on mobile.
- Click-to-call links (`tel:`) in 5+ places per page.
- FAQ sections use native `<details>` — accessible, no JS dependency, and paired with FAQPage schema for SEO rich snippets.
- LocalBusiness + FAQPage JSON-LD structured data on every page (update the placeholders in the `<script type="application/ld+json">` blocks too).
- Internal links between the three pages (e.g. repairs page links to the installs page) for SEO and easy navigation between your ad landing pages.
- Respects `prefers-reduced-motion` and uses visible keyboard focus states throughout.

## 7. Suggested next steps

- Swap in your logo (currently a simple text mark) — happy to adjust the header if you send a logo file.
- Confirm your actual call-out fee / response-time numbers for the FAQ and stat sections.
- Once live, watch which of the 3 pages converts best per ad group and tighten copy/CTAs there first.
