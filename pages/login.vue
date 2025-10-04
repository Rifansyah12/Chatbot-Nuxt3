<script setup lang="ts">
import { onMounted } from "vue";
import { useNuxtApp } from "#app";

const { $logto } = useNuxtApp();

onMounted(async () => {
  await ($logto as any).signIn(`${window.location.origin}/callback`);
});
</script>

<template>
  <div class="flex items-center justify-center min-h-screen text-white">
    <p>Mengarahkan ke halaman login...</p>
  </div>
</template>
