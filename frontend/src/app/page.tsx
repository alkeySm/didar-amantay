import React from "react";
import HomePortal from "@/components/HomePortal";
import { SiteOverview } from "@/lib/types";

export const dynamic = "force-dynamic";

async function fetchInitialOverview(): Promise<SiteOverview | null> {
  const backendUrl = process.env.BACKEND_URL || "http://127.0.0.1:8000";
  try {
    const res = await fetch(`${backendUrl}/api/site-overview`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    return (await res.json()) as SiteOverview;
  } catch {
    return null;
  }
}

export default async function HomePage() {
  const initialData = await fetchInitialOverview();
  return <HomePortal initialData={initialData} />;
}
