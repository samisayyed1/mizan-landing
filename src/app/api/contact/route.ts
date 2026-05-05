import { type NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { kv, kvConfigured } from "@/lib/kv";

export const runtime = "edge";

const Body = z.object({
  email: z.string().email(),
  message: z.string().min(1).max(2000),
});

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 3;
const buckets = new Map<string, { count: number; resetAt: number }>();

function clientIp(req: NextRequest): string {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) {
    const first = xff.split(",")[0]?.trim();
    if (first) return first;
  }
  return req.headers.get("x-real-ip") ?? "unknown";
}

function checkRate(ip: string): boolean {
  const now = Date.now();
  const b = buckets.get(ip);
  if (!b || now > b.resetAt) {
    buckets.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }
  if (b.count >= RATE_LIMIT_MAX) return false;
  b.count += 1;
  return true;
}

export async function POST(req: NextRequest) {
  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request." },
      { status: 400 },
    );
  }

  const parsed = Body.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Invalid input." },
      { status: 400 },
    );
  }

  const ip = clientIp(req);
  if (!checkRate(ip)) {
    return NextResponse.json(
      { ok: false, error: "Too many requests." },
      { status: 429 },
    );
  }

  if (!kvConfigured) {
    return NextResponse.json({ ok: true, configured: false });
  }

  try {
    const key = `contact:${Date.now()}:${parsed.data.email.toLowerCase()}`;
    await kv.set(key, {
      email: parsed.data.email.toLowerCase(),
      message: parsed.data.message,
      ip,
      createdAt: new Date().toISOString(),
    });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Storage error." },
      { status: 500 },
    );
  }
}
