"use client";

import { useEffect, useRef, useState } from "react";
import { beautify, minify, parseJson, tokenizeJson, type Token } from "../lib/json";
import JsonTree from "./JsonTree";

const SAMPLE = `{
  name: 'John Doe',
  age: 30,
  isActive: true,
  skills: ['javascript', 'react', 'node',],
  address: {
    city: 'New York',
    zip: '10001',
  },
}`;

const TOKEN_CLASS: Record<Token["type"], string> = {
  key: "text-rose-600 dark:text-rose-400",
  string: "text-emerald-600 dark:text-emerald-400",
  number: "text-blue-600 dark:text-sky-400",
  boolean: "text-violet-600 dark:text-violet-400",
  null: "text-amber-600 dark:text-amber-400",
  punctuation: "text-zinc-500 dark:text-zinc-400",
};

function Highlighted({ text }: { text: string }) {
  const tokens = tokenizeJson(text);
  return (
    <pre className="whitespace-pre font-mono text-sm leading-6">
      {tokens.map((t, i) => (
        <span key={i} className={TOKEN_CLASS[t.type]}>
          {t.value}
        </span>
      ))}
    </pre>
  );
}

type View = "code" | "tree";

export default function JsonFormatter() {
  const [input, setInput] = useState(SAMPLE);
  const [output, setOutput] = useState("");
  const [view, setView] = useState<View>("code");
  const [parsed, setParsed] = useState<unknown>(null);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "valid" | "invalid">("idle");
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      const r = parseJson(input);
      setStatus(r.ok ? "valid" : "invalid");
    }, 350);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [input]);

  const run = (mode: "beautify" | "minify") => {
    const r = parseJson(input);
    if (!r.ok) {
      setError(
        r.line != null
          ? `${r.message} (line ${r.line}, column ${r.column})`
          : r.message,
      );
      return;
    }
    setError(null);
    setParsed(r.value);
    setOutput(mode === "beautify" ? beautify(r.value) : minify(r.value));
    setView("code");
  };

  const validate = () => {
    const r = parseJson(input);
    if (!r.ok) {
      setError(
        r.line != null
          ? `${r.message} (line ${r.line}, column ${r.column})`
          : r.message,
      );
      setStatus("invalid");
      return;
    }
    setError(null);
    setParsed(r.value);
    setStatus("valid");
  };

  const copy = async () => {
    const text = output || beautify(parsed ?? "");
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* ignore */
    }
  };

  const download = () => {
    const text = output || beautify(parsed ?? "");
    const blob = new Blob([text], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "formatted.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const clear = () => {
    setInput("");
    setOutput("");
    setParsed(null);
    setError(null);
    setStatus("idle");
  };

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8">
      <div className="mb-6 flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => run("beautify")}
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          Beautify
        </button>
        <button
          type="button"
          onClick={() => run("minify")}
          className="rounded-lg bg-zinc-800 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700 dark:bg-zinc-200 dark:text-zinc-900 dark:hover:bg-white"
        >
          Minify
        </button>
        <button
          type="button"
          onClick={validate}
          className="rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
        >
          Validate
        </button>
        <button
          type="button"
          onClick={copy}
          className="rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
        <button
          type="button"
          onClick={download}
          className="rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
        >
          Download
        </button>
        <button
          type="button"
          onClick={clear}
          className="rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
        >
          Clear
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="flex flex-col">
          <div className="mb-1 flex items-center justify-between text-sm font-medium text-zinc-600 dark:text-zinc-400">
            <span>Input</span>
            <span
              className={
                status === "valid"
                  ? "text-emerald-600"
                  : status === "invalid"
                    ? "text-red-500"
                    : "text-zinc-400"
              }
            >
              {status === "valid" ? "✓ Valid" : status === "invalid" ? "✗ Invalid" : ""}
            </span>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            spellCheck={false}
            className="h-[480px] w-full resize-none rounded-lg border border-zinc-300 bg-white p-4 font-mono text-sm text-zinc-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200"
            placeholder="Paste JSON or JS-style object here…"
          />
        </div>

        <div className="flex flex-col">
          <div className="mb-1 flex items-center justify-between">
            <div className="flex gap-1 rounded-lg border border-zinc-300 p-0.5 dark:border-zinc-700">
              <button
                type="button"
                onClick={() => setView("code")}
                className={`rounded-md px-3 py-1 text-sm font-medium ${
                  view === "code"
                    ? "bg-zinc-800 text-white dark:bg-zinc-200 dark:text-zinc-900"
                    : "text-zinc-600 dark:text-zinc-400"
                }`}
              >
                Code
              </button>
              <button
                type="button"
                onClick={() => setView("tree")}
                className={`rounded-md px-3 py-1 text-sm font-medium ${
                  view === "tree"
                    ? "bg-zinc-800 text-white dark:bg-zinc-200 dark:text-zinc-900"
                    : "text-zinc-600 dark:text-zinc-400"
                }`}
              >
                Tree
              </button>
            </div>
            <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
              Output
            </span>
          </div>
          <div className="h-[480px] overflow-auto rounded-lg border border-zinc-300 bg-white p-4 dark:border-zinc-700 dark:bg-zinc-900">
            {error ? (
              <div className="rounded-md bg-red-50 p-3 text-sm text-red-600 dark:bg-red-950/40 dark:text-red-400">
                {error}
              </div>
            ) : view === "code" ? (
              output ? (
                <Highlighted text={output} />
              ) : (
                <p className="font-mono text-sm text-zinc-400">
                  Formatted output will appear here.
                </p>
              )
            ) : parsed !== null ? (
              <JsonTree value={parsed} />
            ) : (
              <p className="font-mono text-sm text-zinc-400">
                Run Beautify or Validate to see the tree view.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
