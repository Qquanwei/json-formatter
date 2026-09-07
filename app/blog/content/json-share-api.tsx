import Link from "next/link";

function Code({ children }: { children: string }) {
  return (
    <pre className="overflow-x-auto rounded-xl border border-slate-200 bg-slate-50 p-4 font-mono text-[13px] leading-6 text-slate-800 dark:border-slate-700/60 dark:bg-slate-800/50 dark:text-slate-200">
      {children}
    </pre>
  );
}

export default function ShareJson() {
  return (
    <article className="space-y-6 leading-7 text-slate-700 dark:text-slate-300">
      <p>
        JSONGuy now lets you share JSON with a link. Format or paste something,
        click Share, and you get a short URL anyone can open — a read-only,
        syntax-highlighted view of that JSON. And because the same capability is
        exposed as a REST API and an MCP tool, you can generate share links from
        your own code or from any AI client. Here&apos;s the whole picture.
      </p>

      <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
        The share feature, in the UI
      </h2>

      <p>
        In the formatter, a <strong>Share</strong> button sits next to Copy and
        Download. Click it and a panel pops up with a link like:
      </p>

      <Code>{`https://jsonguy.airankone.com/share/Abc123xy`}</Code>

      <p>
        Opening that link shows a <strong>read-only</strong> page: the JSON
        pretty-printed and syntax-highlighted, with a Copy button. It&apos;s not the
        full editor — just a clean view of the data, so whoever you send it to
        can read it without any setup.
      </p>

      <p>
        One thing worth being clear about: formatting and validation are still
        100% local. Only when you click <strong>Share</strong> does the data get
        stored — on our server, under a random id — so we can serve that link.
      </p>

      <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
        The REST API
      </h2>

      <p>
        The share capability is also a plain HTTP API, documented with OpenAPI
        at{" "}
        <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm dark:bg-slate-800">
          /openapi.json
        </code>
        . Two endpoints:
      </p>

      <p>
        <strong>Create a share</strong> —{" "}
        <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm dark:bg-slate-800">
          POST /api/share
        </code>
        :
      </p>

      <Code>{`curl -X POST https://jsonguy.airankone.com/api/share \\
  -H "Content-Type: application/json" \\
  -d '{"text": "{\\"name\\": \\"John\\", \\"age\\": 30}"}'

// {"id":"Abc123xy","url":"https://jsonguy.airankone.com/share/Abc123xy"}`}</Code>

      <p>
        <strong>Retrieve a share</strong> —{" "}
        <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm dark:bg-slate-800">
          GET /api/share/{"{id}"}
        </code>
        :
      </p>

      <Code>{`curl https://jsonguy.airankone.com/api/share/Abc123xy

// {"id":"Abc123xy","data":"{\\"name\\": \\"John\\", \\"age\\": 30}"}`}</Code>

      <p>
        The API accepts up to 200KB per share and returns a short, opaque id. No
        API key is required for reading; writes are rate-bounded by the same
        endpoint that powers the UI.
      </p>

      <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
        The MCP tool
      </h2>

      <p>
        If you use Claude, Cursor, or any MCP client, the share capability is
        now the fourth tool on the{" "}
        <Link
          href="/blog/json-formatter-mcp"
          className="font-medium text-indigo-600 hover:underline dark:text-indigo-400"
        >
          JSONGuy MCP server
        </Link>
        , alongside{" "}
        <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm dark:bg-slate-800">
          format_json
        </code>
        ,{" "}
        <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm dark:bg-slate-800">
          validate_json
        </code>
        , and{" "}
        <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm dark:bg-slate-800">
          repair_json
        </code>
        :
      </p>

      <ul className="list-disc space-y-2 pl-5">
        <li>
          <strong className="text-slate-900 dark:text-white">
            share_json
          </strong>{" "}
          — takes a JSON string and returns a shareable URL.
        </li>
      </ul>

      <p>
        So an agent can format a response and then share it in the same
        conversation — useful when you want to hand a chunk of JSON to a
        teammate, a GitHub issue, or a support thread as a link instead of a
        paste.
      </p>

      <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
        What it&apos;s good for
      </h2>

      <ul className="list-disc space-y-2 pl-5">
        <li>
          <strong className="text-slate-900 dark:text-white">
            Bug reports.
          </strong>{" "}
          Share the exact response payload with a link instead of a 200-line
          paste.
        </li>
        <li>
          <strong className="text-slate-900 dark:text-white">
            Sample data.
          </strong>{" "}
          Hand someone a clean, highlighted example they can copy.
        </li>
        <li>
          <strong className="text-slate-900 dark:text-white">
            Automating shares.
          </strong>{" "}
          Generate share links from a script or CI job via the REST API.
        </li>
        <li>
          <strong className="text-slate-900 dark:text-white">
            AI workflows.
          </strong>{" "}
          Let an agent share JSON mid-conversation through the MCP tool.
        </li>
      </ul>

      <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
        Try it
      </h2>

      <p>
        Paste some JSON into the{" "}
        <Link
          href="/"
          className="font-medium text-indigo-600 hover:underline dark:text-indigo-400"
        >
          formatter
        </Link>
        , click Share, and open the link. Or wire the API into your own tool —
        the OpenAPI spec is at{" "}
        <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm dark:bg-slate-800">
          /openapi.json
        </code>
        .
      </p>
    </article>
  );
}
