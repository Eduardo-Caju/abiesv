import { useEffect } from "react";

interface SEOHeadProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
  schema?: object | object[];
}

export function SEOHead({
  title,
  description,
  canonical,
  ogImage = "/og-default.jpg",
  ogType = "website",
  schema,
}: SEOHeadProps) {
  useEffect(() => {
    // Update document title
    document.title = title;

    // Update or create meta tags
    const updateMeta = (name: string, content: string, property?: boolean) => {
      const attr = property ? "property" : "name";
      let meta = document.querySelector(`meta[${attr}="${name}"]`);
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute(attr, name);
        document.head.appendChild(meta);
      }
      meta.setAttribute("content", content);
    };

    updateMeta("description", description);
    updateMeta("og:title", title, true);
    updateMeta("og:description", description, true);
    updateMeta("og:type", ogType, true);
    updateMeta("og:image", ogImage, true);
    updateMeta("twitter:card", "summary_large_image");
    updateMeta("twitter:title", title);
    updateMeta("twitter:description", description);
    updateMeta("twitter:image", ogImage);

    // Update canonical link
    if (canonical) {
      let link = document.querySelector('link[rel="canonical"]');
      if (!link) {
        link = document.createElement("link");
        link.setAttribute("rel", "canonical");
        document.head.appendChild(link);
      }
      link.setAttribute("href", canonical);
    }

    // Add/update JSON-LD schema
    if (schema) {
      const schemas = Array.isArray(schema) ? schema : [schema];
      
      // Remove existing schema scripts
      document.querySelectorAll('script[type="application/ld+json"]').forEach(el => el.remove());
      
      schemas.forEach(s => {
        const script = document.createElement("script");
        script.type = "application/ld+json";
        script.text = JSON.stringify(s);
        document.head.appendChild(script);
      });
    }

    return () => {
      // Cleanup schema on unmount
      document.querySelectorAll('script[type="application/ld+json"]').forEach(el => el.remove());
    };
  }, [title, description, canonical, ogImage, ogType, schema]);

  return null;
}

// Common schema templates
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "ABIESV",
  alternateName: "Associação Brasileira da Indústria de Equipamentos e Serviços para o Varejo",
  url: "https://abiesv.org.br",
  logo: "https://abiesv.org.br/logo.png",
  description: "Associação que conecta indústria, serviços e varejo no ecossistema de PDV brasileiro.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "São Paulo",
    addressRegion: "SP",
    addressCountry: "BR",
  },
  sameAs: [
    "https://linkedin.com/company/abiesv",
    "https://instagram.com/abiesv",
    "https://youtube.com/@abiesv",
  ],
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "ABIESV",
  url: "https://abiesv.org.br",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://abiesv.org.br/busca?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
};

export function createBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function createEventSchema(event: {
  name: string;
  description: string;
  startDate: string;
  endDate?: string;
  location: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.name,
    description: event.description,
    startDate: event.startDate,
    endDate: event.endDate || event.startDate,
    location: {
      "@type": "Place",
      name: event.location,
    },
    organizer: {
      "@type": "Organization",
      name: "ABIESV",
      url: "https://abiesv.org.br",
    },
    url: event.url,
  };
}

export function createFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}
