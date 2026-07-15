---
name: Zod v3 vs v4 in Orval-generated OpenAPI code
description: Why `format: email` (or other Zod-v4-only string formats) in openapi.yaml breaks codegen when the workspace's zod package is v3.
---

Orval (as of v8.20) emits `zod.email()`, `zod.url()`, etc. (Zod v4 top-level string-format APIs) when an OpenAPI schema property has `format: email` / `format: uri`. If the workspace's installed `zod` package is v3.x, the default `zod` import has no `.email()` static method (that API only exists on the `zod/v4` subpath), so the generated file fails to typecheck with `TS2339`.

**Why:** the pnpm-workspace template's `lib/db` uses `zod/v4` internally in places, but the shared `zod` dependency resolved by the catalog is v3, and Orval's codegen targets whichever top-level API matches the OpenAPI `format` field regardless of the actual installed zod major version.

**How to apply:** when writing/editing `lib/api-spec/openapi.yaml` string properties, avoid `format: email`/`format: uri` etc. — just use `type: string` with `maxLength`/`minLength`. Do format validation manually server-side (e.g. a regex or `zod/v4`'s `.email()` explicitly in application code, not in the generated schema). Re-run `pnpm --filter @workspace/api-spec run codegen` after any openapi.yaml change to catch this early.
