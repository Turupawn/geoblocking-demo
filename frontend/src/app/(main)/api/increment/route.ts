import { NextResponse } from "next/server";

const API_BASE_URL = process.env.API_BASE_URL ?? "http://localhost:3001";

export async function POST() {
  const res = await fetch(`${API_BASE_URL}/api/increment`, {
    method: "POST",
    headers: { Accept: "application/json" },
  });

  const body = await res.text();
  return new NextResponse(body, {
    status: res.status,
    headers: {
      "content-type": res.headers.get("content-type") ?? "application/json",
    },
  });
}
