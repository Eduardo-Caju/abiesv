// Dados dos associados ABIESV (extraídos da base oficial)
// Contatos são gerenciados no banco de dados (restritos a admins) e não expostos no bundle.

export interface Associate {
  slug: string;
  name: string;
  tradingName: string;
  cnpj: string;
  category: string;
  joinedDate: string;
  // Campos para preenchimento pelo associado
  shortDescription?: string; // 150-200 caracteres
  fullDescription?: string;  // 500-800 caracteres
  website?: string;
  linkedin?: string;
  instagram?: string;
  logo?: string;             // Caminho para o logo
  solutions?: string[];      // Tags de soluções oferecidas
  sectors?: string[];        // Setores atendidos
  city?: string;
  state?: string;
}

// Categorias únicas (usadas em filtros e formulários do admin)
export const categories = [
  "Todas",
  "Iluminação",
  "Especificadora",
  "Conteúdo Digital",
  "Mobiliário e Equipamentos",
  "Gráfica Digital",
  "Visual Merchandising",
  "Fabricação de Manequins e Displays",
  "Construção Civil",
  "Escritório de Advocacia",
  "Fabricação de Móveis",
  "Tecnologia para Varejo",
  "Consultoria",
  "Escritório de Arquitetura",
  "Comunicação Visual, Mobiliário e Expositores",
  "Automatizadores de Portas e Portões",
  "Engenharia",
  "Prevenção de Perdas",
  "Painéis Eletrônicos",
];

// Estados únicos
export const states = [
  "Todos",
  "SP",
  "PR",
  "GO",
];

// Helper para obter iniciais do logo
export function getLogoInitials(name: string): string {
  return name
    .split(' ')
    .filter(word => word.length > 2 || word === word.toUpperCase())
    .slice(0, 2)
    .map(word => word[0])
    .join('')
    .toUpperCase();
}
