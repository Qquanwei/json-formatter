import { randomBytes } from "node:crypto";
import { getSupabase } from "./supabase";
import { SITE_URL } from "./site";

const MAX_BYTES = 200_000;

export async function createShare(text: string): Promise<string> {
  const trimmed = typeof text === "string" ? text : "";
  if (!trimmed) throw new Error("No data provided");
  if (Buffer.byteLength(trimmed, "utf8") > MAX_BYTES) {
    throw new Error("Data too large");
  }

  const id = randomBytes(6).toString("base64url");
  const db = getSupabase();
  const { error } = await db.from("shares").insert({ id, data: trimmed });
  if (error) throw new Error(error.message);
  return id;
}

export async function getShare(id: string): Promise<string | null> {
  const db = getSupabase();
  const { data, error } = await db
    .from("shares")
    .select("data")
    .eq("id", id)
    .single();
  if (error || !data) return null;
  return typeof data.data === "string" ? data.data : null;
}

export function shareUrl(id: string): string {
  return `${SITE_URL}/share/${id}`;
}
