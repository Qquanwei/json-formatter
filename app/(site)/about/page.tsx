import type { Metadata } from "next";
import Link from "next/link";
import { SITE_NAME } from "../../lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "JSONGuy is a modern online JSON formatter, validator, and repair tool that accepts JSON5, JavaScript objects, and Python dicts — entirely in your browser.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
        About {SITE_NAME}
      </h1>

      <p className="mt-6 leading-7 text-slate-700 dark:text-slate-300">
        {SITE_NAME} is a modern online JSON tool. It formats, validates, and
        repairs JSON — and, unlike most formatters, it accepts the JSON people
        actually write, not just strict JSON.
      </p>

      <h2 className="mt-10 text-xl font-semibold text-slate-900 dark:text-white">
        What it does
      </h2>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-700/60 dark:bg-slate-900">
          <h3 className="font-semibold text-slate-900 dark:text-white">
            Format &amp; beautify
          </h3>
          <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
            Pretty-print JSON with 2 or 4-space indent, GitHub-style syntax
            highlighting, and a collapsible tree view.
          </p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-700/60 dark:bg-slate-900">
          <h3 className="font-semibold text-slate-900 dark:text-white">
            Validate
          </h3>
          <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
            Catch syntax errors instantly, with the exact line and column of
            the problem.
          </p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-700/60 dark:bg-slate-900">
          <h3 className="font-semibold text-slate-900 dark:text-white">
            Repair
          </h3>
          <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
            Fix broken JSON — missing quotes, missing commas, and unclosed
            brackets — automatically.
          </p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-700/60 dark:bg-slate-900">
          <h3 className="font-semibold text-slate-900 dark:text-white">
            Accepts JS &amp; Python syntax
          </h3>
          <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
            Paste JSON5, JavaScript objects, or Python dicts — single quotes,
            unquoted keys, trailing commas, comments, None/True/False, tuples —
            and it normalizes everything into strict JSON.
          </p>
        </div>
      </div>

      <h2 className="mt-10 text-xl font-semibold text-slate-900 dark:text-white">
        Why it exists
      </h2>

      <p className="mt-4 leading-7 text-slate-700 dark:text-slate-300">
        Most JSON tools were built when JSON was a machine-to-machine format:
        strict, double-quoted, no comments. But most of the JSON people deal
        with today is hand-written or machine-generated and slightly wrong —
        Python dicts, JS object literals, LLM output with missing commas.{" "}
        {SITE_NAME} was built around that reality: it reads the JSON humans
        actually write, and writes the strict JSON every system expects.
      </p>

      <h2 className="mt-10 text-xl font-semibold text-slate-900 dark:text-white">
        Privacy
      </h2>

      <p className="mt-4 leading-7 text-slate-700 dark:text-slate-300">
        Formatting and validation run entirely in your browser — your JSON
        never leaves your device. The only time data is sent anywhere is when
        you explicitly use the share or publish features, which store it so the
        link can be served.
      </p>

      <h2 className="mt-10 text-xl font-semibold text-slate-900 dark:text-white">
        The tools
      </h2>

      <ul className="mt-4 space-y-2 leading-7 text-slate-700 dark:text-slate-300">
        <li>
          <Link
            href="/"
            className="font-medium text-indigo-600 hover:underline dark:text-indigo-400"
          >
            JSON Formatter
          </Link>{" "}
          — format, validate, and inspect JSON.
        </li>
        <li>
          <Link
            href="/json-repair"
            className="font-medium text-indigo-600 hover:underline dark:text-indigo-400"
          >
            JSON Repair
          </Link>{" "}
          — fix broken JSON.
        </li>
        <li>
          <Link
            href="/publish"
            className="font-medium text-indigo-600 hover:underline dark:text-indigo-400"
          >
            HTML Publisher
          </Link>{" "}
          — host static HTML pages.
        </li>
        <li>
          <span className="font-medium text-slate-900 dark:text-white">
            MCP server
          </span>{" "}
          — format and repair JSON from AI clients.
        </li>
      </ul>

      <p className="mt-10 text-sm text-slate-500 dark:text-slate-400">
        {SITE_NAME} is open source under the MIT license —{" "}
        <a
          href="https://github.com/Qquanwei/json-formatter"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-indigo-600 hover:underline dark:text-indigo-400"
        >
          view the repository
        </a>
        .
      </p>
    </div>
  );
}
