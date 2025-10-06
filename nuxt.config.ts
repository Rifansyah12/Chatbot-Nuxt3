export default defineNuxtConfig({
  devtools: {
    enabled: false,
  },
  modules: ["@nuxtjs/tailwindcss", "shadcn-nuxt", "@logto/nuxt"],

  runtimeConfig: {
    // Private: hanya server
    logto: {
      appSecret: "pjhzqvDNKpfK8I4B8r7pgzdhwzvV0MYI",
      cookieEncryptionKey: "4GoeMH7IL6GNvqKHOyeyLRXpgMkToi2H",
    },
    googleGenerativeAIKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY, // hanya server

    // Public: bisa diakses client
    public: {
      logto: {
        endpoint: "https://cvbwg8.logto.app/",
        appId: "k200ti51vzke3d4b8p8oh",
      },
      pathnames: {
        signIn: "/login",
        signOut: "/logout",
        callback: "/auth/callback",
      },
    },
  },

  shadcn: {
    prefix: "",
    componentDir: "./components/ui",
  },

  // ⬇ Tambahkan ini untuk Netlify
  ssr: false,
  nitro: {
    preset: "netlify",
  },
});
