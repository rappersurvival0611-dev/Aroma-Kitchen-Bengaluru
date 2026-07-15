import { integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const reservationsTable = pgTable("reservations", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  phone: text("phone").notNull(),
  email: text("email"),
  date: text("date").notNull(),
  time: text("time").notNull(),
  guests: text("guests").notNull(),
  status: text("status").notNull().default("confirmed"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const insertReservationSchema = createInsertSchema(reservationsTable, {
  name: (schema) => schema.trim().min(2, "Name must be at least 2 characters").max(100, "Name is too long"),
  phone: (schema) => schema.trim().min(7, "Enter a valid phone number").max(20, "Phone number is too long"),
  date: (schema) => schema.trim().min(1, "Please select a date"),
  time: (schema) => schema.trim().min(1, "Please select a time"),
  guests: (schema) => schema.trim().min(1, "Please select number of guests"),
})
  .omit({ id: true, createdAt: true, status: true, email: true })
  .extend({
    email: z.string().trim().email("Enter a valid email address").max(255).optional().or(z.literal("")),
  });

export type InsertReservation = z.infer<typeof insertReservationSchema>;
export type Reservation = typeof reservationsTable.$inferSelect;
