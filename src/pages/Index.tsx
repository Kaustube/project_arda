import { useEffect, useState } from "react";
import { Linkedin, Instagram } from "lucide-react";
import ardaLogo from "@/assets/arda-logo.png";
import enactusLogo from "@/assets/enactus-bennett.jpeg";
import imgCollection from "@/assets/process-collection.jpg";
import imgMushrooms from "@/assets/process-mushrooms.jpg";
import imgBottling from "@/assets/process-bottling.jpg";
import imgHeroFlow from "@/assets/hero-flow.jpg";
import { MushroomCard } from "@/components/arda/MushroomCard";
import { DyeCard } from "@/components/arda/DyeCard";
import { ProcessFlow } from "@/components/arda/ProcessFlow";
import { TransformFlow } from "@/components/arda/TransformFlow";
import { Garden } from "@/components/arda/Garden";
import { Petals } from "@/components/arda/Petals";
import { Reveal } from "@/components/arda/Reveal";
// import Advanced3DParticles from "@/components/arda/Advanced3DParticles";
import Advanced3DLogo from "@/components/arda/Advanced3DLogo";

const Index = () => {
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <main className="relative overflow-x-hidden">
      {/* NAV */}
      <header className="fixed top-0 inset-x-0 z-50 bg-background/70 backdrop-blur-md border-b border-border/60" style={{ transformStyle: 'preserve-3d' }}>
        <div className="container mx-auto flex items-center justify-between py-3">
          <a href="#top" className="flex items-center gap-3 group">
            <div 
              className="relative"
              style={{ transformStyle: 'preserve-3d', perspective: '500px' }}
            >
              <img 
                src={ardaLogo} 
                alt="ARDA — Colour, Cultivated" 
                className="h-10 w-10 object-contain transition-transform duration-700 group-hover:rotate-[20deg] rounded-full"
                style={{ transform: 'translateZ(20px)' }}
              />
              <div 
                className="absolute inset-0 rounded-full"
                style={{
                  width: '40px',
                  height: '40px',
                  background: 'radial-gradient(circle, rgba(138,158,110,0.3) 0%, transparent 70%)',
                  transform: 'translateZ(-10px)',
                  animation: 'navPulse 3s ease-in-out infinite'
                }}
              />
            </div>
            <div className="leading-tight">
              <div className="font-display text-xl text-primary">ARDA</div>
              <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground -mt-0.5">Colour, Cultivated</div>
            </div>
          </a>
          <nav className="hidden md:flex items-center gap-8 text-sm">
            <a href="#story" className="hover:text-terracotta transition-colors relative group">
              Story
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-terracotta transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="#process" className="hover:text-terracotta transition-colors relative group">
              Process
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-terracotta transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="#products" className="hover:text-terracotta transition-colors relative group">
              Products
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-terracotta transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="#impact" className="hover:text-terracotta transition-colors relative group">
              Impact
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-terracotta transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="#about" className="hover:text-terracotta transition-colors relative group">
              About
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-terracotta transition-all duration-300 group-hover:w-full"></span>
            </a>
          </nav>
          <a href="#about" className="hidden md:flex items-center gap-2 rounded-full border border-primary/30 px-4 py-2 text-xs uppercase tracking-widest text-primary hover:bg-primary hover:text-primary-foreground transition-all hover:scale-105 hover:shadow-lg">
            Get in touch
          </a>
        </div>
      </header>

      {/* HERO */}
      <section id="top" className="relative min-h-screen pt-24 pb-12 flex items-center overflow-hidden">
        {/* <Advanced3DParticles /> */}
        <Petals count={18} />
        <div className="absolute -top-32 -left-32 w-[36rem] h-[36rem] rounded-full bg-mustard/15 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 w-[36rem] h-[36rem] rounded-full bg-terracotta/15 blur-3xl" />

        <div className="container mx-auto relative z-10 grid md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-7">
            <Reveal>
              <div className="inline-flex items-center gap-3 rounded-full border border-border/80 bg-background/60 backdrop-blur px-4 py-1.5 text-xs uppercase tracking-[0.25em] text-cocoa">
                <span className="h-2 w-2 rounded-full bg-terracotta animate-pulse" />
                A circular economy initiative
              </div>
            </Reveal>
            <Reveal delay={150}>
              <h1 className="mt-6 font-display text-6xl md:text-8xl lg:text-9xl text-primary leading-[0.92]">
                One peel.{" "}
                <span className="italic font-light text-terracotta">Two</span>{" "}
                <span className="block">harvests.</span>
                <span className="font-script text-mustard text-5xl md:text-7xl block mt-3">zero waste.</span>
              </h1>
            </Reveal>
            <Reveal delay={300}>
              <p className="mt-8 max-w-xl text-lg text-foreground/75 leading-relaxed">
                ARDA is a zero-waste circular economy project converting the
                organic waste of a single university campus into edible
                mushrooms and food-grade natural dyes. Quietly, completely,
                without remainder.
              </p>
            </Reveal>
            <Reveal delay={450}>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <a 
                  href="#process" 
                  className="group relative inline-flex items-center gap-3 rounded-full bg-primary px-8 py-4 text-primary-foreground shadow-soft transition-all hover:shadow-warm hover:scale-[1.03] overflow-hidden"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <div 
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                    style={{ transform: 'translateZ(-10px)', animation: 'shimmer 3s ease-in-out infinite' }}
                  />
                  <span className="font-medium tracking-wide relative z-10">See the loop</span>
                  <span className="transition-transform group-hover:translate-x-1 relative z-10">↓</span>
                </a>
                <a 
                  href="#products" 
                  className="group relative inline-flex items-center gap-3 rounded-full border border-primary/40 px-8 py-4 text-primary hover:bg-primary/5 transition-all overflow-hidden"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{
                      background: 'linear-gradient(45deg, transparent 30%, rgba(138,158,110,0.1) 50%, transparent 70%)',
                      transform: 'translateZ(-5px)'
                    }}
                  />
                  <span className="relative z-10">Explore products</span>
                </a>
              </div>
            </Reveal>
          </div>

          <div className="md:col-span-5 relative">
            <Reveal delay={300}>
              <div className="relative mx-auto w-full max-w-md aspect-square">
                {/* Halo */}
                <div className="absolute inset-0 rounded-full gradient-cream shadow-soft paper-grain" />
                <div className="absolute inset-4 rounded-full border border-cocoa/15 spin-slow" />
                <div className="absolute inset-10 rounded-full border border-dashed border-terracotta/30" />
                {/* Orbit dots */}
                <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full spin-slow">
                  <circle cx="100" cy="10" r="4" fill="hsl(var(--terracotta))" />
                  <circle cx="190" cy="100" r="3" fill="hsl(var(--mustard))" />
                  <circle cx="100" cy="190" r="3.5" fill="hsl(var(--sage))" />
                  <circle cx="10" cy="100" r="3" fill="hsl(var(--cocoa))" />
                </svg>
                <img
                  src={ardaLogo}
                  alt="ARDA logo"
                  className="absolute inset-8 w-[calc(100%-4rem)] h-[calc(100%-4rem)] object-contain rounded-full float-slow"
                  style={{ transform: `translateY(${scrollY * -0.05}px)` }}
                />
              </div>
            </Reveal>
            <Reveal delay={500}>
              <p className="mt-6 text-center font-script text-2xl text-cocoa">
                colour, cultivated.
              </p>
            </Reveal>
          </div>
        </div>

      </section>

      <style>{`
        @keyframes navPulse {
          0%, 100% { transform: translateZ(-10px) scale(1); opacity: 0.3; }
          50% { transform: translateZ(-10px) scale(1.2); opacity: 0.6; }
        }
        
        @keyframes shimmer {
          0% { transform: translateZ(-10px) translateX(-100%); }
          100% { transform: translateZ(-10px) translateX(100%); }
        }
      `}</style>

      {/* MARQUEE */}
      <section className="border-y border-border/60 bg-primary text-primary-foreground py-5 overflow-hidden">
        <div className="flex marquee whitespace-nowrap font-display text-3xl md:text-4xl italic">
          {Array.from({ length: 2 }).map((_, k) => (
            <div key={k} className="flex items-center gap-10 pr-10">
              {["one input", "two outputs", "zero waste", "circular by design", "rooted on campus", "colour, cultivated"].map((t, i) => (
                <span key={i} className="flex items-center gap-10">
                  {t}
                  <span className="text-mustard">✺</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* STORY */}
      <section id="story" className="py-28 md:py-36 relative">
        <div className="container mx-auto grid md:grid-cols-12 gap-12 items-start">
          <div className="md:col-span-4">
            <Reveal>
              <div className="text-xs uppercase tracking-[0.3em] text-terracotta mb-4">
                ✦ The Premise
              </div>
              <h2 className="font-display text-5xl md:text-6xl text-primary leading-tight">
                Waste is a <span className="italic">failure</span> of imagination.
              </h2>
            </Reveal>
          </div>
          <div className="md:col-span-7 md:col-start-6">
            <Reveal delay={150}>
              <p className="text-xl text-foreground/80 leading-relaxed">
                Every day, the kitchens of a single university discard
                kilograms of fruit and vegetable peels. Each peel still
                carries the architecture of life — fibres, sugars, pigments.
                ARDA refuses to call it rubbish.
              </p>
            </Reveal>
            <Reveal delay={300}>
              <p className="mt-6 text-foreground/70 leading-relaxed">
                Through a quiet, two-stream bioprocess, we sterilise these
                peels and split them: the solid residue cradles oyster
                mushrooms; the pigmented liquid is reduced into food-grade
                natural dyes. What once filled a bin now feeds a plate and
                colours a kitchen.
              </p>
            </Reveal>

            <Reveal delay={450}>
              <div className="mt-10 grid grid-cols-3 gap-6">
                {[
                  { v: "1", l: "input stream" },
                  { v: "2", l: "harvested outputs" },
                  { v: "0", l: "residue, by design" },
                ].map((s) => (
                  <div key={s.l} className="text-center md:text-left">
                    <div className="font-display text-6xl text-mustard italic">{s.v}</div>
                    <div className="text-xs uppercase tracking-widest text-muted-foreground mt-2">{s.l}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* INPUT → OUTPUT GALLERY */}
      <section className="py-20 md:py-28 bg-secondary/30 relative">
        <div className="container mx-auto">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto mb-12">
              <div className="text-xs uppercase tracking-[0.3em] text-terracotta mb-3">✦ From peel, to plate & pigment</div>
              <h2 className="font-display text-4xl md:text-5xl text-primary leading-tight">
                What goes in. <em className="text-mustard">What comes out.</em>
              </h2>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr_auto_1fr] gap-6 md:gap-4 items-center max-w-6xl mx-auto">
            <Reveal>
              <figure className="group">
                <div className="aspect-[4/5] rounded-2xl overflow-hidden border border-border/60 shadow-soft">
                  <img
                    src={imgCollection}
                    alt="Vegetable and fruit peels collected from the campus mess"
                    width={1024}
                    height={1024}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <figcaption className="mt-3 text-center">
                  <div className="text-[10px] uppercase tracking-[0.25em] text-terracotta">Input</div>
                  <div className="font-display text-xl text-primary mt-1">Peels & agri-waste</div>
                </figcaption>
              </figure>
            </Reveal>

            <div className="hidden md:flex justify-center text-cocoa/50 font-display text-3xl italic">→</div>

            <Reveal delay={150}>
              <figure className="group">
                <div className="aspect-[4/5] rounded-2xl overflow-hidden border border-border/60 shadow-soft">
                  <img
                    src={imgMushrooms}
                    alt="Fresh oyster mushrooms in a wooden bowl"
                    width={1024}
                    height={1024}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <figcaption className="mt-3 text-center">
                  <div className="text-[10px] uppercase tracking-[0.25em] text-terracotta">Output 01</div>
                  <div className="font-display text-xl text-primary mt-1">Oyster mushrooms</div>
                </figcaption>
              </figure>
            </Reveal>

            <div className="hidden md:flex justify-center text-cocoa/50 font-display text-3xl italic">→</div>

            <Reveal delay={300}>
              <figure className="group">
                <div className="aspect-[4/5] rounded-2xl overflow-hidden border border-border/60 shadow-soft">
                  <img
                    src={imgBottling}
                    alt="Bottled food-grade natural dyes"
                    width={1024}
                    height={1024}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <figcaption className="mt-3 text-center">
                  <div className="text-[10px] uppercase tracking-[0.25em] text-terracotta">Output 02</div>
                  <div className="font-display text-xl text-primary mt-1">Natural dyes</div>
                </figcaption>
              </figure>
            </Reveal>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section id="process" className="py-28 md:py-36 bg-secondary/40 relative paper-grain">
        <div className="container mx-auto">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto mb-20">
              <div className="text-xs uppercase tracking-[0.3em] text-terracotta mb-4">✦ The Process</div>
              <h2 className="font-display text-5xl md:text-6xl text-primary leading-tight">
                Five quiet steps.
              </h2>
              <p className="mt-5 text-foreground/70">
                A loop that begins in the mess hall and ends, again, in the kitchen.
              </p>
            </div>
          </Reveal>

          <div className="max-w-5xl mx-auto">
            <ProcessFlow />
          </div>

          <div className="max-w-6xl mx-auto mt-24">
            <Reveal>
              <div className="text-center max-w-2xl mx-auto mb-10">
                <div className="text-xs uppercase tracking-[0.3em] text-terracotta mb-3">✦ Two Pathways</div>
                <h3 className="font-display text-3xl md:text-4xl text-primary leading-tight">
                  One stream of waste, <em>two</em> transformations.
                </h3>
                <p className="mt-3 text-foreground/70 text-sm">
                  Hover or tap each stage to follow the journey.
                </p>
              </div>
            </Reveal>
            <Reveal delay={150}>
              <TransformFlow />
            </Reveal>
            <Reveal delay={300}>
              <div className="mt-12 text-center">
                <a
                  href="/process"
                  className="group inline-flex items-center gap-3 rounded-full bg-cocoa text-primary-foreground px-8 py-4 shadow-soft hover:shadow-warm hover:scale-[1.03] transition-all"
                >
                  <span className="font-medium tracking-wide">See the full animated process</span>
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </a>
                <p className="mt-3 text-xs uppercase tracking-[0.25em] text-muted-foreground">
                  9 stages · auto-play walkthrough
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section id="products" className="py-28 md:py-36 relative">
        <div className="container mx-auto">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto mb-16">
              <div className="text-xs uppercase tracking-[0.3em] text-terracotta mb-4">✦ Two Outputs</div>
              <h2 className="font-display text-5xl md:text-6xl text-primary leading-tight">
                What the peel becomes.
              </h2>
            </div>
          </Reveal>

          <div className="space-y-12 max-w-6xl mx-auto">
            <Reveal>
              <MushroomCard />
            </Reveal>
            <Reveal delay={150}>
              <DyeCard />
            </Reveal>
          </div>
        </div>
      </section>

      {/* PRINCIPLES */}
      <section id="impact" className="py-28 md:py-36 bg-primary text-primary-foreground relative overflow-hidden">
        {/* <Advanced3DParticles /> */}
        <div className="absolute inset-0 opacity-20">
          <Petals count={10} />
        </div>
        <div className="container mx-auto relative z-10">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto mb-16">
              <div className="text-xs uppercase tracking-[0.3em] text-mustard mb-4">✦ Principles</div>
              <h2 className="font-display text-5xl md:text-6xl leading-tight">
                Small loop. <em className="text-mustard">Real</em> consequence.
              </h2>
            </div>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { n: "Circular by design", note: "Every output of one process becomes the input of another. Nothing is treated as residue." },
              { n: "Rooted on campus", note: "We start where the waste begins — the campus mess and kitchens — and close the loop in place." },
              { n: "Quietly useful", note: "Two everyday products, made honestly. No greenwashing, no spectacle, no shortcut." },
            ].map((s, i) => (
              <Reveal key={s.n} delay={i * 120}>
                <div className="rounded-3xl border border-primary-foreground/15 bg-primary-foreground/5 p-8 backdrop-blur-sm hover:bg-primary-foreground/10 transition-colors h-full">
                  <div className="font-display text-5xl italic text-mustard">0{i + 1}</div>
                  <div className="mt-4 font-display text-2xl">{s.n}</div>
                  <p className="mt-3 text-primary-foreground/75 leading-relaxed">{s.note}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* GARDEN */}
      <section className="bg-gradient-to-b from-background to-secondary/40 pt-12 relative overflow-hidden">
        {/* <Advanced3DParticles /> */}
        <div className="container mx-auto">
          <Reveal>
            <p className="text-center font-script text-3xl text-cocoa mb-2">
              and out of waste — a garden grows.
            </p>
          </Reveal>
        </div>
        <Garden />
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24 md:py-32 bg-cocoa text-primary-foreground relative">
        <div className="container mx-auto grid md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-7">
            <Reveal>
              <div className="text-xs uppercase tracking-[0.3em] text-mustard mb-4">✦ The People</div>
              <h2 className="font-display text-5xl md:text-6xl leading-tight">
                A project of <em>Enactus Bennett University</em>.
              </h2>
            </Reveal>
            <Reveal delay={150}>
              <p className="mt-6 text-lg text-primary-foreground/75 leading-relaxed max-w-2xl">
                ARDA was founded in 2025 under the banner of Enactus Bennett
                University — a chapter of the global student movement that
                uses entrepreneurial action to transform lives and shape a
                better, more sustainable world.
              </p>
            </Reveal>
            <Reveal delay={300}>
              <div className="mt-10 grid grid-cols-2 gap-6 max-w-md">
                {[
                  { k: "Founded", v: "2025" },
                  { k: "Chapter", v: "Bennett University" },
                ].map((r) => (
                  <div key={r.k}>
                    <div className="text-[10px] uppercase tracking-[0.25em] text-mustard">{r.k}</div>
                    <div className="font-display text-xl mt-1">{r.v}</div>
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal delay={450}>
              <div className="mt-10">
                <div className="text-[10px] uppercase tracking-[0.25em] text-mustard mb-4">Follow along</div>
                <div className="flex flex-wrap gap-3">
                  <a
                    href="https://www.linkedin.com/company/project-arda/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-3 rounded-full border border-primary-foreground/20 bg-primary-foreground/5 px-5 py-3 hover:bg-mustard hover:text-cocoa hover:border-mustard transition-all"
                  >
                    <Linkedin className="h-4 w-4" />
                    <span className="text-sm">LinkedIn</span>
                    <span className="text-xs text-primary-foreground/50 group-hover:text-cocoa/70">/project-arda</span>
                  </a>
                  <a
                    href="https://www.instagram.com/project_arda"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-3 rounded-full border border-primary-foreground/20 bg-primary-foreground/5 px-5 py-3 hover:bg-mustard hover:text-cocoa hover:border-mustard transition-all"
                  >
                    <Instagram className="h-4 w-4" />
                    <span className="text-sm">@project_arda</span>
                  </a>
                  <a
                    href="https://www.instagram.com/enactus.bu"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-3 rounded-full border border-primary-foreground/20 bg-primary-foreground/5 px-5 py-3 hover:bg-mustard hover:text-cocoa hover:border-mustard transition-all"
                  >
                    <Instagram className="h-4 w-4" />
                    <span className="text-sm">@enactus.bu</span>
                  </a>
                </div>
              </div>
            </Reveal>

          </div>

          <div className="md:col-span-5 flex flex-col items-center gap-8">
            <Reveal>
              <div className="rounded-3xl bg-primary-foreground/5 border border-primary-foreground/10 p-6 backdrop-blur">
                <img src={enactusLogo} alt="Enactus Bennett University" className="h-32 w-32 object-contain rounded-2xl" />
              </div>
            </Reveal>
            <Reveal delay={150}>
              <div className="flex items-center gap-6">
                <img src={ardaLogo} alt="ARDA" className="h-20 w-20 object-contain rounded-2xl bg-background p-2" />
                <span className="font-script text-3xl text-mustard">×</span>
                <div className="rounded-2xl bg-primary-foreground/5 border border-primary-foreground/10 p-2">
                  <img src={enactusLogo} alt="Enactus" className="h-20 w-20 object-contain rounded-xl" />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-cocoa text-primary-foreground border-t border-primary-foreground/10 py-10">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-primary-foreground/70">
          <div className="flex items-center gap-3">
            <img src={ardaLogo} alt="" className="h-8 w-8 object-contain" />
            <span className="font-display text-base text-primary-foreground">ARDA</span>
            <span className="text-primary-foreground/40">·</span>
            <span>Colour, Cultivated®</span>
          </div>
          <div className="flex items-center gap-3">
            <a href="https://www.linkedin.com/company/project-arda/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="h-9 w-9 rounded-full border border-primary-foreground/20 flex items-center justify-center hover:bg-mustard hover:text-cocoa hover:border-mustard transition-all">
              <Linkedin className="h-4 w-4" />
            </a>
            <a href="https://www.instagram.com/project_arda" target="_blank" rel="noopener noreferrer" aria-label="Instagram @project_arda" className="h-9 w-9 rounded-full border border-primary-foreground/20 flex items-center justify-center hover:bg-mustard hover:text-cocoa hover:border-mustard transition-all">
              <Instagram className="h-4 w-4" />
            </a>
            <a href="https://www.instagram.com/enactus.bu" target="_blank" rel="noopener noreferrer" aria-label="Instagram @enactus.bu" className="h-9 w-9 rounded-full border border-primary-foreground/20 flex items-center justify-center hover:bg-mustard hover:text-cocoa hover:border-mustard transition-all">
              <Instagram className="h-4 w-4" />
            </a>
          </div>
          <div className="text-xs uppercase tracking-[0.25em]">
            © {new Date().getFullYear()} · Enactus Bennett University
          </div>
          <div className="flex items-center gap-4 text-xs">
            <a href="/privacy" className="hover:text-mustard transition-colors">Privacy Policy</a>
            <span className="text-primary-foreground/40">·</span>
            <a href="/terms" className="hover:text-mustard transition-colors">Terms of Service</a>
            <span className="text-primary-foreground/40">·</span>
            <a href="/copyright" className="hover:text-mustard transition-colors">Copyright</a>
          </div>
        </div>
      </footer>
    </main>
  );
};

export default Index;
