import { useState } from "react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { SEOHead, createBreadcrumbSchema, createEventSchema } from "@/components/seo/SEOHead";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar, MapPin, Users, ArrowRight, Video, Presentation, ExternalLink, Star } from "lucide-react";
import { 
  events, 
  eventTypes, 
  eventSectors, 
  getAbiestEvents, 
  formatEventDate,
  type EventType,
  type EventSector 
} from "@/data/events";

const Eventos = () => {
  const [selectedType, setSelectedType] = useState<string>("Todos");
  const [selectedSector, setSelectedSector] = useState<string>("Todos");
  const [selectedMonth, setSelectedMonth] = useState<string>("Todos");

  // Filtrar eventos (excluindo feriados por padrão)
  const filteredEvents = events
    .filter(e => !e.isHoliday)
    .filter(e => selectedType === "Todos" || e.type === selectedType)
    .filter(e => selectedSector === "Todos" || e.sector === selectedSector)
    .filter(e => {
      if (selectedMonth === "Todos") return true;
      const month = parseInt(selectedMonth);
      return new Date(e.startDate).getMonth() + 1 === month;
    })
    .sort((a, b) => {
      // Eventos ABIESV primeiro, depois por data
      if (a.isAbiestEvent && !b.isAbiestEvent) return -1;
      if (!a.isAbiestEvent && b.isAbiestEvent) return 1;
      return a.startDate.localeCompare(b.startDate);
    });

  const abiestEvents = getAbiestEvents();
  const featuredEvent = abiestEvents[0];

  const months = [
    { value: "1", label: "Janeiro" },
    { value: "2", label: "Fevereiro" },
    { value: "3", label: "Março" },
    { value: "4", label: "Abril" },
    { value: "5", label: "Maio" },
    { value: "6", label: "Junho" },
    { value: "7", label: "Julho" },
    { value: "8", label: "Agosto" },
    { value: "9", label: "Setembro" },
    { value: "10", label: "Outubro" },
    { value: "11", label: "Novembro" },
    { value: "12", label: "Dezembro" },
  ];

  const pageSchema = [
    createBreadcrumbSchema([
      { name: "Home", url: "https://abiesv.org.br/" },
      { name: "Eventos", url: "https://abiesv.org.br/eventos" },
    ]),
    ...filteredEvents.slice(0, 5).map(event => createEventSchema({
      name: event.name,
      description: event.description || `${event.type} em ${event.city || event.location}`,
      startDate: event.startDate,
      endDate: event.endDate,
      location: event.location || event.city || "A definir",
      url: event.registrationUrl || `https://abiesv.org.br/eventos`,
    })),
  ];

  return (
    <Layout>
      <SEOHead
        title="Agenda de Eventos 2026 — Feiras, Congressos e Eventos ABIESV"
        description="Calendário completo de eventos do varejo em 2026. NRF, EuroShop, APAS, Backstage do Varejo e mais. Inscreva-se."
        canonical="https://abiesv.org.br/eventos"
        schema={pageSchema}
      />

      {/* Hero */}
      <section className="py-20 gradient-subtle">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <Badge variant="secondary" className="mb-4">Agenda 2026</Badge>
            <h1 className="font-heading text-4xl sm:text-5xl font-bold text-foreground mb-6">
              Eventos do Varejo e PDV
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Calendário completo com as principais feiras, congressos e eventos do ecossistema de varejo. 
              Destaque para os eventos exclusivos ABIESV.
            </p>
          </div>
        </div>
      </section>

      {/* Featured ABIESV Event */}
      {featuredEvent && (
        <section className="py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <Card className="border-2 border-primary/20 shadow-card overflow-hidden bg-gradient-to-br from-primary/5 to-transparent">
              <CardContent className="p-0">
                <div className="grid lg:grid-cols-2">
                  <div className="p-8 lg:p-12">
                    <div className="flex items-center gap-2 mb-4">
                      <Badge className="bg-primary text-primary-foreground">
                        <Star className="h-3 w-3 mr-1" />
                        Evento ABIESV
                      </Badge>
                    </div>
                    <h2 className="font-heading text-3xl font-bold text-foreground mb-4">
                      {featuredEvent.name}
                    </h2>
                    <p className="text-muted-foreground mb-6">
                      {featuredEvent.description}
                    </p>
                    <div className="flex flex-wrap gap-4 mb-6">
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4 text-primary" />
                        <span>{formatEventDate(featuredEvent)}</span>
                      </div>
                      {featuredEvent.city && (
                        <div className="flex items-center gap-2 text-sm">
                          <MapPin className="h-4 w-4 text-primary" />
                          <span>{featuredEvent.city}</span>
                        </div>
                      )}
                    </div>
                    <Button asChild variant="cta" size="lg">
                      <Link to={featuredEvent.registrationUrl || "#"}>
                        Inscreva-se
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                  <div className="bg-primary/5 lg:min-h-[300px] flex items-center justify-center">
                    <div className="p-8 text-center">
                      <Users className="h-16 w-16 text-primary/30 mx-auto mb-4" />
                      <p className="text-muted-foreground">[Imagem do evento]</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      {/* Event Hubs */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            <Link to="/eventos/backstage-do-varejo" className="group">
              <Card className="border-0 shadow-card hover:shadow-card-hover transition-all duration-300 h-full">
                <CardContent className="p-8">
                  <div className="w-14 h-14 rounded-xl gradient-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Presentation className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="font-heading font-bold text-2xl text-foreground mb-3 group-hover:text-primary transition-colors">
                    Backstage do Varejo
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Série de eventos itinerantes que levam profissionais para conhecer os bastidores das maiores operações de varejo do Brasil.
                  </p>
                  <span className="text-primary font-medium flex items-center">
                    Ver todas as edições
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </CardContent>
              </Card>
            </Link>
            <Link to="/eventos/workshops" className="group">
              <Card className="border-0 shadow-card hover:shadow-card-hover transition-all duration-300 h-full">
                <CardContent className="p-8">
                  <div className="w-14 h-14 rounded-xl gradient-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Video className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="font-heading font-bold text-2xl text-foreground mb-3 group-hover:text-primary transition-colors">
                    Workshops e Trilhas
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Capacitações práticas sobre visual merchandising, tecnologia, operações e outros temas do ecossistema de PDV.
                  </p>
                  <span className="text-primary font-medium flex items-center">
                    Ver calendário
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 border-y border-border sticky top-20 bg-background/95 backdrop-blur-md z-40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Tipo de Evento" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Todos">Todos os tipos</SelectItem>
                {eventTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedSector} onValueChange={setSelectedSector}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Setor" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Todos">Todos os setores</SelectItem>
                {eventSectors.filter(s => s !== "Multisetorial").map((sector) => (
                  <SelectItem key={sector} value={sector}>
                    {sector}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedMonth} onValueChange={setSelectedMonth}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Mês" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Todos">Todos os meses</SelectItem>
                {months.map((month) => (
                  <SelectItem key={month.value} value={month.value}>
                    {month.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      {/* Events List */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-heading text-2xl font-bold text-foreground">
              Calendário de Eventos
            </h2>
            <span className="text-muted-foreground">
              {filteredEvents.length} eventos
            </span>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => (
              <Card 
                key={event.id} 
                className={`border-0 shadow-card hover:shadow-card-hover transition-all duration-300 ${
                  event.isAbiestEvent ? 'ring-2 ring-primary/20 bg-primary/5' : ''
                }`}
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Calendar className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium text-primary">
                      {formatEventDate(event)}
                    </span>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-3">
                    {event.isAbiestEvent && (
                      <Badge className="bg-primary text-primary-foreground text-xs">
                        <Star className="h-3 w-3 mr-1" />
                        ABIESV
                      </Badge>
                    )}
                    <Badge variant="outline" className="text-xs">{event.type}</Badge>
                    <Badge variant="secondary" className="text-xs">{event.sector}</Badge>
                  </div>

                  <h3 className="font-heading font-bold text-lg text-foreground mb-2">
                    {event.name}
                  </h3>
                  
                  {event.city && (
                    <p className="text-sm text-muted-foreground mb-2 flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {event.city}
                    </p>
                  )}

                  {event.description && (
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {event.description}
                    </p>
                  )}

                  {event.registrationUrl && event.registrationUrl !== "#" && (
                    <Button 
                      asChild 
                      variant={event.isAbiestEvent ? "default" : "outline"} 
                      size="sm" 
                      className="w-full"
                    >
                      {event.registrationUrl.startsWith("/") ? (
                        <Link to={event.registrationUrl}>
                          Ver detalhes
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      ) : (
                        <a href={event.registrationUrl} target="_blank" rel="noopener noreferrer">
                          Inscreva-se
                          <ExternalLink className="ml-2 h-4 w-4" />
                        </a>
                      )}
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredEvents.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">
                Nenhum evento encontrado com os filtros selecionados.
              </p>
              <Button 
                variant="outline"
                onClick={() => {
                  setSelectedType("Todos");
                  setSelectedSector("Todos");
                  setSelectedMonth("Todos");
                }}
              >
                Limpar filtros
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 gradient-hero text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold mb-6">
            Não perca nenhum evento
          </h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto mb-10">
            Associados têm acesso prioritário e descontos exclusivos em todos os eventos ABIESV.
          </p>
          <Button asChild variant="hero" size="xl" className="bg-white text-primary hover:bg-white/90">
            <Link to="/associe-se">
              Associe-se
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Eventos;
