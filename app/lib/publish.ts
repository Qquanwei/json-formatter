import { randomBytes } from "node:crypto";
import { getSupabase } from "./supabase";
import { SITE_URL } from "./site";

const MAX_BYTES = 200_000;

export async function createPublish(html: string): Promise<string> {
  const trimmed = typeof html === "string" ? html : "";
  if (!trimmed) throw new Error("No HTML provided");
  if (Buffer.byteLength(trimmed, "utf8") > MAX_BYTES) {
    throw new Error("HTML too large");
  }

  const id = randomBytes(6).toString("base64url");
  const db = getSupabase();
  const { error } = await db.from("pages").insert({ id, html: trimmed });
  if (error) throw new Error(error.message);
  return id;
}

export async function getPublish(id: string): Promise<string | null> {
  const db = getSupabase();
  const { data, error } = await db
    .from("pages")
    .select("html")
    .eq("id", id)
    .single();
  if (error || !data) return null;
  return typeof data.html === "string" ? data.html : null;
}

export function publishUrl(id: string): string {
  return `${SITE_URL}/p/${id}`;
}
