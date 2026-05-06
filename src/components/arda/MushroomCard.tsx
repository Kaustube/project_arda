import { useState } from "react";
import { useProductSounds } from "./ProductSoundEffects";

export const MushroomCard = () => {
  const [hover, setHover] = useState(false);
  const { onMushroomHover } = useProductSounds();

  return (
    <div
      onMouseEnter={() => {
        setHover(true);
        onMushroomHover();
      }}
      onMouseLeave={() => setHover(false)}
      className="group relative overflow-hidden rounded-3xl border border-border bg-card paper-grain shadow-soft transition-all duration-700 hover:shadow-warm cursor-pointer"
    >
      <div className="grid md:grid-cols-2 gap-0">
        {/* Animation panel */}
        <div className="relative h-80 md:h-[28rem] bg-gradient-to-b from-[hsl(44_50%_92%)] to-[hsl(22_30%_78%)] overflow-hidden">
          {/* Soil */}
          <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-b from-[hsl(22_38%_38%)] to-[hsl(22_45%_22%)]" />
          {/* Soil texture dots */}
          {Array.from({ length: 30 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-[hsl(22_45%_18%)] opacity-60"
              style={{
                bottom: `${Math.random() * 30}%`,
                left: `${Math.random() * 100}%`,
                width: `${2 + Math.random() * 4}px`,
                height: `${2 + Math.random() * 4}px`,
              }}
            />
          ))}

          <svg
            viewBox="0 0 300 300"
            className="absolute inset-0 w-full h-full"
            aria-hidden
          >
            <defs>
              <radialGradient id="capGrad" cx="50%" cy="40%">
                <stop offset="0%" stopColor="hsl(30 30% 88%)" />
                <stop offset="100%" stopColor="hsl(22 38% 55%)" />
              </radialGradient>
              <linearGradient id="stemGrad" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="hsl(44 50% 96%)" />
                <stop offset="100%" stopColor="hsl(40 30% 80%)" />
              </linearGradient>
            </defs>

            {/* Mushroom group: scales on hover */}
            <g
              style={{
                transformOrigin: "150px 230px",
                transform: hover ? "scale(1)" : "scale(0.18)",
                transition: "transform 1.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
              }}
            >
              {/* Big mushroom */}
              <ellipse cx="150" cy="230" rx="50" ry="8" fill="hsl(22 45% 20%)" opacity="0.5" />
              <path
                d="M120 230 Q120 160 150 160 Q180 160 180 230 Z"
                fill="url(#stemGrad)"
              />
              <path
                d="M90 170 Q150 90 210 170 Q200 185 150 185 Q100 185 90 170 Z"
                fill="url(#capGrad)"
              />
              {/* Gills */}
              <path d="M105 173 Q150 188 195 173" stroke="hsl(22 38% 35%)" strokeWidth="1" fill="none" opacity="0.4" />

              {/* Small mushroom left */}
              <g style={{ transformOrigin: "85px 240px" }}>
                <path d="M75 240 Q75 210 85 210 Q95 210 95 240 Z" fill="url(#stemGrad)" />
                <path d="M62 215 Q85 180 108 215 Q100 225 85 225 Q70 225 62 215 Z" fill="url(#capGrad)" />
              </g>
              {/* Small mushroom right */}
              <g style={{ transformOrigin: "220px 240px" }}>
                <path d="M212 240 Q212 215 220 215 Q228 215 228 240 Z" fill="url(#stemGrad)" />
                <path d="M200 218 Q220 188 240 218 Q232 226 220 226 Q208 226 200 218 Z" fill="url(#capGrad)" />
              </g>
            </g>

            {/* Spores */}
            {hover &&
              Array.from({ length: 8 }).map((_, i) => (
                <circle
                  key={i}
                  cx={120 + i * 8}
                  cy={140}
                  r="1.5"
                  fill="hsl(44 56% 96%)"
                  opacity="0.8"
                >
                  <animate
                    attributeName="cy"
                    from="140"
                    to="60"
                    dur={`${2 + i * 0.3}s`}
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    from="0.9"
                    to="0"
                    dur={`${2 + i * 0.3}s`}
                    repeatCount="indefinite"
                  />
                </circle>
              ))}
          </svg>

          <div className="absolute top-4 left-4 text-xs uppercase tracking-[0.25em] text-cocoa font-medium">
            Stream 01 · Solid
          </div>
        </div>

        {/* Content */}
        <div className="p-8 md:p-10 flex flex-col justify-between">
          <div>
            <span className="font-script text-3xl text-terracotta">oyster</span>
            <h3 className="font-display text-4xl md:text-5xl text-primary mt-1">
              Mushrooms
            </h3>
            <div className="h-px w-16 bg-cocoa/30 my-5" />
            <p className="text-foreground/75 leading-relaxed">
              Sterilised peel residue becomes the substrate for cultivating
              gourmet oyster mushrooms — protein-dense, low-water, and ready
              to harvest in under a fortnight.
            </p>
          </div>

          <div className="mt-8 space-y-3">
            {[
              { k: "Yield", v: "1 kg / 3 kg substrate" },
              { k: "Cycle", v: "12–14 days" },
              { k: "Inputs", v: "Peel residue + spawn" },
            ].map((row) => (
              <div
                key={row.k}
                className="flex justify-between border-b border-dashed border-border/70 pb-2 text-sm"
              >
                <span className="uppercase tracking-wider text-muted-foreground">
                  {row.k}
                </span>
                <span className="font-display italic text-cocoa">{row.v}</span>
              </div>
            ))}
          </div>

          <p className="mt-6 text-xs italic text-muted-foreground">
            Hover the panel — watch them grow.
          </p>
        </div>
      </div>
    </div>
  );
};
