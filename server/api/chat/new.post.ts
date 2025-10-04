import prisma from "@/lib/prisma";
import { defineEventHandler, readBody } from "h3";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { userId, title } = body;

  if (!userId) return { error: "User ID required" };

  const session = await prisma.chatSession.create({
    data: {
      userId,
      title: title || "New Chat",
    },
  });

  return session;
});
