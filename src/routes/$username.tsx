import { createFileRoute } from "@tanstack/react-router";
import { Storefront } from "@/components/Storefront";
import { initialProducts } from "@/lib/store-data";

export const Route = createFileRoute("/$username")({
  head: ({ params }) => ({
    meta: [
      { title: `@${params.username} — Sety Mağaza` },
      { name: "description", content: `@${params.username} mağazasından e-kitap, koçluk ve daha fazlası.` },
      { property: "og:title", content: `@${params.username} — Sety Mağaza` },
      { property: "og:description", content: "Dijital ürünler ve birebir koçluk, Sety ile." },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: () => <Storefront products={initialProducts} />,
});
