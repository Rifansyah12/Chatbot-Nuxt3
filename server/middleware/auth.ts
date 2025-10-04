// server/middleware/auth.ts
import prisma from "@/lib/prisma";

export default defineEventHandler(async (event) => {
  const url = getRequestURL(event);

  // lewati route publik
  const publicPaths = ["/api/auth/callback", "/", "/login"];
  if (publicPaths.some((p) => url.pathname.startsWith(p))) {
    return;
  }

  const userId = getCookie(event, "userId");
  console.log("DEBUG cookies:", parseCookies(event));

  if (!userId) {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized",
    });
  }

  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized",
    });
  }

  event.context.user = user;
});
