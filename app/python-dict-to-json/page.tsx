import type { Metadata } from "next";
import Link from "next/link";
import JsonFormatter from "../components/JsonFormatter";
import { SITE_NAME } from "../lib/site";

export const metadata: Metadata = {
  title: "Python Dict to JSON Converter",
  description:
    "Convert Python dicts and JavaScript objects to JSON online. Supports single quotes, None/True/False, tuples, and trailing commas — paste and get valid JSON instantly, 100% in your browser.",
  alternates: { canonical: "/python-dict-to-json" },
};

const PYTHON_SAMPLE = `{
  'name': 'John Doe',
  'age': 30,
  'is_active': True,
  'nickname': None,
  'skills': ('python', 'json', 'convert'),
  'address': {
    'city': 'New York',
    'zip': '10001',
  },
  'meta': {
    'version': (3, 11),
    'debug': False,
  },
}`;

const features = [
  {
    title: "Single quotes",
    body: "Python dicts often use 'single quotes' for keys and strings. We handle them directly — no find-and-replace needed.",
  },
  {
    title: "None, True, False",
    body: "Python's None, True, and False are converted to null, true, and false, including nested values.",
  },
  {
    title: "Tuples",
    body: "Python tuples (1, 2, 3) are normalized into JSON arrays [1, 2, 3], including nested tuples.",
  },
  {
    title: "Trailing commas",
    body: "Trailing commas after the last item are legal in Python and fine here too.",
  },
];

export default function PythonDictToJsonPage() {
  return (
    <div className="flex flex-1 flex-col">
      <section className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
        <h1 className="text-center text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
          Python Dict to JSON Converter
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-center text-base text-slate-600 dark:text-slate-400">
          Paste a Python dictionary or JavaScript-style object and get clean,
          standards-compliant JSON. Everything runs locally in your browser —
          nothing is uploaded.
        </p>
      </section>

      <section className="pb-8">
        <JsonFormatter
          initialInput={PYTHON_SAMPLE}
          storageKey="jsonguy:python-input"
          placeholder="Paste a Python dict here…"
        />
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 pb-16 sm:px-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          What it handles
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400">
          Most JSON tools only accept strict JSON. Paste anything with single
          quotes,{" "}
          <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm dark:bg-slate-800">
            None
          </code>
          , or a tuple and they throw an error. {SITE_NAME} normalizes the real
          syntax people actually use.
        </p>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {features.map((f) => (
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
          Need the full formatter with a tree view and syntax highlighting?{" "}
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
