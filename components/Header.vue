<template>
  <header
    class="flex items-center justify-between p-4 bg-[#0f0f0f] border-b border-[#00ffea]"
  >
    <h1
      class="text-2xl font-bold tracking-wide text-[#00ffea] drop-shadow-[0_0_5px_rgba(0,255,234,0.7)]"
    >
      R1 Chatbot
    </h1>
    <button
      class="px-4 py-2 bg-[#00ffea] text-[#0d0d0d] rounded-md hover:bg-[#00cca8] transition duration-200 shadow-[0_0_10px_#00ffea]"
      @click="logout"
    >
      Logout
    </button>
  </header>
</template>

<script setup lang="ts">
import { useRuntimeConfig } from "#app";

const logout = async () => {
  if (!process.client) return;

  await $fetch("/api/auth/logout", { method: "GET", credentials: "include" });

  const config = useRuntimeConfig().public as {
    logto: { endpoint: string };
  };

  const redirectUri = `${window.location.origin}/`;

  const logoutUrl = new URL(
    "oidc/session/end",
    config.logto.endpoint.replace(/\/$/, "")
  );
  logoutUrl.searchParams.set("post_logout_redirect_uri", redirectUri);

  window.location.href = logoutUrl.toString();
};
</script>
