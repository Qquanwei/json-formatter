import { NextRequest, NextResponse } from "next/server";
import { createPublish, publishUrl } from "../../lib/publish";

export async function POST(request: NextRequest) {
  let html: unknown;
  try {
    const body = await request.json();
    html = body?.html;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (typeof html !== "string" || html.trim().length === 0) {
    return NextResponse.json({ error: "No HTML provided" }, { status: 400 });
  }

  try {
    const id = await createPublish(html);
    return NextResponse.json({ id, url: publishUrl(id) });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Storage error";
    const status = message === "HTML too large" ? 413 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
