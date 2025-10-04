// import { defineEventHandler } from "h3";
// import LogtoClient from "@logto/node";
// import NodeAdapter from "@logto/node/dist/adapters/node.js";

// export default defineEventHandler(async (event) => {
//   const logtoClient = new LogtoClient(
//     {
//       endpoint: process.env.LOGTO_ENDPOINT!,
//       appId: process.env.LOGTO_APP_ID!,
//       appSecret: process.env.LOGTO_APP_SECRET!,
//     },
//     new NodeAdapter()
//   );

//   const redirectUri = "http://localhost:3000/api/auth/callback";

//   // Melakukan redirect ke halaman login Logto
//   logtoClient.signIn(redirectUri);

//   // Mengembalikan response kosong karena redirect sudah dilakukan
//   return {};
// });
