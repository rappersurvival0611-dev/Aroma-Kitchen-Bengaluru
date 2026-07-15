import { Router, type IRouter } from "express";
import { eq, desc } from "drizzle-orm";
import { db, reviewsTable } from "@workspace/db";
import { CreateReviewBody, ListReviewsResponse, CreateReviewResponse } from "@workspace/api-zod";
import { isRateLimited } from "../lib/rateLimit";

const router: IRouter = Router();

router.get("/reviews", async (req, res) => {
  const rows = await db
    .select()
    .from(reviewsTable)
    .where(eq(reviewsTable.status, "approved"))
    .orderBy(desc(reviewsTable.createdAt));

  const data = ListReviewsResponse.parse(rows);
  res.json(data);
});

router.post("/reviews", async (req, res) => {
  const parsed = CreateReviewBody.safeParse(req.body);
  if (!parsed.success) {
    req.log.warn({ issues: parsed.error.issues }, "Invalid review submission");
    res.status(400).json({ error: "Invalid review submission" });
    return;
  }

  const ip = req.ip ?? "unknown";
  if (isRateLimited(`review:${ip}`, 30_000)) {
    res.status(429).json({ error: "Please wait a moment before submitting another review" });
    return;
  }

  const { name, email, rating, message } = parsed.data;

  const [created] = await db
    .insert(reviewsTable)
    .values({
      name: name.trim(),
      email: email ? email.trim() : null,
      rating,
      message: message.trim(),
      status: "approved",
    })
    .returning();

  req.log.info({ reviewId: created.id }, "Review created");

  const data = CreateReviewResponse.parse(created);
  res.status(201).json(data);
});

export default router;
