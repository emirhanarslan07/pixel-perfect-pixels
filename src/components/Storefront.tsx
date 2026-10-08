import { useState } from "react";
import { Instagram, Youtube, Twitter, X, ArrowRight, Download, CalendarClock, Link2, Lock, CreditCard } from "lucide-react";
import { creator, formatTRY, type Product } from "@/lib/store-data";

const typeIcon = { "Dijital İndirme": Download, Koçluk: CalendarClock, Link: Link2 };

export function Storefront({ products, compact = false }: { products: Product[]; compact?: boolean }) {
  const [banner, setBanner] = useState(true);
  const [selected, setSelected] = useState<Product | null>(null);
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const visible = products.filter((p) => p.published);

  return (
    <div className="relative min-h-full bg-background">
      {banner && (
        <div className="bg-brand flex items-center justify-between gap-2 px-4 py-2 text-xs font-semibold">
          <span className="min-w-0 truncate">🔥 Bu hafta tüm e-kitaplarda %20 indirim</span>
          <button onClick={() => setBanner(false)} aria-label="Kapat" className="shrink-0 opacity-80 hover:opacity-100"><X className="h-3.5 w-3.5" /></button>
        </div>
      )}
      <div className={compact ? "px-4 pb-6 pt-6" : "mx-auto max-w-md px-5 pb-10 pt-10"}>
        <div className="flex flex-col items-center text-center">
          <div className="rounded-full bg-brand p-[3px]">
            <img src={creator.avatar} alt={creator.name} className={`${compact ? "h-16 w-16" : "h-24 w-24"} rounded-full border-4 border-card object-cover`} />
          </div>
          <h1 className={`mt-3 font-extrabold ${compact ? "text-lg" : "text-2xl"}`}>{creator.name}</h1>
          <p className="mt-1 text-sm text-muted-foreground">{creator.bio}</p>
          <div className="mt-3 flex gap-2">
            {[Instagram, Youtube, Twitter].map((I, i) => (
              <a key={i} href="#" className="card-sety grid h-9 w-9 place-items-center text-foreground transition hover:text-primary"><I className="h-4 w-4" /></a>
            ))}
          </div>
        </div>
        <div className="mt-6 space-y-3">
          {visible.map((p) => {
            const Icon = typeIcon[p.type];
            return (
              <button key={p.id} onClick={() => { setSelected(p); setDone(false); }} className="card-sety group flex w-full items-center gap-3 p-3 text-left transition hover:-translate-y-0.5 hover:border-primary/40">
                <div className="grid h-14 w-14 shrink-0 place-items-center rounded-xl bg-accent text-2xl">{p.emoji}</div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wide text-primary"><Icon className="h-3 w-3" />{p.type}</div>
                  <div className="truncate font-display text-sm font-bold">{p.title}</div>
                  <div className="truncate text-xs text-muted-foreground">{p.subtitle}</div>
                </div>
                <div className="shrink-0 rounded-full bg-accent px-2.5 py-1 text-xs font-bold text-primary">{formatTRY(p.price)}</div>
              </button>
            );
          })}
        </div>
        <div className="mt-8 flex justify-center">
          <span className="card-sety inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold text-muted-foreground">
            Powered by <span className="font-display font-extrabold text-primary">Sety</span>
          </span>
        </div>
      </div>

      {selected && (
        <div className={`${compact ? "absolute" : "fixed"} inset-0 z-50 flex items-end justify-center bg-foreground/40 sm:items-center`} onClick={() => setSelected(null)}>
          <div className="w-full max-w-md rounded-t-3xl bg-card p-5 sm:rounded-3xl" onClick={(e) => e.stopPropagation()} style={{ animation: "enter 0.25s ease-out" }}>
            <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-border sm:hidden" />
            {done ? (
              <div className="py-6 text-center">
                <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-success/15 text-2xl text-success">✓</div>
                <h3 className="mt-3 text-lg font-extrabold">Ödeme sayfasına yönlendiriliyorsun</h3>
                <p className="mt-1 text-sm text-muted-foreground">Makbuz {email} adresine gönderilecek.</p>
                <button onClick={() => setSelected(null)} className="mt-5 w-full rounded-xl border border-border py-3 text-sm font-bold">Kapat</button>
              </div>
            ) : (
              <>
                <div className="flex items-start gap-3">
                  <div className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-accent text-3xl">{selected.emoji}</div>
                  <div className="min-w-0 flex-1">
                    <span className="rounded-full bg-volt px-2 py-0.5 text-[10px] font-bold text-volt-foreground">{selected.type}</span>
                    <h3 className="mt-1 text-lg font-extrabold">{selected.title}</h3>
                    <p className="text-sm text-muted-foreground">{selected.subtitle}</p>
                  </div>
                  <button onClick={() => setSelected(null)} aria-label="Kapat" className="text-muted-foreground"><X className="h-5 w-5" /></button>
                </div>
                <div className="mt-4 flex items-center justify-between rounded-xl bg-muted px-4 py-3">
                  <span className="text-sm text-muted-foreground">Toplam</span>
                  <span className="font-display text-xl font-extrabold">{formatTRY(selected.price)}</span>
                </div>
                <form onSubmit={(e) => { e.preventDefault(); setDone(true); }} className="mt-4 space-y-3">
                  <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="E-posta adresin" className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" />
                  <button className="bg-brand shadow-brand flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-bold hover:opacity-95">
                    <CreditCard className="h-4 w-4" /> Shopier ile Öde <ArrowRight className="h-4 w-4" />
                  </button>
                  <p className="flex items-center justify-center gap-1 text-[11px] text-subtle"><Lock className="h-3 w-3" /> Güvenli ödeme · Kart / Shopier</p>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
