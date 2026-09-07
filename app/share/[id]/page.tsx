import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import SharedJsonViewer from "../../components/SharedJsonViewer";
import { beautify, parseJson } from "../../lib/json";
import { getShare } from "../../lib/share";
import { SITE_NAME } from "../../lib/site";

export const metadata: Metadata = {
  title: "Shared JSON",
  robots: { index: false, follow: false },
};

export default async function SharePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let raw: string | null = null;
  try {
    raw = await getShare(id);
  } catch {
    raw = null;
  }

  if (raw === null) notFound();

  const parsed = parseJson(raw);
  const text = parsed.ok ? beautify(parsed.value, 2) : raw;

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
        Shared JSON
      </h1>
      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
        Read-only. To edit or validate it, open in {SITE_NAME}.
      </p>
      <div className="mt-6">
        <SharedJsonViewer text={text} />
      </div>
      <p className="mt-6 text-sm text-slate-500 dark:text-slate-400">
        <Link
          href="/"
          className="font-medium text-indigo-600 hover:underline dark:text-indigo-400"
        >
          Open {SITE_NAME}
        </Link>{" "}
        to format, validate, or repair JSON.
      </p>
    </div>
  );
}
