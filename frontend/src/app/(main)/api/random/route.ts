import { NextResponse } from "next/server";

const API_BASE_URL = process.env.API_BASE_URL ?? "http://localhost:3001";

export async function GET(request: Request) {
  const res = await fetch(`${API_BASE_URL}/api/random`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "cf-ipcountry": request.headers.get("cf-ipcountry") ?? "",
    },
  });

  const body = await res.text();
  return new NextResponse(body, {
    status: res.status,
    headers: {
      "content-type": res.headers.get("content-type") ?? "application/json",
    },
  });
}
