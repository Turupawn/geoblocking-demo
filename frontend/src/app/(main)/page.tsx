"use client";

import { useState } from "react";
import { useGeoRandom } from "@/hooks/use-geo-random";
import { postIncrement } from "@/lib/api";

export default function HomePage() {
  const { data, isLoading, error } = useGeoRandom();
  const [incrementCount, setIncrementCount] = useState<number | null>(null);
  const [incrementError, setIncrementError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const isRestricted = data?.geo.isRestricted ?? false;
  const country = data?.geo.country ?? "unknown";

  const handleIncrement = async () => {
    setSubmitting(true);
    setIncrementError(null);
    try {
      const result = await postIncrement();
      setIncrementCount(result.count);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Unknown error";
      setIncrementError(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center gap-8 p-8">
      {isRestricted && (
        <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center bg-red-600 px-4 py-3 text-white text-sm">
          <span className="flex-1 text-center">
            Access Restricted — Your region ({country}) is not permitted to use this service.
          </span>
        </div>
      )}

      <h1 className="text-2xl font-bold">Hybrid Geoblocking PoC</h1>
      <p className="text-slate-400 text-sm">Three layers: edge block, backend enrichment, UI reaction.</p>

      {isLoading && <p className="text-slate-400">Loading geo status...</p>}
      {error && <p className="text-red-400">Error fetching geo status: {error.message}</p>}

      {data && (
        <div className="flex flex-col items-center gap-2 border border-white/10 rounded-lg p-6 bg-white/5">
          <p>
            Random value: <span className="font-mono">{data.value}</span>
          </p>
          <p>
            Country: <span className="font-mono">{country}</span>
          </p>
          <p>
            Status:{" "}
            <span className={isRestricted ? "text-red-400" : "text-green-400"}>
              {isRestricted ? "Restricted" : "Allowed"}
            </span>
          </p>
          <p>
            Increment count: <span className="font-mono">{incrementCount ?? "—"}</span>
          </p>
        </div>
      )}

      <button
        onClick={handleIncrement}
        disabled={isRestricted || submitting}
        className={`px-6 py-3 rounded font-bold transition ${
          isRestricted || submitting
            ? "bg-white/10 text-white/30 cursor-not-allowed"
            : "bg-white text-black hover:bg-white/80"
        }`}
      >
        {submitting ? "Incrementing…" : "Increment"}
      </button>

      {incrementError && (
        <p className="text-red-400 text-sm max-w-md text-center break-all">
          {incrementError}
        </p>
      )}
    </main>
  );
}
