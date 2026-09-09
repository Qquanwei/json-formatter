import Link from "next/link";

function Code({ children }: { children: string }) {
  return (
    <pre className="overflow-x-auto rounded-xl border border-slate-200 bg-slate-50 p-4 font-mono text-[13px] leading-6 text-slate-800 dark:border-slate-700/60 dark:bg-slate-800/50 dark:text-slate-200">
      {children}
    </pre>
  );
}

export default function PublishHtml() {
  return (
    <article className="space-y-6 leading-7 text-slate-700 dark:text-slate-300">
      <p>
        JSONGuy now hosts static HTML. Paste a page, hit publish, and get a URL
        that renders it — no account, no build step, no deployment. It&apos;s the
        fastest way to get a small static page live, and it&apos;s available from
        the UI, a REST API, and an MCP tool.
      </p>

      <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
        What it does
      </h2>

      <p>
        The{" "}
        <Link
          href="/publish"
          className="font-medium text-indigo-600 hover:underline dark:text-indigo-400"
        >
          HTML publisher
        </Link>{" "}
        gives you a two-pane editor: paste HTML on the left, see a live preview
        on the right, then click <strong>Publish</strong>. You get a link like:
      </p>

      <Code>{`https://jsonguy.airankone.com/p/Abc123xy`}</Code>

      <p>
        Opening that link renders the HTML full-screen. It&apos;s ideal for
        throwaway demos, sharing a mockup with a teammate, an error page, or a
        tiny landing page you don&apos;t want to wire up a whole deploy for.
      </p>

      <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
        How it renders, and the security model
      </h2>

      <p>
        Published HTML runs inside a <strong>sandboxed iframe</strong>. That
        means scripts, forms, and modals work, but the page gets an isolated
        origin — it can&apos;t read the rest of the site&apos;s cookies or storage, and
        it can&apos;t navigate the top-level window. The sandbox is why we can host
        arbitrary HTML on the same domain safely.
      </p>

      <p>
        The same trade-off as any static host applies: don&apos;t put secrets or
        anything sensitive in a published page, and treat unknown{" "}
        <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm dark:bg-slate-800">
          /p/…
        </code>{" "}
        links the way you&apos;d treat any unverified web page.
      </p>

      <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
        The REST API
      </h2>

      <p>
        Two endpoints, documented in the OpenAPI spec at{" "}
        <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm dark:bg-slate-800">
          /openapi.json
        </code>
        :
      </p>

      <p>
        <strong>Publish</strong> —{" "}
        <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm dark:bg-slate-800">
          POST /api/publish
        </code>
        :
      </p>

      <Code>{`curl -X POST https://jsonguy.airankone.com/api/publish \\
  -H "Content-Type: application/json" \\
  -d '{"html": "<h1>Hello</h1>"}'

// {"id":"Abc123xy","url":"https://jsonguy.airankone.com/p/Abc123xy"}`}</Code>

      <p>
        <strong>Retrieve</strong> —{" "}
        <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm dark:bg-slate-800">
          GET /api/publish/{"{id}"}
        </code>
        :
      </p>

      <Code>{`curl https://jsonguy.airankone.com/api/publish/Abc123xy

// {"id":"Abc123xy","html":"<h1>Hello</h1>"}`}</Code>

      <p>Up to 200KB per page, and reading requires no key.</p>

      <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
        The MCP tool
      </h2>

      <p>
        The{" "}
        <Link
          href="/blog/json-formatter-mcp"
          className="font-medium text-indigo-600 hover:underline dark:text-indigo-400"
        >
          JSONGuy MCP server
        </Link>{" "}
        now exposes{" "}
        <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm dark:bg-slate-800">
          publish_html
        </code>{" "}
        — hand it some HTML and it returns a live URL. An agent can generate a
        page and publish it in the same turn.
      </p>

      <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
        What it&apos;s good for
      </h2>

      <ul className="list-disc space-y-2 pl-5">
        <li>
          <strong className="text-slate-900 dark:text-white">
            Quick demos.
          </strong>{" "}
          Show a working page without a repo or a deploy pipeline.
        </li>
        <li>
          <strong className="text-slate-900 dark:text-white">
            Mockups.
          </strong>{" "}
          Send a styled mockup to a teammate as a link.
        </li>
        <li>
          <strong className="text-slate-900 dark:text-white">
            Error or status pages.
          </strong>{" "}
          Publish a simple static page in seconds.
        </li>
        <li>
          <strong className="text-slate-900 dark:text-white">
            Agent-generated pages.
          </strong>{" "}
          Have an AI client build and publish a page via MCP.
        </li>
      </ul>

      <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
        Try it
      </h2>

      <p>
        Head to the{" "}
        <Link
          href="/publish"
          className="font-medium text-indigo-600 hover:underline dark:text-indigo-400"
        >
          HTML publisher
        </Link>{" "}
        and publish something, or call the API from your own tooling.
      </p>
    </article>
  );
}
