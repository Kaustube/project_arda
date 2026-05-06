import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import ardaLogo from "@/assets/arda-logo.png";
import AmbientSound from "@/components/arda/AmbientSound";
import imgCollection from "@/assets/process-collection.jpg";
import imgSorting from "@/assets/process-sorting.jpg";
import imgSterilise from "@/assets/process-sterilise.jpg";
import imgSubstrate from "@/assets/process-substrate.jpg";
import imgCultivation from "@/assets/process-cultivation.jpg";
import imgMushrooms from "@/assets/process-mushrooms.jpg";
import imgPigment from "@/assets/process-pigment.jpg";
import imgReduction from "@/assets/process-reduction.jpg";
import imgBottling from "@/assets/process-bottling.jpg";

const STAGES = [
  {
    title: "Collection",
    sub: "Campus mess & kitchens",
    body: "Each morning, fruit and vegetable peels — potato, beetroot, onion, carrot, pomegranate — are gathered from the campus mess in food-grade bins. Nothing edible is taken; only what would otherwise leave as waste.",
    palette: "hsl(var(--sage))",
    image: imgCollection,
  },
  {
    title: "Sorting",
    sub: "Two streams emerge",
    body: "Peels are hand-sorted: fibrous, low-pigment scraps go to the mushroom line; pigment-rich skins (beetroot, turmeric, onion husk, pomegranate) go to the dye line.",
    palette: "hsl(var(--mustard))",
    image: imgSorting,
  },
  {
    title: "Sterilisation",
    sub: "Heat-pasteurised",
    body: "Both streams are heat-treated to neutralise pathogens and competing microbes — gentle enough to preserve structure and pigment, hot enough to make the substrate safe.",
    palette: "hsl(var(--terracotta))",
    image: imgSterilise,
  },
  {
    title: "Mushroom Substrate",
    sub: "Inoculation",
    body: "The fibrous residue is mixed with a small amount of supplementary bran, packed into breathable bags, and inoculated with oyster mushroom spawn.",
    palette: "hsl(var(--secondary))",
    image: imgSubstrate,
  },
  {
    title: "Cultivation",
    sub: "14 days in the dark",
    body: "Bags rest in a humid, low-light room. Mycelium colonises the substrate completely — a white, branching network — before fruiting bodies emerge.",
    palette: "hsl(var(--cocoa))",
    image: imgCultivation,
  },
  {
    title: "Mushroom Harvest",
    sub: "Pearl oyster clusters",
    body: "Mature clusters are hand-picked, weighed, and delivered back to the campus kitchen. Spent substrate is composted, closing this micro-loop.",
    palette: "hsl(var(--primary))",
    image: imgMushrooms,
  },
  {
    title: "Pigment Bath",
    sub: "Slow extraction",
    body: "Pigment-rich peels are simmered in pH-balanced water. Anthocyanins, betalains and curcumin diffuse out into a coloured liquor.",
    palette: "hsl(var(--terracotta))",
    image: imgPigment,
  },
  {
    title: "Reduction",
    sub: "Concentration",
    body: "The liquor is gently reduced over low heat to intensify the colour — no synthetic solvents, no harsh additives.",
    palette: "hsl(var(--mustard))",
    image: imgReduction,
  },
  {
    title: "Mordanting & Bottling",
    sub: "Food-grade dye",
    body: "Food-safe mordants stabilise the pigment. The dye is filtered, bottled, and labelled — ready for kitchens, craft and textile use.",
    palette: "hsl(var(--primary))",
    image: imgBottling,
  },
];

const Process = () => {
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(false);
  const [spacebarPressed, setSpacebarPressed] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!auto) return;
    const id = setInterval(() => {
      setActive((a) => (a + 1) % STAGES.length);
    }, 3200);
    intervalRef.current = id;
    return () => clearInterval(id);
  }, [auto]);

  // Spacebar auto-play functionality
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' && e.target === document.body) {
        e.preventDefault();
        setSpacebarPressed(true);
        setAuto(true);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code === 'Space' && e.target === document.body) {
        e.preventDefault();
        setSpacebarPressed(false);
        setAuto(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  const stage = STAGES[active];

  return (
    <main className="min-h-screen bg-background paper-grain">
      {/* NAV */}
      <header className="border-b border-border/60">
        <div className="container mx-auto flex items-center justify-between py-4">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-foreground/70 hover:text-primary transition-colors">
            <ArrowLeft className="h-4 w-4" /> Back home
          </Link>
          <div className="flex items-center gap-2">
            <img src={ardaLogo} alt="" className="h-7 w-7 object-contain" />
            <span className="font-display text-lg text-primary">ARDA</span>
          </div>
        </div>
      </header>

      <section className="container mx-auto py-16 md:py-24">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="text-xs uppercase tracking-[0.3em] text-terracotta mb-4">✦ Full Process</div>
          <h1 className="font-display text-5xl md:text-6xl text-primary leading-tight">
            Peel to plate.<br />
            <em className="text-terracotta">Peel to pigment.</em>
          </h1>
          <p className="mt-5 text-foreground/70">
            Nine stages, one circular loop. Hover any node — or let it play.
          </p>
          <div className="mt-6 flex flex-col items-center gap-3">
            <button
              onClick={() => setAuto((a) => !a)}
              className="inline-flex items-center gap-2 rounded-full border border-primary/30 px-5 py-2 text-xs uppercase tracking-[0.2em] text-primary hover:bg-primary hover:text-primary-foreground transition-all"
            >
              {auto ? "❚❚ Pause" : "▶ Play"}
            </button>
            <div className="flex flex-col items-center gap-1">
              <div className={`inline-flex items-center gap-2 rounded-full border ${spacebarPressed ? 'bg-primary text-primary-foreground border-primary' : 'border-primary/30'} px-4 py-1.5 text-xs transition-all`}>
                <span>Hold Spacebar</span>
                <span className="text-xs">⌨️</span>
              </div>
              <p className="text-xs text-muted-foreground">Auto-play with music</p>
            </div>
          </div>
        </div>

        {/* Animated track */}
        <div className="max-w-6xl mx-auto">
          <div className="relative">
            {/* Track line */}
            <div className="absolute left-0 right-0 top-8 h-px bg-border hidden md:block" />
            <div
              className="absolute left-0 top-8 h-px gradient-earth hidden md:block transition-all duration-700 ease-out"
              style={{ width: `${(active / (STAGES.length - 1)) * 100}%` }}
            />

            <div className="grid grid-cols-3 md:grid-cols-9 gap-3 md:gap-2 relative">
              {STAGES.map((s, i) => (
                <button
                  key={s.title}
                  onMouseEnter={() => { setAuto(false); setActive(i); }}
                  onClick={() => { setAuto(false); setActive(i); }}
                  className="flex flex-col items-center group"
                >
                  <div
                    className={`relative h-16 w-16 rounded-full flex items-center justify-center transition-all duration-500 ${
                      i === active
                        ? "scale-125 shadow-warm"
                        : i < active
                        ? "opacity-90"
                        : "opacity-40 group-hover:opacity-80"
                    }`}
                    style={{ background: s.palette }}
                  >
                    <span className={`font-display italic text-xl ${i === active ? "text-background" : "text-background/80"}`}>
                      {i + 1}
                    </span>
                    {i === active && (
                      <span className="absolute inset-0 rounded-full border-2 border-terracotta animate-ping" />
                    )}
                  </div>
                  <div className={`mt-3 text-[10px] uppercase tracking-widest text-center transition-colors ${
                    i === active ? "text-primary" : "text-muted-foreground"
                  }`}>
                    {s.title}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Detail card */}
          <div className="mt-16 grid md:grid-cols-12 gap-10 items-center">
            <div className="md:col-span-5">
              <div
                key={`viz-${active}`}
                className="aspect-square rounded-3xl border border-border/60 overflow-hidden relative shadow-soft animate-fade-in"
              >
                <img
                  src={stage.image}
                  alt={stage.title}
                  width={1024}
                  height={1024}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div
                  className="absolute inset-0 mix-blend-multiply opacity-20"
                  style={{ background: stage.palette }}
                />
                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                  <div className="font-display italic text-5xl md:text-6xl text-primary-foreground drop-shadow-lg">
                    {String(active + 1).padStart(2, "0")}
                  </div>
                  <div className="text-[10px] uppercase tracking-[0.25em] text-primary-foreground/90 bg-cocoa/60 backdrop-blur px-3 py-1.5 rounded-full">
                    {stage.sub}
                  </div>
                </div>
              </div>
            </div>

            <div className="md:col-span-7">
              <div key={`txt-${active}`} className="animate-fade-in">
                <div className="text-[10px] uppercase tracking-[0.3em] text-terracotta mb-3">
                  Stage {String(active + 1).padStart(2, "0")} of {STAGES.length}
                </div>
                <h2 className="font-display text-4xl md:text-5xl text-primary leading-tight">
                  {stage.title}
                </h2>
                <div className="mt-2 font-script text-2xl text-mustard">{stage.sub}</div>
                <p className="mt-6 text-lg text-foreground/75 leading-relaxed">
                  {stage.body}
                </p>

                <div className="mt-8 flex gap-3">
                  <button
                    onClick={() => { setAuto(false); setActive((a) => (a - 1 + STAGES.length) % STAGES.length); }}
                    className="rounded-full border border-border px-5 py-2 text-sm hover:bg-secondary transition-colors"
                  >
                    ← Prev
                  </button>
                  <button
                    onClick={() => { setAuto(false); setActive((a) => (a + 1) % STAGES.length); }}
                    className="rounded-full bg-primary text-primary-foreground px-5 py-2 text-sm hover:shadow-warm transition-all"
                  >
                    Next →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-border/60 py-8">
        <div className="container mx-auto text-center text-xs uppercase tracking-[0.25em] text-muted-foreground">
          ARDA · Colour, Cultivated
        </div>
      </footer>
      
      {/* Ambient Sound Component */}
      <AmbientSound />
    </main>
  );
};

export default Process;
