import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Associate } from "@/data/associates";

function toSlug(name: string): string {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function useApprovedAssociates() {
  return useQuery({
    queryKey: ["approved-associates"],
    staleTime: 5 * 60 * 1000, // 5 minutos — dados raramente mudam
    queryFn: async (): Promise<Associate[]> => {
      const { data: submissions, error } = await supabase
        .from("associate_submissions")
        .select("*")
        .eq("status", "aprovado");

      if (error) throw error;
      if (!submissions) return [];

      return submissions.map((s) => ({
          slug: toSlug(s.nome_fantasia),
          name: s.nome_fantasia,
          tradingName: s.razao_social,
          cnpj: s.cnpj,
          category: s.categoria,
          shortDescription: s.descricao_curta,
          fullDescription: s.descricao_completa ?? undefined,
          website: s.website ?? undefined,
          linkedin: s.linkedin ?? undefined,
          instagram: s.instagram ?? undefined,
          logo: s.logo_url ?? undefined,
          solutions: s.solucoes ?? undefined,
          sectors: s.setores ?? undefined,
          city: s.cidade,
          state: s.estado,
          joinedDate: s.created_at,
          contacts: [],
      }));
    },
  });
}
