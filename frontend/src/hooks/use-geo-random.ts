"use client";

import { useQuery } from "@tanstack/react-query";
import { getRandom } from "@/lib/api";

export function useGeoRandom() {
  return useQuery({
    queryKey: ["geo-random"],
    queryFn: getRandom,
    refetchInterval: 300,
  });
}
