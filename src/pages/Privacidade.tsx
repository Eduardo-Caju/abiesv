import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { SEOHead, createBreadcrumbSchema } from "@/components/seo/SEOHead";

const Privacidade = () => {
  const pageSchema = [
    createBreadcrumbSchema([
      { name: "Home", url: "https://abiesv.org.br/" },
      { name: "Privacidade", url: "https://abiesv.org.br/privacidade" },
    ]),
  ];

  return (
    <Layout>
      <SEOHead
        title="Política de Privacidade — ABIESV"
        description="Política de privacidade e proteção de dados da ABIESV conforme a LGPD."
        canonical="https://abiesv.org.br/privacidade"
        schema={pageSchema}
      />

      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h1 className="font-heading text-4xl font-bold text-foreground mb-8">
              Política de Privacidade
            </h1>
            
            <div className="prose prose-lg max-w-none text-muted-foreground">
              <p className="lead">
                A ABIESV — Associação Brasileira da Indústria de Equipamentos e Serviços para o Varejo 
                está comprometida com a proteção dos dados pessoais de seus associados, participantes 
                de eventos e visitantes do site.
              </p>

              <h2 className="font-heading text-foreground">1. Dados que coletamos</h2>
              <p>
                Coletamos dados pessoais fornecidos voluntariamente através de formulários, 
                como nome, e-mail, telefone e empresa. Também coletamos dados de navegação automaticamente, 
                como endereço IP, tipo de navegador e páginas visitadas.
              </p>

              <h2 className="font-heading text-foreground">2. Como utilizamos seus dados</h2>
              <p>
                Utilizamos os dados coletados para:
              </p>
              <ul>
                <li>Processar solicitações de associação</li>
                <li>Enviar comunicações sobre eventos e novidades do setor</li>
                <li>Melhorar nossos serviços e conteúdos</li>
                <li>Cumprir obrigações legais e regulatórias</li>
              </ul>

              <h2 className="font-heading text-foreground">3. Compartilhamento de dados</h2>
              <p>
                Não vendemos ou compartilhamos seus dados pessoais com terceiros para 
                fins de marketing. Podemos compartilhar dados com prestadores de serviços que nos 
                auxiliam em nossas operações, sempre sob contratos de confidencialidade.
              </p>

              <h2 className="font-heading text-foreground">4. Seus direitos</h2>
              <p>
                Conforme a LGPD, você tem direito a:
              </p>
              <ul>
                <li>Acessar seus dados pessoais</li>
                <li>Corrigir dados incompletos ou desatualizados</li>
                <li>Solicitar a exclusão de seus dados</li>
                <li>Revogar o consentimento a qualquer momento</li>
              </ul>

              <h2 className="font-heading text-foreground">5. Contato</h2>
              <p>
                Para exercer seus direitos ou esclarecer dúvidas sobre esta política, entre em contato 
                através do e-mail{" "}
                <a href="mailto:secretaria@abiesv.org.br" className="text-primary hover:underline">
                  secretaria@abiesv.org.br
                </a>.
              </p>

              <p className="text-sm mt-8">
                Última atualização: Maio de 2026
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Privacidade;
