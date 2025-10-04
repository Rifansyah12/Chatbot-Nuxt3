import { ref } from "vue";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export const useChat = () => {
  const messages = ref<ChatMessage[]>([]);
  const loading = ref(false);
  const currentSessionId = ref<string | null>(null);

  // 🔹 Load messages dari database
  const loadMessages = async (sessionId: string) => {
    if (!sessionId) return;

    currentSessionId.value = sessionId;
    loading.value = true;

    try {
      const res = await $fetch<ChatMessage[]>(`/api/chat/${sessionId}`);
      messages.value = res.map((msg) => ({
        role: msg.role,
        content: msg.content,
      }));
    } catch (err) {
      console.error("Gagal memuat pesan:", err);
      messages.value = [];
    } finally {
      loading.value = false;
    }
  };

  // 🔹 Kirim pesan user + simpan di DB + balasan AI
  const sendMessage = async (
    sessionId: string,
    content: string,
    userId: string
  ) => {
    if (!content.trim()) return;

    // update session
    currentSessionId.value = sessionId;
    loading.value = true;

    // tampilkan pesan user di UI langsung
    messages.value.push({ role: "user", content });

    try {
      const res = await $fetch<{ aiMessage: { content: string } }>(
        "/api/chat",
        {
          method: "POST",
          body: {
            sessionId,
            userId,
            message: content,
          },
        }
      );

      if (res.aiMessage?.content) {
        messages.value.push({
          role: "assistant",
          content: res.aiMessage.content,
        });
      }
    } catch (err) {
      console.error("Gagal mengirim pesan:", err);
    } finally {
      loading.value = false;
    }
  };

  // 🔹 Reset chat untuk sesi baru
  const resetMessages = () => {
    messages.value = [];
    currentSessionId.value = null;
  };

  return {
    messages,
    loading,
    currentSessionId,
    loadMessages,
    sendMessage,
    resetMessages,
  };
};
