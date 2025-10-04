import { jwtDecode } from "jwt-decode";

interface IdToken {
  sub: string;
  email?: string;
  name?: string;
}

export function decodeIdToken(idToken: string): IdToken {
  return jwtDecode<IdToken>(idToken);
}
