/**
 * Vercel KV wrapper. If KV env vars are unset, exports a no-op stub so dev
 * works without setup.
 */
import { kv as vercelKv } from "@vercel/kv";

const isConfigured = Boolean(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);

type KvLike = {
  set: (key: string, value: unknown) => Promise<unknown>;
  get: <T>(key: string) => Promise<T | null>;
  exists: (key: string) => Promise<number>;
};

const stub: KvLike = {
  set: async () => "OK",
  get: async () => null,
  exists: async () => 0,
};

export const kv: KvLike = isConfigured ? (vercelKv as unknown as KvLike) : stub;
export const kvConfigured = isConfigured;
