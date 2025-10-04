// server/api/auth/callback.post.ts
import prisma from "@/lib/prisma";
import { decodeIdToken } from "@/server/utils/logto";

export default defineEventHandler(async (event) => {
  const body = await readBody<{ code: string }>(event);
  const config = useRuntimeConfig();

  const tokenUrl = `${config.public.logto.endpoint.replace(
    /\/$/,
    ""
  )}/oidc/token`;

  const params = new URLSearchParams({
    grant_type: "authorization_code",
    code: body.code,
    redirect_uri: `${getRequestURL(event).origin}${
      config.public.pathnames.callback
    }`,
    client_id: config.public.logto.appId,
  });

  if (config.logto.appSecret) {
    params.set("client_secret", config.logto.appSecret);
  }
  console.log("TOKEN REQUEST PARAMS:", Object.fromEntries(params));
  console.log("TOKEN URL:", tokenUrl);

  const tokens = await $fetch<{
    access_token: string;
    id_token: string;
    refresh_token: string;
  }>(tokenUrl, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params,
  });

  // decode id_token untuk ambil user info
  const userInfo = decodeIdToken(tokens.id_token);

  // cek user di DB
  let user = await prisma.user.findUnique({
    where: { logtoId: userInfo.sub },
  });

  if (!user) {
    user = await prisma.user.create({
      data: {
        logtoId: userInfo.sub,
        email: userInfo.email ?? `${userInfo.sub}@no-email.logto`,
      },
    });
  }

  // bisa set cookie session kalau perlu
  setCookie(event, "userId", user.id, {
    httpOnly: false,
    secure: false,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 hari
  });

  return { user, tokens };
});
