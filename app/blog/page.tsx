import type { Metadata } from "next";
import Link from "next/link";
import { posts } from "../lib/posts";
import { SITE_NAME } from "../lib/site";

export const metadata: Metadata = {
  title: "Blog",
  description: "Notes and comparisons from the JSONGuy project.",
  alternates: { canonical: "/blog" },
};

export default function Blog() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
        Blog
      </h1>
      <p className="mt-3 text-slate-600 dark:text-slate-400">
        Notes from the {SITE_NAME} project.
      </p>

      <div className="mt-10 space-y-4">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="block rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-slate-300 hover:shadow dark:border-slate-700/60 dark:bg-slate-900 dark:hover:border-slate-600"
          >
            <div className="text-xs text-slate-400">{post.date}</div>
            <h2 className="mt-1 text-lg font-semibold text-slate-900 dark:text-white">
              {post.title}
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
              {post.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
