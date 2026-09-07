import { NextResponse } from "next/server";
import { getShare } from "../../../lib/share";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const data = await getShare(id);
  if (data === null) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json({ id, data });
}
