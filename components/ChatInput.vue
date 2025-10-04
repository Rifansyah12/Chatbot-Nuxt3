<template>
  <form
    @submit.prevent="handleSubmit"
    class="flex items-center gap-2 p-3 border-t border-[#00ffea]"
  >
    <input
      v-model="input"
      placeholder="Tulis pesan..."
      class="flex-1 bg-[#121212] text-[#00ffea] placeholder-[#00ffea]/70 border border-[#00ffea] rounded-lg px-3 py-2 focus:outline-none focus:border-[#00cca8]"
    />
    <button
      type="submit"
      class="bg-[#00ffea] text-[#0d0d0d] px-4 py-2 rounded-lg hover:bg-[#00cca8] shadow-[0_0_10px_#00ffea]"
    >
      Kirim
    </button>
  </form>
</template>

<script setup lang="ts">
import { ref } from "vue";

const props = defineProps<{
  onSend: (content: string) => Promise<void>;
}>();

const input = ref("");

async function handleSubmit() {
  if (!input.value.trim()) return;
  await props.onSend(input.value);
  input.value = "";
}
</script>
