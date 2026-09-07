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

Content is limited to facts published on the shop's Google Business listing.
There are deliberately **no prices, founding date, awards, or staff claims** —
none were available, and inventing them would be misleading.

The listing only exposes an opening time (11:00 AM), not a full weekly
schedule, so the Hours panel states that and directs visitors to call. If you
have the real weekly hours, add them to the `gb-dl` list in the Hours panel and
add a matching `openingHoursSpecification` to the structured data.

## Hosting

Static files — host anywhere. Currently served by GitHub Pages from the
`main` branch. Any change pushed to `main` redeploys automatically within a
minute or two.

Because every asset path is relative, the site also works from a subdirectory
or straight off the local filesystem. If you later move it to a real domain,
update the absolute URLs in `index.html` (`canonical`, `og:url`, `og:image`,
and the structured data `url`/`image`), plus `robots.txt` and `sitemap.xml`.
