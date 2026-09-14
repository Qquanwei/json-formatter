export interface PostMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
}

export const posts: PostMeta[] = [
  {
    slug: "json-vs-yaml-vs-toml",
    title: "JSON vs YAML vs TOML: which config format should you use?",
    description:
      "JSON, YAML, and TOML all store the same data differently. A practical comparison of the three — and when each one is the right pick.",
    date: "2026-09-14",
  },
  {
    slug: "best-json-formatter",
    title: "The best JSON formatter: how to pick one that handles JSON5, Python, and broken JSON",
    description:
      "Most JSON formatters reject anything that isn't strict JSON. Here's what actually makes a formatter good in 2026, and where JSONGuy fits.",
    date: "2026-09-14",
  },
  {
    slug: "douyin-viral-content-mcp",
    title: "抖音爆款内容 MCP：像做 SEO 一样，既帮你选题，又帮你拆爆款结构",
    description:
      "帮助抖音创作者找趋势、拆爆款结构的 MCP——像 SEO 找词一样做内容选题，并用 JSONGuy 把内容聚合成 JSON 给 AI agent 使用。",
    date: "2026-09-07",
  },
  {
    slug: "publish-html",
    title: "Publish a static HTML page in seconds — JSONGuy's HTML hosting",
    description:
      "JSONGuy now hosts static HTML. Paste a page, publish it to a link, and it renders in a sandboxed iframe — via the UI, a REST API, or an MCP tool.",
    date: "2026-09-07",
  },
  {
    slug: "json-share-api",
    title: "Share JSON with a link: JSONGuy's share feature, REST API, and MCP tool",
    description:
      "JSONGuy can now share JSON as a read-only link, via the UI, a documented REST API, and an MCP tool.",
    date: "2026-09-07",
  },
  {
    slug: "json-repair",
    title: "JSON repair: fixing the JSON that tools reject",
    description:
      "Missing quotes, missing commas, unclosed brackets — here are the common ways JSON breaks and how to fix it automatically.",
    date: "2026-08-27",
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
