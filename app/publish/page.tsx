import type { Metadata } from "next";
import HtmlPublisher from "../components/HtmlPublisher";

export const metadata: Metadata = {
  title: "HTML Publisher — Host Static HTML",
  description:
    "Publish a static HTML page and get a shareable URL. Paste HTML, preview it live, and publish it to a link in seconds.",
  alternates: { canonical: "/publish" },
};

export default function PublishPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
      <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
        HTML Publisher
      </h1>
      <p className="mt-2 max-w-2xl text-sm text-slate-600 dark:text-slate-400">
        Paste HTML, preview it live, and publish it to a shareable link —
        static HTML hosting with no account and no build step.
      </p>
      <div className="mt-6 overflow-hidden rounded-xl border border-slate-200 bg-white dark:border-slate-700/60 dark:bg-slate-900">
        <HtmlPublisher />
      </div>
    </div>
  );
}
