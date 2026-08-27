import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getPost, posts } from "../../lib/posts";
import JsonFormatterComparison from "../content/json-formatter-comparison";
import HandlingNonStandardJson from "../content/handling-non-standard-json";
import PythonDictToJson from "../content/python-dict-to-json";
import Json5VsJson from "../content/json5-vs-json";
import JsonRepair from "../content/json-repair";

const contentBySlug: Record<string, () => React.ReactElement> = {
  "json-formatter-comparison": () => <JsonFormatterComparison />,
  "handling-non-standard-json": () => <HandlingNonStandardJson />,
  "python-dict-to-json": () => <PythonDictToJson />,
  "json5-vs-json": () => <Json5VsJson />,
  "json-repair": () => <JsonRepair />,
};

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
  };
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const Content = contentBySlug[slug];
  if (!Content) notFound();

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6">
      <Link
        href="/blog"
        className="text-sm text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
      >
        ← All posts
      </Link>
      <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
        {post.title}
      </h1>
      <div className="mt-3 text-sm text-slate-400">{post.date}</div>
      <div className="mt-8">
        <Content />
      </div>
    </div>
  );
}
