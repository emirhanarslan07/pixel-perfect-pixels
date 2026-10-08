import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import {
  LayoutGrid, Store, ShoppingBag, Users, BarChart3, Settings, Copy, Plus, ExternalLink,
  MoreHorizontal, ChevronRight, Pencil, Trash2, Eye, TrendingUp,
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Storefront } from "@/components/Storefront";
import { creator, formatTRY, initialProducts, type Product } from "@/lib/store-data";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Panel — Sety" },
      { name: "description", content: "Sety creator paneli: gelir, satışlar, ürünler ve siparişler." },
      { property: "og:title", content: "Panel — Sety" },
      { property: "og:description", content: "Mağazanı yönet, satışlarını takip et." },
    ],
  }),
  component: Dashboard,
});

const nav = [
  { label: "Genel Bakış", icon: LayoutGrid, active: true },
  { label: "Mağazam", icon: Store },
  { label: "Siparişler", icon: ShoppingBag },
  { label: "Müşteriler", icon: Users },
  { label: "Analitik", icon: BarChart3 },
  { label: "Ayarlar", icon: Settings },
];

const kpis = [
  { label: "Toplam Gelir", value: "₺48.320", delta: "+18,2%", data: [4, 6, 5, 8, 7, 10, 12] },
  { label: "Mağaza Görüntülenme", value: "12.847", delta: "+9,4%", data: [8, 7, 9, 8, 11, 10, 13] },
  { label: "Toplam Satış", value: "214", delta: "+12,1%", data: [3, 5, 4, 6, 8, 7, 9] },
  { label: "Dönüşüm Oranı", value: "%4,8", delta: "+0,6%", data: [5, 5, 6, 5, 7, 7, 8] },
];

const orders = [
  { id: "#SY-1042", name: "Zeynep Kaya", img: 47, product: "Instagram Büyüme Rehberi", price: 249, paid: true },
  { id: "#SY-1041", name: "Mert Demir", img: 33, product: "1:1 Strateji Görüşmesi", price: 1490, paid: true },
  { id: "#SY-1040", name: "Elif Şahin", img: 45, product: "Reels Şablon Paketi", price: 399, paid: false },
  { id: "#SY-1039", name: "Can Arslan", img: 15, product: "Instagram Büyüme Rehberi", price: 249, paid: true },
];

function Sparkline({ data }: { data: number[] }) {
  const max = Math.max(...data), min = Math.min(...data);
  const pts = data.map((d, i) => `${(i / (data.length - 1)) * 100},${30 - ((d - min) / (max - min || 1)) * 26 - 2}`).join(" ");
  return (
    <svg viewBox="0 0 100 30" className="h-10 w-24 text-primary" preserveAspectRatio="none">
      <polyline points={pts} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

function Dashboard() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const url = `sety.store/${creator.username}`;
  const copy = () => { navigator.clipboard?.writeText(url); toast.success("Mağaza linki kopyalandı"); };
  const toggle = (id: string) => setProducts((ps) => ps.map((p) => (p.id === id ? { ...p, published: !p.published } : p)));
  const remove = (id: string) => setProducts((ps) => ps.filter((p) => p.id !== id));
  const add = () => {
    setProducts((ps) => [...ps, { id: crypto.randomUUID(), title: "Yeni Ürün", subtitle: "Açıklama ekle", type: "Dijital İndirme", price: 99, published: true, emoji: "✨" }]);
    toast.success("Ürün eklendi");
  };

  return (
    <div className="flex min-h-screen bg-background">
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-border bg-card p-4 lg:flex">
        <div className="flex items-center gap-2 px-2 py-1">
          <div className="bg-brand grid h-8 w-8 place-items-center rounded-lg font-display text-sm font-extrabold">S</div>
          <span className="font-display text-xl font-extrabold text-primary">Sety</span>
          <span className="rounded-full bg-volt px-2 py-0.5 text-[10px] font-bold text-volt-foreground">BETA</span>
        </div>
        <div className="mt-5 flex items-center gap-2 rounded-xl border border-border bg-muted px-3 py-2">
          <span className="relative flex h-2 w-2 shrink-0"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" /><span className="relative h-2 w-2 rounded-full bg-success" /></span>
          <span className="min-w-0 flex-1 truncate text-xs font-semibold">{url}</span>
          <button onClick={copy} aria-label="Kopyala" className="text-muted-foreground hover:text-primary"><Copy className="h-3.5 w-3.5" /></button>
        </div>
        <nav className="mt-5 space-y-1">
          {nav.map(({ label, icon: I, active }) => (
            <a key={label} href="#" className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition ${active ? "bg-accent text-primary" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`}>
              <I className="h-4 w-4" />{label}
            </a>
          ))}
        </nav>
        <div className="mt-auto space-y-3">
          <div className="rounded-xl bg-accent p-3">
            <div className="flex justify-between text-xs font-bold"><span>Founder Planı</span><span className="text-primary">9/14 gün</span></div>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-card"><div className="bg-brand h-full w-[64%] rounded-full" /></div>
            <button className="mt-2 text-xs font-bold text-primary">Planı yükselt →</button>
          </div>
          <div className="flex items-center gap-3 rounded-xl px-2 py-1">
            <img src={creator.avatar} alt="" className="h-9 w-9 rounded-full" />
            <div className="min-w-0"><div className="truncate text-sm font-bold">{creator.name}</div><div className="truncate text-xs text-muted-foreground">emirhan@sety.store</div></div>
          </div>
        </div>
      </aside>

      <main className="min-w-0 flex-1">
        <header className="sticky top-0 z-10 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-b border-border bg-background/80 px-5 py-4 backdrop-blur sm:px-8">
          <div className="min-w-0">
            <div className="flex items-center gap-1 text-xs text-muted-foreground">Panel <ChevronRight className="h-3 w-3" /> Genel Bakış</div>
            <h1 className="truncate text-2xl font-extrabold">Tekrar hoş geldin, Emirhan</h1>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <Link to="/$username" params={{ username: creator.username }} target="_blank" className="hidden items-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-bold hover:bg-muted sm:flex">
              <ExternalLink className="h-4 w-4" /> Mağazayı Gör
            </Link>
            <button onClick={add} className="bg-brand shadow-brand flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold hover:opacity-95"><Plus className="h-4 w-4" /> <span className="hidden sm:inline">Ürün Ekle</span></button>
          </div>
        </header>

        <div className="grid gap-6 p-5 sm:p-8 xl:grid-cols-[minmax(0,1fr)_320px]">
          <div className="min-w-0 space-y-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 2xl:grid-cols-4">
              {kpis.map((k) => (
                <div key={k.label} className="card-sety p-5">
                  <div className="text-xs font-semibold text-muted-foreground">{k.label}</div>
                  <div className="mt-2 flex items-end justify-between gap-2">
                    <div>
                      <div className="font-display text-2xl font-extrabold">{k.value}</div>
                      <div className="mt-1 inline-flex items-center gap-1 rounded-full bg-success/10 px-2 py-0.5 text-[11px] font-bold text-success"><TrendingUp className="h-3 w-3" />{k.delta}</div>
                    </div>
                    <Sparkline data={k.data} />
                  </div>
                </div>
              ))}
            </div>

            <section className="card-sety overflow-hidden">
              <div className="flex items-center justify-between px-5 py-4"><h2 className="text-lg font-extrabold">Ürünlerim</h2><span className="text-xs text-muted-foreground">{products.length} ürün</span></div>
              <div className="divide-y divide-border border-t border-border">
                {products.map((p) => (
                  <div key={p.id} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-5 py-3 sm:grid-cols-[minmax(0,1fr)_130px_90px_auto_auto]">
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent text-xl">{p.emoji}</div>
                      <div className="min-w-0"><div className="truncate text-sm font-bold">{p.title}</div><div className="truncate text-xs text-muted-foreground">{p.subtitle}</div></div>
                    </div>
                    <span className="hidden w-fit rounded-full bg-muted px-3 py-1 text-xs font-bold text-secondary-foreground sm:block">{p.type}</span>
                    <span className="hidden w-fit rounded-full bg-accent px-3 py-1 text-xs font-bold text-primary sm:block">{formatTRY(p.price)}</span>
                    <Switch checked={p.published} onCheckedChange={() => toggle(p.id)} className="data-[state=checked]:bg-success" />
                    <DropdownMenu>
                      <DropdownMenuTrigger className="hidden rounded-lg p-1.5 text-muted-foreground hover:bg-muted sm:block"><MoreHorizontal className="h-4 w-4" /></DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem><Pencil className="mr-2 h-4 w-4" />Düzenle</DropdownMenuItem>
                        <DropdownMenuItem><Eye className="mr-2 h-4 w-4" />Önizle</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => remove(p.id)} className="text-destructive"><Trash2 className="mr-2 h-4 w-4" />Sil</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                ))}
              </div>
            </section>

            <section className="card-sety overflow-hidden">
              <div className="px-5 py-4"><h2 className="text-lg font-extrabold">Son Siparişler</h2></div>
              <div className="divide-y divide-border border-t border-border">
                {orders.map((o) => (
                  <div key={o.id} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-5 py-3 sm:grid-cols-[80px_minmax(0,1fr)_minmax(0,1fr)_90px_90px]">
                    <span className="hidden text-xs font-semibold text-muted-foreground sm:block">{o.id}</span>
                    <div className="flex min-w-0 items-center gap-2"><img src={`https://i.pravatar.cc/64?img=${o.img}`} alt="" className="h-8 w-8 shrink-0 rounded-full" /><span className="truncate text-sm font-semibold">{o.name}</span></div>
                    <span className="hidden truncate text-sm text-muted-foreground sm:block">{o.product}</span>
                    <span className="hidden text-sm font-bold sm:block">{formatTRY(o.price)}</span>
                    <span className={`w-fit rounded-full px-3 py-1 text-xs font-bold ${o.paid ? "bg-success/10 text-success" : "bg-volt/40 text-volt-foreground"}`}>{o.paid ? "Ödendi" : "Bekliyor"}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div className="hidden xl:block">
            <div className="sticky top-24">
              <div className="mb-3 flex items-center justify-between text-xs font-bold text-muted-foreground"><span>CANLI ÖNİZLEME</span><span className="flex items-center gap-1 text-success"><span className="h-1.5 w-1.5 rounded-full bg-success" />Canlı</span></div>
              <div className="rounded-[3rem] bg-foreground p-3 shadow-2xl">
                <div className="relative h-[620px] overflow-y-auto overflow-x-hidden rounded-[2.4rem] bg-background">
                  <div className="sticky top-0 z-20 mx-auto h-6 w-28 rounded-b-2xl bg-foreground" />
                  <div className="-mt-6"><Storefront products={products} compact /></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
