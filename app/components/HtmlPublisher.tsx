"use client";

import { useState } from "react";
import { Check, Copy, ExternalLink, Globe } from "lucide-react";

const SAMPLE = `<!doctype html>
<html>
  <head><title>Hello</title></head>
  <body style="font-family: sans-serif; padding: 2rem;">
    <h1>Hello, world</h1>
    <p>This page is hosted by JSONGuy.</p>
  </body>
</html>`;

export default function HtmlPublisher() {
  const [html, setHtml] = useState(SAMPLE);
  const [url, setUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const publish = async () => {
    if (!html.trim()) return;
    setLoading(true);
    setError(null);
    setUrl(null);
    try {
      const res = await fetch("/api/publish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ html }),
      });
      const data = await res.json();
      if (!res.ok || !data.url) throw new Error(data.error ?? "publish failed");
      setUrl(data.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "publish failed");
    } finally {
      setLoading(false);
    }
  };

  const copy = async () => {
    if (!url) return;
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <div className="flex flex-col">
        <div className="flex items-center justify-between border-b border-slate-200 px-4 py-2 dark:border-slate-700/60">
          <span className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
            HTML
          </span>
        </div>
        <textarea
          value={html}
          onChange={(e) => setHtml(e.target.value)}
          spellCheck={false}
          className="h-[420px] w-full resize-none bg-transparent p-4 font-mono text-[13px] leading-6 text-slate-800 outline-none placeholder:text-slate-400 dark:text-slate-200"
          placeholder="Paste HTML here…"
        />
      </div>

      <div className="flex flex-col border-t border-slate-200 dark:border-slate-700/60 md:border-l md:border-t-0">
        <div className="flex items-center justify-between border-b border-slate-200 px-4 py-2 dark:border-slate-700/60">
          <span className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
            Preview
          </span>
          <button
            type="button"
            onClick={publish}
            disabled={loading}
            className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-600 px-3.5 py-1.5 text-sm font-medium text-white transition hover:bg-indigo-500 disabled:opacity-50"
          >
            <Globe className="h-4 w-4" />
            {loading ? "Publishing…" : "Publish"}
          </button>
        </div>
        <iframe
          title="Preview"
          srcDoc={html}
          sandbox="allow-scripts allow-forms allow-popups allow-modals"
          className="h-[420px] w-full border-0 bg-white"
        />

        {error && (
          <div className="border-t border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/40 dark:text-red-400">
            {error}
          </div>
        )}
        {url && (
          <div className="flex flex-wrap items-center gap-2 border-t border-slate-200 px-4 py-3 dark:border-slate-700/60">
            <span className="min-w-0 flex-1 break-all font-mono text-xs text-indigo-700 dark:text-indigo-300">
              {url}
            </span>
            <button
              type="button"
              onClick={copy}
              className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              {copied ? (
                <Check className="h-3.5 w-3.5 text-emerald-500" />
              ) : (
                <Copy className="h-3.5 w-3.5" />
              )}
              {copied ? "Copied" : "Copy"}
            </button>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              Open
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
