export interface GeoContext {
  country: string;
  isRestricted: boolean;
}

export interface RandomResponse {
  value: number;
  geo: GeoContext;
}

export interface IncrementResponse {
  count: number;
}
