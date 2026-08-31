import Link from "next/link";

function Code({ children }: { children: string }) {
  return (
    <pre className="overflow-x-auto rounded-xl border border-slate-200 bg-slate-50 p-4 font-mono text-[13px] leading-6 text-slate-800 dark:border-slate-700/60 dark:bg-slate-800/50 dark:text-slate-200">
      {children}
    </pre>
  );
}

export default function JsonguyMcp() {
  return (
    <article className="space-y-6 leading-7 text-slate-700 dark:text-slate-300">
      <p>
        If you use Claude, Cursor, or any AI client that supports the Model
        Context Protocol (MCP), you can now format and repair JSON straight
        from the conversation — JSONGuy has an MCP server.
      </p>

      <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
        What it does
      </h2>

      <p>
        It&apos;s the same engine that powers the web tool, exposed as three tools
        an AI can call:
      </p>

      <ul className="list-disc space-y-2 pl-5">
        <li>
          <strong className="text-slate-900 dark:text-white">
            format_json
          </strong>{" "}
          — turns JSON, JSON5, JavaScript objects, or Python dicts into strict,
          pretty-printed JSON. Handles single quotes, unquoted keys, comments,
          trailing commas, None/True/False, and tuples.
        </li>
        <li>
          <strong className="text-slate-900 dark:text-white">
            validate_json
          </strong>{" "}
          — returns whether the input is valid, and if not, the exact line and
          column of the error.
        </li>
        <li>
          <strong className="text-slate-900 dark:text-white">
            repair_json
          </strong>{" "}
          — fixes broken JSON: missing quotes, missing commas, unclosed
          brackets.
        </li>
      </ul>

      <p>
        The repair tool is the one that matters most for AI work — models
        generate malformed JSON all the time, and now they can fix their own
        output instead of sending you the error back.
      </p>

      <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
        How to connect it
      </h2>

      <p>The server is a single HTTP endpoint, no API key, no install:</p>

      <Code>{`https://jsonguy.airankone.com/mcp`}</Code>

      <p>Claude Desktop — add this to your config:</p>

      <Code>{`{
  "mcpServers": {
    "jsonguy": {
      "type": "http",
      "url": "https://jsonguy.airankone.com/mcp"
    }
  }
}`}</Code>

      <p>
        Cursor, Cline, or any client that supports remote MCP servers works the
        same way: point it at that URL and the three tools show up.
      </p>

      <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
        What it looks like in use
      </h2>

      <p>
        Ask an AI client to fix some broken JSON and it can now call{" "}
        <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm dark:bg-slate-800">
          repair_json
        </code>{" "}
        on the spot. Same for pasting a Python dict and wanting clean JSON —{" "}
        <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm dark:bg-slate-800">
          format_json
        </code>{" "}
        handles it without any manual cleanup.
      </p>

      <p>
        Everything runs server-side through the same parser as the{" "}
        <Link
          href="/"
          className="font-medium text-indigo-600 hover:underline dark:text-indigo-400"
        >
          web formatter
        </Link>
        , so the output is consistent wherever you use it.
      </p>

      <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
        Real examples
      </h2>

      <p>
        Here&apos;s the actual output each tool returns, copied straight from a
        connected client.
      </p>

      <p>
        <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm dark:bg-slate-800">
          format_json
        </code>{" "}
        — a Python dict goes in:
      </p>
      <Code>{`{'name': 'John Doe', 'active': True, 'tags': ('python', 'json', 'mcp'),}`}</Code>
      <p>Strict JSON comes out:</p>
      <Code>{`{
  "name": "John Doe",
  "active": true,
  "tags": [
    "python",
    "json",
    "mcp"
  ]
}`}</Code>

      <p>
        <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm dark:bg-slate-800">
          repair_json
        </code>{" "}
        — missing quotes, a missing comma, and an unclosed bracket:
      </p>
      <Code>{`{name: John, city: New York, tags: ['a', 'b'`}</Code>
      <p>Repaired:</p>
      <Code>{`{
  "name": "John",
  "city": "New York",
  "tags": [
    "a",
    "b"
  ]
}`}</Code>

      <p>
        <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm dark:bg-slate-800">
          validate_json
        </code>{" "}
        — a truncated object is caught with the exact location:
      </p>
      <Code>{`{"valid": false, "message": "invalid end of input", "line": 1, "column": 18}`}</Code>

      <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
        Try it
      </h2>

      <p>
        If you&apos;re already using an MCP-capable client, add the endpoint above
        and try asking it to format or repair some JSON. Feedback on what tools
        would be useful next is welcome.
      </p>
    </article>
  );
}
