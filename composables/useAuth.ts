import { ref } from "vue";

const user = ref<{ id: string; email: string } | null>(null);

export function useAuth() {
  const login = async () => {
    // TODO: Integrasi Logto di sini
    user.value = { id: "123", email: "user@example.com" };
  };

  const logout = () => {
    user.value = null;
  };

  return { user, login, logout };
}
