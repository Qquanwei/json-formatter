import { NextRequest, NextResponse } from "next/server";
import { createShare, shareUrl } from "../../lib/share";

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

  try {
    const id = await createShare(text);
    return NextResponse.json({ id, url: shareUrl(id) });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Storage error";
    const status = message === "Data too large" ? 413 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
