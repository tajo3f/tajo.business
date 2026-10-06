import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "TAJO ONE",
    short_name: "TAJO ONE",
    description: "Central comercial para pequenos negócios.",
    start_url: "/app",
    display: "standalone",
    background_color: "#0a0a0a",
    theme_color: "#0a0a0a",
    lang: "pt-BR",
  };
}
