import { forwardRef } from "react";
import logoWhite from "@/assets/logo-abiesv-white.png";
import type { NewsArticle } from "@/hooks/useNewsArticles";

function formatDate(dateStr: string) {
  return new Date(dateStr + "T12:00:00").toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

interface ReelsCardProps {
  article: NewsArticle;
}

export const ReelsCard = forwardRef<HTMLDivElement, ReelsCardProps>(
  ({ article }, ref) => (
    <div
      ref={ref}
      style={{
        width: 1080,
        height: 1920,
        background: "linear-gradient(160deg, hsl(262, 83%, 42%) 0%, hsl(280, 87%, 55%) 50%, hsl(262, 83%, 35%) 100%)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 80,
        fontFamily: "'Montserrat', sans-serif",
        color: "white",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative circles */}
      <div
        style={{
          position: "absolute",
          top: -200,
          right: -200,
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: "rgba(255,255,255,0.05)",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: -150,
          left: -150,
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: "rgba(255,255,255,0.04)",
        }}
      />

      {/* Top: Logo + Badge */}
      <div style={{ position: "relative", zIndex: 1 }}>
        <img
          src={logoWhite}
          alt="ABIESV"
          style={{ height: 64, marginBottom: 24 }}
          crossOrigin="anonymous"
        />
        <div
          style={{
            display: "inline-block",
            background: "rgba(255,255,255,0.15)",
            backdropFilter: "blur(10px)",
            borderRadius: 40,
            padding: "10px 24px",
            fontSize: 22,
            fontWeight: 600,
            letterSpacing: 3,
            textTransform: "uppercase",
          }}
        >
          Curadoria ABIESV
        </div>
      </div>

      {/* Center: Title */}
      <div style={{ position: "relative", zIndex: 1, flex: 1, display: "flex", alignItems: "center" }}>
        <h2
          style={{
            fontSize: 72,
            fontWeight: 800,
            lineHeight: 1.15,
            margin: 0,
            textShadow: "0 4px 30px rgba(0,0,0,0.3)",
            display: "-webkit-box",
            WebkitLineClamp: 5,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {article.title}
        </h2>
      </div>

      {/* Bottom: Metadata */}
      <div style={{ position: "relative", zIndex: 1 }}>
        <div style={{ display: "flex", gap: 12, marginBottom: 24, flexWrap: "wrap" }}>
          <span
            style={{
              background: "rgba(255,255,255,0.2)",
              borderRadius: 30,
              padding: "8px 20px",
              fontSize: 22,
              fontWeight: 600,
            }}
          >
            {article.category}
          </span>
          <span
            style={{
              background: "rgba(255,255,255,0.2)",
              borderRadius: 30,
              padding: "8px 20px",
              fontSize: 22,
              fontWeight: 600,
            }}
          >
            {article.sector}
          </span>
        </div>
        <div
          style={{
            fontSize: 22,
            opacity: 0.8,
            fontFamily: "'Inter', sans-serif",
            fontWeight: 400,
          }}
        >
          {formatDate(article.published_date)} • {article.source}
        </div>
      </div>
    </div>
  )
);

ReelsCard.displayName = "ReelsCard";
