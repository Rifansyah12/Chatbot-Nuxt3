<template>
  <div
    class="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-400 to-purple-600 text-white"
  >
    <!-- Spinner -->
    <div
      class="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mb-6"
    ></div>

    <!-- Teks loading -->
    <p class="text-lg font-semibold">Memproses login...</p>

    <!-- Optional: pesan tambahan -->
    <p class="mt-2 text-sm opacity-80">Mohon tunggu sebentar.</p>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from "#app";
import { onMounted } from "vue";

const route = useRoute();
const router = useRouter();

onMounted(async () => {
  const code = route.query.code as string;

  if (!code) {
    console.error("Kode login tidak ditemukan");
    return;
  }

  try {
    const res = await $fetch("/api/auth/callback", {
      method: "POST",
      body: { code },
      credentials: "include",
    });

    console.log("Login sukses:", res);
    router.push("/dashboard");
  } catch (err) {
    console.error("Gagal memproses login:", err);
  }
});
</script>
