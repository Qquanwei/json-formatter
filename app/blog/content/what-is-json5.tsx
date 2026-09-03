import Link from "next/link";

function Code({ children }: { children: string }) {
  return (
    <pre className="overflow-x-auto rounded-xl border border-slate-200 bg-slate-50 p-4 font-mono text-[13px] leading-6 text-slate-800 dark:border-slate-700/60 dark:bg-slate-800/50 dark:text-slate-200">
      {children}
    </pre>
  );
}

export default function Json5() {
  return (
    <article className="space-y-6 leading-7 text-slate-700 dark:text-slate-300">
      <p>
        JSON is everywhere, but it&apos;s a pain to write by hand. Every key needs
        double quotes, comments aren&apos;t allowed, and one trailing comma breaks
        everything. JSON5 was created to fix that — it&apos;s JSON, but written for
        humans first. This is the story of why it exists, what it changes, and
        where it&apos;s actually supported today.
      </p>

      <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
        The problem: JSON was built for machines
      </h2>

      <p>
        JSON (JavaScript Object Notation) was designed in the early 2000s as a
        lightweight <em>data interchange</em> format — a way for programs to
        send data to each other. The priorities were minimal, unambiguous, and
        easy to parse. Human comfort was not on the list.
      </p>

      <p>That design choice made sense for the original use case. But then
        something changed: JSON stopped being just a wire format and became a{" "}
        <em className="not-italic">configuration</em> format. People started
        writing package manifests, build configs, and settings files in JSON —
        files that humans read, edit, and review by hand every day.</p>

      <p>And that&apos;s where JSON&apos;s strictness turns from a feature into a bug:</p>

      <ul className="list-disc space-y-2 pl-5">
        <li>You can&apos;t leave a comment explaining <em>why</em> a value is what it is.</li>
        <li>You can&apos;t have a trailing comma, so reordering lines breaks the file.</li>
        <li>Every key must be double-quoted, adding noise to every line.</li>
        <li>Strings can only use double quotes, so you end up escaping quotes everywhere.</li>
      </ul>

      <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
        Why JSON5 appeared
      </h2>

      <p>
        JSON5 came out of that frustration. It was proposed around 2012 by Aseem
        Kishore with contributions from the community, with a simple goal: take
        JSON and relax it so it&apos;s pleasant to write by hand, without turning it
        into a whole new format.
      </p>

      <p>
        The design principle is stated right on the JSON5 homepage: JSON5 is a{" "}
        <em className="not-italic">strict superset of JSON</em> and a{" "}
        <em className="not-italic">strict subset of ECMAScript 5.1</em>. The name
        follows from that — it&apos;s the JSON syntax as defined in the ECMAScript 5
        language spec, where object literals are far more forgiving than the
        JSON grammar.
      </p>

      <p>
        In other words: any valid JSON is valid JSON5, and any valid JSON5 is
        valid JavaScript. If you&apos;ve ever pasted a JavaScript object literal and
        thought &quot;this is basically JSON,&quot; you were looking at JSON5.
      </p>

      <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
        What JSON5 changes
      </h2>

      <p>Here are the concrete differences, all legal in JSON5 but errors in
        strict JSON.</p>

      <h3 className="font-semibold text-slate-900 dark:text-white">
        1. Comments
      </h3>
      <Code>{`{
  // line comment
  "name": "John", /* block comment */
  "age": 30
}`}</Code>

      <h3 className="font-semibold text-slate-900 dark:text-white">
        2. Unquoted keys
      </h3>
      <Code>{`{
  name: "John",
  age: 30
}`}</Code>

      <h3 className="font-semibold text-slate-900 dark:text-white">
        3. Single-quoted strings
      </h3>
      <Code>{`{
  'name': 'John',
  'path': 'C:\\Program Files\\app'
}`}</Code>

      <h3 className="font-semibold text-slate-900 dark:text-white">
        4. Trailing commas
      </h3>
      <Code>{`{
  "name": "John",
  "age": 30,
}`}</Code>

      <h3 className="font-semibold text-slate-900 dark:text-white">
        5. Relaxed numbers
      </h3>
      <Code>{`{
  "hex": 0xFF,
  "leading": .5,
  "trailing": 5.,
  "positive": +1,
  "infinite": Infinity,
  "notANumber": NaN
}`}</Code>

      <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
        JSON vs JSON5, side by side
      </h2>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
            JSON
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
  name: 'John', // human-friendly
  skills: ['js', 'react',],
}`}</Code>
        </div>
      </div>

      <p>
        The key difference is a matter of philosophy: JSON optimizes for
        machines, JSON5 optimizes for humans — while staying fully convertible
        to JSON. Strip the comments, add double quotes, and remove trailing
        commas, and you&apos;re back to strict JSON.
      </p>

      <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
        JSON5 vs JSONC vs HJSON
      </h2>

      <p>
        JSON5 isn&apos;t the only attempt to make JSON friendlier, and the three are
        often confused:
      </p>

      <ul className="list-disc space-y-2 pl-5">
        <li>
          <strong className="text-slate-900 dark:text-white">JSONC</strong> —
          &quot;JSON with Comments&quot;. Used by VS Code&apos;s{" "}
          <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm dark:bg-slate-800">
            settings.json
          </code>
          . As the name says, it only adds comments — no unquoted keys or
          trailing commas. Far more limited than JSON5.
        </li>
        <li>
          <strong className="text-slate-900 dark:text-white">HJSON</strong> —
          &quot;Human JSON&quot;. A separate project with a similar goal, but it goes
          further and diverges from JSON more (omitting quotes and colons
          entirely in places).
        </li>
        <li>
          <strong className="text-slate-900 dark:text-white">JSON5</strong> —
          sits in the middle: strictly a superset of JSON, so any JSON parser can
          understand the output once you normalize it.
        </li>
      </ul>

      <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
        Where JSON5 is supported today
      </h2>

      <p>JSON5 is a spec and a set of libraries — not a native web standard.
        The support picture:</p>

      <ul className="list-disc space-y-2 pl-5">
        <li>
          <strong className="text-slate-900 dark:text-white">
            Not in the browser or Node by default.
          </strong>{" "}
          <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm dark:bg-slate-800">
            JSON.parse
          </code>{" "}
          is strict JSON only. If you pass JSON5 to it, it throws.
        </li>
        <li>
          <strong className="text-slate-900 dark:text-white">
            The json5 npm package.
          </strong>{" "}
          The reference JavaScript implementation, used across the ecosystem. It
          parses and stringifies JSON5 with an API that mirrors{" "}
          <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm dark:bg-slate-800">
            JSON.parse
          </code>
          /{" "}
          <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm dark:bg-slate-800">
            stringify
          </code>
          .
        </li>
        <li>
          <strong className="text-slate-900 dark:text-white">
            Build tooling.
          </strong>{" "}
          Tools like Babel and Vite read JSON5 (or JSON5-like) config files.
          TypeScript&apos;s{" "}
          <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm dark:bg-slate-800">
            tsconfig.json
          </code>{" "}
          tolerates comments and trailing commas — closer to JSONC than full
          JSON5, but the spirit is the same.
        </li>
        <li>
          <strong className="text-slate-900 dark:text-white">
            Other languages.
          </strong>{" "}
          Ports exist for Python, Go, Rust, and more, so JSON5 config files can
          be read across a stack.
        </li>
      </ul>

      <p>
        So in practice: JSON5 is <em className="not-italic">widely used</em> in
        the JavaScript ecosystem, but <em className="not-italic">not</em> a
        format you can hand to an arbitrary parser and expect to work. That gap
        is exactly why normalizing JSON5 back to strict JSON matters.
      </p>

      <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
        Why JSONGuy cares
      </h2>

      <p>
        That&apos;s the whole reason JSONGuy supports JSON5 natively. Paste a JSON5
        object — comments, unquoted keys, single quotes, trailing commas — and
        the formatter normalizes it into strict, standards-compliant JSON that
        any system can consume. It reads like a human, and writes like a
        machine.
      </p>

      <p>
        Try it in the{" "}
        <Link
          href="/"
          className="font-medium text-indigo-600 hover:underline dark:text-indigo-400"
        >
          JSON5 formatter
        </Link>
        , or read{" "}
        <Link
          href="/blog/json5-vs-json"
          className="font-medium text-indigo-600 hover:underline dark:text-indigo-400"
        >
          a shorter comparison
        </Link>{" "}
        if you just want the differences at a glance.
      </p>
    </article>
  );
}
