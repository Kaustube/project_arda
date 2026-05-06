import { useState, useEffect, useRef } from 'react';

export default function Advanced3DLogo() {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
        setMousePosition({ x, y });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-full flex items-center justify-center"
      style={{ perspective: '1500px', transformStyle: 'preserve-3d' }}
    >
      <div 
        className="relative"
        style={{
          transformStyle: 'preserve-3d',
          transform: `rotateY(${mousePosition.x * 15}deg) rotateX(${-mousePosition.y * 15}deg)`,
          transition: 'transform 0.1s ease-out'
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Central Core */}
        <div 
          className="absolute rounded-full"
          style={{
            width: '120px',
            height: '120px',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            background: 'radial-gradient(circle at 30% 30%, #8a9e6e, #3d5a1e, #1a2f0f)',
            boxShadow: `
              0 0 60px rgba(138, 158, 110, 0.8),
              0 0 120px rgba(138, 158, 110, 0.4),
              inset -20px -20px 40px rgba(0, 0, 0, 0.5),
              inset 20px 20px 40px rgba(255, 255, 255, 0.2)
            `,
            animation: isHovered ? 'corePulse 1s ease-in-out infinite' : 'coreFloat 4s ease-in-out infinite'
          }}
        />

        {/* Orbiting Rings */}
        {[
          { radius: 150, speed: 8, color: '#8a9e6e', thickness: 3, axis: 'X' },
          { radius: 180, speed: 12, color: '#c4491a', thickness: 2, axis: 'Y' },
          { radius: 210, speed: 16, color: '#d4a574', thickness: 2, axis: 'Z' },
          { radius: 240, speed: 20, color: '#3d5a1e', thickness: 1, axis: 'X' }
        ].map((ring, index) => (
          <div
            key={ring.radius}
            className="absolute rounded-full border-2"
            style={{
              width: `${ring.radius * 2}px`,
              height: `${ring.radius * 2}px`,
              left: '50%',
              top: '50%',
              borderColor: ring.color,
              borderWidth: `${ring.thickness}px`,
              transform: `translate(-50%, -50%) rotate${ring.axis}(${index % 2 === 0 ? 45 : 90}deg)`,
              transformStyle: 'preserve-3d',
              animation: `orbit${ring.axis} ${ring.speed}s linear infinite`,
              boxShadow: `0 0 20px ${ring.color}, inset 0 0 20px ${ring.color}`
            }}
          >
            {/* Particles on rings */}
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full"
                style={{
                  width: '8px',
                  height: '8px',
                  backgroundColor: ring.color,
                  top: '0',
                  left: '50%',
                  transform: `translateX(-50%) rotate(${i * 60}deg) translateY(-${ring.radius}px)`,
                  boxShadow: `0 0 15px ${ring.color}`
                }}
              />
            ))}
          </div>
        ))}

        {/* Floating Energy Particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={`particle-${i}`}
            className="absolute rounded-full"
            style={{
              width: `${2 + Math.random() * 4}px`,
              height: `${2 + Math.random() * 4}px`,
              backgroundColor: ['#8a9e6e', '#c4491a', '#d4a574', '#3d5a1e'][i % 4],
              left: `${30 + Math.random() * 40}%`,
              top: `${30 + Math.random() * 40}%`,
              transform: `translateZ(${Math.random() * 100 - 50}px)`,
              opacity: 0.6 + Math.random() * 0.4,
              boxShadow: `0 0 ${10 + Math.random() * 20}px currentColor`,
              animation: `particleFloat ${3 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 3}s`
            }}
          />
        ))}

        {/* Energy Field */}
        <div 
          className="absolute rounded-full"
          style={{
            width: '300px',
            height: '300px',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            background: 'radial-gradient(circle, transparent 30%, rgba(138, 158, 110, 0.1) 60%, transparent 100%)',
            animation: isHovered ? 'fieldExpand 2s ease-in-out infinite' : 'fieldPulse 6s ease-in-out infinite'
          }}
        />

        {/* ARDA Text */}
        <div 
          className="absolute font-display text-2xl font-bold text-white"
          style={{
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%) translateZ(10px)',
            textShadow: '0 0 20px rgba(255, 255, 255, 0.8)',
            letterSpacing: '0.2em',
            animation: 'textGlow 2s ease-in-out infinite alternate'
          }}
        >
          ARDA
        </div>
      </div>

      <style>{`
        @keyframes coreFloat {
          0%, 100% { transform: translate(-50%, -50%) translateY(0) scale(1); }
          50% { transform: translate(-50%, -50%) translateY(-20px) scale(1.05); }
        }

        @keyframes corePulse {
          0%, 100% { 
            transform: translate(-50%, -50%) scale(1);
            box-shadow: 
              0 0 60px rgba(138, 158, 110, 0.8),
              0 0 120px rgba(138, 158, 110, 0.4),
              inset -20px -20px 40px rgba(0, 0, 0, 0.5),
              inset 20px 20px 40px rgba(255, 255, 255, 0.2);
          }
          50% { 
            transform: translate(-50%, -50%) scale(1.1);
            box-shadow: 
              0 0 80px rgba(138, 158, 110, 1),
              0 0 160px rgba(138, 158, 110, 0.6),
              inset -20px -20px 40px rgba(0, 0, 0, 0.3),
              inset 20px 20px 40px rgba(255, 255, 255, 0.3);
          }
        }

        @keyframes orbitX {
          0% { transform: translate(-50%, -50%) rotateX(45deg) rotateZ(0deg); }
          100% { transform: translate(-50%, -50%) rotateX(45deg) rotateZ(360deg); }
        }

        @keyframes orbitY {
          0% { transform: translate(-50%, -50%) rotateY(90deg) rotateZ(0deg); }
          100% { transform: translate(-50%, -50%) rotateY(90deg) rotateZ(360deg); }
        }

        @keyframes orbitZ {
          0% { transform: translate(-50%, -50%) rotateZ(90deg) rotateX(0deg); }
          100% { transform: translate(-50%, -50%) rotateZ(90deg) rotateX(360deg); }
        }

        @keyframes particleFloat {
          0%, 100% {
            transform: translateZ(var(--z)) translateY(0) scale(1);
            opacity: 0.6;
          }
          50% {
            transform: translateZ(var(--z)) translateY(-40px) scale(1.5);
            opacity: 1;
          }
        }

        @keyframes fieldPulse {
          0%, 100% { 
            transform: translate(-50%, -50%) scale(1);
            opacity: 0.3;
          }
          50% { 
            transform: translate(-50%, -50%) scale(1.2);
            opacity: 0.6;
          }
        }

        @keyframes fieldExpand {
          0%, 100% { 
            transform: translate(-50%, -50%) scale(1);
            opacity: 0.5;
          }
          50% { 
            transform: translate(-50%, -50%) scale(1.4);
            opacity: 0.8;
          }
        }

        @keyframes textGlow {
          0% { text-shadow: 0 0 20px rgba(255, 255, 255, 0.8); }
          100% { text-shadow: 0 0 30px rgba(255, 255, 255, 1), 0 0 40px rgba(138, 158, 110, 0.8); }
        }
      `}</style>
    </div>
  );
}
