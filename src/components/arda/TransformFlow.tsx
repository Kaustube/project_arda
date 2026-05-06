import { useState } from "react";

type Path = "mushroom" | "dye";

const NODES = {
  mushroom: [
    {
      title: "Vegetable Peels",
      sub: "& agricultural waste",
      detail: "Potato, carrot, onion peels and post-harvest fibres collected from the campus mess.",
      icon: (
        <svg viewBox="0 0 64 64" className="h-10 w-10">
          <path d="M14 36 C 18 18, 40 14, 50 24 C 56 30, 48 46, 30 50 C 18 52, 10 46, 14 36 Z"
            fill="hsl(var(--sage))" stroke="hsl(var(--primary))" strokeWidth="1.5" />
          <path d="M22 30 C 28 26, 38 26, 44 32" stroke="hsl(var(--primary))" strokeWidth="1.2" fill="none" />
        </svg>
      ),
    },
    {
      title: "Sterilised Substrate",
      sub: "fibre-rich bed",
      detail: "Heat-pasteurised solid residue, packed into breathable grow-bags and inoculated with oyster spawn.",
      icon: (
        <svg viewBox="0 0 64 64" className="h-10 w-10">
          <rect x="16" y="14" width="32" height="38" rx="4" fill="hsl(var(--secondary))" stroke="hsl(var(--primary))" strokeWidth="1.5" />
          <path d="M20 24 H44 M20 32 H44 M20 40 H44" stroke="hsl(var(--cocoa))" strokeWidth="1" strokeDasharray="2 3" />
          <circle cx="26" cy="20" r="1.5" fill="hsl(var(--mustard))" />
          <circle cx="38" cy="46" r="1.5" fill="hsl(var(--mustard))" />
        </svg>
      ),
    },
    {
      title: "Mycelium Bloom",
      sub: "white root network",
      detail: "Over 14 days, mycelium colonises the substrate — a quiet, branching architecture of life.",
      icon: (
        <svg viewBox="0 0 64 64" className="h-10 w-10">
          <g stroke="hsl(var(--cocoa))" strokeWidth="1" fill="none">
            <path d="M32 50 L32 18" />
            <path d="M32 30 L20 22 M32 30 L44 22 M32 38 L18 36 M32 38 L46 36 M32 24 L24 16 M32 24 L40 16" />
          </g>
          <g fill="hsl(var(--terracotta))">
            <circle cx="20" cy="22" r="2" /><circle cx="44" cy="22" r="2" />
            <circle cx="18" cy="36" r="2" /><circle cx="46" cy="36" r="2" />
            <circle cx="32" cy="18" r="2.5" />
          </g>
        </svg>
      ),
    },
    {
      title: "Oyster Mushrooms",
      sub: "harvested & plated",
      detail: "Soft, pearl-grey clusters — fresh, edible, and back in the kitchen they came from.",
      icon: (
        <svg viewBox="0 0 64 64" className="h-10 w-10">
          <ellipse cx="32" cy="26" rx="20" ry="12" fill="hsl(var(--cocoa))" opacity="0.9" />
          <ellipse cx="32" cy="24" rx="18" ry="10" fill="hsl(var(--secondary))" />
          <path d="M28 36 Q28 48 24 52 M36 36 Q36 48 40 52 M32 36 L32 52" stroke="hsl(var(--cocoa))" strokeWidth="1.4" fill="none" />
        </svg>
      ),
    },
  ],
  dye: [
    {
      title: "Fruit Peels & Pulp",
      sub: "pigment-rich scraps",
      detail: "Beetroot tops, pomegranate skins, turmeric trimmings, onion husks — chosen for the colour they still hold.",
      icon: (
        <svg viewBox="0 0 64 64" className="h-10 w-10">
          <path d="M20 18 C 28 10, 40 12, 46 22 C 52 32, 44 50, 32 52 C 18 54, 12 38, 16 28 C 17 24, 18 20, 20 18 Z"
            fill="hsl(var(--terracotta))" stroke="hsl(var(--primary))" strokeWidth="1.4" />
          <path d="M30 14 C 32 10, 36 10, 38 14" stroke="hsl(var(--primary))" strokeWidth="1.4" fill="none" />
        </svg>
      ),
    },
    {
      title: "Pigment Bath",
      sub: "extraction in water",
      detail: "Gentle simmer in pH-balanced water releases anthocyanins, curcumin, betalains into a coloured liquor.",
      icon: (
        <svg viewBox="0 0 64 64" className="h-10 w-10">
          <path d="M22 12 H42 V20 L50 46 C 52 52, 48 56, 42 56 H22 C 16 56, 12 52, 14 46 L22 20 Z"
            fill="hsl(var(--terracotta) / 0.25)" stroke="hsl(var(--primary))" strokeWidth="1.5" />
          <path d="M16 42 H48" stroke="hsl(var(--terracotta))" strokeWidth="2" />
          <circle cx="24" cy="48" r="1.5" fill="hsl(var(--mustard))" />
          <circle cx="36" cy="50" r="1.5" fill="hsl(var(--terracotta))" />
        </svg>
      ),
    },
    {
      title: "Reduction & Mordant",
      sub: "colour, concentrated",
      detail: "Liquor is slowly reduced and stabilised with food-safe mordants — locking pigment into a usable form.",
      icon: (
        <svg viewBox="0 0 64 64" className="h-10 w-10">
          <path d="M26 10 H38 V28 L46 50 C 47 54, 44 56, 40 56 H24 C 20 56, 17 54, 18 50 L26 28 Z"
            fill="hsl(var(--mustard) / 0.35)" stroke="hsl(var(--primary))" strokeWidth="1.5" />
          <path d="M26 10 H38" stroke="hsl(var(--cocoa))" strokeWidth="2" />
          <path d="M30 38 Q32 42 34 38 Q36 34 38 38" stroke="hsl(var(--terracotta))" strokeWidth="1.4" fill="none" />
        </svg>
      ),
    },
    {
      title: "Natural Dyes",
      sub: "food-grade hues",
      detail: "Bottled, food-safe pigments ready for kitchens, textiles and craft — every drop traceable to a peel.",
      icon: (
        <svg viewBox="0 0 64 64" className="h-10 w-10">
          <rect x="22" y="10" width="20" height="6" rx="1" fill="hsl(var(--cocoa))" />
          <path d="M20 18 H44 V52 C 44 55, 41 56, 38 56 H26 C 23 56, 20 55, 20 52 Z"
            fill="hsl(var(--terracotta))" stroke="hsl(var(--primary))" strokeWidth="1.4" />
          <ellipse cx="28" cy="30" rx="3" ry="2" fill="hsl(var(--mustard) / 0.6)" />
        </svg>
      ),
    },
  ],
};

export const TransformFlow = () => {
  const [path, setPath] = useState<Path>("mushroom");
  const [active, setActive] = useState(0);
  const nodes = NODES[path];

  return (
    <div className="rounded-3xl border border-border/70 bg-background/60 backdrop-blur-sm p-6 md:p-10 paper-grain">
      {/* Toggle */}
      <div className="flex justify-center mb-10">
        <div className="inline-flex rounded-full border border-border/80 p-1 bg-secondary/50">
          {(["mushroom", "dye"] as Path[]).map((p) => (
            <button
              key={p}
              onClick={() => { setPath(p); setActive(0); }}
              className={`px-6 py-2 rounded-full text-sm uppercase tracking-[0.2em] transition-all ${
                path === p
                  ? "bg-primary text-primary-foreground shadow-soft"
                  : "text-foreground/70 hover:text-primary"
              }`}
            >
              {p === "mushroom" ? "→ Mushrooms" : "→ Dyes"}
            </button>
          ))}
        </div>
      </div>

      {/* Flow */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] gap-4 md:gap-2 items-stretch">
        {nodes.map((n, i) => (
          <div key={n.title} className="contents">
            <button
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onClick={() => setActive(i)}
              className={`group relative rounded-2xl border p-5 text-left transition-all duration-500 ${
                active === i
                  ? "border-primary bg-secondary shadow-warm scale-[1.03]"
                  : "border-border/60 bg-background/70 hover:border-primary/40"
              }`}
            >
              <div className={`mb-3 transition-transform duration-500 ${active === i ? "scale-110 rotate-[-4deg]" : "group-hover:scale-105"}`}>
                {n.icon}
              </div>
              <div className="font-display text-lg text-primary leading-tight">{n.title}</div>
              <div className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground mt-1">{n.sub}</div>
              <div className={`mt-1 h-1 rounded-full transition-all duration-500 ${
                active === i ? "w-12 bg-terracotta" : "w-6 bg-border"
              }`} />
            </button>

            {i < nodes.length - 1 && (
              <div className="flex md:flex-col items-center justify-center py-2 md:py-0 md:px-1">
                {/* Arrow */}
                <svg viewBox="0 0 40 12" className="hidden md:block w-10 h-3 text-cocoa/60">
                  <path d="M0 6 H32 M28 2 L34 6 L28 10" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <svg viewBox="0 0 12 40" className="md:hidden w-3 h-10 text-cocoa/60">
                  <path d="M6 0 V32 M2 28 L6 34 L10 28" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Detail */}
      <div className="mt-10 rounded-2xl bg-secondary/40 border border-border/60 p-6 min-h-[110px]">
        <div className="text-[10px] uppercase tracking-[0.3em] text-terracotta mb-2">
          Step 0{active + 1} · {path === "mushroom" ? "Mushroom path" : "Dye path"}
        </div>
        <p key={`${path}-${active}`} className="text-foreground/80 leading-relaxed animate-fade-in">
          {nodes[active].detail}
        </p>
      </div>
    </div>
  );
};
