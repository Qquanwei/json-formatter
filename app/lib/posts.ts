export interface PostMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
}

export const posts: PostMeta[] = [
  {
    slug: "json-formatter-comparison",
    title: "JSONGuy vs. other JSON formatters: a quick comparison",
    description:
      "A short, honest look at how JSONGuy stacks up against the JSON tools people reach for most — and why JS-style JSON and Python support is the whole point.",
    date: "2026-08-25",
  },
  {
    slug: "handling-non-standard-json",
    title: "Handling the JSON that isn't valid JSON",
    description:
      "Real-world JSON comes in three flavors — strict, Python-style, and JavaScript-style. Here's how JSONGuy accepts all three without breaking.",
    date: "2026-08-25",
  },
];

export function getPost(slug: string): PostMeta | undefined {
  return posts.find((p) => p.slug === slug);
}
