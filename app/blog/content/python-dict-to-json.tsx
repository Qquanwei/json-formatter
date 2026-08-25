import Link from "next/link";

function Code({ children }: { children: string }) {
  return (
    <pre className="overflow-x-auto rounded-xl border border-slate-200 bg-slate-50 p-4 font-mono text-[13px] leading-6 text-slate-800 dark:border-slate-700/60 dark:bg-slate-800/50 dark:text-slate-200">
      {children}
    </pre>
  );
}

export default function PythonDictToJson() {
  return (
    <article className="space-y-6 leading-7 text-slate-700 dark:text-slate-300">
      <p>
        If you write Python, you&apos;ve probably done this: you print a dict to
        the console, copy it, and paste it into a JSON formatter — only to get a
        wall of red. A Python dict looks a lot like JSON, but it isn&apos;t JSON.
        Here&apos;s what&apos;s different and how to convert it without cleaning up the
        syntax by hand.
      </p>

      <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
        Python dict vs. JSON
      </h2>

      <p>Take this dictionary:</p>

      <Code>{`{
  'name': 'John Doe',
  'age': 30,
  'is_active': True,
  'nickname': None,
  'skills': ('python', 'json', 'convert'),
  'address': {
    'city': 'New York',
    'zip': '10001',
  },
}`}</Code>

      <p>
        Readable, but not valid JSON. Four things in there break a strict JSON
        parser:
      </p>

      <ul className="list-disc space-y-2 pl-5">
        <li>
          <strong className="text-slate-900 dark:text-white">
            Single quotes.
          </strong>{" "}
          JSON only allows double quotes. Python happily uses{" "}
          <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm dark:bg-slate-800">
            &apos;single quotes&apos;
          </code>{" "}
          for keys and strings.
        </li>
        <li>
          <strong className="text-slate-900 dark:text-white">
            None, True, False.
          </strong>{" "}
          Python capitalizes them; JSON wants{" "}
          <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm dark:bg-slate-800">null</code>
          ,{" "}
          <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm dark:bg-slate-800">true</code>
          ,{" "}
          <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm dark:bg-slate-800">false</code>
          .
        </li>
        <li>
          <strong className="text-slate-900 dark:text-white">Tuples.</strong>{" "}
          <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm dark:bg-slate-800">
            (1, 2, 3)
          </code>{" "}
          has no JSON equivalent and is usually a syntax error.
        </li>
        <li>
          <strong className="text-slate-900 dark:text-white">
            Trailing commas.
          </strong>{" "}
          Legal in Python, but the last item followed by a comma is invalid in
          strict JSON.
        </li>
      </ul>

      <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
        The usual workaround is tedious
      </h2>

      <p>
        The typical path is to run{" "}
        <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm dark:bg-slate-800">
          json.dumps(d)
        </code>{" "}
        in a script, or paste into a tool and fix each error one at a time:
        replace quotes, change{" "}
        <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm dark:bg-slate-800">None</code>{" "}
        to{" "}
        <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm dark:bg-slate-800">null</code>
        , convert tuples to lists. It&apos;s boring and error-prone, especially for
        nested data.
      </p>

      <p>
        The faster option: paste the dict into a converter that already
        understands Python syntax. It normalizes single quotes,{" "}
        <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm dark:bg-slate-800">None</code>
        /{" "}
        <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm dark:bg-slate-800">True</code>
        /{" "}
        <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm dark:bg-slate-800">False</code>
        , tuples, and trailing commas into clean, standards-compliant JSON — all
        in your browser, nothing uploaded to a server.
      </p>

      <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
        Try it
      </h2>

      <p>
        Paste any Python dict into the{" "}
        <Link
          href="/python-dict-to-json"
          className="font-medium text-indigo-600 hover:underline dark:text-indigo-400"
        >
          Python dict to JSON converter
        </Link>{" "}
        and it produces valid JSON on the spot, with a tree view for checking
        the result. No setup, no script, no manual cleanup.
      </p>
    </article>
  );
}
