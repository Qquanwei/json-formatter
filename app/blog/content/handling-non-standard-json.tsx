import Image from "next/image";
import Link from "next/link";

function Code({ children }: { children: string }) {
  return (
    <pre className="overflow-x-auto rounded-xl border border-slate-200 bg-slate-50 p-4 font-mono text-[13px] leading-6 text-slate-800 dark:border-slate-700/60 dark:bg-slate-800/50 dark:text-slate-200">
      {children}
    </pre>
  );
}

export default function HandlingNonStandardJson() {
  return (
    <article className="space-y-6 leading-7 text-slate-700 dark:text-slate-300">
      <p>
        In the real world, the JSON people paste into a formatter usually
        isn&apos;t valid JSON. It&apos;s close — but it&apos;s been written by hand, copied
        out of a log, or pulled straight from another language. Most tools just
        throw a syntax error. JSONGuy handles the edge cases instead.
      </p>

      <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
        Three flavors of &quot;JSON&quot;
      </h2>

      <p>
        What actually shows up tends to be one of three things. Only the first is
        strict, standards-compliant JSON:
      </p>

      <h3 className="font-semibold text-slate-900 dark:text-white">
        1. Standard JSON
      </h3>
      <Code>{`{
  "name": "John",
  "active": true,
  "note": null
}`}</Code>

      <h3 className="font-semibold text-slate-900 dark:text-white">
        2. Python-style — single quotes, None/True/False
      </h3>
      <Code>{`{
  'name': 'John',
  'active': True,
  'note': None
}`}</Code>

      <h3 className="font-semibold text-slate-900 dark:text-white">
        3. JavaScript-style — unquoted keys, comments, trailing commas
      </h3>
      <Code>{`{
  name: 'John', // unquoted key
  active: true,
  skills: ['js', 'react',], // trailing comma
}`}</Code>

      <p>Same input, two different tools:</p>

      <figure className="space-y-2">
        <Image
          src="/blog/jsonguy-accepts-js-style-json.png"
          alt="JSONGuy accepting a JavaScript-style object with unquoted keys and comments"
          width={1874}
          height={602}
          className="h-auto w-full rounded-xl border border-slate-200 dark:border-slate-700/60"
        />
        <figcaption className="text-center text-sm text-slate-500 dark:text-slate-400">
          JSONGuy — accepts it and normalizes it into valid JSON.
        </figcaption>
      </figure>

      <figure className="space-y-2">
        <Image
          src="/blog/other-tool-rejects-js-style-json.png"
          alt="jsonformatter.org rejecting the same JavaScript-style object as invalid"
          width={2416}
          height={774}
          className="h-auto w-full rounded-xl border border-slate-200 dark:border-slate-700/60"
        />
        <figcaption className="text-center text-sm text-slate-500 dark:text-slate-400">
          jsonformatter.org — rejects the same input as invalid JSON.
        </figcaption>
      </figure>

      <p>
        Paste #2 or #3 into a traditional JSON beautifier and you get a syntax
        error. Those tools only understand strict JSON — double quotes, quoted
        keys, and no idea what{" "}
        <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm dark:bg-slate-800">True</code>{" "}
        or{" "}
        <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm dark:bg-slate-800">None</code>{" "}
        are. That&apos;s exactly where most legacy formatter sites fail you.
      </p>

      <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
        How JSONGuy parses it
      </h2>

      <p>
        The pipeline is deliberately small — two steps before the JSON comes out
        the other side clean:
      </p>

      <p>
        <strong className="text-slate-900 dark:text-white">
          Step 1 — normalize Python keywords.
        </strong>{" "}
        We walk the input one character at a time and rewrite{" "}
        <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm dark:bg-slate-800">True</code>
        {" → "}
        <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm dark:bg-slate-800">true</code>
        ,{" "}
        <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm dark:bg-slate-800">False</code>
        {" → "}
        <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm dark:bg-slate-800">false</code>
        , and{" "}
        <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm dark:bg-slate-800">None</code>
        {" → "}
        <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm dark:bg-slate-800">null</code>
        . The important part is what it <em>doesn&apos;t</em> touch: anything inside a
        string is copied through unchanged, and the rewrite only fires when the
        word is a standalone token, not part of a longer identifier. A value like{" "}
        <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm dark:bg-slate-800">&quot;None of the above&quot;</code>{" "}
        stays exactly as it is.
      </p>

      <p>
        <strong className="text-slate-900 dark:text-white">
          Step 2 — parse with JSON5.
        </strong>{" "}
        The{" "}
        <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm dark:bg-slate-800">json5</code>{" "}
        library does the heavy lifting for JavaScript-style input: unquoted keys,
        single-quoted strings, trailing commas, and line or block comments. By
        the time it sees the string, the Python keywords are already out of the
        way, so one parser covers both flavors.
      </p>

      <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
        The edge cases
      </h2>

      <p>
        A few things worth calling out, because they&apos;re easy to get wrong:
      </p>

      <ul className="list-disc space-y-2 pl-5">
        <li>
          <strong className="text-slate-900 dark:text-white">
            String safety.
          </strong>{" "}
          A naive find-and-replace would mangle{" "}
          <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm dark:bg-slate-800">&quot;None&quot;</code>{" "}
          inside a string. The scanner tracks quote characters and escape
          sequences, so string contents are never rewritten.
        </li>
        <li>
          <strong className="text-slate-900 dark:text-white">
            Word boundaries.
          </strong>{" "}
          <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm dark:bg-slate-800">TrueValue</code>{" "}
          is not the same as{" "}
          <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm dark:bg-slate-800">True</code>
          . The rewrite checks the next character and skips anything that&apos;s
          still an identifier character.
        </li>
        <li>
          <strong className="text-slate-900 dark:text-white">
            Useful errors.
          </strong>{" "}
          When input is genuinely broken, we strip the library&apos;s noise
          (&quot;JSON5:&quot; prefix and the trailing &quot;at line… column…&quot;) and surface a
          clean message with the exact line and column, so you can fix it fast.
        </li>
      </ul>

      <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
        Bottom line
      </h2>

      <p>
        The point isn&apos;t to be clever about parsing — it&apos;s to meet real input
        where it is. Paste strict JSON, a Python dict, or a JavaScript object
        literal, and{" "}
        <Link
          href="/"
          className="font-medium text-indigo-600 hover:underline dark:text-indigo-400"
        >
          JSONGuy
        </Link>{" "}
        turns it into clean, standards-compliant JSON without you having to fix
        the syntax by hand.
      </p>
    </article>
  );
}
