import type { IncrementResponse, RandomResponse } from "@/types/api";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

async function parseJsonOrThrow<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const fallback = await res.text().catch(() => "");
    throw new Error(`Request failed: ${res.status} ${fallback}`.trim());
  }
  return res.json();
}

export async function getRandom(): Promise<RandomResponse> {
  const res = await fetch(`${API_URL}/api/random`);
  return parseJsonOrThrow<RandomResponse>(res);
}

export async function postIncrement(): Promise<IncrementResponse> {
  const res = await fetch(`${API_URL}/api/increment`, { method: "POST" });
  return parseJsonOrThrow<IncrementResponse>(res);
}
