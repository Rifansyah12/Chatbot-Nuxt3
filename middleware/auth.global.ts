import { defineNuxtRouteMiddleware, useCookie, navigateTo } from "#app";
import type { RouteLocationNormalized } from "vue-router";

export default defineNuxtRouteMiddleware((to: RouteLocationNormalized) => {
  // Ambil cookie userId di client
  const userId = useCookie("userId").value;

  // Kalau belum login & akses dashboard → redirect
  if (!userId && to.path.startsWith("/dashboard")) {
    return navigateTo("/login");
  }
});
