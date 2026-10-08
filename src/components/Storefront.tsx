import { useState } from "react";
import { Instagram, Youtube, Twitter, X, ArrowRight, ChevronRight, Plus, BookOpen, CalendarClock, Clapperboard, Link2, Lock, CreditCard } from "lucide-react";
import { creator, formatTRY, type Product } from "@/lib/store-data";

const typeIcon = { "Dijital İndirme": BookOpen, Koçluk: CalendarClock, Link: Link2 };

function productIcon(p: Product) {
  if (p.emoji.includes("🎬") || p.title.toLowerCase().includes("reels")) return Clapperboard;
  return typeIcon[p.type];
}

export function Storefront({ products, compact = false }: { products: Product[]; compact?: boolean }) {
  const [banner, setBanner] = useState(true);
  const [selected, setSelected] = useState<Product | null>(null);
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const visible = products.filter((p) => p.published);
  const [featured, ...rest] = visible;

  return (
    <div className="relative min-h-full bg-store-bg font-[family-name:var(--font-store)] text-store-text">
      {banner && (
        <div className="relative z-50 flex items-center justify-center bg-store-accent px-6 py-2.5 text-center text-[11px] font-bold uppercase tracking-[0.1em] text-store-text">
          Bu hafta tüm e-kitaplarda %20 indirim
          <button onClick={() => setBanner(false)} aria-label="Kapat" className="absolute right-4 top-1/2 -translate-y-1/2 opacity-60 transition-opacity hover:opacity-100">
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      <div className={`relative mx-auto flex w-full flex-col items-center ${compact ? "max-w-sm px-4 py-8" : "max-w-2xl px-6 py-16"}`}>
        {/* Decorative glow */}
        <div className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-store-accent opacity-[0.05] blur-[120px]" />

        {/* Profile */}
        <div className="group relative mb-6">
          <div className="absolute -inset-1.5 rounded-full bg-store-accent opacity-20 blur transition duration-500 group-hover:opacity-40" />
          <img
            src={creator.avatar}
            alt={creator.name}
            className={`relative rounded-full border-2 border-store-tile object-cover ${compact ? "h-16 w-16" : "h-24 w-24"}`}
          />
        </div>
        <h1 className={`mb-3 text-center font-[family-name:var(--font-serif-display)] tracking-tight ${compact ? "text-3xl" : "text-5xl md:text-6xl"}`}>
          {creator.name}
        </h1>
        <p className="mb-8 max-w-sm text-center text-[15px] leading-relaxed text-store-text/60">{creator.bio}</p>

        {/* Socials */}
        <div className={`flex gap-4 ${compact ? "mb-10" : "mb-16"}`}>
          {[Instagram, Youtube, Twitter].map((I, i) => (
            <a
              key={i}
              href="#"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-store-text/5 bg-store-tile transition-all duration-300 hover:border-store-accent/50 hover:bg-store-accent/10"
            >
              <I className="h-5 w-5 opacity-70" />
            </a>
          ))}
        </div>

        {/* Bento grid */}
        <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-2">
          {featured && (
            <button
              onClick={() => { setSelected(featured); setDone(false); }}
              className="group relative cursor-pointer overflow-hidden rounded-[40px] border border-store-text/5 bg-store-tile text-left transition-all duration-500 hover:border-store-accent/40 hover:bg-store-tile/80 md:col-span-2"
            >
              <div className={`flex items-center gap-8 ${compact ? "flex-col p-6 text-center" : "flex-col p-8 md:flex-row"}`}>
                <div className={`flex shrink-0 items-center justify-center rounded-2xl border border-store-accent/20 bg-store-accent/10 transition-transform duration-500 group-hover:scale-[1.02] ${compact ? "h-28 w-24" : "h-48 w-36"}`}>
                  {(() => { const I = productIcon(featured); return <I className={`${compact ? "h-10 w-10" : "h-14 w-14"} text-store-accent`} strokeWidth={1} />; })()}
                </div>
                <div className={`flex-1 ${compact ? "text-center" : "text-center md:text-left"}`}>
                  <span className="mb-2 block text-[10px] font-bold uppercase tracking-[0.25em] text-store-accent">{featured.type}</span>
                  <h3 className={`mb-2 font-[family-name:var(--font-serif-display)] tracking-tight ${compact ? "text-2xl" : "text-3xl"}`}>{featured.title}</h3>
                  <p className="mb-6 text-sm leading-relaxed text-store-text/40">{featured.subtitle}</p>
                  <span className="inline-flex items-center gap-4 rounded-full bg-store-text px-5 py-2 text-[15px] font-bold text-store-bg transition-all group-hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                    {formatTRY(featured.price)}
                    <ChevronRight className="h-4 w-4" strokeWidth={2.5} />
                  </span>
                </div>
              </div>
            </button>
          )}

          {rest.map((p) => {
            const I = productIcon(p);
            return (
              <button
                key={p.id}
                onClick={() => { setSelected(p); setDone(false); }}
                className="group relative flex cursor-pointer flex-col justify-between rounded-[40px] border border-store-text/5 bg-store-tile p-8 text-left transition-all duration-500 hover:border-store-accent/40"
              >
                <div>
                  <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-2xl border border-store-accent/20 bg-store-accent/10">
                    <I className="h-6 w-6 text-store-accent" strokeWidth={1.5} />
                  </div>
                  <span className="mb-2 block text-[10px] font-bold uppercase tracking-[0.25em] text-store-accent">{p.type}</span>
                  <h3 className="mb-2 font-[family-name:var(--font-serif-display)] text-2xl tracking-tight">{p.title}</h3>
                  <p className="mb-8 text-sm text-store-text/40">{p.subtitle}</p>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold">{formatTRY(p.price)}</span>
                  <span className="flex h-8 w-8 items-center justify-center rounded-full border border-store-text/20 transition-all group-hover:border-transparent group-hover:bg-store-accent">
                    <Plus className="h-4 w-4" strokeWidth={2.5} />
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Footer badge */}
        <div className={`flex flex-col items-center gap-4 ${compact ? "mt-10" : "mt-24"}`}>
          <div className="flex items-center gap-2 rounded-lg border border-store-text/5 px-3 py-1.5 opacity-40 transition-opacity hover:opacity-100">
            <span className="text-[10px] font-medium tracking-tight">Powered by</span>
            <span className="text-[10px] font-bold tracking-tighter text-store-accent">SETY</span>
          </div>
        </div>
      </div>

      {/* Checkout sheet */}
      {selected && (
        <div className={`${compact ? "absolute" : "fixed"} inset-0 z-50 flex items-end justify-center bg-black/60 sm:items-center`} onClick={() => setSelected(null)}>
          <div
            className="w-full max-w-md rounded-t-3xl border border-store-text/10 bg-store-tile p-5 text-store-text sm:rounded-3xl"
            onClick={(e) => e.stopPropagation()}
            style={{ animation: "enter 0.25s ease-out" }}
          >
            <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-store-text/15 sm:hidden" />
            {done ? (
              <div className="py-6 text-center">
                <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-store-accent/15 text-2xl text-store-accent">✓</div>
                <h3 className="mt-3 font-[family-name:var(--font-serif-display)] text-2xl">Ödeme sayfasına yönlendiriliyorsun</h3>
                <p className="mt-1 text-sm text-store-text/50">Makbuz {email} adresine gönderilecek.</p>
                <button onClick={() => setSelected(null)} className="mt-5 w-full rounded-xl border border-store-text/15 py-3 text-sm font-bold">Kapat</button>
              </div>
            ) : (
              <>
                <div className="flex items-start gap-3">
                  <div className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl border border-store-accent/20 bg-store-accent/10">
                    {(() => { const I = productIcon(selected); return <I className="h-7 w-7 text-store-accent" strokeWidth={1.5} />; })()}
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-store-accent">{selected.type}</span>
                    <h3 className="mt-1 font-[family-name:var(--font-serif-display)] text-2xl">{selected.title}</h3>
                    <p className="text-sm text-store-text/50">{selected.subtitle}</p>
                  </div>
                  <button onClick={() => setSelected(null)} aria-label="Kapat" className="text-store-text/50"><X className="h-5 w-5" /></button>
                </div>
                <div className="mt-4 flex items-center justify-between rounded-xl bg-store-bg px-4 py-3">
                  <span className="text-sm text-store-text/50">Toplam</span>
                  <span className="font-[family-name:var(--font-serif-display)] text-2xl">{formatTRY(selected.price)}</span>
                </div>
                <form onSubmit={(e) => { e.preventDefault(); setDone(true); }} className="mt-4 space-y-3">
                  <input
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="E-posta adresin"
                    className="w-full rounded-xl border border-store-text/15 bg-store-bg px-4 py-3 text-sm text-store-text outline-none placeholder:text-store-text/30 focus:border-store-accent focus:ring-2 focus:ring-store-accent/20"
                  />
                  <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-store-accent py-3.5 text-sm font-bold text-store-text transition hover:opacity-90">
                    <CreditCard className="h-4 w-4" /> Shopier ile Öde <ArrowRight className="h-4 w-4" />
                  </button>
                  <p className="flex items-center justify-center gap-1 text-[11px] text-store-text/40"><Lock className="h-3 w-3" /> Güvenli ödeme · Kart / Shopier</p>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
