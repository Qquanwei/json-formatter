import Link from "next/link";

function Code({ children }: { children: string }) {
  return (
    <pre className="overflow-x-auto rounded-xl border border-slate-200 bg-slate-50 p-4 font-mono text-[13px] leading-6 text-slate-800 dark:border-slate-700/60 dark:bg-slate-800/50 dark:text-slate-200">
      {children}
    </pre>
  );
}

export default function JsonRepair() {
  return (
    <article className="space-y-6 leading-7 text-slate-700 dark:text-slate-300">
      <p>
        Broken JSON is usually someone&apos;s hand-typed data: a missing quote, a
        forgotten comma, a bracket that never got closed. Most tools tell you
        it&apos;s invalid and stop there. A JSON repair tool actually fixes it. Here
        are the common cases and how JSONGuy handles them.
      </p>

      <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
        Missing quotes
      </h2>
      <p>Unquoted keys and string values are the most common mistake:</p>
      <Code>{`{
  name: John,
  city: New York
}`}</Code>
      <p>Becomes:</p>
      <Code>{`{
  "name": "John",
  "city": "New York"
}`}</Code>

      <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
        Missing commas
      </h2>
      <p>When you copy fields around, the commas often get lost:</p>
      <Code>{`{
  "name": "John"
  "age": 30
}`}</Code>
      <p>Repaired:</p>
      <Code>{`{
  "name": "John",
  "age": 30
}`}</Code>

      <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
        Unclosed brackets
      </h2>
      <p>Truncated output is a classic — the log got cut off mid-array:</p>
      <Code>{`{
  "tags": ["dev", "ops"
}`}</Code>
      <p>The missing brackets are added to close the structure:</p>
      <Code>{`{
  "tags": ["dev", "ops"]
}`}</Code>

      <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
        Single quotes, trailing commas, comments
      </h2>
      <p>
        JSON only allows double quotes and no trailing commas, but plenty of
        real input uses single quotes, leaves a trailing comma, or carries a
        comment:
      </p>
      <Code>{`{
  'name': 'John', // hand-written
  'active': true,
}`}</Code>
      <p>All of it is normalized into strict JSON automatically.</p>

      <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
        Python syntax
      </h2>
      <p>
        Paste a Python dict with{" "}
        <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm dark:bg-slate-800">
          None
        </code>
        ,{" "}
        <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm dark:bg-slate-800">
          True
        </code>
        , and tuples, and they&apos;re converted too:
      </p>
      <Code>{`{
  'active': True,
  'nickname': None,
  'tags': ('a', 'b'),
}`}</Code>

      <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
        Try it
      </h2>
      <p>
        Paste anything broken into the{" "}
        <Link
          href="/json-repair"
          className="font-medium text-indigo-600 hover:underline dark:text-indigo-400"
        >
          JSON repair tool
        </Link>{" "}
        and it comes back as valid JSON — in your browser, nothing uploaded.
        If the input is already fine, it just formats it and tells you.
      </p>
    </article>
  );
}
