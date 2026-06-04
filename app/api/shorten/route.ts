import { NextRequest, NextResponse } from "next/server";
import { nanoid } from "nanoid";
import prisma from "@/lib/db";

export async function POST(request: NextRequest) {
  const { url } = await request.json().catch(() => ({ url: "" }));
  if (!url || typeof url !== "string") {
    return NextResponse.json({ error: "Missing url" }, { status: 400 });
  }

  const normalizedUrl = url.match(/^https?:\/\//i) ? url : `https://${url}`;
  try {
    new URL(normalizedUrl);
  } catch {
    return NextResponse.json({ error: "Invalid url" }, { status: 400 });
  }

  const shortUrl = nanoid(8);

  const shortenedUrl = await prisma.url.create({
    data: {
      originalUrl: normalizedUrl,
      shortUrl,
    },
  });

  return NextResponse.json({ shortUrl: shortenedUrl.shortUrl });
}
