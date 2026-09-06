import type { Metadata } from "next";
import localFont from "next/font/local";
import { portrait, socialLinks } from "@/data/portfolio";
import { themeInitializationScript } from "@/lib/theme";
import { getImageVariants, imageSizes } from "@/lib/images";
import "./globals.css";

const playfair = localFont({
  src: "./fonts/subsets/PlayfairDisplay-wght.woff2",
  variable: "--font-playfair",
  weight: "400 900",
  style: "normal",
  display: "block",
  preload: true,
});
const brodia = localFont({
  src: "./fonts/subsets/Brodia-Slant.woff2",
  variable: "--font-brodia",
  weight: "400",
  style: "normal",
  display: "block",
  preload: true,
});
const title = "Rezab Ud Dawla — Software Engineer & Researcher";
const description =
  "Portfolio of Rezab Ud Dawla, a software engineer and researcher working on reliable LLM applications, AI-enabled systems, and data-intensive software.";
const url = "https://rezabtuhin.github.io";
const heroVariants = getImageVariants(portrait.src);

export const metadata: Metadata = {
  metadataBase: new URL(url),
  title,
  description,
  authors: [{ name: "Rezab Ud Dawla", url }],
  creator: "Rezab Ud Dawla",
  alternates: { canonical: url },
  openGraph: {
    title,
    description,
    type: "website",
    url,
    siteName: "Rezab Ud Dawla",
    locale: "en_US",
    images: [
      {
        url: portrait.src,
        width: portrait.width,
        height: portrait.height,
        alt: portrait.alt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [{ url: portrait.src, alt: portrait.alt }],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  icons: { icon: [{ url: "/icon.svg", type: "image/svg+xml" }] },
};

const person = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Rezab Ud Dawla",
  url,
  image: portrait.src,
  jobTitle: "Software Engineer",
  email: "mailto:rezabuddawlatuhin@gmail.com",
  sameAs: socialLinks
    .filter((link) =>
      ["GitHub", "LinkedIn", "Google Scholar"].includes(link.title),
    )
    .map((link) => link.href),
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "United International University",
    url: "https://www.uiu.ac.bd/",
  },
  knowsAbout: [
    "Reliable and maintainable LLM applications",
    "Software engineering for AI-enabled systems",
    "Data management",
    "Data quality",
    "Privacy",
    "Text mining",
    "Attention-based scene graph generation",
    "Imbalanced-data classification",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${brodia.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link
          rel="preload"
          as="image"
          href={heroVariants.preloadSrc}
          imageSrcSet={heroVariants.srcSet}
          imageSizes={imageSizes.portrait}
          fetchPriority="high"
        />
        <script
          dangerouslySetInnerHTML={{ __html: themeInitializationScript }}
        />
        <noscript>
          <style>{`
          .theme-toggle, .menu-toggle { display: none !important; }
          @media (max-width: 960px) {
            .site-header { height: auto; position: relative; }
            .header-inner { flex-wrap: wrap; gap: 12px; padding-block: 14px; }
            .site-nav { position: static; width: 100%; padding: 0; opacity: 1; visibility: visible; transform: none; }
            .site-nav ul { flex-direction: row; flex-wrap: wrap; justify-content: center; gap: 8px 14px; }
            .site-nav a { padding: 0; font-family: inherit; font-size: 13px; font-weight: 600; line-height: 1.65; }
          }
        `}</style>
        </noscript>
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(person).replace(/</g, "\\u003c"),
          }}
        />
        {children}
      </body>
    </html>
  );
}
