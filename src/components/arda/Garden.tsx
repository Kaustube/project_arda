// Decorative animated flower garden — pure SVG
const Flower = ({
  x,
  delay,
  scale = 1,
  petalColor,
  centerColor,
  stemHeight = 80,
}: {
  x: number;
  delay: number;
  scale?: number;
  petalColor: string;
  centerColor: string;
  stemHeight?: number;
}) => (
  <g transform={`translate(${x},0)`}>
    {/* Stem */}
    <g className="sway" style={{ animationDelay: `${delay}s`, transformOrigin: `${x}px 200px`, transformBox: "fill-box" } as any}>
      <path
        d={`M0 200 Q-3 ${200 - stemHeight / 2} 0 ${200 - stemHeight}`}
        stroke="hsl(82 28% 35%)"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
      />
      {/* Leaf */}
      <path
        d={`M0 ${200 - stemHeight / 2} Q12 ${200 - stemHeight / 2 - 6} 14 ${200 - stemHeight / 2 + 4} Q6 ${200 - stemHeight / 2 + 2} 0 ${200 - stemHeight / 2}`}
        fill="hsl(95 30% 45%)"
      />
      {/* Flower head */}
      <g transform={`translate(0, ${200 - stemHeight}) scale(${scale})`}>
        {Array.from({ length: 6 }).map((_, i) => {
          const angle = (i * 60 * Math.PI) / 180;
          return (
            <ellipse
              key={i}
              cx={Math.cos(angle) * 7}
              cy={Math.sin(angle) * 7}
              rx="6"
              ry="9"
              fill={petalColor}
              transform={`rotate(${i * 60} ${Math.cos(angle) * 7} ${Math.sin(angle) * 7})`}
            />
          );
        })}
        <circle r="5" fill={centerColor} />
      </g>
    </g>
  </g>
);

export const Garden = () => {
  return (
    <div className="relative w-full h-48 md:h-56">
      <svg viewBox="0 0 800 220" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYEnd meet">
        {/* Ground */}
        <path d="M0 200 Q200 195 400 200 T800 200 L800 220 L0 220 Z" fill="hsl(22 38% 32%)" opacity="0.85" />
        <path d="M0 205 Q200 200 400 205 T800 205 L800 220 L0 220 Z" fill="hsl(22 45% 22%)" />

        {/* Grass blades */}
        {Array.from({ length: 40 }).map((_, i) => (
          <path
            key={i}
            d={`M${i * 20 + 5} 200 L${i * 20 + 7} ${190 - (i % 5) * 2} L${i * 20 + 9} 200 Z`}
            fill="hsl(82 28% 38%)"
            opacity="0.7"
          />
        ))}

        <Flower x={80} delay={0} petalColor="hsl(14 62% 52%)" centerColor="hsl(42 65% 60%)" stemHeight={90} />
        <Flower x={170} delay={0.5} scale={0.8} petalColor="hsl(42 65% 60%)" centerColor="hsl(22 38% 32%)" stemHeight={70} />
        <Flower x={260} delay={1} petalColor="hsl(350 55% 55%)" centerColor="hsl(42 75% 55%)" stemHeight={100} />
        <Flower x={360} delay={0.3} scale={0.9} petalColor="hsl(280 25% 55%)" centerColor="hsl(42 65% 60%)" stemHeight={85} />
        <Flower x={450} delay={0.8} petalColor="hsl(14 62% 52%)" centerColor="hsl(82 28% 35%)" stemHeight={95} />
        <Flower x={540} delay={1.4} scale={0.7} petalColor="hsl(42 65% 60%)" centerColor="hsl(22 38% 32%)" stemHeight={65} />
        <Flower x={630} delay={0.6} petalColor="hsl(95 30% 50%)" centerColor="hsl(42 75% 55%)" stemHeight={88} />
        <Flower x={720} delay={1.1} scale={0.85} petalColor="hsl(350 55% 55%)" centerColor="hsl(42 65% 60%)" stemHeight={78} />

        {/* Bee */}
        <g>
          <ellipse cx="0" cy="0" rx="4" ry="3" fill="hsl(42 85% 55%)">
            <animateMotion dur="14s" repeatCount="indefinite" path="M50 60 Q200 30 400 70 T780 50 Q500 90 200 80 Z" />
          </ellipse>
        </g>
      </svg>
    </div>
  );
};
