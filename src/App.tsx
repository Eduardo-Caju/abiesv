import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Index from "./pages/Index";
import Sobre from "./pages/Sobre";
import Historia from "./pages/Historia";
import Diretoria from "./pages/Diretoria";
import BoasPraticas from "./pages/BoasPraticas";
import AssocieSe from "./pages/AssocieSe";
import Associados from "./pages/Associados";
import AssociadoPerfil from "./pages/AssociadoPerfil";
import Eventos from "./pages/Eventos";
import BackstageDoVarejo from "./pages/BackstageDoVarejo";
import Workshops from "./pages/Workshops";
import Biblioteca from "./pages/Biblioteca";
import NumerosDoSetor from "./pages/NumerosDoSetor";
import Noticias from "./pages/Noticias";
import Contato from "./pages/Contato";
import Parceiros from "./pages/Parceiros";
import Privacidade from "./pages/Privacidade";
import Termos from "./pages/Termos";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Home */}
          <Route path="/" element={<Index />} />
          
          {/* Sobre */}
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/sobre/historia" element={<Historia />} />
          <Route path="/sobre/diretoria" element={<Diretoria />} />
          <Route path="/sobre/boas-praticas" element={<BoasPraticas />} />
          
          {/* Associação */}
          <Route path="/associe-se" element={<AssocieSe />} />
          <Route path="/associados" element={<Associados />} />
          <Route path="/associados/:slug" element={<AssociadoPerfil />} />
          
          {/* Eventos */}
          <Route path="/eventos" element={<Eventos />} />
          <Route path="/eventos/backstage-do-varejo" element={<BackstageDoVarejo />} />
          {/* <Route path="/eventos/backstage-do-varejo/:slug" element={<BackstageEdicao />} /> */}
          <Route path="/eventos/workshops" element={<Workshops />} />
          {/* <Route path="/eventos/workshops/:slug" element={<WorkshopDetalhe />} /> */}
          
          {/* Biblioteca */}
          <Route path="/biblioteca" element={<Biblioteca />} />
          {/* <Route path="/biblioteca/:slug" element={<BibliotecaItem />} /> */}
          
          {/* Números do Setor */}
          <Route path="/numeros-do-setor" element={<NumerosDoSetor />} />
          
          {/* Notícias */}
          <Route path="/noticias" element={<Noticias />} />
          {/* <Route path="/noticias/:slug" element={<NoticiaPost />} /> */}
          
          {/* Contato */}
          <Route path="/contato" element={<Contato />} />
          
          {/* Parceiros */}
          <Route path="/parceiros" element={<Parceiros />} />
          
          {/* Legal */}
          <Route path="/privacidade" element={<Privacidade />} />
          <Route path="/termos" element={<Termos />} />
          
          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
