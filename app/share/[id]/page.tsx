import type { Metadata } from "next";
import { notFound } from "next/navigation";
import JsonFormatter from "../../components/JsonFormatter";
import { getSupabase } from "../../lib/supabase";

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

  let data: string | null = null;
  try {
    const db = getSupabase();
    const { data: row } = await db
      .from("shares")
      .select("data")
      .eq("id", id)
      .single();
    data = typeof row?.data === "string" ? row.data : null;
  } catch {
    data = null;
  }

  if (data === null) notFound();

  return (
    <div className="flex flex-1 flex-col">
      <JsonFormatter
        initialInput={data}
        storageKey={`share:${id}`}
        placeholder="Paste JSON here…"
      />
    </div>
  );
}
