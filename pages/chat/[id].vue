<script setup lang="ts">
import { useChat } from "@/composables/useChat";
import { ref, onMounted, watch } from "vue";
import { useRoute } from "#app";
const { messages, sendMessage, loadMessages } = useChat();
const route = useRoute();
const sessionId = ref(route.params.id as string);
const userId = ref<string | null>(null);
onMounted(async () => {
  const cookie = document.cookie
    .split("; ")
    .find((r) => r.startsWith("userId="));
  if (cookie) userId.value = cookie.split("=")[1];
  if (sessionId.value) await loadMessages(sessionId.value);
}); // kalau pindah ke chat lain (sidebar diklik)
watch(
  () => route.params.id,
  async (newId) => {
    sessionId.value = newId as string;
    await loadMessages(sessionId.value);
  }
);
const onSend = async (content: string) => {
  if (!sessionId.value || !userId.value) return;
  await sendMessage(sessionId.value, content, userId.value);
};
</script>
