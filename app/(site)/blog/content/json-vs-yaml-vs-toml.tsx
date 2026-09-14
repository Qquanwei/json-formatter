import Link from "next/link";

function Code({ children }: { children: string }) {
  return (
    <pre className="overflow-x-auto rounded-xl border border-slate-200 bg-slate-50 p-4 font-mono text-[13px] leading-6 text-slate-800 dark:border-slate-700/60 dark:bg-slate-800/50 dark:text-slate-200">
      {children}
    </pre>
  );
}

const th =
  "px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400";
const td = "px-3 py-2 text-sm text-slate-700 dark:text-slate-300";

export default function JsonVsYamlVsToml() {
  return (
    <article className="space-y-6 leading-7 text-slate-700 dark:text-slate-300">
      <p>
        JSON is the default answer for configuration these days, but it&apos;s not
        the only one. YAML and TOML were both created to solve real problems
        with JSON as a config format. Here&apos;s a practical comparison of the
        three, and how to pick the right one for your project.
      </p>

      <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
        The same data, three ways
      </h2>

      <p>Take a simple config with a name, a port, and a list of features:</p>

      <h3 className="font-semibold text-slate-900 dark:text-white">JSON</h3>
      <Code>{`{
  "name": "my-service",
  "port": 8080,
  "features": ["auth", "logging"]
}`}</Code>

      <h3 className="font-semibold text-slate-900 dark:text-white">YAML</h3>
      <Code>{`name: my-service
port: 8080
features:
  - auth
  - logging`}</Code>

      <h3 className="font-semibold text-slate-900 dark:text-white">TOML</h3>
      <Code>{`name = "my-service"
port = 8080
features = ["auth", "logging"]`}</Code>

      <p>
        Same data, three different philosophies: JSON optimizes for machines,
        YAML optimizes for humans, TOML sits in between.
      </p>

      <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
        Side by side
      </h2>

      <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700/60">
        <table className="w-full min-w-[560px] border-collapse">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50 dark:border-slate-700/60 dark:bg-slate-800/50">
              <th className={th}></th>
              <th className={th}>JSON</th>
              <th className={th}>YAML</th>
              <th className={th}>TOML</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-slate-100 dark:border-slate-800">
              <td className="px-3 py-2 text-sm font-medium text-slate-900 dark:text-white">
                Comments
              </td>
              <td className={td}>No</td>
              <td className={td}>Yes (#)</td>
              <td className={td}>Yes (#)</td>
            </tr>
            <tr className="border-b border-slate-100 dark:border-slate-800">
              <td className="px-3 py-2 text-sm font-medium text-slate-900 dark:text-white">
                Human-friendly
              </td>
              <td className={td}>Low</td>
              <td className={td}>High</td>
              <td className={td}>Medium</td>
            </tr>
            <tr className="border-b border-slate-100 dark:border-slate-800">
              <td className="px-3 py-2 text-sm font-medium text-slate-900 dark:text-white">
                Parse complexity
              </td>
              <td className={td}>Low</td>
              <td className={td}>High</td>
              <td className={td}>Low</td>
            </tr>
            <tr className="border-b border-slate-100 dark:border-slate-800">
              <td className="px-3 py-2 text-sm font-medium text-slate-900 dark:text-white">
                Data exchange
              </td>
              <td className={td}>Yes</td>
              <td className={td}>Rarely</td>
              <td className={td}>No</td>
            </tr>
            <tr>
              <td className="px-3 py-2 text-sm font-medium text-slate-900 dark:text-white">
                Ecosystem reach
              </td>
              <td className={td}>Universal</td>
              <td className={td}>Wide</td>
              <td className={td}>Growing</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
        When to use which
      </h2>

      <ul className="list-disc space-y-2 pl-5">
        <li>
          <strong className="text-slate-900 dark:text-white">JSON</strong> — for
          anything two programs exchange over a network: APIs, messages, data
          files. It&apos;s the only one of the three that&apos;s really designed as a
          data interchange format.
        </li>
        <li>
          <strong className="text-slate-900 dark:text-white">YAML</strong> — for
          config files humans edit often and read closely, like CI pipelines and
          Docker Compose. The trade-off is a famously hairy parser.
        </li>
        <li>
          <strong className="text-slate-900 dark:text-white">TOML</strong> — for
          config that&apos;s mostly flat key-value pairs, like Rust&apos;s Cargo.toml or
          Python&apos;s pyproject.toml. It gives you comments without YAML&apos;s
          complexity.
        </li>
      </ul>

      <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
        Why JSON still wins most of the time
      </h2>

      <p>
        For all its rough edges as a hand-edited format, JSON&apos;s killer feature
        is that <em>everything</em> speaks it. Every language has a parser in
        its standard library, every API returns it, and it&apos;s the only format
        that doubles as both config and wire format. The friction of YAML or
        TOML is often not worth it unless comments and readability are a
        genuine, everyday need.
      </p>

      <p>
        The other formats are a workaround for JSON&apos;s strictness, not a
        replacement. If your JSON config feels painful to hand-edit, the
        alternative isn&apos;t always switching to YAML — it&apos;s often just using a
        relaxed JSON syntax that keeps the ecosystem compatibility. That&apos;s the
        niche JSON5 fills: comments, trailing commas, and unquoted keys, while
        staying a strict superset of JSON.
      </p>

      <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
        Bottom line
      </h2>

      <p>
        Use YAML when humans are the primary audience, TOML for simple flat
        config, and JSON everywhere else. And when you do work with JSON —
        strict, relaxed, or a little broken — the{" "}
        <Link
          href="/"
          className="font-medium text-indigo-600 hover:underline dark:text-indigo-400"
        >
          JSONGuy formatter
        </Link>{" "}
        handles it without you having to fix the syntax by hand.
      </p>
    </article>
  );
}
