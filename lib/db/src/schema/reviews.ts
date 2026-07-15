import { integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const reviewsTable = pgTable("reviews", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email"),
  rating: integer("rating").notNull(),
  message: text("message").notNull(),
  status: text("status").notNull().default("approved"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const insertReviewSchema = createInsertSchema(reviewsTable, {
  name: (schema) => schema.trim().min(2, "Name must be at least 2 characters").max(100, "Name is too long"),
  rating: (schema) => schema.int().min(1, "Rating must be at least 1").max(5, "Rating must be at most 5"),
  message: (schema) =>
    schema.trim().min(10, "Review must be at least 10 characters").max(1000, "Review must be under 1000 characters"),
})
  .omit({ id: true, createdAt: true, status: true, email: true })
  .extend({
    email: z.string().trim().email("Enter a valid email address").max(255).optional().or(z.literal("")),
  });

export type InsertReview = z.infer<typeof insertReviewSchema>;
export type Review = typeof reviewsTable.$inferSelect;
