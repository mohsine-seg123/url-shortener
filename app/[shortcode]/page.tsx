import prisma from "@/lib/db";
import { redirect } from "next/navigation";

interface RedirectPageProps {
  params: Promise<{ shortcode: string }>; // ← Promise
}

export default async function RedirectPage({ params }: RedirectPageProps) {
  const { shortcode } = await params; // ← await

  const url = await prisma.url.findUnique({
    where: { shortUrl: shortcode },
  });

  if (!url) {
    return <div>404 - URL not found</div>;
  }


  await prisma.url.update({
    where: { shortUrl: shortcode },
    data: { visits: { increment: 1 } },
  });

  
  redirect(url.originalUrl);
}
