import { NextResponse } from "next/server";

export function GET() {
  return NextResponse.json(
    { ok: true, service: "tajo-one-web" },
    {
      headers: {
        "Cache-Control": "no-store",
      },
    }
  );
}
