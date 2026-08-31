import Link from "next/link";

function Code({ children }: { children: string }) {
  return (
    <pre className="overflow-x-auto rounded-xl border border-slate-200 bg-slate-50 p-4 font-mono text-[13px] leading-6 text-slate-800 dark:border-slate-700/60 dark:bg-slate-800/50 dark:text-slate-200">
      {children}
    </pre>
  );
}

export default function ConvertPythonDictToJson() {
  return (
    <article className="space-y-6 leading-7 text-slate-700 dark:text-slate-300">
      <p>
        Converting a Python dict to JSON is easy in code — and sometimes you
        just want to paste it somewhere and get the JSON out without writing a
        script. Here are both ways, plus the edge cases that trip people up.
      </p>

      <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
        The code way: json.dumps
      </h2>

      <p>In Python, the standard library does it in one line:</p>

      <Code>{`import json

d = {
    "name": "John",
    "age": 30,
    "active": True,
    "nickname": None,
}

print(json.dumps(d, indent=2))`}</Code>

      <p>Output:</p>

      <Code>{`{
  "name": "John",
  "age": 30,
  "active": true,
  "nickname": null
}`}</Code>

      <p>
        Notice how{" "}
        <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm dark:bg-slate-800">
          True
        </code>{" "}
        and{" "}
        <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm dark:bg-slate-800">
          None
        </code>{" "}
        become{" "}
        <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm dark:bg-slate-800">
          true
        </code>{" "}
        and{" "}
        <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm dark:bg-slate-800">
          null
        </code>
        . That&apos;s Python doing the conversion for you.
      </p>

      <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
        The no-code way: paste it
      </h2>

      <p>
        When you&apos;ve printed a dict to the console and just want the JSON, a
        converter is faster than spinning up a script. The catch: most JSON
        tools reject a Python dict outright, because it isn&apos;t valid JSON. So
        you paste and get an error, and you&apos;re back to manual cleanup.
      </p>

      <p>
        A converter that understands Python syntax skips that whole step. Paste
        this and it comes out as clean JSON:
      </p>

      <Code>{`{
  'name': 'John',
  'active': True,
  'nickname': None,
  'tags': ('a', 'b', 'c'),
}`}</Code>

      <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
        Edge cases worth knowing
      </h2>

      <ul className="list-disc space-y-2 pl-5">
        <li>
          <strong className="text-slate-900 dark:text-white">
            Tuples become lists.
          </strong>{" "}
          <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm dark:bg-slate-800">
            (1, 2)
          </code>{" "}
          has no JSON equivalent, so it maps to{" "}
          <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm dark:bg-slate-800">
            [1, 2]
          </code>
          .
        </li>
        <li>
          <strong className="text-slate-900 dark:text-white">
            Non-string keys.
          </strong>{" "}
          <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm dark:bg-slate-800">
            {"{1: \"a\"}"}
          </code>{" "}
          becomes{" "}
          <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm dark:bg-slate-800">
            {"{\"1\": \"a\"}"}
          </code>{" "}
          — JSON keys are always strings.
        </li>
        <li>
          <strong className="text-slate-900 dark:text-white">
            Sets and dates aren&apos;t JSON.
          </strong>{" "}
          <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm dark:bg-slate-800">
            json.dumps
          </code>{" "}
          throws on a{" "}
          <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm dark:bg-slate-800">
            set
          </code>{" "}
          or{" "}
          <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm dark:bg-slate-800">
            datetime
          </code>
          , so you&apos;d need a custom encoder — or just convert those fields
          first.
        </li>
        <li>
          <strong className="text-slate-900 dark:text-white">
            Single quotes in your paste.
          </strong>{" "}
          Python prints strings with single quotes; strict JSON needs double
          quotes. A Python-aware converter handles it automatically.
        </li>
      </ul>

      <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
        Which one to use
      </h2>

      <p>
        Writing a script? Use{" "}
        <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm dark:bg-slate-800">
          json.dumps
        </code>
        . It&apos;s correct and it&apos;s already there. But if you&apos;re just eyeballing
        some output or debugging a response, paste it into the{" "}
        <Link
          href="/python-dict-to-json"
          className="font-medium text-indigo-600 hover:underline dark:text-indigo-400"
        >
          Python dict to JSON converter
        </Link>{" "}
        and get valid JSON instantly — no script, no manual quote-fixing, and
        nothing leaves your browser.
      </p>
    </article>
  );
}
