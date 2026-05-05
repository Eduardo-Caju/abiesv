export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      admin_permissions: {
        Row: {
          created_at: string
          id: string
          permission: Database["public"]["Enums"]["admin_permission"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          permission: Database["public"]["Enums"]["admin_permission"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          permission?: Database["public"]["Enums"]["admin_permission"]
          user_id?: string
        }
        Relationships: []
      }
      associate_members: {
        Row: {
          created_at: string
          id: string
          submission_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          submission_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          submission_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "associate_members_submission_id_fkey"
            columns: ["submission_id"]
            isOneToOne: false
            referencedRelation: "associate_submissions"
            referencedColumns: ["id"]
          },
        ]
      }
      associate_submission_contacts: {
        Row: {
          cargo: string | null
          celular: string | null
          created_at: string
          email: string
          id: string
          nome: string
          submission_id: string
          telefone_fixo: string | null
        }
        Insert: {
          cargo?: string | null
          celular?: string | null
          created_at?: string
          email: string
          id?: string
          nome: string
          submission_id: string
          telefone_fixo?: string | null
        }
        Update: {
          cargo?: string | null
          celular?: string | null
          created_at?: string
          email?: string
          id?: string
          nome?: string
          submission_id?: string
          telefone_fixo?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "associate_submission_contacts_submission_id_fkey"
            columns: ["submission_id"]
            isOneToOne: false
            referencedRelation: "associate_submissions"
            referencedColumns: ["id"]
          },
        ]
      }
      associate_submissions: {
        Row: {
          categoria: string
          cidade: string
          cnpj: string
          created_at: string
          descricao_completa: string | null
          descricao_curta: string
          estado: string
          id: string
          instagram: string | null
          linkedin: string | null
          logo_url: string | null
          nome_fantasia: string
          observacao_admin: string | null
          razao_social: string
          setores: string[] | null
          solucoes: string[] | null
          status: Database["public"]["Enums"]["submission_status"]
          updated_at: string
          website: string | null
        }
        Insert: {
          categoria: string
          cidade: string
          cnpj: string
          created_at?: string
          descricao_completa?: string | null
          descricao_curta: string
          estado: string
          id?: string
          instagram?: string | null
          linkedin?: string | null
          logo_url?: string | null
          nome_fantasia: string
          observacao_admin?: string | null
          razao_social: string
          setores?: string[] | null
          solucoes?: string[] | null
          status?: Database["public"]["Enums"]["submission_status"]
          updated_at?: string
          website?: string | null
        }
        Update: {
          categoria?: string
          cidade?: string
          cnpj?: string
          created_at?: string
          descricao_completa?: string | null
          descricao_curta?: string
          estado?: string
          id?: string
          instagram?: string | null
          linkedin?: string | null
          logo_url?: string | null
          nome_fantasia?: string
          observacao_admin?: string | null
          razao_social?: string
          setores?: string[] | null
          solucoes?: string[] | null
          status?: Database["public"]["Enums"]["submission_status"]
          updated_at?: string
          website?: string | null
        }
        Relationships: []
      }
      member_benefits: {
        Row: {
          active: boolean
          benefit_type: string
          category: string
          created_at: string
          description: string
          featured: boolean
          id: string
          link_url: string | null
          partner_logo_url: string | null
          partner_name: string
          promo_code: string | null
          title: string
          updated_at: string
          valid_until: string | null
        }
        Insert: {
          active?: boolean
          benefit_type?: string
          category: string
          created_at?: string
          description: string
          featured?: boolean
          id?: string
          link_url?: string | null
          partner_logo_url?: string | null
          partner_name: string
          promo_code?: string | null
          title: string
          updated_at?: string
          valid_until?: string | null
        }
        Update: {
          active?: boolean
          benefit_type?: string
          category?: string
          created_at?: string
          description?: string
          featured?: boolean
          id?: string
          link_url?: string | null
          partner_logo_url?: string | null
          partner_name?: string
          promo_code?: string | null
          title?: string
          updated_at?: string
          valid_until?: string | null
        }
        Relationships: []
      }
      news_articles: {
        Row: {
          category: string
          created_at: string
          excerpt: string
          featured: boolean
          id: string
          published_date: string
          sector: string
          slug: string
          source: string
          source_url: string
          title: string
          updated_at: string
        }
        Insert: {
          category: string
          created_at?: string
          excerpt: string
          featured?: boolean
          id?: string
          published_date: string
          sector: string
          slug: string
          source: string
          source_url: string
          title: string
          updated_at?: string
        }
        Update: {
          category?: string
          created_at?: string
          excerpt?: string
          featured?: boolean
          id?: string
          published_date?: string
          sector?: string
          slug?: string
          source?: string
          source_url?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_admin_users: {
        Args: never
        Returns: {
          created_at: string
          email: string
          permissions: Database["public"]["Enums"]["admin_permission"][]
          user_id: string
        }[]
      }
      has_permission: {
        Args: {
          _permission: Database["public"]["Enums"]["admin_permission"]
          _user_id: string
        }
        Returns: boolean
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_associate: { Args: { _user_id: string }; Returns: boolean }
    }
    Enums: {
      admin_permission: "news" | "submissions" | "benefits" | "team"
      app_role: "admin" | "user" | "associado"
      submission_status: "pendente" | "aprovado" | "rejeitado"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      admin_permission: ["news", "submissions", "benefits", "team"],
      app_role: ["admin", "user", "associado"],
      submission_status: ["pendente", "aprovado", "rejeitado"],
    },
  },
} as const
