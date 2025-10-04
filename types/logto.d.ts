// types/logto.d.ts
import type { LogtoVuePlugin } from "@logto/vue";

declare module "#app" {
  interface NuxtApp {
    $logto: any; // atau bisa pakai LogtoVuePlugin jika ingin tipe lebih spesifik
  }
}
