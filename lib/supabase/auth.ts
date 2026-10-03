export const EMAIL_DOMAIN = "amplifica2.local";

export function usuarioAEmail(usuario: string): string {
  return `${usuario.trim().toLowerCase()}@${EMAIL_DOMAIN}`;
}
