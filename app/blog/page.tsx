import type { Metadata } from "next";
import Link from "next/link";
import { posts } from "../lib/posts";
import { SITE_NAME } from "../lib/site";

export const metadata: Metadata = {
  title: "Blog",
  description: "Notes and comparisons from the JSONGuy project.",
  alternates: { canonical: "/blog" },
};

const sorted = [...posts].sort((a, b) => b.date.localeCompare(a.date));

export default function Blog() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
        Blog
      </h1>
      <p className="mt-3 text-slate-600 dark:text-slate-400">
        Notes from the {SITE_NAME} project.
      </p>

      <ul className="mt-10 space-y-2">
        {sorted.map((post, i) => (
          <li
            key={post.slug}
            className="flex flex-wrap items-baseline gap-x-3 text-base leading-7"
          >
            <span className="w-6 shrink-0 text-right text-slate-400">{i + 1}.</span>
            <Link
              href={`/blog/${post.slug}`}
              className="text-slate-900 hover:underline dark:text-slate-100"
            >
              {post.title}
            </Link>
            <span className="shrink-0 text-sm text-slate-600 dark:text-slate-400">
              {post.date}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
