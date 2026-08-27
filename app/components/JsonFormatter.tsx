"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  AlignLeft,
  ArrowLeftRight,
  ArrowRight,
  Check,
  CheckCircle2,
  Copy,
  Download,
  Eraser,
  ListTree,
  Sparkles,
  Wrench,
  XCircle,
} from "lucide-react";
import { beautify, parseJson, repairJson, sortValue } from "../lib/json";
import { usePersistedState } from "../lib/usePersistedState";
import { Highlighted } from "./HighlightedJson";
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

type View = "code" | "tree";

function countStats(text: string) {
  return { chars: text.length, lines: text ? text.split("\n").length : 0 };
}

function ToggleSwitch({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-5 w-9 shrink-0 items-center rounded-full transition-colors ${
        checked ? "bg-indigo-600" : "bg-slate-300 dark:bg-slate-600"
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
          checked ? "translate-x-[18px]" : "translate-x-[2px]"
        }`}
      />
    </button>
  );
}

const STORAGE_KEY = "jsonguy:input";

interface JsonFormatterProps {
  initialInput?: string;
  storageKey?: string;
  placeholder?: string;
  repair?: boolean;
}

export default function JsonFormatter({
  initialInput = SAMPLE,
  storageKey = STORAGE_KEY,
  placeholder = "Paste JSON, JS-style, or Python object here…",
  repair = false,
}: JsonFormatterProps = {}) {
  const [input, setInput] = usePersistedState(storageKey, initialInput);
  const [output, setOutput] = useState("");
  const [view, setView] = useState<View>("code");
  const [parsed, setParsed] = useState<unknown>(null);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "valid" | "invalid">("idle");
  const [copied, setCopied] = useState(false);
  const [indent, setIndent] = useState<2 | 4>(2);
  const [sortKeys, setSortKeys] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const lineNumbersRef = useRef<HTMLDivElement | null>(null);

  const inputStats = countStats(input);
  const outputStats = countStats(output);
  const lineCount = input ? input.split("\n").length : 1;
  const lineNumbers = useMemo(
    () => Array.from({ length: lineCount }, (_, i) => i + 1),
    [lineCount],
  );

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

  const syncScroll = () => {
    if (lineNumbersRef.current && textareaRef.current) {
      lineNumbersRef.current.scrollTop = textareaRef.current.scrollTop;
    }
  };

  const formatError = (r: { ok: false; message: string; line?: number; column?: number }) =>
    r.line != null ? `${r.message} (line ${r.line}, column ${r.column})` : r.message;

  const beautifyJson = () => {
    const r = parseJson(input);
    if (!r.ok) {
      setError(formatError(r));
      setStatus("invalid");
      return;
    }
    setError(null);
    setParsed(r.value);
    const value = sortKeys ? sortValue(r.value) : r.value;
    setOutput(beautify(value, indent));
    setView("code");
  };

  const repairAction = () => {
    const r = repairJson(input);
    if (!r.ok) {
      setError(formatError(r));
      setStatus("invalid");
      return;
    }
    setError(null);
    setParsed(r.value);
    const value = sortKeys ? sortValue(r.value) : r.value;
    setOutput(beautify(value, indent));
    setView("code");
  };

  const validate = () => {
    const r = parseJson(input);
    if (!r.ok) {
      setError(formatError(r));
      setStatus("invalid");
      return;
    }
    setError(null);
    setParsed(r.value);
    setStatus("valid");
  };

  const copy = async () => {
    const text = output || beautify(sortKeys ? sortValue(parsed ?? "") : parsed ?? "", indent);
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* ignore */
    }
  };

  const download = () => {
    const text = output || beautify(sortKeys ? sortValue(parsed ?? "") : parsed ?? "", indent);
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
    <div className="w-full py-6">
      <div className="overflow-hidden border-y border-slate-200 bg-white dark:border-slate-700/60 dark:bg-slate-900">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 bg-slate-50 px-4 py-3 dark:border-slate-700/60 dark:bg-slate-800/50">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={validate}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
            >
              <CheckCircle2 className="h-4 w-4" />
              Validate
            </button>
          </div>

          <div className="mx-2 hidden h-6 w-px bg-slate-200 dark:bg-slate-700 sm:block" />

          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Indent</span>
            <div className="flex overflow-hidden rounded-lg border border-slate-300 dark:border-slate-600">
              {([2, 4] as const).map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setIndent(n)}
                  className={`px-2.5 py-1.5 text-xs font-medium transition ${
                    indent === n
                      ? "bg-indigo-600 text-white"
                      : "bg-white text-slate-600 hover:bg-slate-50 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <ToggleSwitch checked={sortKeys} onChange={setSortKeys} />
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Sort keys</span>
          </div>
        </div>

        {/* Editors */}
        <div className="grid md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]">
          {/* Input */}
          <div className="flex flex-col border-b border-slate-200 dark:border-slate-700/60 md:border-b-0 md:border-r">
            <div className="flex items-center justify-between border-b border-slate-200 px-4 py-2 dark:border-slate-700/60">
              <div className="flex items-center gap-2">
                <AlignLeft className="h-4 w-4 text-slate-400" />
                <span className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  Input
                </span>
                <span className="text-xs text-slate-400">
                  {inputStats.chars} chars · {inputStats.lines} lines
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={clear}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-sm font-semibold text-red-600 transition hover:bg-red-100 hover:text-red-700 dark:border-red-900 dark:bg-red-950/40 dark:text-red-400 dark:hover:bg-red-950/60"
                >
                  <Eraser className="h-4 w-4" />
                  Clear
                </button>
              </div>
            </div>
            <div className="flex h-[520px]">
              <div
                ref={lineNumbersRef}
                aria-hidden
                className="w-12 shrink-0 select-none overflow-hidden border-r border-slate-200 bg-slate-50 text-right dark:border-slate-700/60 dark:bg-slate-800/40"
              >
                <div className="py-4 font-mono text-[13px] leading-6 text-slate-400 dark:text-slate-500">
                  {lineNumbers.map((n) => (
                    <div key={n} className="px-3">
                      {n}
                    </div>
                  ))}
                </div>
              </div>
              <textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onScroll={syncScroll}
                spellCheck={false}
                className="h-full min-w-0 flex-1 resize-none overflow-x-auto bg-transparent p-4 font-mono text-[13px] leading-6 text-slate-800 outline-none placeholder:text-slate-400 dark:text-slate-200"
                placeholder={placeholder}
              />
            </div>
          </div>

          {/* Beautify / Repair divider */}
          <div className="flex items-center justify-center border-b border-slate-200 px-3 py-3 dark:border-slate-700/60 md:border-b-0 md:border-r">
            <button
              type="button"
              onClick={repair ? repairAction : beautifyJson}
              aria-label={repair ? "Repair JSON" : "Beautify JSON"}
              title={repair ? "Repair JSON" : "Beautify JSON"}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-600 text-white transition hover:bg-indigo-500"
            >
              {repair ? <Wrench className="h-6 w-6" /> : <ArrowRight className="h-6 w-6" />}
            </button>
          </div>

          {/* Output */}
          <div className="flex flex-col">
            <div className="flex items-center justify-between border-b border-slate-200 px-4 py-2 dark:border-slate-700/60">
              <div className="flex items-center gap-2">
                <ArrowLeftRight className="h-4 w-4 text-slate-400" />
                <span className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  Output
                </span>
                {output && (
                  <span className="text-xs text-slate-400">
                    {outputStats.chars} chars · {outputStats.lines} lines
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={copy}
                  className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium text-slate-600 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                >
                  {copied ? (
                    <Check className="h-3.5 w-3.5 text-emerald-500" />
                  ) : (
                    <Copy className="h-3.5 w-3.5" />
                  )}
                  {copied ? "Copied" : "Copy"}
                </button>
                <button
                  type="button"
                  onClick={download}
                  className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium text-slate-600 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                >
                  <Download className="h-3.5 w-3.5" />
                  Download
                </button>
                <div className="flex items-center gap-1 rounded-lg border border-slate-200 p-0.5 dark:border-slate-700">
                  <button
                    type="button"
                    onClick={() => setView("code")}
                    className={`rounded-md px-2.5 py-1 text-xs font-medium transition ${
                      view === "code"
                        ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900"
                        : "text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"
                    }`}
                  >
                    Code
                  </button>
                  <button
                    type="button"
                    onClick={() => setView("tree")}
                    className={`inline-flex items-center gap-1 rounded-md px-2.5 py-1 text-xs font-medium transition ${
                      view === "tree"
                        ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900"
                        : "text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"
                    }`}
                  >
                    <ListTree className="h-3.5 w-3.5" />
                    Tree
                  </button>
                </div>
              </div>
            </div>
            <div className="h-[520px] overflow-auto p-4">
              {error ? (
                <div className="flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/40 dark:text-red-400">
                  <XCircle className="mt-0.5 h-4 w-4 shrink-0" />
                  <span>{error}</span>
                </div>
              ) : view === "code" ? (
                output ? (
                  <Highlighted text={output} />
                ) : (
                  <div className="flex h-full flex-col items-center justify-center gap-2 text-center text-slate-400">
                    <Sparkles className="h-8 w-8 text-slate-300 dark:text-slate-600" />
                    <p className="text-sm">
                      {repair
                        ? "Click Repair to fix your JSON."
                        : "Click Beautify to format your JSON."}
                    </p>
                  </div>
                )
              ) : parsed !== null ? (
                <JsonTree value={parsed} />
              ) : (
                <div className="flex h-full flex-col items-center justify-center gap-2 text-center text-slate-400">
                  <ListTree className="h-8 w-8 text-slate-300 dark:text-slate-600" />
                  <p className="text-sm">Run Beautify or Validate to see the tree view.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Status bar */}
        <div className="flex items-center justify-between border-t border-slate-200 px-4 py-2 dark:border-slate-700/60">
          <div className="flex items-center gap-2">
            {status === "valid" ? (
              <>
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
                  Valid JSON
                </span>
              </>
            ) : status === "invalid" ? (
              <>
                <XCircle className="h-4 w-4 text-red-500" />
                <span className="text-xs font-medium text-red-600 dark:text-red-400">
                  Invalid JSON
                </span>
              </>
            ) : (
              <span className="text-xs text-slate-400">Waiting for input…</span>
            )}
          </div>
          <span className="text-xs text-slate-400">
            Supports JS-style JSON &amp; Python objects: comments, unquoted keys, trailing commas, None/True/False
          </span>
        </div>
      </div>
    </div>
  );
}
