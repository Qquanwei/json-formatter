import JsonFormatter from "./components/JsonFormatter";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col bg-white dark:bg-black">
      <header className="border-b border-zinc-200 dark:border-zinc-800">
        <div className="mx-auto w-full max-w-6xl px-4 py-6 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            JSON Formatter
          </h1>
          <p className="mx-auto mt-2 max-w-2xl text-zinc-600 dark:text-zinc-400">
            Free online JSON formatter, validator, and beautifier. Supports
            JavaScript-style JSON — unquoted keys, single quotes, trailing
            commas, and comments.
          </p>
        </div>
      </header>

      <JsonFormatter />

      <section className="mx-auto w-full max-w-6xl px-4 pb-16">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-zinc-200 p-5 dark:border-zinc-800">
            <h2 className="font-semibold text-zinc-900 dark:text-zinc-50">Beautify</h2>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
              Indent and colorize your JSON for readability with syntax
              highlighting and a collapsible tree view.
            </p>
          </div>
          <div className="rounded-xl border border-zinc-200 p-5 dark:border-zinc-800">
            <h2 className="font-semibold text-zinc-900 dark:text-zinc-50">Minify</h2>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
              Compress JSON to a single line by stripping whitespace and line
              breaks.
            </p>
          </div>
          <div className="rounded-xl border border-zinc-200 p-5 dark:border-zinc-800">
            <h2 className="font-semibold text-zinc-900 dark:text-zinc-50">Validate</h2>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
              Catch syntax errors instantly, including relaxed JS-style objects
              with comments and trailing commas.
            </p>
          </div>
        </div>

        <h2 className="mt-12 text-xl font-bold text-zinc-900 dark:text-zinc-50">
          Frequently Asked Questions
        </h2>
        <div className="mt-4 space-y-4 text-sm text-zinc-600 dark:text-zinc-400">
          <div>
            <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">
              What is a JSON formatter?
            </h3>
            <p>
              A JSON formatter takes raw or minified JSON and reformats it with
              indentation and line breaks so it is easy to read. This tool also
              validates the structure and highlights syntax errors.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">
              Can I format JavaScript-style JSON?
            </h3>
            <p>
              Yes. This formatter accepts relaxed JavaScript object syntax,
              including unquoted keys, single-quoted strings, trailing commas,
              and line/block comments.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">
              Is my data sent to a server?
            </h3>
            <p>
              No. All formatting happens locally in your browser. Your JSON is
              never uploaded or stored.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
