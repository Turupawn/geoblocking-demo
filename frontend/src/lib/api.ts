import type { IncrementResponse, RandomResponse } from "@/types/api";

async function parseJsonOrThrow<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const fallback = await res.text().catch(() => "");
    throw new Error(`Request failed: ${res.status} ${fallback}`.trim());
  }
  return res.json();
}

export async function getRandom(): Promise<RandomResponse> {
  const res = await fetch("/api/random");
  return parseJsonOrThrow<RandomResponse>(res);
}

export async function postIncrement(): Promise<IncrementResponse> {
  const res = await fetch("/api/increment", { method: "POST" });
  return parseJsonOrThrow<IncrementResponse>(res);
}
