export default defineEventHandler((event) => {
  return {
    cookies: parseCookies(event),
  };
});
