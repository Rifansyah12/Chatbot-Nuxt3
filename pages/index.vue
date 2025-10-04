<template>
  <div
    class="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-gray-200"
  >
    <!-- Card Container -->
    <div
      class="w-full max-w-md bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-10 flex flex-col items-center animate-fadeIn"
    >
      <!-- Logo / Icon -->
      <div
        class="w-20 h-20 flex items-center justify-center bg-[#3b82f6] rounded-full mb-6 shadow-lg"
      >
        <span class="text-3xl font-bold text-white">🔒</span>
      </div>

      <!-- Title -->
      <h1 class="text-3xl font-bold mb-3 text-center">Selamat Datang!</h1>
      <p class="text-gray-400 mb-8 text-center">
        Silakan login untuk melanjutkan ke dashboard Anda
      </p>

      <!-- Login Button -->
      <button
        class="w-full px-6 py-3 bg-[#3b82f6] text-white font-semibold rounded-lg shadow-lg hover:scale-105 hover:bg-[#2563eb] transition-transform duration-200"
        @click="login"
      >
        Login dengan Logto
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRuntimeConfig } from "#app";

interface PublicRuntimeConfig {
  logto: {
    endpoint: string;
    appId: string;
  };
  pathnames: {
    signIn: string;
    signOut: string;
    callback: string;
  };
}

const config = useRuntimeConfig().public as unknown as PublicRuntimeConfig;

const login = () => {
  if (!process.client) return;

  const redirectUri = `${window.location.origin}${config.pathnames.callback}`;
  const loginUrl = new URL(
    "oidc/auth",
    config.logto.endpoint.replace(/\/$/, "")
  );

  loginUrl.searchParams.set("response_type", "code");
  loginUrl.searchParams.set("client_id", config.logto.appId);
  loginUrl.searchParams.set("redirect_uri", redirectUri);
  loginUrl.searchParams.set("scope", "openid profile email");

  window.location.href = loginUrl.toString();
};
</script>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fadeIn {
  animation: fadeIn 0.8s ease-out;
}
</style>
