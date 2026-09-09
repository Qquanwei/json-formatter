import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPublish } from "../../lib/publish";

export const metadata: Metadata = {
  title: "Published page",
  robots: { index: false, follow: false },
};

export default async function PublishPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let html: string | null = null;
  try {
    html = await getPublish(id);
  } catch {
    html = null;
  }

  if (html === null) notFound();

  return (
    <iframe
      title="Published page"
      srcDoc={html}
      sandbox="allow-scripts allow-forms allow-popups allow-modals"
      className="fixed inset-0 h-screen w-full border-0"
    />
  );
}
