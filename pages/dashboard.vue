<template>
  <div class="flex h-screen bg-[#0d0d0d] text-[#00ffea] font-mono">
    <Sidebar />
    <div class="flex-1 flex flex-col bg-[#121212]">
      <Header />
      <main class="flex-1 overflow-y-auto p-6 space-y-4">
        <ChatBubble
          v-for="(msg, index) in safeMessages"
          :key="index"
          :isUser="msg.role === 'user'"
        >
          {{ msg.content }}
        </ChatBubble>

        <div
          v-if="!safeMessages.length"
          class="text-center text-gray-400 py-10"
        >
          Mulai chat baru dengan mengetik pesan di bawah 👇
        </div>
      </main>

      <!-- panggil fungsi handleSend di sini -->
      <ChatInput :onSend="handleSend" />
    </div>
  </div>
</template>

<script setup lang="ts">
import Sidebar from "@/components/Sidebar.vue";
import Header from "@/components/Header.vue";
import ChatInput from "@/components/ChatInput.vue";
import ChatBubble from "@/components/ChatBubble.vue";
import { useChat } from "@/composables/useChat";
import { computed, ref } from "vue";

const chat = useChat();
const safeMessages = computed(() => chat.messages.value ?? []);

// ambil userId dari cookie
const userId = ref<string | null>(null);
const cookie = document.cookie.split("; ").find((r) => r.startsWith("userId="));
if (cookie) userId.value = cookie.split("=")[1];

// sessionId bisa tetap atau dinamis
const sessionId = ref(crypto.randomUUID());

// fungsi kirim pesan ke server
async function handleSend(content: string) {
  if (!userId.value) return;
  await chat.sendMessage(sessionId.value, content, userId.value);
}
</script>
