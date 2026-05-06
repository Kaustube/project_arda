import { useEffect, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  duration: number;
  delay: number;
}

export default function EnhancedParticles() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const colors = ['#8a9e6e', '#c4491a', '#d4a574', '#3d5a1e'];
    const newParticles: Particle[] = [];
    
    for (let i = 0; i < 25; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 2 + Math.random() * 6,
        color: colors[Math.floor(Math.random() * colors.length)],
        duration: 10 + Math.random() * 20,
        delay: Math.random() * 5
      });
    }
    
    setParticles(newParticles);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Floating particles */}
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
            filter: 'blur(0.5px)',
            mixBlendMode: 'multiply',
            animation: `float3d ${particle.duration}s ease-in-out infinite`,
            animationDelay: `${particle.delay}s`
          }}
        />
      ))}
      
      {/* Orbiting elements */}
      <div 
        className="absolute w-full h-full"
        style={{ animation: 'orbit3d 15s linear infinite' }}
      >
        <div 
          className="absolute rounded-full w-1 h-1"
          style={{ 
            backgroundColor: '#8a9e6e', 
            top: '20%', 
            left: '80%',
            transform: 'translate(-50%, -50%)'
          }} 
        />
        <div 
          className="absolute rounded-full w-1 h-1"
          style={{ 
            backgroundColor: '#c4491a', 
            top: '80%', 
            left: '20%',
            transform: 'translate(-50%, -50%)'
          }} 
        />
        <div 
          className="absolute rounded-full w-1 h-1"
          style={{ 
            backgroundColor: '#d4a574', 
            top: '30%', 
            left: '70%',
            transform: 'translate(-50%, -50%)'
          }} 
        />
        <div 
          className="absolute rounded-full w-1 h-1"
          style={{ 
            backgroundColor: '#3d5a1e', 
            top: '70%', 
            left: '30%',
            transform: 'translate(-50%, -50%)'
          }} 
        />
      </div>
      
      {/* 3D depth layers */}
      <div 
        className="absolute inset-0" 
        style={{ transform: 'translateZ(-100px)', opacity: 0.3 }}
      >
        {[...Array(8)].map((_, i) => (
          <div
            key={`depth-${i}`}
            className="absolute w-2 h-2 rounded-full"
            style={{
              left: `${10 + i * 12}%`,
              top: `${15 + (i % 3) * 25}%`,
              backgroundColor: ['#8a9e6e', '#c4491a', '#d4a574', '#3d5a1e'][i % 4],
              animation: `float3d ${8 + i * 2}s ease-in-out infinite`,
              animationDelay: `${i * 0.5}s`
            }}
          />
        ))}
      </div>
      
      <style>{`
        @keyframes float3d {
          0%, 100% {
            transform: translateY(0) translateX(0) rotate(0deg) scale(1);
            opacity: 0.3;
          }
          25% {
            transform: translateY(-20px) translateX(10px) rotate(90deg) scale(1.1);
            opacity: 0.6;
          }
          50% {
            transform: translateY(-40px) translateX(-10px) rotate(180deg) scale(1.2);
            opacity: 0.8;
          }
          75% {
            transform: translateY(-20px) translateX(5px) rotate(270deg) scale(1.1);
            opacity: 0.6;
          }
        }
        
        @keyframes orbit3d {
          0% {
            transform: rotate(0deg) translateX(30px) rotate(0deg);
          }
          100% {
            transform: rotate(360deg) translateX(30px) rotate(-360deg);
          }
        }
      `}</style>
    </div>
  );
}
