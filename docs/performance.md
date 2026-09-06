# Static loading optimizations

The existing design, text, section order, original HTML, and remote image/PDF URLs are preserved. Images now have local responsive variants, the two fonts have smaller subsets, and rendering images no longer adds a client component.

## Measured download reductions

| Resource | Before | After | Reduction |
| --- | ---: | ---: | ---: |
| All images, desktop 1440px at 1× pixel density | 2,536,617 B | 350,318 B | 86.2% |
| All images, mobile 390px at 2× pixel density | 2,536,617 B | 648,620 B | 74.4% |
| Preloaded fonts | 116,244 B | 66,848 B | 42.5% |
| Browser JavaScript, before HTTP compression | 472,504 B | 457,062 B | 3.3% |

At the initial viewport, before explicitly loading all below-the-fold images, image bytes dropped from 1,808,167 to 313,462 on desktop and from 1,329,038 to 268,294 on mobile. Native lazy loading still defers distant images; the exact initial count depends on browser heuristics and connection conditions.

Measurements compared a saved copy of the previous production export against the optimized production export in fresh Chromium contexts. The full-page image comparison explicitly loaded all 15 images. Source images were served from the exact previously downloaded original bytes to remove variability from external storage. CSS, scripts, fonts, and optimized images were served by a static HTTP server. Script byte counts are uncompressed response bodies; production HTTP compression will reduce them. These are measured resource reductions, not a claimed Lighthouse score or a guaranteed load time on a particular connection.

## Implementation

- `scripts/optimize-images.mjs` generates 68 responsive WebP files using verified source dimensions. Higher quality is used for methodology and architecture figures to preserve small text. No cropping is introduced.
- `PortfolioImage.tsx` renders native image markup in a Server Component. `srcset` and `sizes` select the appropriate local file; the original signed Supabase URL remains the exact `src` fallback. No image server, CDN transformation endpoint, or image-related hydration is required.
- `lib/images.ts` matches responsive source selection to the existing CSS breakpoints and image slots. The portrait is preloaded using the identical responsive source list. Browser tests verified one portrait download and no duplicate download of its remote original.
- Generated images use content-hashed filenames. Normal builds use checked-in assets and do not fetch external images. The complete set of resolution variants is larger than one visitor's download: browsers select one suitable candidate per image, not all 68 files.
- Images retain intrinsic width and height. Exact CSS aspect ratios preserve the original geometry despite integer rounding when encoding smaller images. Methodology padding and borders remain outside the content ratio.
- `scripts/subset-fonts.py` creates the checked-in subsets under `app/fonts/subsets/`. Playfair shrank from 106,440 to 66,096 bytes while retaining Latin language coverage and weights 400–900. Brodia shrank from 9,804 to 752 bytes for the R glyph. Complete source fonts remain untouched.
- `next/font/local` still preloads both fonts. The original pre-hydration theme handling remains in place; fonts and images work without JavaScript.

## Verification

Production build, lint, TypeScript, and static-export checks passed. The export verifier additionally checks every generated image file and confirms all original URLs remain in the HTML.

The before/after browser comparison passed at 320, 390, 600, 768, 860, 861, 960, 1024, and 1440px, with no geometry differences of one CSS pixel or more and no horizontal overflow. All 15 images selected local responsive sources on both tested pixel densities. No image requested the remote original alongside its selected local variant, the portrait downloaded once, and no runtime errors occurred.

Both light and dark themes passed the automated WCAG A/AA accessibility audit with zero violations. Follow-up browser checks passed for theme cycling and device preferences, the mobile menu, project highlighting, and JavaScript-disabled navigation and responsive images. A clean `npm ci` also passed and reported zero vulnerabilities.

Development hot reload is intentionally heavier than production. Preview the actual optimized site with `npm run build`, then serve `out/` with a static HTTP server. Nothing was pushed or deployed during optimization.
