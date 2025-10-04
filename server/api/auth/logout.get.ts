export default defineEventHandler((event) => {
  // hapus cookie session lokal
  deleteCookie(event, "userId");

  return { success: true };
});
