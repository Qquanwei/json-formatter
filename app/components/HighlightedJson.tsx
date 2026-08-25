"use client";

import { memo } from "react";
import { tokenizeJson, type Token } from "../lib/json";

const TOKEN_CLASS: Record<Token["type"], string> = {
  key: "text-[#0550ae] dark:text-[#79c0ff]",
  string: "text-[#116329] dark:text-[#a5d6a7]",
  number: "text-[#953800] dark:text-[#ffab70]",
  boolean: "text-[#8250df] dark:text-[#d2a8ff]",
  null: "text-[#cf222e] dark:text-[#ff7b72]",
  punctuation: "text-[#57606a] dark:text-[#8b949e]",
};

export const Highlighted = memo(function Highlighted({
  text,
}: {
  text: string;
}) {
  const tokens = tokenizeJson(text);
  return (
    <pre className="whitespace-pre font-mono text-[13px] leading-6">
      {tokens.map((t, i) => (
        <span key={i} className={TOKEN_CLASS[t.type]}>
          {t.value}
        </span>
      ))}
    </pre>
  );
});
