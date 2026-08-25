"use client";

import { memo, useMemo, useState } from "react";
import { isContainer } from "../lib/json";

type Path = (string | number)[];

interface NodeInfo {
  path: Path;
  depth: number;
}

function collectContainers(
  value: unknown,
  path: Path,
  depth: number,
  acc: NodeInfo[],
): void {
  if (!isContainer(value)) return;
  acc.push({ path, depth });
  if (Array.isArray(value)) {
    value.forEach((child, i) => collectContainers(child, [...path, i], depth + 1, acc));
  } else {
    Object.entries(value).forEach(([k, child]) =>
      collectContainers(child, [...path, k], depth + 1, acc),
    );
  }
}

function pathKey(p: Path): string {
  return JSON.stringify(p);
}

function primClass(value: unknown): { cls: string; text: string } {
  if (value === null) return { cls: "text-[#6e7781] dark:text-[#8b949e]", text: "null" };
  if (typeof value === "string")
    return { cls: "text-[#116329] dark:text-[#a5d6a7]", text: JSON.stringify(value) };
  if (typeof value === "number")
    return { cls: "text-[#953800] dark:text-[#ffab70]", text: String(value) };
  if (typeof value === "boolean")
    return { cls: "text-[#0550ae] dark:text-[#79c0ff]", text: String(value) };
  return { cls: "text-slate-500 dark:text-slate-400", text: String(value) };
}

function JsonNode({
  name,
  value,
  path,
  depth,
  expanded,
  onToggle,
}: {
  name?: string | number;
  value: unknown;
  path: Path;
  depth: number;
  expanded: Set<string>;
  onToggle: (p: Path) => void;
}) {
  const keyLabel =
    name === undefined ? null : (
      <span className="text-slate-800 dark:text-slate-200">
        {typeof name === "number" ? name : <>&quot;{name}&quot;</>}
        <span className="text-slate-400">: </span>
      </span>
    );

  if (!isContainer(value)) {
    const { cls, text } = primClass(value);
    return (
      <div className="leading-6">
        {keyLabel}
        <span className={cls}>{text}</span>
      </div>
    );
  }

  const isEmpty = Array.isArray(value) ? value.length === 0 : Object.keys(value).length === 0;
  const open = expanded.has(pathKey(path));
  const openBracket = Array.isArray(value) ? "[" : "{";
  const closeBracket = Array.isArray(value) ? "]" : "}";

  return (
    <div>
      <div
        className="group flex cursor-pointer items-center gap-1 leading-6"
        onClick={() => onToggle(path)}
      >
        {!isEmpty && (
          <span className="inline-block w-4 select-none text-slate-400 transition-transform group-hover:text-slate-600 dark:group-hover:text-slate-300">
            {open ? "▾" : "▸"}
          </span>
        )}
        {isEmpty && <span className="inline-block w-4" />}
        {keyLabel}
        <span className="text-slate-600 dark:text-slate-400">{openBracket}</span>
        {!open && !isEmpty && (
          <span className="text-slate-400">…</span>
        )}
        {!open && <span className="text-slate-600 dark:text-slate-400">{closeBracket}</span>}
      </div>
      {open && (
        <>
          <div className="ml-4 border-l border-slate-200 pl-3 dark:border-slate-700">
            {Array.isArray(value)
              ? value.map((child, i) => (
                  <JsonNode
                    key={i}
                    name={i}
                    value={child}
                    path={[...path, i]}
                    depth={depth + 1}
                    expanded={expanded}
                    onToggle={onToggle}
                  />
                ))
              : Object.entries(value).map(([k, child]) => (
                  <JsonNode
                    key={k}
                    name={k}
                    value={child}
                    path={[...path, k]}
                    depth={depth + 1}
                    expanded={expanded}
                    onToggle={onToggle}
                  />
                ))}
          </div>
          <div className="flex items-center leading-6">
            <span className="inline-block w-4" />
            <span className="text-slate-600 dark:text-slate-400">{closeBracket}</span>
          </div>
        </>
      )}
    </div>
  );
}

export default memo(function JsonTree({ value }: { value: unknown }) {
  const containers = useMemo<NodeInfo[]>(() => {
    const acc: NodeInfo[] = [];
    collectContainers(value, [], 0, acc);
    return acc;
  }, [value]);

  const [expanded, setExpanded] = useState<Set<string>>(() => {
    const s = new Set<string>();
    containers.forEach((c) => {
      if (c.depth < 2) s.add(pathKey(c.path));
    });
    return s;
  });

  const expandAll = () => setExpanded(new Set(containers.map((c) => pathKey(c.path))));
  const collapseAll = () => setExpanded(new Set());

  const toggle = (p: Path) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      const key = pathKey(p);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  return (
    <div>
      <div className="mb-2 flex items-center gap-2 text-xs">
        <button
          type="button"
          onClick={expandAll}
          className="rounded-lg border border-slate-300 px-2.5 py-1 font-medium text-slate-600 transition hover:bg-slate-100 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-800"
        >
          Expand all
        </button>
        <button
          type="button"
          onClick={collapseAll}
          className="rounded-lg border border-slate-300 px-2.5 py-1 font-medium text-slate-600 transition hover:bg-slate-100 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-800"
        >
          Collapse all
        </button>
      </div>
      <div className="font-mono text-sm">
        <JsonNode
          value={value}
          path={[]}
          depth={0}
          expanded={expanded}
          onToggle={toggle}
        />
      </div>
    </div>
  );
});
