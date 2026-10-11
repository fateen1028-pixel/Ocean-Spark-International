# Ocean Spark International — website

Single-page B2B site for Ocean Spark International: import and wholesale supply of
coconut shell charcoal sourced in Thailand, cleared at Chennai, supplied across
Tamil Nadu.

React 19 + TypeScript + Vite. All copy lives in `src/data/`; components render it.

```
npm install
npm run dev       # local dev server
npm run build     # tsc -b && vite build
npm run lint
npm run preview   # serve the production build
```

---

## Commercial confidentiality — read before editing copy

The internal investment proposal for this business contains material that must
**never** reach the browser. It is not in this repository and must not be added:

| Do not publish | Examples |
| --- | --- |
| Investment amounts, investor details | funding size, backer names |
| Purchase / selling prices, landed cost, FX assumptions | USD/MT, ₹/kg, exchange rate |
| Margins, turnover, revenue or profit forecasts | gross margin %, monthly/annual projections |
| Supplier advance %, customer credit terms | advance/balance split, credit days |
| Working-capital maths, cash cycle, capital rotation | cash-cycle length, revolving fund plan |
| Monthly or annual trading volumes | tonnage per month or year |

**What *is* public** is the operational description of the trade: country of
origin, growing region, discharge port, the supply-chain stages, the Incoterm
basis, inspection practice and the shipping documents released with a consignment.
None of that reveals a figure.

This applies to component copy, `src/data/*`, `index.html` metadata and JSON-LD,
source comments, `public/`, and any browser-accessible environment variable.

### Credentials must never reach the client bundle

Anything in a `VITE_` variable is compiled into public JavaScript and is readable
by anyone who opens devtools. Only put a **URL** in `VITE_INQUIRY_ENDPOINT`. The
receiving service holds any API key or token on its own server.

---

## Content that still needs the company's confirmation

The site renders only confirmed details. Unconfirmed items are **absent**, not
rendered as "to be published" — a wall of placeholders reads as an unfinished
business to a buyer. To publish a real value, add it to the marked entry in
`src/data/company.ts` or `src/data/products.ts`.

| Item | Where | Status |
| --- | --- | --- |
| Business email | `contactChannels` | **absent** — blocks online inquiry delivery |
| WhatsApp number | `contactChannels` | absent |
| Registered office address | `contactChannels` | absent |
| Business hours | `contactChannels` | absent |
| Company registration no. | `contactChannels` | absent |
| Legal entity name | `company.legalName` | empty |
| Founding year | `company.founded` | empty |
| Product form / grade / packaging / MOQ | `products[].form/grade/packaging/moq` | all null |
| Moisture, ash, fixed carbon, volatile matter | `products[].specs.*` | all null |
| Product datasheets | `products[].datasheet`, `documentSlots[].src` | none |
| Photography for the non-core product lines | `products[].image` | `null` — no accurate image exists yet |
| Live domain | `company.seo.siteUrl`, `index.html`, `sitemap.xml`, `robots.txt` | placeholder |

Spec rows are **omitted entirely** when null, so no placeholder number is ever
displayed as a specification.

### Images

Only images that show the actual subject are used. Two assets were removed from
the page because they showed the wrong thing and were not replaced with
substitutes, since no accurate alternative photography was available:

- `about-bulk` — an abstract close-up of empty sacks, captioned as filled sacks
  in a warehouse. Replaced in the About section with charcoal in a bag.
- `product-industrial` — a wood fire pit. Replaced with `product-charcoal`.
- `product-briquette` — a generic flame. Not used.

Unused files are left on disk in `public/img/`. Delete them once you are sure
nothing references them, or replace them with real photography.

`inspect-shell` and `product-charcoal` are the two strongest assets; reuse them
rather than adding near-duplicates. Alt text describes what is actually in each
frame — keep it that way if images are swapped.

---

## Inquiry form delivery

`src/components/QuoteForm.tsx` has three paths and never fakes a receipt:

1. **`VITE_INQUIRY_ENDPOINT` set** — POSTs JSON, shows *success only on a 2xx*.
   A non-2xx, a network failure, or a request exceeding 15s shows an error.
2. **No endpoint, but a business email is published** — opens the visitor's mail
   client with the inquiry pre-filled and states plainly that nothing was sent
   until they send it.
3. **Neither configured** — refuses to submit and points the visitor at the
   published telephone number.

Currently path 3 is active, because no business email is published. Adding a
verified email to `contactChannels` switches it to path 2; configuring an
endpoint switches it to path 1.

A honeypot field silently discards bot submissions — no confirmation is shown for
an inquiry that was never sent.

### Privacy

`public/privacy.html` is a real, styled page covering what the form collects,
why, retention, who sees it and the visitor's rights. It is linked from the
footer and from the note under the submit button. **Update it before going live
if you ever add analytics, tracking, cookies or a third-party form service** —
the current text assumes none of those exist.

---

## Site structure

| Section | Anchor | Component |
| --- | --- | --- |
| Hero | `#top` | `HeroSection` — tiered video with a still fallback |
| Highlights | — | `BusinessHighlights` |
| About | `#about` | `AboutSection` |
| Origin | `#origin` | `OriginSection` |
| Products | `#products` | `ProductGrid` / `ProductCard` |
| Why work with us | `#why` | `WhyWorkWithUs` |
| Quality & inspection | `#quality` | `QualitySection` |
| Supply chain | `#trade` | `GlobalTradeSection` |
| Request a quotation | `#quote` | `QuoteSection` / `QuoteForm` |
| FAQ | `#faq` | `FAQSection` |
| Contact | `#contact` | `ContactSection` |

There is **one** end-to-end timeline (`tradeJourney` in `src/data/company.ts`),
not one per process — an earlier version had a "route" list and an "inquiry"
list that repeated each other and read as two separate processes.

Design tokens, typography and colour live in `src/styles/base.css`. Component
styles are in `src/styles/components.css`. Do not hardcode colours in components —
use the `--navy` / `--amber` / `--teal` / `--flame` tokens so a brand change
stays a one-line edit.

`--fs-display` is the hero's alone. `--fs-h2` is deliberately capped well below
it; section headings previously shared the display scale, so every secondary
heading shouted as loud as the h1.

---

## Imagery

Stock photography is referenced by `base` name under `public/img/`, served in
`-600` / `-900` / `-1200` / `-1600` variants. Attribution, where a licence
requires it, is stored next to the image in the data file (see `origin.image.credit`).
Add the credit there when replacing an image.