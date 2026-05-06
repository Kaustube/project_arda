import { useEffect, useState, useRef } from 'react';

interface Particle3D {
  id: number;
  x: number;
  y: number;
  z: number;
  size: number;
  color: string;
  speed: number;
  delay: number;
  orbitRadius: number;
  orbitSpeed: number;
}

export default function Advanced3DParticles() {
  const [particles, setParticles] = useState<Particle3D[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const colors = ['#8a9e6e', '#c4491a', '#d4a574', '#3d5a1e'];
    const newParticles: Particle3D[] = [];
    
    for (let i = 0; i < 50; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        z: Math.random() * 100 - 50,
        size: 1 + Math.random() * 8,
        color: colors[Math.floor(Math.random() * colors.length)],
        speed: 5 + Math.random() * 15,
        delay: Math.random() * 10,
        orbitRadius: 10 + Math.random() * 40,
        orbitSpeed: 3 + Math.random() * 12
      });
    }
    
    setParticles(newParticles);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePos({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
    >
      {/* 3D Particle Field */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
            transform: `translateZ(${particle.z}px) translateX(${Math.sin(Date.now() / 1000 * particle.orbitSpeed + particle.delay) * particle.orbitRadius}px) translateY(${Math.cos(Date.now() / 1000 * particle.orbitSpeed + particle.delay) * particle.orbitRadius}px)`,
            opacity: 0.3 + (particle.z + 50) / 100,
            filter: `blur(${Math.max(0, 2 - particle.size / 4)}px)`,
            boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
            animation: `float3d ${particle.speed}s ease-in-out infinite`,
            animationDelay: `${particle.delay}s`
          }}
        />
      ))}

      {/* Interactive Mouse Following Particles */}
      <div
        className="absolute w-32 h-32 rounded-full pointer-events-none"
        style={{
          left: `${mousePos.x}%`,
          top: `${mousePos.y}%`,
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, rgba(138,158,110,0.3) 0%, transparent 70%)',
          filter: 'blur(20px)',
          transition: 'all 0.3s ease-out'
        }}
      />

      {/* 3D Geometric Shapes */}
      <div className="absolute inset-0" style={{ transformStyle: 'preserve-3d' }}>
        {[...Array(12)].map((_, i) => (
          <div
            key={`shape-${i}`}
            className="absolute"
            style={{
              left: `${10 + i * 7}%`,
              top: `${20 + (i % 4) * 20}%`,
              width: '20px',
              height: '20px',
              backgroundColor: ['#8a9e6e', '#c4491a', '#d4a574', '#3d5a1e'][i % 4],
              transform: `rotateX(${i * 30}deg) rotateY(${i * 45}deg) rotateZ(${i * 60}deg) translateZ(${50 + i * 10}px)`,
              opacity: 0.6,
              clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
              animation: `spin3d ${8 + i}s linear infinite`,
              animationDelay: `${i * 0.5}s`
            }}
          />
        ))}
      </div>

      {/* Floating Organic Forms */}
      <div className="absolute inset-0">
        {[...Array(8)].map((_, i) => (
          <div
            key={`organic-${i}`}
            className="absolute rounded-full"
            style={{
              left: `${15 + i * 10}%`,
              top: `${10 + (i % 3) * 30}%`,
              width: `${30 + i * 5}px`,
              height: `${30 + i * 5}px`,
              background: `radial-gradient(circle, ${['#8a9e6e', '#c4491a', '#d4a574', '#3d5a1e'][i % 4]}40 0%, transparent 70%)`,
              transform: `scale(${0.8 + Math.sin(Date.now() / 1000 + i) * 0.4}) rotate(${Date.now() / 50 + i * 45}deg)`,
              opacity: 0.2,
              filter: 'blur(15px)',
              animation: `pulse3d ${4 + i}s ease-in-out infinite`
            }}
          />
        ))}
      </div>

      {/* Depth Layers */}
      <div className="absolute inset-0" style={{ transform: 'translateZ(-200px)', opacity: 0.4 }}>
        {[...Array(15)].map((_, i) => (
          <div
            key={`depth-${i}`}
            className="absolute w-1 h-1 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              backgroundColor: ['#8a9e6e', '#c4491a', '#d4a574', '#3d5a1e'][i % 4],
              animation: `float3d ${6 + Math.random() * 8}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes float3d {
          0%, 100% {
            transform: translateY(0) translateX(0) translateZ(0) rotate(0deg) scale(1);
            opacity: 0.3;
          }
          25% {
            transform: translateY(-30px) translateX(20px) translateZ(50px) rotate(90deg) scale(1.2);
            opacity: 0.7;
          }
          50% {
            transform: translateY(-60px) translateX(-20px) translateZ(100px) rotate(180deg) scale(1.4);
            opacity: 0.9;
          }
          75% {
            transform: translateY(-30px) translateX(10px) translateZ(50px) rotate(270deg) scale(1.2);
            opacity: 0.6;
          }
        }

        @keyframes spin3d {
          0% {
            transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg) translateZ(50px);
          }
          100% {
            transform: rotateX(360deg) rotateY(360deg) rotateZ(360deg) translateZ(50px);
          }
        }

        @keyframes pulse3d {
          0%, 100% {
            transform: scale(0.8) rotate(0deg);
            opacity: 0.2;
          }
          50% {
            transform: scale(1.2) rotate(180deg);
            opacity: 0.4;
          }
        }
      `}</style>
    </div>
  );
}
