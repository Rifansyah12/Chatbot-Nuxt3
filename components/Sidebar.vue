<template>
  <aside class="flex flex-col bg-[#0f0f0f] border-r border-[#00ffea] w-64">
    <!-- Header -->
    <div class="p-4 flex justify-between items-center">
      <h2 class="text-2xl font-bold text-[#00ffea]">Chats</h2>
    </div>

    <!-- Daftar Chat -->
    <ul class="flex-1 overflow-y-auto space-y-1">
      <li v-for="chat in chats" :key="chat.id">
        <button
          @click="selectChat(chat)"
          class="w-full text-left px-4 py-2 rounded hover:bg-[#00ffea] hover:text-[#0d0d0d]"
        >
          {{ chat.title }}
        </button>
      </li>
    </ul>

    <!-- Tombol Chat Baru -->
    <button
      @click="newChat"
      class="m-4 px-5 py-3 bg-[#00ffea] text-[#0d0d0d] rounded font-semibold"
    >
      + New Chat
    </button>
  </aside>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useChat } from "@/composables/useChat";

interface ChatSession {
  id: string;
  title: string;
  userId: string;
}

const chats = ref<ChatSession[]>([]);
const userId = ref<string | null>(null);
const { loadMessages, resetMessages, currentSessionId } = useChat();

// 🔹 Ambil userId dari cookie & load semua session
onMounted(async () => {
  const cookie = document.cookie
    .split("; ")
    .find((r) => r.startsWith("userId="));

  if (cookie) userId.value = cookie.split("=")[1];
  if (!userId.value) return;

  try {
    const res = await $fetch(`/api/chat/sessions?userId=${userId.value}`);
    chats.value = Array.isArray(res) ? res : [];
  } catch (err) {
    console.error("Gagal load sessions", err);
  }
});

// 🔹 Pilih chat
const selectChat = async (chat: ChatSession) => {
  if (!chat.id) return;
  await loadMessages(chat.id);
};

// 🔹 Buat chat baru
const newChat = async () => {
  if (!userId.value) return;

  try {
    const session = await $fetch<ChatSession>("/api/chat/new", {
      method: "POST",
      body: {
        userId: userId.value,
        title: "Chat Baru",
      },
    });

    chats.value.unshift(session);
    resetMessages(); // Kosongkan ChatBubble
    await loadMessages(session.id);
  } catch (err) {
    console.error("Gagal membuat chat baru", err);
  }
};
</script>
