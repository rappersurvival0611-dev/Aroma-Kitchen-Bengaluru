import { Router, type IRouter } from "express";
import { db, reservationsTable } from "@workspace/db";
import { CreateReservationBody, CreateReservationResponse } from "@workspace/api-zod";
import { isRateLimited } from "../lib/rateLimit";

const router: IRouter = Router();

router.post("/reservations", async (req, res) => {
  const parsed = CreateReservationBody.safeParse(req.body);
  if (!parsed.success) {
    req.log.warn({ issues: parsed.error.issues }, "Invalid reservation submission");
    res.status(400).json({ error: "Invalid reservation submission" });
    return;
  }

  const ip = req.ip ?? "unknown";
  if (isRateLimited(`reservation:${ip}`, 30_000)) {
    res.status(429).json({ error: "Please wait a moment before submitting another reservation" });
    return;
  }

  const { name, phone, email, date, time, guests } = parsed.data;

  const [created] = await db
    .insert(reservationsTable)
    .values({
      name: name.trim(),
      phone: phone.trim(),
      email: email ? email.trim() : null,
      date,
      time,
      guests,
      status: "confirmed",
    })
    .returning();

  req.log.info({ reservationId: created.id }, "Reservation created");

  // WhatsApp notification pending: see reservation-whatsapp-notify decision.

  const data = CreateReservationResponse.parse(created);
  res.status(201).json(data);
});

export default router;
