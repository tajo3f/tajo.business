import { NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  input: z.string().trim().min(3).max(2000),
});

function extractPlaceId(value: string) {
  const direct = value.match(/\b(ChI[A-Za-z0-9_-]{10,})\b/);
  if (direct?.[1]) return direct[1];

  try {
    const url = new URL(value);
    return (
      url.searchParams.get("placeid") ||
      url.searchParams.get("place_id") ||
      url.searchParams.get("query_place_id")
    );
  } catch {
    return null;
  }
}

function isAllowedGoogleHost(hostname: string) {
  const host = hostname.toLowerCase();
  return (
    host === "share.google" ||
    host === "maps.app.goo.gl" ||
    host === "goo.gl" ||
    host === "google.com" ||
    host.endsWith(".google.com")
  );
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = schema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Entrada inválida." }, { status: 400 });
  }

  const input = parsed.data.input;
  let placeId = extractPlaceId(input);

  if (!placeId) {
    try {
      const url = new URL(input);

      if (!isAllowedGoogleHost(url.hostname)) {
        return NextResponse.json(
          { error: "Aceitamos apenas links oficiais do Google nesta ferramenta." },
          { status: 400 }
        );
      }

      const response = await fetch(url, {
        redirect: "follow",
        method: "GET",
        cache: "no-store",
        signal: AbortSignal.timeout(5000),
        headers: {
          "User-Agent": "TAJO-ONE/1.0",
        },
      });

      placeId = extractPlaceId(response.url);
    } catch {
      // Não fazemos fallback para hosts arbitrários.
    }
  }

  if (!placeId) {
    return NextResponse.json(
      {
        error:
          "Não foi possível extrair o Place ID automaticamente. Cole o Place ID (começando com ChI...) ou um link que já contenha placeid.",
      },
      { status: 422 }
    );
  }

  return NextResponse.json({
    placeId,
    reviewUrl: `https://search.google.com/local/writereview?placeid=${encodeURIComponent(
      placeId
    )}`,
  });
}
