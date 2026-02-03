import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { SEOHead, createBreadcrumbSchema } from "@/components/seo/SEOHead";

const Termos = () => {
  const pageSchema = [
    createBreadcrumbSchema([
      { name: "Home", url: "https://abiesv.org.br/" },
      { name: "Termos", url: "https://abiesv.org.br/termos" },
    ]),
  ];

  return (
    <Layout>
      <SEOHead
        title="Termos de Uso — ABIESV"
        description="Termos e condições de uso do site e serviços da ABIESV."
        canonical="https://abiesv.org.br/termos"
        schema={pageSchema}
      />

      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h1 className="font-heading text-4xl font-bold text-foreground mb-8">
              Termos de Uso
            </h1>
            
            <div className="prose prose-lg max-w-none text-muted-foreground">
              <p className="lead">
                Ao acessar e utilizar o site da ABIESV, você concorda com os termos e condições 
                descritos abaixo.
              </p>

              <h2 className="font-heading text-foreground">1. Uso do site</h2>
              <p>
                [PLACEHOLDER] O conteúdo deste site é disponibilizado para fins informativos e 
                educacionais. É proibido copiar, reproduzir ou distribuir o conteúdo sem 
                autorização prévia.
              </p>

              <h2 className="font-heading text-foreground">2. Propriedade intelectual</h2>
              <p>
                [PLACEHOLDER] Todo o conteúdo do site, incluindo textos, imagens, logotipos e 
                materiais técnicos, é de propriedade da ABIESV ou licenciado para uso da associação.
              </p>

              <h2 className="font-heading text-foreground">3. Associação</h2>
              <p>
                [PLACEHOLDER] A associação à ABIESV está sujeita à aprovação da diretoria e ao 
                pagamento das anuidades conforme o perfil da empresa. Os benefícios são válidos 
                durante o período de vigência da associação.
              </p>

              <h2 className="font-heading text-foreground">4. Eventos</h2>
              <p>
                [PLACEHOLDER] A participação em eventos da ABIESV está sujeita à disponibilidade 
                de vagas e ao cumprimento das políticas específicas de cada evento.
              </p>

              <h2 className="font-heading text-foreground">5. Limitação de responsabilidade</h2>
              <p>
                [PLACEHOLDER] A ABIESV não se responsabiliza por danos decorrentes do uso das 
                informações disponibilizadas no site ou por interrupções no serviço.
              </p>

              <h2 className="font-heading text-foreground">6. Alterações</h2>
              <p>
                [PLACEHOLDER] A ABIESV reserva-se o direito de alterar estes termos a qualquer 
                momento. As alterações entram em vigor imediatamente após a publicação no site.
              </p>

              <p className="text-sm mt-8">
                Última atualização: [PLACEHOLDER DATA]
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Termos;
