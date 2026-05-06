import { useEffect, useRef, useState } from "react";

const STEPS = [
  { n: "01", t: "Collect", d: "Fruit & vegetable peels gathered daily from the campus mess and kitchens." },
  { n: "02", t: "Sterilise", d: "Heat-treated to neutralise pathogens, ready for the split." },
  { n: "03", t: "Separate", d: "Solid residue → mushroom substrate. Liquid → pigment bath." },
  { n: "04", t: "Cultivate & Extract", d: "Oyster mushrooms grow. Dyes are reduced and stabilised." },
  { n: "05", t: "Deliver", d: "Two outputs, zero residue, one circular loop." },
];

export const ProcessFlow = () => {
  const [progress, setProgress] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = rect.height + vh;
      const seen = Math.min(Math.max(vh - rect.top, 0), total);
      setProgress(Math.min(seen / total, 1));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div ref={ref} className="relative">
      {/* Track */}
      <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-1/2" />
      <div
        className="absolute left-8 md:left-1/2 top-0 w-px gradient-earth md:-translate-x-1/2 transition-all duration-300"
        style={{ height: `${progress * 100}%` }}
      />

      <ol className="space-y-16 md:space-y-24">
        {STEPS.map((s, i) => (
          <li
            key={s.n}
            className={`relative pl-20 md:pl-0 md:grid md:grid-cols-2 md:gap-16 ${
              i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""
            }`}
          >
            <div className={`md:text-${i % 2 === 1 ? "left" : "right"} md:pr-${i % 2 === 1 ? "0" : "16"} md:pl-${i % 2 === 1 ? "16" : "0"}`}>
              <div
                className={`inline-flex items-baseline gap-3 ${
                  i % 2 === 1 ? "" : "md:flex-row-reverse"
                }`}
              >
                <span className="font-display text-6xl md:text-7xl italic text-mustard leading-none">
                  {s.n}
                </span>
              </div>
              <h4 className="font-display text-3xl md:text-4xl text-primary mt-2">
                {s.t}
              </h4>
              <p className="text-foreground/70 mt-3 max-w-md md:inline-block">
                {s.d}
              </p>
            </div>

            {/* Node */}
            <div className="absolute left-8 md:left-1/2 top-2 -translate-x-1/2">
              <div className="h-5 w-5 rounded-full bg-background border-2 border-primary shadow-leaf" />
            </div>

            <div className="hidden md:block" />
          </li>
        ))}
      </ol>
    </div>
  );
};
