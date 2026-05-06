import { useMemo } from "react";

const PALETTE = [
  "hsl(var(--terracotta))",
  "hsl(var(--mustard))",
  "hsl(var(--sage))",
  "hsl(var(--cocoa))",
  "hsl(var(--primary))",
];

const Petal = ({ color, style }: { color: string; style: React.CSSProperties }) => (
  <svg
    viewBox="0 0 40 40"
    className="absolute drift opacity-70"
    style={style}
    aria-hidden
  >
    <path
      d="M20 4 C28 10, 34 18, 30 28 C26 36, 14 36, 10 28 C6 18, 12 10, 20 4 Z"
      fill={color}
    />
  </svg>
);

export const Petals = ({ count = 14 }: { count?: number }) => {
  const petals = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        color: PALETTE[i % PALETTE.length],
        style: {
          left: `${(i * 83) % 100}%`,
          top: `${(i * 37) % 100}%`,
          width: `${10 + ((i * 7) % 22)}px`,
          height: `${10 + ((i * 7) % 22)}px`,
          animationDelay: `${(i % 8) * 1.3}s`,
          animationDuration: `${14 + (i % 6) * 3}s`,
        } as React.CSSProperties,
      })),
    [count]
  );
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {petals.map((p, i) => (
        <Petal key={i} color={p.color} style={p.style} />
      ))}
    </div>
  );
};
