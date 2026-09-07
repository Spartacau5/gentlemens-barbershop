# Gentlemen's Barbershop

One-page site for [Gentlemen's Barbershop](https://www.gentlemensbarbershopnyc.com/),
205 Johnson Ave, East Williamsburg, Brooklyn.

**Live:** https://spartacau5.github.io/gentlemens-barbershop/

## What this is

A dependency-free static site. No build step, no framework, no package manager —
open `index.html` and it works. That is deliberate: the page has no dynamic
content, so shipping a JavaScript framework would cost ~350 kB to render text
that never changes.

| File | Purpose |
| --- | --- |
| `index.html` | The whole page — content, metadata, and `BarberShop` structured data |
| `styles.css` | Brand system: colour, type, layout, reduced-motion rules |
| `motion.js` | Scroll parallax, reveal-on-scroll, hero video autoplay |
| `404.html` | Not-found page |
| `hero-1080.{webm,mp4}` | Hero loop, 1080p, seamless |
| `hero-poster.webp` | Hero poster frame (also the LCP image) |
| `og-image.jpg` | Social share card, 1200×630 |
| `tools.webp`, `towel.webp` | Section imagery |
| `favicon.svg` | Brass monogram icon |

## Editing

**Content** — everything visible is plain HTML in `index.html`. Phone number,
address, hours and services are literal text; search for them and edit in place.
The phone number appears in several spots (nav, hero, services note, hours
panel, footer) — update all of them, including the `tel:` links and the
`telephone` field in the structured-data block at the top.

**Brand** — colours and fonts are custom properties at the top of `styles.css`:

```css
--gb-ink: #0b0a09;      /* background */
--gb-brass: #c9903f;    /* accent */
--gb-cream: #f3ece2;    /* text */
```

**Motion** — parallax depth is set per element in the markup via
`data-parallax="<px>"`. Larger numbers lag the page more and read as further
away. Elements inside a `data-parallax-root` move relative to that root.

## Accuracy note

Every fact on the page comes from one of two sources the business publishes
itself:

| Content | Source |
| --- | --- |
| Hours, service menu and prices, email, socials, Booksy link | gentlemensbarbershopnyc.com |
| Rating (4.8), review count (663), the three quoted reviews, address, phone | Google Business listing |
| Gallery photos in the marquee | the shop's own gallery page |

There is deliberately **no founding date, awards, or staff claims** — none were
published, and inventing them would be misleading.

**Two things to confirm with the shop:**

1. **Hours conflict between their two listings.** Their website says Mon–Thu
   10:30 AM, but Google says the shop opens at 11:00 AM. This page follows the
   website, on the grounds that the owner maintains it directly. Worth
   reconciling — whichever is wrong is costing them walk-ins. Hours live in the
   Hours panel and in `openingHoursSpecification` in the structured data;
   update both together.
2. **Ownership tags** (veteran-, Asian-, LGBTQ+-owned) that Google lists were
   removed pending confirmation. They are self-reported and were not verified.

Prices are labelled "as published and subject to change" and point to Booksy to
confirm, so the page does not harden into a quote. They appear twice — in the
menu markup and in `makesOffer` in the structured data.

## The photo marquee

The strip in "Fresh out of the chair" is a CSS-only auto-scroller: two
identical runs of twelve photos sit side by side, and the track translates
exactly `-50%`, which lands run two precisely where run one started — so the
loop has no visible seam. Hover (or keyboard focus) pauses it. Under
`prefers-reduced-motion` the animation is dropped and the strip becomes an
ordinary horizontal scroller, so the photos stay reachable.

To change the photos, replace `work-01.webp` … `work-12.webp` (560×700, 4:5)
and update the `alt` text. If you add or remove any, change **both** runs so
the two halves stay identical or the loop will jump. The shop's photos are
phone shots in mixed daylight, so a light CSS grade
(`saturate(.82) contrast(1.04) brightness(.9)`) settles them into the page;
hovering removes it and shows each photo exactly as shot.

## Hosting

Static files — host anywhere. Currently served by GitHub Pages from the
`main` branch. Any change pushed to `main` redeploys automatically within a
minute or two.

Because every asset path is relative, the site also works from a subdirectory
or straight off the local filesystem. If you later move it to a real domain,
update the absolute URLs in `index.html` (`canonical`, `og:url`, `og:image`,
and the structured data `url`/`image`), plus `robots.txt` and `sitemap.xml`.
