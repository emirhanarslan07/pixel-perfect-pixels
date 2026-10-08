import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  beforeLoad: () => {
    throw redirect({ to: "/dashboard" });
  },
  head: () => ({
    meta: [
      { title: "Sety — Türkiye'nin Creator Mağazası" },
      { name: "description", content: "Link-in-bio mağazanı kur, dijital ürün ve koçluk sat." },
      { property: "og:title", content: "Sety — Türkiye'nin Creator Mağazası" },
      { property: "og:description", content: "Link-in-bio mağazanı kur, dijital ürün ve koçluk sat." },
    ],
  }),
});
