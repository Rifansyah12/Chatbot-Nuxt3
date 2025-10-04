import { generateText } from "ai";
import { google } from "@ai-sdk/google";
import prisma from "@/lib/prisma";

export default defineEventHandler(async (event) => {
  console.log("Key terbaca:", process.env.GOOGLE_GENERATIVE_AI_API_KEY);

  const body = await readBody<{
    sessionId: string;
    message: string;
    userId: string;
  }>(event);
  let { sessionId, message, userId } = body;

  // cek session
  let session = await prisma.chatSession.findUnique({
    where: { id: sessionId },
  });
  if (!session) {
    session = await prisma.chatSession.create({
      data: { userId, title: "Chat Baru" },
    });
    sessionId = session.id;
  }

  // simpan pesan user
  const userMessage = await prisma.message.create({
    data: { content: message, role: "user", sessionId },
  });

  // jika ini pesan pertama di session, update title session
  const messageCount = await prisma.message.count({ where: { sessionId } });
  if (messageCount === 1) {
    await prisma.chatSession.update({
      where: { id: sessionId },
      data: {
        title: message.length > 50 ? message.slice(0, 50) + "..." : message,
      },
    });
  }

  // panggil Google Gemini
  const config = useRuntimeConfig();
  process.env.GOOGLE_GENERATIVE_AI_API_KEY = config.googleGenerativeAIKey;

  const model = google("gemini-2.5-pro");

  const { text } = await generateText({
    model,
    prompt: message,
    system: "Anda adalah asisten cerdas.",
  });

  // simpan pesan AI
  await prisma.message.create({
    data: { content: text, role: "assistant", sessionId },
  });

  return { aiMessage: { content: text } };
});
