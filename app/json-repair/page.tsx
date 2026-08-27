import type { Metadata } from "next";
import Link from "next/link";
import JsonFormatter from "../components/JsonFormatter";
import { SITE_NAME } from "../lib/site";

export const metadata: Metadata = {
  title: "JSON Repair — Fix Broken JSON Online",
  description:
    "Repair broken JSON online. Fix missing quotes, missing commas, unclosed brackets, single quotes, and Python syntax — get valid JSON instantly, 100% in your browser.",
  alternates: { canonical: "/json-repair" },
};

const REPAIR_SAMPLE = `{
  name: 'John Doe',
  age: 30,
  city: New York
  tags: ('dev', 'ops',],
  active: True,
  note: 'missing quotes and commas here'
}`;

const fixes = [
  {
    title: "Missing quotes",
    body: "Unquoted keys and string values are quoted automatically.",
  },
  {
    title: "Missing commas",
    body: "Commas between array items and object fields are inserted where needed.",
  },
  {
    title: "Unclosed brackets",
    body: "Missing closing brackets and braces are added to balance the structure.",
  },
  {
    title: "Trailing & single quotes",
    body: "Trailing commas are removed and single quotes are normalized to double quotes.",
  },
  {
    title: "Python syntax",
    body: "None/True/False and tuples are converted to their JSON equivalents.",
  },
  {
    title: "Comments",
    body: "Line and block comments are stripped before parsing.",
  },
];

export default function JsonRepairPage() {
  return (
    <div className="flex flex-1 flex-col">
      <section className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
        <h1 className="text-center text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
          JSON Repair
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-center text-base text-slate-600 dark:text-slate-400">
          Paste broken JSON and get valid JSON back. Fixes the common mistakes
          automatically — entirely in your browser, nothing uploaded.
        </p>
      </section>

      <section className="pb-8">
        <JsonFormatter
          repair
          initialInput={REPAIR_SAMPLE}
          storageKey="jsonguy:repair-input"
          placeholder="Paste broken JSON here…"
        />
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 pb-16 sm:px-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          What it fixes
        </h2>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {fixes.map((f) => (
            <div
              key={f.title}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700/60 dark:bg-slate-900"
            >
              <h3 className="font-semibold text-slate-900 dark:text-white">
                {f.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                {f.body}
              </p>
            </div>
          ))}
        </div>

        <p className="mt-10 text-sm text-slate-500 dark:text-slate-400">
          Need the full formatter or a tree view?{" "}
          <Link
            href="/"
            className="font-medium text-indigo-600 hover:underline dark:text-indigo-400"
          >
            Open the {SITE_NAME} formatter
          </Link>
          .
        </p>
      </section>
    </div>
  );
}
