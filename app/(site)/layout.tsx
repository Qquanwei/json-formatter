import Link from "next/link";
import { SITE_NAME } from "../lib/site";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-slate-950/80">
        <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold text-slate-900 dark:text-white">
            <span className="text-lg tracking-tight">{SITE_NAME}</span>
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
    </>
  );
}
