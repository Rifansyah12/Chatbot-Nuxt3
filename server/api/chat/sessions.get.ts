import prisma from "@/lib/prisma";
import { defineEventHandler, getQuery } from "h3";

export default defineEventHandler(async (event) => {
  const { userId } = getQuery(event);
  if (!userId) return { error: "User ID required" };

  const sessions = await prisma.chatSession.findMany({
    where: { userId: String(userId) },
    orderBy: { createdAt: "desc" },
    include: {
      messages: {
        orderBy: { createdAt: "desc" },
        take: 1, // ambil pesan terakhir saja
      },
    },
  });

  // ubah supaya ada field `lastMessage` langsung
  return sessions.map((s) => ({
    id: s.id,
    title: s.title,
    userId: s.userId,
    createdAt: s.createdAt,
    lastMessage: s.messages[0]?.content || "", // ambil pesan terakhir
  }));
});
