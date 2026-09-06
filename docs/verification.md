# Migration verification

Verified on September 6, 2026. The application is in the original project folder; nothing was pushed or deployed.

This records the initial migration. The subsequent [performance optimization report](performance.md) describes the responsive image files, smaller font subsets, and server-rendered image component that now replace the initial `next/image` implementation. Original content, source fonts, and remote fallback URLs remain preserved.

The deployment check now runs independently of the ignored `grid-portfolio.html`.
Use `npm run verify:export` in CI and `npm run verify:migration` locally for the
additional original-source comparisons described below. This separation fixes
the GitHub Actions ENOENT failure when the legacy file is absent from checkout.

## Build and source integrity

| Check | Result |
| --- | --- |
| Clean dependency installation | `npm ci` passed; npm reported zero vulnerabilities |
| Production build | `npm run build` passed with Next.js 16.3.4 |
| Lint | `npm run lint` passed with zero errors and zero warnings |
| TypeScript | `npm run typecheck` passed |
| Export verification | `npm run verify:export` passed |
| Static output | `out/index.html`, `out/404.html`, fonts, scripts, CSS, `icon.svg`, `robots.txt`, and `sitemap.xml` generated |
| Deployment runtime | Tested using Python's static HTTP server; no Next.js/Node.js server required |
| Original HTML | Unmodified; SHA-256 `35e380e85ba699bdedd421d32b9465ed74e2887f8d6b047c9b7f1a0b4ad2e085` |
| Original fonts | Copies in `app/fonts/` are byte-identical to the source files |

The export verifier compares the complete main and footer text against the original, ignoring markup and whitespace formatting. It also checks every original body link and image URL, all anchor targets, duplicate IDs, the single h1, two font preloads, canonical metadata, Person JSON-LD, generated metadata files, and local asset existence. HTML/CSS/XML/text output contains no local-machine destinations or external Google Fonts URLs. Browser requests contained no Google Fonts requests or image-optimization endpoint calls.

Bundled framework JavaScript contains generic `localhost` URL-parsing logic and Turbopack's `file:///ROOT/` helper strings. These are upstream runtime internals, not portfolio links, asset locations, or network dependencies. The framework bundles were not modified to remove those inert literals.

The final build required permission to run subprocesses outside this workspace's restricted process sandbox. Next.js's TypeScript subprocess returned empty output inside that sandbox; the normal production build and standalone TypeScript check both passed. No workaround or disabled typechecking was added to the application.

## Content and layout

Transferred all three publications, four industry/teaching experience entries, four projects, two honors, one certification, two books, biography paragraphs, undergraduate research narrative, social links, and footer content. Section order is unchanged. The source calls the industry subsection “Experience”; that visible wording is retained.

Chromium comparisons between the original HTML and the export found no layout-measurement differences greater than one CSS pixel at widths **320, 390, 600, 768, 860, 861, 960, 1024, and 1440px**. Measurements covered the header, brand, hero, biography, all main sections, footer, publication images, project images, company logos, and books. No horizontal overflow was found. Book grids had six columns above 960px, four from 601–960px, and two at 600px and below. Screenshots were inspected for desktop, tablet, mobile, dark mode, and the full-screen menu.

For deterministic layout comparisons, the browser reused independently downloaded source images at their exact original request URLs. Separate live browser checks also loaded every original image without interception.

## Interaction and accessibility

Passed browser checks:

- Device → Light → Dark → Device, correct icons, accessible labels/tooltips, localStorage persistence, and reload behavior.
- Device-theme changes update the palette while device mode is active.
- Each saved theme and its icon display correctly before application JavaScript is allowed to hydrate.
- Theme controls still work when localStorage access throws a security error.
- No hydration warnings or uncaught client-side errors.
- Full-screen navigation at 960, 768, and 390px; correct expanded state and scroll lock.
- Initial menu focus, Tab/Shift+Tab focus containment, Escape closure, and focus return to the toggle.
- All six navigation links close the menu and land below the sticky header.
- Resizing above 960px restores desktop navigation, unlocks scrolling, and removes background inertness.
- All three notable-project links target their original IDs, update the hash, scroll to their cards, and highlight the border for approximately three seconds.
- Reduced-motion mode disables smooth scrolling and blinking while retaining a temporary static border highlight.
- JavaScript-disabled mobile visits retain the content and usable navigation links; inactive theme/menu buttons are hidden.

An axe-core audit using WCAG 2 A/AA and WCAG 2.1 AA checks reported **zero violations in light mode, dark mode, and the open mobile menu**. This automated audit supplements the manual keyboard and visual checks; it is not a claim of exhaustive accessibility certification.

## Assets and external destinations

All **15 remote images** returned HTTP 200, decoded successfully, and loaded in the live browser. All **five PDFs** returned HTTP 200 with a PDF content type and valid PDF signatures. Both local fonts load from the static export with preloads. Publication images retain their natural aspect ratios and white backgrounds; company logos remain 100×100; book covers preserve their proportions.

Across 37 unique external URLs, 28 returned HTTP 200. The following nine could not be fully verified from automated requests. Their original URLs are preserved exactly; none was replaced or removed.

| Destination | Observed response |
| --- | --- |
| [SKIMA DOI](https://doi.org/10.1109/SKIMA57145.2022.10029570) | HTTP 202 rather than a verifiable article response |
| [LLM Wikipedia article](https://en.wikipedia.org/wiki/Large_language_model) | HTTP 403 |
| [Scene graph Wikipedia article](https://en.wikipedia.org/wiki/Scene_graph) | HTTP 403 |
| [TENCON paper on IEEE Xplore](https://ieeexplore.ieee.org/document/9978090/) | HTTP 202 rather than a verifiable article response |
| [SKIMA proceedings](https://ieeexplore.ieee.org/xpl/conhome/10029388/proceeding) | HTTP 418 |
| [TENCON proceedings](https://ieeexplore.ieee.org/xpl/conhome/9977436/proceeding) | HTTP 418 |
| [Google Scholar search](https://scholar.google.com/scholar?q=%22Rezab+Ud+Dawla%22) | HTTP 429 |
| [Wool on Amazon](https://www.amazon.co.uk/Wool-Trilogy-Hugh-Howey/dp/0099580489) | HTTP 500 |
| [LinkedIn](https://www.linkedin.com/in/rezabuddawla) | HTTP 999 |

These responses can reflect access restrictions, challenges, rate limits, or remote server errors. They do not establish that a destination is permanently broken. The email link is preserved; sending an email was outside the verification scope.

## Deliberate differences and limitations

1. **Favicon:** `favicon.svg` was missing from the supplied folder. With explicit user authorization, the outlined R was regenerated directly from the supplied Brodia glyph in `app/icon.svg`. Its stroke follows the device theme. Exact comparison with the absent original favicon is impossible.
2. **Contrast:** the original light-mode muted color `#777` gave 4.29:1 contrast against `#fafafa`. It was changed to `#737373` for 4.54:1, satisfying the requested accessibility requirement. Other source colors are unchanged.
3. **Semantics and keyboard use:** heading levels and the broken industry heading reference were corrected without changing visible wording or geometry. Visible focus styling, menu focus containment, inert background content, and a no-JavaScript mobile navigation fallback were added.
4. **Image dimensions:** actual image dimensions were verified and reserved. In particular, the source's AI assistant image was declared 1672×941 but is actually 1672×892. Using its real dimensions prevents loading shifts while preserving its final natural appearance.
5. **Toolchain:** TypeScript 6 and ESLint 9 are pinned because the Next.js lint plugins do not yet support TypeScript 7 and ESLint 10. npm emits an upstream ESLint 9 deprecation notice during installation. Application build, lint, typechecking, and the clean install all pass.
6. **Deployment:** the workflow is prepared but was not run. The workspace did not expose a usable Git checkout, so the GitHub repository name, branch, and Pages settings could not be inspected. The target must be the root user-site repository `rezabtuhin.github.io`, using `main` and GitHub Actions for Pages.

## Created files

- `app/`: `layout.tsx`, `page.tsx`, `globals.css`, `icon.svg`, `robots.ts`, `sitemap.ts`, and the two copied fonts under `fonts/`.
- `components/`: `Header.tsx`, `MobileNavigation.tsx`, `ThemeToggle.tsx`, `Hero.tsx`, `SocialLinks.tsx`, `Publications.tsx`, `Experience.tsx`, `Projects.tsx`, `ProjectHighlight.tsx`, `Honors.tsx`, `Certifications.tsx`, `Others.tsx`, and `Footer.tsx`.
- `data/portfolio.ts` and `lib/theme.ts`.
- `package.json`, `package-lock.json`, `next.config.mjs`, `tsconfig.json`, `eslint.config.mjs`, `.nvmrc`, and `.gitignore`.
- `.github/workflows/deploy.yml` and `public/.nojekyll`.
- `scripts/verify-export.mjs`, `README.md`, and `docs/verification.md`.
- Generated and ignored build output: `out/`, `.next/`, `next-env.d.ts`, and TypeScript incremental build information.

The production artifact is **`/home/snacks/Documents/Codes/rezabtuhin.github.io/out/`**.
