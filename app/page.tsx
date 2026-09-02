import Image from "next/image";
import Link from "next/link";
import JsonFormatter from "./components/JsonFormatter";
import { SITE_NAME } from "./lib/site";
import heroImg from "../hero.jpeg";

const faqs = [
  {
    q: "What is a JSON formatter?",
    a: "A JSON formatter takes raw or compact JSON and reformats it with indentation and line breaks so it is easy to read. JSONGuy also validates the structure and highlights syntax errors with their exact line and column.",
  },
  {
    q: "How do I format JSON online?",
    a: "Paste your JSON into the input box and click the Beautify button between the two panes. JSONGuy pretty-prints the JSON in the output pane, and you can use the tree view to navigate nested objects and arrays.",
  },
  {
    q: "Can I format JSON5, JavaScript-style JSON, or Python objects?",
    a: "Yes. JSONGuy supports JSON5 and relaxed JavaScript object syntax — unquoted keys, single-quoted strings, trailing commas, and line or block comments — plus Python dicts with None, True, and False. It normalizes all of them into standard JSON.",
  },
  {
    q: "How do I validate JSON?",
    a: "Click Validate, or rely on the live status bar at the bottom of the tool. Invalid input is reported immediately with the error message and the offending line and column.",
  },
  {
    q: "Is my JSON data sent to a server?",
    a: "No. All formatting and validation runs locally in your browser. Your JSON is never uploaded or stored on a server.",
  },
  {
    q: "What makes JSONGuy a modern JSON formatter?",
    a: "Unlike legacy formatters, JSONGuy is built for modern development. It understands JSON5, JavaScript-style JSON, and Python objects (unquoted keys, single quotes, trailing commas, comments, None/True/False), offers GitHub-style syntax highlighting, a collapsible tree view, live validation, and runs entirely in your browser with no server round-trips.",
  },
  {
    q: "Does JSONGuy have an MCP server?",
    a: "Yes. Connect JSONGuy's formatter, validator, and repair tools to Claude, Cursor, or any MCP client. It accepts the same inputs as the web tool — JSON, JSON5, JavaScript objects, and Python dicts — and can repair broken JSON.",
    linkHref: "/blog/json-formatter-mcp",
    linkText: "Read the MCP guide",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <Image
          src={heroImg}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-slate-950/55" />
        <div className="relative mx-auto w-full max-w-6xl px-4 py-24 text-center sm:px-6 sm:py-32">
          <h1 className="mx-auto max-w-3xl text-3xl font-bold tracking-tight text-white drop-shadow-lg sm:text-4xl md:text-5xl">
            Modern Online JSON Formatter, Validator &amp; Beautifier
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base text-slate-100 drop-shadow sm:text-lg">
            {SITE_NAME} is a modern JSON formatter that pretty-prints and
            validates JSON in your browser — with syntax highlighting and a
            collapsible tree view. Supports JSON5, JavaScript-style JSON, and
            Python objects (comments, single quotes, unquoted keys, trailing
            commas, None/True/False). 100% client-side, no sign-up required.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-xs font-medium text-white">
            {["Modern JSON Formatter", "JSON Validator", "JSON Beautifier", "JSON5 & Python JSON", "JSON Tree View"].map(
              (t) => (
                <span
                  key={t}
                  className="rounded-full border border-white/25 bg-white/10 px-3 py-1 backdrop-blur-sm"
                >
                  {t}
                </span>
              ),
            )}
          </div>
        </div>
      </section>

      {/* Tool */}
      <section id="formatter" className="scroll-mt-16">
        <JsonFormatter />
      </section>

      {/* More tools */}
      <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          More JSON tools
        </h2>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          <Link
            href="/python-dict-to-json"
            className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-indigo-300 dark:border-slate-700/60 dark:bg-slate-900 dark:hover:border-indigo-700"
          >
            <h3 className="font-semibold text-slate-900 dark:text-white">
              Python Dict → JSON
            </h3>
            <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
              Convert Python dicts with single quotes, None/True/False, and
              tuples into clean JSON.
            </p>
            <span className="mt-4 inline-block text-sm font-medium text-indigo-600 group-hover:underline dark:text-indigo-400">
              Convert →
            </span>
          </Link>
          <Link
            href="/json-repair"
            className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-indigo-300 dark:border-slate-700/60 dark:bg-slate-900 dark:hover:border-indigo-700"
          >
            <h3 className="font-semibold text-slate-900 dark:text-white">
              JSON Repair
            </h3>
            <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
              Fix broken JSON — missing quotes, missing commas, and unclosed
              brackets.
            </p>
            <span className="mt-4 inline-block text-sm font-medium text-indigo-600 group-hover:underline dark:text-indigo-400">
              Repair →
            </span>
          </Link>
          <Link
            href="/blog/json-formatter-mcp"
            className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-indigo-300 dark:border-slate-700/60 dark:bg-slate-900 dark:hover:border-indigo-700"
          >
            <h3 className="font-semibold text-slate-900 dark:text-white">
              MCP Server
            </h3>
            <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
              Format and repair JSON from Claude, Cursor, or any MCP-capable
              client.
            </p>
            <span className="mt-4 inline-block text-sm font-medium text-indigo-600 group-hover:underline dark:text-indigo-400">
              Learn more →
            </span>
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto w-full max-w-6xl px-4 pb-16 sm:px-6">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700/60 dark:bg-slate-900">
            <h2 className="font-semibold text-slate-900 dark:text-white">
              JSON Beautifier
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
              Pretty-print raw or compact JSON with 2 or 4 space indentation,
              GitHub-style syntax highlighting, and a collapsible tree view for
              easy navigation.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700/60 dark:bg-slate-900">
            <h2 className="font-semibold text-slate-900 dark:text-white">
              JSON Validator
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
              Live validation catches syntax errors instantly and reports the exact
              line and column, so you can fix broken JSON in seconds.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700/60 dark:bg-slate-900">
            <h2 className="font-semibold text-slate-900 dark:text-white">
              JSON5 &amp; Python Object Syntax
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
              Paste JSON5, modern JavaScript-style JSON, or a Python dict —
              unquoted keys, single quotes, trailing commas, comments, and
              None/True/False — and normalize it into strict,
              standards-compliant JSON.
            </p>
          </div>
        </div>

        {/* Accepts */}
        <h2 className="mt-14 text-2xl font-bold text-slate-900 dark:text-white">
          Accepts more than JSON
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400">
          Most tools only take strict JSON. JSONGuy handles the syntax people
          actually write — and normalizes it all into clean, standards-compliant
          JSON.
        </p>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700/60 dark:bg-slate-900">
            <h3 className="font-semibold text-slate-900 dark:text-white">
              JSON5 &amp; JS objects
            </h3>
            <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-50 p-3 font-mono text-xs leading-6 text-slate-700 dark:bg-slate-800/50 dark:text-slate-300">{`{
  name: 'John', // comment
  skills: ['js', 'react',],
}`}</pre>
            <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">
              Unquoted keys, single quotes, comments, and trailing commas.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700/60 dark:bg-slate-900">
            <h3 className="font-semibold text-slate-900 dark:text-white">
              Python dicts
            </h3>
            <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-50 p-3 font-mono text-xs leading-6 text-slate-700 dark:bg-slate-800/50 dark:text-slate-300">{`{
  'active': True,
  'nickname': None,
  'tags': ('a', 'b'),
}`}</pre>
            <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">
              None/True/False and tuples are converted to JSON equivalents.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700/60 dark:bg-slate-900">
            <h3 className="font-semibold text-slate-900 dark:text-white">
              Broken JSON
            </h3>
            <pre className="mt-3 overflow-x-auto rounded-lg bg-slate-50 p-3 font-mono text-xs leading-6 text-slate-700 dark:bg-slate-800/50 dark:text-slate-300">{`{
  name: John,
  city: New York
}`}</pre>
            <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">
              Missing quotes and commas get repaired automatically.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700/60 dark:bg-slate-900">
            <h3 className="font-semibold text-slate-900 dark:text-white">
              From any AI client
            </h3>
            <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
              Connect the MCP server and let your agent format, validate, or
              repair JSON without leaving the conversation.
            </p>
            <Link
              href="/blog/json-formatter-mcp"
              className="mt-4 inline-block text-sm font-medium text-indigo-600 hover:underline dark:text-indigo-400"
            >
              Read the MCP guide →
            </Link>
          </div>
        </div>

        {/* FAQ */}
        <h2
          id="faq"
          className="mt-14 scroll-mt-16 text-2xl font-bold text-slate-900 dark:text-white"
        >
          Frequently Asked Questions
        </h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {faqs.map((f) => (
            <div
              key={f.q}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700/60 dark:bg-slate-900"
            >
              <h3 className="font-semibold text-slate-900 dark:text-white">{f.q}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                {f.a}
                {"linkHref" in f && f.linkHref && (
                  <>
                    {" "}
                    <Link
                      href={f.linkHref}
                      className="font-medium text-indigo-600 hover:underline dark:text-indigo-400"
                    >
                      {f.linkText}
                    </Link>
                    .
                  </>
                )}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
