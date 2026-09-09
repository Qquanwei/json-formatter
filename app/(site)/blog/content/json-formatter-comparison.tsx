import Link from "next/link";

const tools = [
  {
    name: "JSONGuy",
    browser: "Yes",
    syntax: "JS + Python",
    highlight: "Yes",
    tree: "Yes",
    free: "Yes",
  },
  {
    name: "JSON Editor Online",
    browser: "Yes",
    syntax: "JS (partial)",
    highlight: "Yes",
    tree: "Yes",
    free: "Yes",
  },
  {
    name: "jsoncrack",
    browser: "Yes",
    syntax: "No",
    highlight: "Yes",
    tree: "Yes (as a graph)",
    free: "Free tier",
  },
  {
    name: "Most formatter sites",
    browser: "Varies",
    syntax: "No",
    highlight: "Rarely",
    tree: "Rarely",
    free: "Yes, but ad-heavy",
  },
  {
    name: "jq (CLI)",
    browser: "No",
    syntax: "No",
    highlight: "No",
    tree: "No",
    free: "Yes",
  },
];

const th =
  "px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400";
const td = "px-3 py-2 text-sm text-slate-700 dark:text-slate-300";

export default function JsonFormatterComparison() {
  return (
    <article className="space-y-6 leading-7 text-slate-700 dark:text-slate-300">
      <p>
        JSONGuy&apos;s core selling point is simple: it takes JavaScript-style JSON
        and Python objects, not just strict JSON. Paste in a dict with single
        quotes,{" "}
        <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm dark:bg-slate-800">
          None
        </code>
        ,{" "}
        <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm dark:bg-slate-800">
          True
        </code>
        , comments, or trailing commas, and it normalizes everything into clean
        JSON on the spot. Most tools just throw a syntax error. Here&apos;s how it
        compares to the rest.
      </p>

      <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
        Side by side
      </h2>

      <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700/60">
        <table className="w-full min-w-[560px] border-collapse">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50 dark:border-slate-700/60 dark:bg-slate-800/50">
              <th className={th}>Tool</th>
              <th className={th}>Runs in browser</th>
              <th className={th}>JS &amp; Python syntax</th>
              <th className={th}>Highlighting</th>
              <th className={th}>Tree view</th>
              <th className={th}>Free</th>
            </tr>
          </thead>
          <tbody>
            {tools.map((t) => (
              <tr
                key={t.name}
                className="border-b border-slate-100 last:border-0 dark:border-slate-800"
              >
                <td className="px-3 py-2 text-sm font-medium text-slate-900 dark:text-white">
                  {t.name}
                </td>
                <td className={td}>{t.browser}</td>
                <td className={td}>{t.syntax}</td>
                <td className={td}>{t.highlight}</td>
                <td className={td}>{t.tree}</td>
                <td className={td}>{t.free}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
        JSON Editor Online
      </h2>
      <p>
        The most direct alternative. It&apos;s a real editor with a tree, search,
        and comparisons. If you&apos;re editing a big document and want full
        controls, it&apos;s worth using. JSONGuy is lighter and faster for the
        common case: you paste something, format it, and move on. And it
        handles relaxed syntax straight away — JavaScript object notation and
        Python dicts — where JSON Editor Online needs more fiddling.
      </p>

      <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
        jsoncrack
      </h2>
      <p>
        Turns JSON into a graph you can zoom around. Great for understanding the
        shape of a large response visually, but it&apos;s a visualizer, not a
        formatter. If you just want pretty-printed JSON to copy out, it&apos;s the
        wrong tool. JSONGuy gives you the tree view without losing the
        copy-paste-friendly output on the right.
      </p>

      <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
        jq
      </h2>
      <p>
        The command-line option. If you&apos;re already in a terminal,{" "}
        <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm dark:bg-slate-800">
          jq .
        </code>{" "}
        is hard to beat for quick formatting and querying. But it&apos;s not
        something you&apos;d give a non-developer, and it rejects anything that
        isn&apos;t strict JSON. Different tool for a different moment.
      </p>

      <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
        The ad-heavy formatter sites
      </h2>
      <p>
        You know the ones. They work, sort of, but they&apos;re slow, covered in
        ads, and some of them upload your JSON to a server instead of processing
        it locally. JSONGuy runs entirely in your browser — your data never
        leaves your device — and there&apos;s nothing to sign up for.
      </p>

      <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
        Bottom line
      </h2>
      <p>
        Use jq in the terminal, JSON Editor Online for heavy editing, and
        jsoncrack when you want to see a graph. For quickly formatting and
        validating JSON — especially JavaScript-style JSON and Python objects —
        the fast, private option is{" "}
        <Link
          href="/"
          className="font-medium text-indigo-600 hover:underline dark:text-indigo-400"
        >
          JSONGuy
        </Link>
        .
      </p>
    </article>
  );
}
