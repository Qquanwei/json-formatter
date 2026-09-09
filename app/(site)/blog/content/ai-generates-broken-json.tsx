import Link from "next/link";

function Code({ children }: { children: string }) {
  return (
    <pre className="overflow-x-auto rounded-xl border border-slate-200 bg-slate-50 p-4 font-mono text-[13px] leading-6 text-slate-800 dark:border-slate-700/60 dark:bg-slate-800/50 dark:text-slate-200">
      {children}
    </pre>
  );
}

function Pipeline() {
  const box =
    "flex-1 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-center text-xs font-medium text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200";
  return (
    <figure className="space-y-2">
      <div className="flex items-center gap-1.5">
        <div className={box}>LLM output</div>
        <span className="text-slate-400">→</span>
        <div className={box}>broken JSON</div>
        <span className="text-slate-400">→</span>
        <div className="rounded-lg border border-indigo-300 bg-indigo-50 px-3 py-2 text-center text-xs font-medium text-indigo-700 dark:border-indigo-800 dark:bg-indigo-950/40 dark:text-indigo-300">
          repair_json
        </div>
        <span className="text-slate-400">→</span>
        <div className={box}>valid JSON</div>
      </div>
      <figcaption className="text-center text-sm text-slate-500 dark:text-slate-400">
        The repair step turns an unpredictable model into a predictable data
        producer.
      </figcaption>
    </figure>
  );
}

export default function AiGeneratesBrokenJson() {
  return (
    <article className="space-y-6 leading-7 text-slate-700 dark:text-slate-300">
      <p>
        Ask a model to return JSON and, sooner or later, it will hand you
        something a parser can&apos;t read. Not because the model is broken, but
        because language models generate text token by token — and JSON is a
        strict format that doesn&apos;t forgive a single missing comma. If you&apos;re
        building anything that treats LLM output as data, you&apos;ve hit this. Here&apos;s
        why it keeps happening and how to stop it from breaking your pipeline.
      </p>

      <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
        Why models generate invalid JSON
      </h2>

      <p>
        A model isn&apos;t running a JSON parser while it writes. It&apos;s predicting the
        next token. It knows JSON{" "}
        <em className="not-italic">should</em> have balanced braces and commas in
        the right places, but it has no syntax checker to catch mistakes. The
        result is JSON that&apos;s{" "}
        <em className="not-italic">usually</em> right and occasionally broken in
        predictable ways.
      </p>

      <p>There&apos;s also the length problem. Models have an output token limit. If
        your object is large, the model gets cut off mid-array — and you get a
        response that ends at{" "}
        <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm dark:bg-slate-800">
          {"\"tags\": [\"a\", \"b\","}
        </code>{" "}
        with no closing bracket. Truncation is probably the single most common
        cause of broken JSON from LLMs.</p>

      <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
        The failure modes, in order of frequency
      </h2>

      <h3 className="font-semibold text-slate-900 dark:text-white">
        1. Truncation
      </h3>
      <p>Cut off mid-object or mid-array, brackets left unclosed:</p>
      <Code>{`{
  "name": "John",
  "tags": ["dev", "ops"`}</Code>

      <h3 className="font-semibold text-slate-900 dark:text-white">
        2. Extra text around the JSON
      </h3>
      <p>
        The model writes a friendly sentence, then the JSON, or adds a closing
        remark. Now your{" "}
        <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm dark:bg-slate-800">
          JSON.parse
        </code>{" "}
        sees{" "}
        <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm dark:bg-slate-800">
          Here you go:
        </code>{" "}
        and throws:
      </p>
      <Code>{`Here's the data you asked for:
{"name": "John", "age": 30}`}</Code>

      <h3 className="font-semibold text-slate-900 dark:text-white">
        3. Missing or trailing commas
      </h3>
      <p>
        The model forgets a comma between fields, or adds one after the last
        item (which is legal in Python and JSON5, but not in strict JSON):
      </p>
      <Code>{`{
  "name": "John"
  "age": 30,
}`}</Code>

      <h3 className="font-semibold text-slate-900 dark:text-white">
        4. Unescaped characters
      </h3>
      <p>
        A string contains a raw double quote or a literal newline, breaking the
        syntax:
      </p>
      <Code>{`{"text": "He said "hello" and left"}`}</Code>

      <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
        Why &quot;JSON mode&quot; isn&apos;t a cure
      </h2>

      <p>
        Most providers now offer a JSON mode or structured outputs. These help a
        lot — they constrain the model to emit valid syntax most of the time —
        but they don&apos;t eliminate the problem. Truncation still happens at the
        token limit. Extra text still appears in some modes. And a model can
        still produce syntactically valid JSON that&apos;s simply{" "}
        <em className="not-italic">wrong</em> for your schema. JSON mode raises
        your success rate, it doesn&apos;t make it 100%.
      </p>

      <p>
        So you can&apos;t just trust the output. You need a step in between that
        validates and repairs — every time, no exceptions.
      </p>

      <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
        The fix: validate, then repair
      </h2>

      <Pipeline />

      <p>
        The pattern that makes LLM JSON reliable is simple: never feed model
        output straight to{" "}
        <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm dark:bg-slate-800">
          JSON.parse
        </code>
        . Validate it first, and if it&apos;s broken, repair it. This catches
        truncation, strips stray text, fixes commas and brackets, and escapes
        whatever needs escaping.
      </p>

      <p>
        That&apos;s exactly what the{" "}
        <Link
          href="/json-repair"
          className="font-medium text-indigo-600 hover:underline dark:text-indigo-400"
        >
          JSON repair tool
        </Link>{" "}
        does. Paste the model&apos;s output and it returns clean, parseable JSON —
        including the Python-style syntax models sometimes drift into (single
        quotes,{" "}
        <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm dark:bg-slate-800">
          None
        </code>
        ,{" "}
        <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm dark:bg-slate-800">
          True
        </code>
        ).
      </p>

      <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
        Let the agent fix its own JSON
      </h2>

      <p>
        If you&apos;re working with an AI agent — Claude, Cursor, or a custom agent
        built on a model — the repair step can happen inside the agent itself.
        JSONGuy ships an{" "}
        <Link
          href="/blog/json-formatter-mcp"
          className="font-medium text-indigo-600 hover:underline dark:text-indigo-400"
        >
          MCP server
        </Link>{" "}
        so the agent can call{" "}
        <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm dark:bg-slate-800">
          repair_json
        </code>{" "}
        and{" "}
        <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm dark:bg-slate-800">
          validate_json
        </code>{" "}
        before it sends anything back. The model produces, then repairs its own
        output.
      </p>

      <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
        Bottom line
      </h2>

      <p>
        LLMs generate text, not data structures. They will keep producing broken
        JSON — that&apos;s a property of how they work, not a bug you can prompt
        away. The robust approach is to stop trusting the output and add a
        validate-then-repair step. JSON mode gets you most of the way; a repair
        step gets you the rest. Do both, and model output becomes safe to parse.
      </p>

      <p>
        Try it yourself: paste a truncated or messy model response into the{" "}
        <Link
          href="/json-repair"
          className="font-medium text-indigo-600 hover:underline dark:text-indigo-400"
        >
          JSON repair tool
        </Link>{" "}
        and watch it come back as valid JSON.
      </p>
    </article>
  );
}
