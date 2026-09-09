import { NextResponse } from "next/server";
import { getPublish } from "../../../lib/publish";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const html = await getPublish(id);
  if (html === null) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json({ id, html });
}
