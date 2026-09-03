# JSONGuy

A modern online JSON formatter, validator, beautifier, and repair tool. It accepts the syntax people actually use — **JSON5, JavaScript objects, and Python dicts** — and normalizes everything into strict, standards-compliant JSON. Runs 100% in the browser.

Live at [jsonguy.airankone.com](https://jsonguy.airankone.com).

## Features

- **Formatter & beautifier** with 2/4-space indent and GitHub-style syntax highlighting
- **Validator** that reports the exact line and column of an error
- **Collapsible tree view** for navigating nested data
- **JSON repair** — fixes missing quotes, missing commas, and unclosed brackets
- **Python dict support** — single quotes, `None`/`True`/`False`, and tuples are normalized to JSON
- **JSON5 support** — unquoted keys, comments, and trailing commas
- **Client-side only** — your data never leaves the browser

## MCP Server

Format, validate, and repair JSON from any MCP client (Claude Desktop, Cursor, Cline, etc.).

- **Endpoint:** `https://jsonguy.airankone.com/mcp`
- **Transport:** Streamable HTTP (JSON-RPC over POST, no API key)
- **Tools:**
  - `format_json` — format JSON / JSON5 / JS objects / Python dicts into strict JSON
  - `validate_json` — validate input and return the error line/column when invalid
  - `repair_json` — repair broken JSON

### Connect

Claude Desktop (`claude_desktop_config.json`):

```json
{
  "mcpServers": {
    "jsonguy": {
      "type": "http",
      "url": "https://jsonguy.airankone.com/mcp"
    }
  }
}
```

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # production build
npm run lint    # eslint
npm run indexnow # submit URLs to IndexNow (Bing/Yandex/Naver)
```

## Tech

- [Next.js](https://nextjs.org) (App Router)
- [json5](https://github.com/json5/json5) — relaxed JSON parsing
- [jsonrepair](https://github.com/josdejong/jsonrepair) — broken JSON repair
- Tailwind CSS v4

## License

[MIT](LICENSE)
