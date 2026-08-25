import JSON5 from "json5";

export type ParseResult =
  | { ok: true; value: unknown }
  | { ok: false; message: string; line?: number; column?: number };

export function parseJson(input: string): ParseResult {
  if (!input.trim()) {
    return { ok: false, message: "Input is empty." };
  }
  try {
    const value = JSON5.parse(input);
    return { ok: true, value };
  } catch (err) {
    const e = err as { message?: string; lineNumber?: number; columnNumber?: number };
    const rawMessage = e?.message ?? "Unknown parse error";
    const message = rawMessage.replace(/\s+at (line )?\d+[:\s]?\d*$/, "").replace(/^JSON5:\s*/, "");
    const line = e?.lineNumber;
    const column = e?.columnNumber;
    return { ok: false, message, line, column };
  }
}

export function sortValue(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(sortValue);
  if (value !== null && typeof value === "object") {
    const out: Record<string, unknown> = {};
    Object.keys(value as Record<string, unknown>)
      .sort()
      .forEach((k) => {
        out[k] = sortValue((value as Record<string, unknown>)[k]);
      });
    return out;
  }
  return value;
}

export function beautify(value: unknown, indent = 2, sortKeys = false): string {
  return JSON.stringify(sortKeys ? sortValue(value) : value, null, indent);
}

export type TokenType =
  | "key"
  | "string"
  | "number"
  | "boolean"
  | "null"
  | "punctuation";

export interface Token {
  type: TokenType;
  value: string;
}

export function tokenizeJson(text: string): Token[] {
  const tokens: Token[] = [];
  let i = 0;
  const n = text.length;

  const push = (type: TokenType, value: string) => {
    const prev = tokens[tokens.length - 1];
    if (prev && prev.type === type) {
      prev.value += value;
    } else {
      tokens.push({ type, value });
    }
  };

  const isDigit = (c: string) => c >= "0" && c <= "9";

  while (i < n) {
    const c = text[i];

    if (c === '"') {
      const start = i;
      i++;
      while (i < n) {
        if (text[i] === "\\") {
          i += 2;
          continue;
        }
        if (text[i] === '"') {
          i++;
          break;
        }
        i++;
      }
      const raw = text.slice(start, i);
      let j = i;
      while (j < n && text[j] !== ":" && text[j] !== "," && text[j] !== "\n" && text[j] !== " " && text[j] !== "]" && text[j] !== "}") {
        j++;
      }
      push(text[j] === ":" ? "key" : "string", raw);
      continue;
    }

    if (c === "-" || isDigit(c)) {
      const start = i;
      if (text[i] === "-") i++;
      while (i < n && (isDigit(text[i]) || text[i] === ".")) i++;
      if (i < n && (text[i] === "e" || text[i] === "E")) {
        i++;
        if (i < n && (text[i] === "+" || text[i] === "-")) i++;
        while (i < n && isDigit(text[i])) i++;
      }
      push("number", text.slice(start, i));
      continue;
    }

    const word = text.slice(i, i + 4);
    if (word.startsWith("true")) {
      push("boolean", "true");
      i += 4;
      continue;
    }
    if (word.startsWith("null")) {
      push("null", "null");
      i += 4;
      continue;
    }
    if (text.slice(i, i + 5).startsWith("false")) {
      push("boolean", "false");
      i += 5;
      continue;
    }

    push("punctuation", c);
    i++;
  }

  return tokens;
}

export function isContainer(value: unknown): value is Record<string, unknown> | unknown[] {
  return value !== null && typeof value === "object";
}
