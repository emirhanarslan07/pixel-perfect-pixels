export type ProductType = "Dijital İndirme" | "Koçluk" | "Link";
export type Product = {
  id: string;
  title: string;
  subtitle: string;
  type: ProductType;
  price: number;
  published: boolean;
  emoji: string;
};

export const creator = {
  username: "emirhan",
  name: "Emirhan Yılmaz",
  bio: "İçerik üreticisi & dijital pazarlama koçu. 120K+ takipçiye büyümenin sırlarını paylaşıyorum.",
  avatar: "https://i.pravatar.cc/240?img=12",
};

export const initialProducts: Product[] = [
  { id: "p1", title: "Instagram Büyüme Rehberi", subtitle: "64 sayfalık PDF e-kitap", type: "Dijital İndirme", price: 249, published: true, emoji: "📘" },
  { id: "p2", title: "1:1 Strateji Görüşmesi", subtitle: "45 dk birebir koçluk", type: "Koçluk", price: 1490, published: true, emoji: "🎯" },
  { id: "p3", title: "Reels Şablon Paketi", subtitle: "30 adet Canva şablonu", type: "Dijital İndirme", price: 399, published: true, emoji: "🎬" },
  { id: "p4", title: "YouTube Kanalım", subtitle: "Haftalık yeni videolar", type: "Link", price: 0, published: false, emoji: "▶️" },
];

export const formatTRY = (n: number) =>
  n === 0 ? "Ücretsiz" : new Intl.NumberFormat("tr-TR", { style: "currency", currency: "TRY", maximumFractionDigits: 0 }).format(n);
