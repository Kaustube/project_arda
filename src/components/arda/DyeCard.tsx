import { useState } from "react";
import { useProductSounds } from "./ProductSoundEffects";

const DYES = [
  { name: "Beetroot", hue: "350 65% 45%", note: "Crimson" },
  { name: "Turmeric", hue: "42 85% 52%", note: "Saffron" },
  { name: "Onion Skin", hue: "20 70% 45%", note: "Copper" },
  { name: "Tea Leaf", hue: "30 35% 28%", note: "Umber" },
];

export const DyeCard = () => {
  const [active, setActive] = useState(0);
  const dye = DYES[active];
  const { onDyeHover } = useProductSounds();

  return (
    <div className="relative overflow-hidden rounded-3xl border border-border bg-card paper-grain shadow-soft transition-all duration-700 hover:shadow-warm">
      <div className="grid md:grid-cols-2 gap-0">
        {/* Content */}
        <div className="p-8 md:p-10 flex flex-col justify-between order-2 md:order-1">
          <div>
            <span className="font-script text-3xl text-terracotta">edible</span>
            <h3 className="font-display text-4xl md:text-5xl text-primary mt-1">
              Natural Dyes
            </h3>
            <div className="h-px w-16 bg-cocoa/30 my-5" />
            <p className="text-foreground/75 leading-relaxed">
              Pigment-rich liquid is reduced and stabilised into food-grade
              dyes — replacing petroleum-derived colours with the quiet
              brilliance of the kitchen garden.
            </p>
          </div>

          <div className="mt-8">
            <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-4">
              Choose a source
            </div>
            <div className="grid grid-cols-2 gap-3">
              {DYES.map((d, i) => (
                <button
                  key={d.name}
                  onMouseEnter={() => {
                    setActive(i);
                    onDyeHover();
                  }}
                  onClick={() => {
                    setActive(i);
                    onDyeHover();
                  }}
                  className={`group relative overflow-hidden rounded-xl border px-4 py-3 text-left transition-all duration-500 ${
                    i === active
                      ? "border-primary/60 bg-primary/5 scale-[1.02]"
                      : "border-border hover:border-primary/30"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="h-6 w-6 rounded-full ring-2 ring-background transition-transform duration-500 group-hover:scale-110"
                      style={{ background: `hsl(${d.hue})` }}
                    />
                    <div>
                      <div className="font-display text-base text-primary leading-tight">
                        {d.name}
                      </div>
                      <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
                        {d.note}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Visual flask */}
        <div className="relative h-80 md:h-[28rem] bg-gradient-to-b from-[hsl(44_50%_94%)] to-[hsl(44_40%_85%)] overflow-hidden order-1 md:order-2">
          <div className="absolute top-4 right-4 text-xs uppercase tracking-[0.25em] text-cocoa font-medium">
            Stream 02 · Liquid
          </div>

          {/* Drips */}
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={`${active}-${i}`}
              className="absolute top-0 rounded-full"
              style={{
                left: `${30 + i * 10}%`,
                width: "8px",
                height: "14px",
                background: `hsl(${dye.hue})`,
                animation: `drip ${1.6 + i * 0.3}s ease-in ${i * 0.4}s infinite`,
                filter: "blur(0.3px)",
              }}
            />
          ))}

          {/* Flask SVG */}
          <svg
            viewBox="0 0 300 360"
            className="absolute inset-0 w-full h-full"
            aria-hidden
          >
            <defs>
              <linearGradient id="liquid" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor={`hsl(${dye.hue} / 0.7)`} />
                <stop offset="100%" stopColor={`hsl(${dye.hue})`} />
              </linearGradient>
              <clipPath id="flaskClip">
                <path d="M130 110 L130 170 L80 290 Q80 310 100 310 L200 310 Q220 310 220 290 L170 170 L170 110 Z" />
              </clipPath>
            </defs>

            {/* Liquid fill (animated height) */}
            <g clipPath="url(#flaskClip)">
              <rect
                x="60"
                y="180"
                width="180"
                height="140"
                fill="url(#liquid)"
                style={{ transition: "fill 0.8s ease" }}
              />
              {/* Wave */}
              <path
                d="M60 185 Q90 175 120 185 T180 185 T240 185 L240 320 L60 320 Z"
                fill={`hsl(${dye.hue} / 0.85)`}
                style={{ transition: "fill 0.8s ease" }}
              >
                <animate
                  attributeName="d"
                  dur="4s"
                  repeatCount="indefinite"
                  values="
                    M60 185 Q90 175 120 185 T180 185 T240 185 L240 320 L60 320 Z;
                    M60 185 Q90 195 120 185 T180 185 T240 185 L240 320 L60 320 Z;
                    M60 185 Q90 175 120 185 T180 185 T240 185 L240 320 L60 320 Z"
                />
              </path>
            </g>

            {/* Flask outline */}
            <path
              d="M130 110 L130 170 L80 290 Q80 310 100 310 L200 310 Q220 310 220 290 L170 170 L170 110"
              fill="none"
              stroke="hsl(var(--cocoa))"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
            {/* Stopper */}
            <rect x="125" y="95" width="50" height="18" rx="3" fill="hsl(var(--cocoa))" />
            <rect x="120" y="86" width="60" height="12" rx="3" fill="hsl(var(--cocoa))" />

            {/* Measurement marks */}
            {[220, 240, 260, 280].map((y) => (
              <line key={y} x1="180" y1={y} x2="195" y2={y} stroke="hsl(var(--cocoa))" strokeWidth="1.5" opacity="0.6" />
            ))}
          </svg>

          <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between">
            <div>
              <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Now extracting</div>
              <div className="font-display text-2xl text-primary transition-colors duration-500">
                {dye.name}
              </div>
            </div>
            <div
              className="h-12 w-12 rounded-full ring-4 ring-background shadow-leaf transition-colors duration-700"
              style={{ background: `hsl(${dye.hue})` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
