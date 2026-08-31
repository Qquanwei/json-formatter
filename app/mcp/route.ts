import { randomUUID } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { beautify, parseJson, repairJson, sortValue } from "../lib/json";

const SERVER_INFO = { name: "jsonguy", version: "1.0.0" };
const PROTOCOL_VERSION = "2024-11-05";

const tools = [
  {
    name: "format_json",
    description:
      "Format JSON, JSON5, JavaScript objects, or Python dicts into strict, pretty-printed JSON. Accepts single quotes, unquoted keys, comments, trailing commas, None/True/False, and tuples.",
    inputSchema: {
      type: "object",
      properties: {
        text: {
          type: "string",
          description: "The JSON, JSON5, JS object, or Python dict to format.",
        },
        indent: {
          type: "number",
          description: "Indentation spaces (2 or 4).",
          default: 2,
        },
        sort_keys: {
          type: "boolean",
          description: "Sort object keys alphabetically.",
          default: false,
        },
      },
      required: ["text"],
    },
  },
  {
    name: "validate_json",
    description:
      "Validate JSON/JSON5/Python input. Returns valid plus an error message with line and column when invalid.",
    inputSchema: {
      type: "object",
      properties: {
        text: { type: "string", description: "The input to validate." },
      },
      required: ["text"],
    },
  },
  {
    name: "repair_json",
    description:
      "Repair broken JSON — missing quotes, missing commas, unclosed brackets, single quotes, and Python syntax — into valid JSON.",
    inputSchema: {
      type: "object",
      properties: {
        text: { type: "string", description: "The broken JSON to repair." },
      },
      required: ["text"],
    },
  },
];

function textResult(text: string, isError = false) {
  return { content: [{ type: "text", text }], isError };
}

function callTool(name: string, args: Record<string, unknown>) {
  const text = typeof args.text === "string" ? args.text : "";

  switch (name) {
    case "format_json": {
      const r = parseJson(text);
      if (!r.ok) {
        return textResult(
          `Invalid input: ${r.message}${r.line != null ? ` (line ${r.line}, column ${r.column})` : ""}`,
          true,
        );
      }
      const value = args.sort_keys ? sortValue(r.value) : r.value;
      const indent = args.indent === 4 ? 4 : 2;
      return textResult(beautify(value, indent));
    }
    case "validate_json": {
      const r = parseJson(text);
      if (r.ok) return textResult(JSON.stringify({ valid: true }));
      return textResult(
        JSON.stringify({
          valid: false,
          message: r.message,
          line: r.line ?? null,
          column: r.column ?? null,
        }),
      );
    }
    case "repair_json": {
      const r = repairJson(text);
      if (!r.ok) return textResult(`Could not repair: ${r.message}`, true);
      return textResult(beautify(r.value, 2));
    }
    default:
      return textResult(`Unknown tool: ${name}`, true);
  }
}

const CORS_HEADERS: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
  "Access-Control-Allow-Headers":
    "content-type, mcp-session-id, mcp-protocol-version",
  "Access-Control-Expose-Headers": "mcp-session-id",
};

function jsonResponse(body: unknown, init?: ResponseInit) {
  const res = NextResponse.json(body, init);
  for (const [k, v] of Object.entries(CORS_HEADERS)) res.headers.set(k, v);
  return res;
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS });
}

export async function POST(request: NextRequest) {
  let body: { id?: unknown; method?: string; params?: unknown };
  try {
    body = await request.json();
  } catch {
    return jsonResponse(
      { jsonrpc: "2.0", id: null, error: { code: -32700, message: "Parse error" } },
      { status: 400 },
    );
  }

  const { id, method, params } = body;

  if (method === "initialize") {
    const res = jsonResponse({
      jsonrpc: "2.0",
      id,
      result: {
        protocolVersion: PROTOCOL_VERSION,
        capabilities: { tools: {} },
        serverInfo: SERVER_INFO,
        instructions:
          "Format, validate, and repair JSON. Accepts JSON5, JavaScript objects, and Python dicts.",
      },
    });
    res.headers.set("Mcp-Session-Id", randomUUID());
    return res;
  }

  if (id === undefined || id === null) {
    return new NextResponse(null, { status: 202, headers: CORS_HEADERS });
  }

  if (method === "ping") {
    return jsonResponse({ jsonrpc: "2.0", id, result: {} });
  }

  if (method === "tools/list") {
    return jsonResponse({ jsonrpc: "2.0", id, result: { tools } });
  }

  if (method === "tools/call") {
    const p = (params ?? {}) as { name?: string; arguments?: Record<string, unknown> };
    if (!p.name) {
      return jsonResponse({
        jsonrpc: "2.0",
        id,
        error: { code: -32602, message: "Missing tool name" },
      });
    }
    return jsonResponse({
      jsonrpc: "2.0",
      id,
      result: callTool(p.name, p.arguments ?? {}),
    });
  }

  return jsonResponse(
    { jsonrpc: "2.0", id, error: { code: -32601, message: `Method not found: ${method}` } },
    { status: 404 },
  );
}

export async function GET() {
  return new NextResponse("JSON-RPC over POST only.", {
    status: 405,
    headers: CORS_HEADERS,
  });
}
