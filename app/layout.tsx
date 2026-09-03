import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import Script from "next/script";
import "./globals.css";
import { SITE_DESCRIPTION, SITE_KEYWORDS, SITE_NAME, SITE_TITLE, SITE_URL } from "./lib/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: `%s — ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: SITE_KEYWORDS,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    locale: "en_US",
    images: [
      {
        url: `${SITE_URL}/og-image.jpeg`,
        width: 1280,
        height: 698,
        alt: SITE_TITLE,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [`${SITE_URL}/og-image.jpeg`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: SITE_NAME,
  alternateName: "JSONGuy JSON Formatter",
  url: SITE_URL,
  description: SITE_DESCRIPTION,
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Any",
  browserRequirements: "Requires JavaScript",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  featureList: [
    "JSON formatter and beautifier",
    "JSON validator with error location",
    "Collapsible tree view",
    "JavaScript-style JSON and Python object support",
    "Syntax highlighting",
    "Runs locally in the browser",
  ],
};

const entityJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      name: SITE_NAME,
      url: SITE_URL,
      description: SITE_DESCRIPTION,
    },
    {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
      logo: `${SITE_URL}/favicon-96x96.png`,
    },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
      </head>
      <body className="flex min-h-full flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(entityJsonLd) }}
        />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-HRBK4KKJ1S"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-HRBK4KKJ1S');
          `}
        </Script>
        <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-slate-950/80">
          <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
            <Link href="/" className="flex items-center gap-2 font-semibold text-slate-900 dark:text-white">
              <span className="text-lg tracking-tight">
                {SITE_NAME}
              </span>
            </Link>
            <nav className="flex items-center gap-1 text-sm">
              <Link
                href="/python-dict-to-json"
                className="rounded-md px-3 py-1.5 text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
              >
                Python → JSON
              </Link>
              <Link
                href="/json-repair"
                className="rounded-md px-3 py-1.5 text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
              >
                JSON Repair
              </Link>
              <Link
                href="/"
                className="rounded-md px-3 py-1.5 text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
              >
                Formatter
              </Link>
              <Link
                href="/blog"
                className="rounded-md px-3 py-1.5 text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
              >
                Blog
              </Link>
              <a
                href="https://github.com/Qquanwei/json-formatter"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md px-3 py-1.5 text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
              >
                GitHub
              </a>
            </nav>
          </div>
        </header>
        {children}
        <footer className="mt-auto border-t border-slate-200 dark:border-slate-800">
          <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-6 px-4 py-8 text-sm text-slate-500 dark:text-slate-400 sm:px-6 lg:flex-row lg:items-center">
            <div className="flex flex-col items-center gap-3 text-center lg:items-start lg:text-left">
              <p>
                © {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
              </p>
              <p className="text-xs">
                Free online JSON formatter, validator, and beautifier — no
                sign-up, 100% client-side.
              </p>
              <nav className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs lg:justify-start">
                <Link
                  href="/python-dict-to-json"
                  className="hover:text-slate-700 dark:hover:text-slate-200"
                >
                  Python Dict to JSON
                </Link>
                <Link
                  href="/blog"
                  className="hover:text-slate-700 dark:hover:text-slate-200"
                >
                  Blog
                </Link>
              </nav>
            </div>
            <a
              href="https://www.tinyshelf.co/?ref=jsonguy.airankone.com"
              title="Featured on tinyshelf"
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://www.tinyshelf.co/badge/tinyshelf-badge-dark-f4d1216a.svg"
                alt="Featured on tinyshelf"
                width={216}
                height={64}
                loading="lazy"
              />
            </a>
          </div>
        </footer>
        <Analytics />
      </body>
    </html>
  );
}
