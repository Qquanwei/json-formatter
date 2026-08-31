export interface PostMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
}

export const posts: PostMeta[] = [
  {
    slug: "json-formatter-mcp",
    title: "JSONGuy now has an MCP server: format and repair JSON from any AI client",
    description:
      "Connect JSONGuy's formatter, validator, and repair tools to Claude, Cursor, or any MCP client via a single HTTP endpoint.",
    date: "2026-08-31",
  },
  {
    slug: "convert-python-dict-to-json",
    title: "How to convert a Python dict to JSON (the code way and the no-code way)",
    description:
      "json.dumps in a script, or paste it into a converter — here are both ways to turn a Python dict into JSON, plus the edge cases like tuples and non-string keys.",
    date: "2026-08-31",
  },
  {
    slug: "json-repair",
    title: "JSON repair: fixing the JSON that tools reject",
    description:
      "Missing quotes, missing commas, unclosed brackets — here are the common ways JSON breaks and how to fix it automatically.",
    date: "2026-08-27",
  },
  {
    slug: "json5-vs-json",
    title: "JSON5 vs JSON: what's different and why it matters",
    description:
      "Unquoted keys, single quotes, comments, trailing commas — JSON5 loosens JSON for humans. Here's what it changes and how JSONGuy handles it.",
    date: "2026-08-27",
  },
  {
    slug: "python-dict-to-json",
    title: "Python dict to JSON: why it breaks and how to convert it",
    description:
      "Single quotes, None/True/False, tuples, trailing commas — a Python dict isn't valid JSON. Here's what breaks and how to convert it without manual cleanup.",
    date: "2026-08-25",
  },
  {
    slug: "handling-non-standard-json",
    title: "Handling the JSON that isn't valid JSON",
    description:
      "Real-world JSON comes in three flavors — strict, Python-style, and JavaScript-style. Here's how JSONGuy accepts all three without breaking.",
    date: "2026-08-25",
  },
  {
    slug: "json-formatter-comparison",
    title: "JSONGuy vs. other JSON formatters: a quick comparison",
    description:
      "A short, honest look at how JSONGuy stacks up against the JSON tools people reach for most — and why JS-style JSON and Python support is the whole point.",
    date: "2026-08-25",
  },
];

export function getPost(slug: string): PostMeta | undefined {
  return posts.find((p) => p.slug === slug);
}
