/**
 * Sanitizes database/API error messages before displaying to users.
 * Prevents leaking internal DB structure details.
 */
export function sanitizeDbError(error: any): string {
  if (!error) return "Erro desconhecido. Tente novamente.";

  const code = error?.code;

  if (code === "23505") return "Já existe um registro com esses dados.";
  if (code === "23503") return "Referência inválida. Verifique os dados.";
  if (code === "23502") return "Campo obrigatório não preenchido.";
  if (code === "23514") return "Valor informado não é permitido.";
  if (code === "42501") return "Você não tem permissão para esta ação.";
  if (code === "PGRST301") return "Você não tem permissão para acessar estes dados.";

  // Log the full error for debugging in development only
  if (import.meta.env.DEV) {
    console.error("[DB Error]", error);
  }

  return "Erro ao processar solicitação. Tente novamente.";
}
