import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import logoAbiesv from "@/assets/logo-abiesv.png";

const HubLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Usuário não encontrado");

      const { data: roles } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id);

      const allowed = roles?.some(r => r.role === "admin" || r.role === "associado");
      if (!allowed) {
        await supabase.auth.signOut();
        throw new Error("Sua conta ainda não tem acesso ao Hub. Fale com a secretaria@abiesv.com.br");
      }

      navigate("/hub");
    } catch (err: any) {
      toast({
        title: "Erro no login",
        description: err.message || "Verifique suas credenciais.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!email) {
      toast({ title: "Informe o e-mail", description: "Digite seu e-mail antes de pedir a redefinição.", variant: "destructive" });
      return;
    }
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/hub/login`,
    });
    if (error) {
      toast({ title: "Erro", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Pronto!", description: "Enviamos um e-mail com instruções." });
    }
  };

  return (
    <div className="min-h-screen gradient-subtle flex items-center justify-center p-4">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <img src={logoAbiesv} alt="ABIESV" className="h-10 mx-auto mb-4" />
          <CardTitle>Hub ABIESV</CardTitle>
          <CardDescription>Área exclusiva do associado</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input id="email" type="email" autoComplete="email" value={email} onChange={e => setEmail(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Senha</Label>
                <button type="button" onClick={handleResetPassword} className="text-xs text-primary hover:underline">
                  Esqueci minha senha
                </button>
              </div>
              <Input id="password" type="password" autoComplete="current-password" value={password} onChange={e => setPassword(e.target.value)} required />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Entrando..." : "Entrar"}
            </Button>
            <p className="text-xs text-muted-foreground text-center pt-2">
              Ainda não é associado?{" "}
              <Link to="/associados/cadastro" className="text-primary hover:underline">
                Cadastre sua empresa
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default HubLogin;
