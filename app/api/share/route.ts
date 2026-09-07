import { randomBytes } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "../../lib/supabase";

const MAX_BYTES = 200_000;

export async function POST(request: NextRequest) {
  let text: unknown;
  try {
    const body = await request.json();
    text = body?.text;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (typeof text !== "string" || text.length === 0) {
    return NextResponse.json({ error: "No data provided" }, { status: 400 });
  }
  if (Buffer.byteLength(text, "utf8") > MAX_BYTES) {
    return NextResponse.json({ error: "Data too large" }, { status: 413 });
  }

  const id = randomBytes(6).toString("base64url");

  try {
    const db = getSupabase();
    const { error } = await db.from("shares").insert({ id, data: text });
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ id });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Storage error" },
      { status: 500 },
    );
  }
}
