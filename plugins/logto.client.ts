// plugins/logto.client.ts
import { defineNuxtPlugin } from "#app";
import "@logto/vue";

export default defineNuxtPlugin(() => {
  // Tidak perlu membuat instance lagi
  // Logto akan diakses via useLogto() di komponen
});
