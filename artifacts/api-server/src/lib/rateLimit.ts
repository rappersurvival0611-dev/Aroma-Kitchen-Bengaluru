// Simple in-memory per-IP cooldown to deter rapid duplicate submissions.
// Not distributed-safe; fine for a single-instance dev/small deployment.
const lastSubmission = new Map<string, number>();

export function isRateLimited(key: string, cooldownMs: number): boolean {
  const now = Date.now();
  const last = lastSubmission.get(key);
  if (last !== undefined && now - last < cooldownMs) {
    return true;
  }
  lastSubmission.set(key, now);
  return false;
}
