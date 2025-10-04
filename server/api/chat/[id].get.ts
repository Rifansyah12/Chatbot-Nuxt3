import prisma from "@/lib/prisma";
import { defineEventHandler, getQuery } from "h3";

export default defineEventHandler(async (event) => {
  const { id } = getQuery(event); // sessionId

  if (!id) return { error: "Session ID required" };

  const messages = await prisma.message.findMany({
    where: { sessionId: String(id) },
    orderBy: { createdAt: "asc" },
  });

  return messages;
});
