import Link from "next/link";

function Code({ children }: { children: string }) {
  return (
    <pre className="overflow-x-auto rounded-xl border border-slate-200 bg-slate-50 p-4 font-mono text-[13px] leading-6 text-slate-800 dark:border-slate-700/60 dark:bg-slate-800/50 dark:text-slate-200">
      {children}
    </pre>
  );
}

export default function Json5VsJson() {
  return (
    <article className="space-y-6 leading-7 text-slate-700 dark:text-slate-300">
      <p>
        JSON is everywhere, but it&apos;s annoyingly strict: every key must be
        double-quoted, strings can&apos;t use single quotes, and a trailing comma
        after the last item is a syntax error. JSON5 was created to fix exactly
        that. Here&apos;s what&apos;s different and why it matters when you&apos;re dealing
        with JSON written by humans.
      </p>

      <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
        What JSON5 changes
      </h2>

      <p>The same data, strict JSON on the left, JSON5 on the right:</p>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
            Strict JSON
          </div>
          <Code>{`{
  "name": "John",
  "skills": ["js", "react"]
}`}</Code>
        </div>
        <div>
          <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
            JSON5
          </div>
          <Code>{`{
  name: 'John', // comment
  skills: ['js', 'react',],
}`}</Code>
        </div>
      </div>

      <ul className="list-disc space-y-2 pl-5">
        <li>
          <strong className="text-slate-900 dark:text-white">
            Unquoted keys.
          </strong>{" "}
          <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm dark:bg-slate-800">
            name
          </code>{" "}
          instead of{" "}
          <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm dark:bg-slate-800">
            &quot;name&quot;
          </code>
          .
        </li>
        <li>
          <strong className="text-slate-900 dark:text-white">
            Single-quoted strings.
          </strong>{" "}
          <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm dark:bg-slate-800">
            &apos;John&apos;
          </code>{" "}
          works just like{" "}
          <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm dark:bg-slate-800">
            &quot;John&quot;
          </code>
          .
        </li>
        <li>
          <strong className="text-slate-900 dark:text-white">
            Comments.
          </strong>{" "}
          Line comments with{" "}
          <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm dark:bg-slate-800">
            {"//"}
          </code>{" "}
          and block comments with{" "}
          <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm dark:bg-slate-800">
            {"/* */"}
          </code>
          .
        </li>
        <li>
          <strong className="text-slate-900 dark:text-white">
            Trailing commas.
          </strong>{" "}
          A comma after the last item is allowed.
        </li>
        <li>
          <strong className="text-slate-900 dark:text-white">
            Extended numbers.
          </strong>{" "}
          Hex like{" "}
          <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm dark:bg-slate-800">
            0xFF
          </code>
          , plus{" "}
          <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm dark:bg-slate-800">
            Infinity
          </code>{" "}
          and{" "}
          <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm dark:bg-slate-800">
            NaN
          </code>
          .
        </li>
      </ul>

      <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
        Where JSON5 shows up
      </h2>

      <p>
        You&apos;ve almost certainly met it without knowing. Configuration files in
        modern JavaScript tooling are often JSON5 or something close to it, and
        a lot of &quot;JSON&quot; people paste into formatters is actually JSON5 they
        wrote by hand — single quotes, comments, forgotten double quotes. Strict
        tools just reject it.
      </p>

      <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
        Why the output still matters
      </h2>

      <p>
        JSON5 is great for humans, but the systems you send data to still expect
        strict JSON. That&apos;s the gap a good formatter fills: it reads JSON5 the
        way a person does, then writes clean, double-quoted, standards-compliant
        JSON that any parser accepts.
      </p>

      <p>
        JSONGuy does exactly that. Paste JSON5, JavaScript-style objects, or
        even a Python dict, and it normalizes everything into valid JSON with
        syntax highlighting and a collapsible tree view. Try it in the{" "}
        <Link
          href="/"
          className="font-medium text-indigo-600 hover:underline dark:text-indigo-400"
        >
          JSON5 formatter
        </Link>
        , or convert a{" "}
        <Link
          href="/python-dict-to-json"
          className="font-medium text-indigo-600 hover:underline dark:text-indigo-400"
        >
          Python dict to JSON
        </Link>
        .
      </p>
    </article>
  );
}
