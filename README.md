# Rezab Ud Dawla — scientific portfolio

A static Next.js App Router migration of `grid-portfolio.html`, built directly in this repository. The original HTML and source fonts are preserved. All biography text, citations, dates, descriptions, image URLs, PDF URLs, and external destinations come from that file.

## Local development

Use Node.js 24 (`.nvmrc`) and npm:

```sh
npm ci
npm run dev
```

## Production verification

```sh
npm run lint
npm run build
npm run typecheck
npm run verify:export
```

`verify:export` validates the deployable site and does not require the ignored
`grid-portfolio.html`. When that original file is available locally, run
`npm run verify:migration` for the additional strict content, URL, and source-hash
comparison. The GitHub Pages workflow only needs `verify:export`.

`npm run build` generates `out/`. Serve that directory with any static HTTP server, for example:

```sh
python -m http.server 8080 --directory out
```

No Node.js server, database, API route, image optimization service, or environment variable is needed to serve the export. Remote images and PDFs retain their original Supabase URLs.

The dependency lockfile makes `npm ci` reproducible. Next.js is pinned to 16.3.4 and React to 19.2.8. TypeScript 6.0.3 and ESLint 9.39.5 are pinned for compatibility with the TypeScript and React plugins bundled by `eslint-config-next`; those plugins do not yet support TypeScript 7 and ESLint 10, respectively. npm currently emits an upstream deprecation notice for ESLint 9. The application lint command runs with zero tolerated warnings.

## Source structure

```text
app/
  fonts/Brodia-Slant.woff2
  fonts/PlayfairDisplay-wght.woff2
  fonts/subsets/Brodia-Slant.woff2
  fonts/subsets/PlayfairDisplay-wght.woff2
  globals.css
  icon.svg
  layout.tsx
  page.tsx
  robots.ts
  sitemap.ts
components/
  Header.tsx
  MobileNavigation.tsx
  ThemeToggle.tsx
  Hero.tsx
  SocialLinks.tsx
  Publications.tsx
  Experience.tsx
  Projects.tsx
  ProjectHighlight.tsx
  Honors.tsx
  Certifications.tsx
  Others.tsx
  Footer.tsx
  PortfolioImage.tsx
data/portfolio.ts
data/image-variants.json
lib/theme.ts
lib/images.ts
scripts/verify-export.mjs
scripts/optimize-images.mjs
scripts/subset-fonts.py
public/.nojekyll
public/images/optimized/
.github/workflows/deploy.yml
```

Sections and navigation content are Server Components. Only the theme control, mobile-navigation interaction, and delegated project-highlighting listener are Client Components. Repeatable content has explicit TypeScript interfaces in `data/portfolio.ts`; the biography and research narrative remain readable JSX.

`app/globals.css` preserves the original grid, dimensions, typography, masonry columns, and breakpoints. The sole palette correction is light-mode muted text: `#777` becomes `#737373`, increasing contrast on `#fafafa` from 4.29:1 to 4.54:1 to meet the requested accessibility requirement. All other source colors are retained. `next/font/local` preloads smaller subsets of the supplied Playfair Display variable font (400–900) and Brodia Slant (400), with block font display to avoid a fallback-font swap. The complete original fonts remain intact in `app/fonts/`. There are no Google Fonts requests.

The early theme script uses `grid-portfolio-theme` and only writes the root theme attribute. CSS handles device preferences, including before hydration. `suppressHydrationWarning` is limited to the root element because that attribute is intentionally set before React runs. The theme button subscribes to the live theme attribute and device preference changes.

The mobile navigation activates at 960px and below, locks scrolling, keeps keyboard focus within the menu, makes background content inert, closes on selection or Escape, and resets above the breakpoint. Without JavaScript, its links are displayed inline and inactive controls are hidden. Notable-project links remain native anchors without JavaScript; with JavaScript they reproduce the original centered scroll and three-second border animation.

`PortfolioImage` renders ordinary server-side image markup with responsive WebP `srcset` candidates. Every exact original Supabase URL remains in `src` as the fallback. The browser downloads a suitably sized local image from the static export without an image server or image-component hydration. The hero's responsive preload uses the same `srcset` and `sizes` as the image to avoid duplicate downloads; other images remain lazy loaded. CSS preserves the original portrait crop, square 100×100 logo presentation, methodology-image proportions and white backgrounds, and book-cover proportions. Explicit aspect ratios prevent pixel rounding in resized files from shifting the layout.

## Image and font optimization

Optimized assets are checked in, so `npm ci` and `npm run build` need no image downloads or Python tooling. The deployment workflow needs no changes. See [performance measurements](docs/performance.md) for the measured reductions and test conditions.

After changing an image in `data/portfolio.ts`, regenerate its responsive files with:

```sh
npm run optimize:images
```

This explicit authoring command requires network access to the source image URLs. It uses Sharp as a development dependency, writes content-hashed files under `public/images/optimized/`, updates `data/image-variants.json`, and records byte sizes in `docs/image-sizes.json`. Commit the generated files and manifest together. The command checks source dimensions and fails if they no longer match the portfolio data.

Font subsets retain Playfair's Latin characters, punctuation, OpenType features, and variable weights; Brodia contains the R used by the brand. If adding other writing systems or changing the brand text, update `scripts/subset-fonts.py` and regenerate the subsets. That optional command requires Python with `fonttools` and `brotli`; those tools are not application dependencies.

Assess loading performance with a production build served from `out/`. The development server intentionally includes debugging and hot-reload work and is not representative of production speed.

`app/layout.tsx` contains metadata and verified Person JSON-LD. Both the Google Scholar social link and Person `sameAs` metadata use the profile supplied by the site owner: `https://scholar.google.com/citations?user=8CsMgtMAAAAJ&hl=en&oi=ao`. Robots and sitemap metadata routes are forced static.

The original referenced `favicon.svg` was absent. With the user's authorization, `app/icon.svg` was generated from the actual Brodia R glyph as an outlined vector path. It changes stroke color with the device theme and requires no font download.

## GitHub Pages

The repository must be named **rezabtuhin.github.io**, with the default deployment branch **main**. In repository **Settings → Pages**, select **GitHub Actions** as the build source.

The prepared workflow runs on pushes to `main` and manual dispatch. It installs using `npm ci`, lints, builds, verifies `out/`, uploads the Pages artifact, and deploys using the official Pages action. Only the deployment job receives `pages: write` and `id-token: write`, and it uses the `github-pages` environment.

The configuration uses `output: "export"`, `trailingSlash: true`, and `images.unoptimized: true`. No `basePath` or `assetPrefix` is used because the production URL is `https://rezabtuhin.github.io`.

Creating this workflow does not publish the site. No push or deployment was performed during migration. The provided workspace did not expose a usable Git checkout, so its remote repository name and Pages settings could not be inspected.

See [the verification report](docs/verification.md) for test coverage and external-link limitations. Framework and deployment references: [Next.js static exports](https://nextjs.org/docs/app/guides/static-exports), [upload Pages artifact](https://github.com/actions/upload-pages-artifact), and [deploy Pages](https://github.com/actions/deploy-pages).
