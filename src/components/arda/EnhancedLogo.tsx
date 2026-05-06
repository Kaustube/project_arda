import { useState } from 'react';

export default function EnhancedLogo() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div 
        className="relative"
        style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Main sphere */}
        <div 
          className="rounded-full transition-all duration-300"
          style={{
            width: '100px',
            height: '100px',
            background: 'linear-gradient(135deg, #3d5a1e, #8a9e6e)',
            boxShadow: `
              0 10px 30px rgba(61, 90, 30, 0.3),
              inset -10px -10px 20px rgba(0, 0, 0, 0.2),
              inset 10px 10px 20px rgba(255, 255, 255, 0.1)
            `,
            transformStyle: 'preserve-3d',
            animation: isHovered ? 'rotate3d 2s linear infinite' : 'float3d 4s ease-in-out infinite',
          }}
        />
        
        {/* Orbiting rings */}
        <div 
          className="absolute border-2 rounded-full"
          style={{
            top: '50%',
            left: '50%',
            width: '120px',
            height: '120px',
            borderColor: '#8a9e6e',
            transform: 'translate(-50%, -50%) rotateX(60deg)',
            transformStyle: 'preserve-3d',
            animation: 'orbitRing 8s linear infinite'
          }}
        >
          <div 
            className="absolute rounded-full"
            style={{
              width: '6px',
              height: '6px',
              backgroundColor: '#8a9e6e',
              top: '-3px',
              left: '50%',
              transform: 'translateX(-50%)'
            }}
          />
        </div>
        
        <div 
          className="absolute border-2 rounded-full"
          style={{
            top: '50%',
            left: '50%',
            width: '120px',
            height: '120px',
            borderColor: '#c4491a',
            transform: 'translate(-50%, -50%) rotateY(60deg)',
            transformStyle: 'preserve-3d',
            animation: 'orbitRing 12s linear infinite reverse'
          }}
        >
          <div 
            className="absolute rounded-full"
            style={{
              width: '6px',
              height: '6px',
              backgroundColor: '#c4491a',
              top: '-3px',
              left: '50%',
              transform: 'translateX(-50%)'
            }}
          />
        </div>
        
        <div 
          className="absolute border-2 rounded-full"
          style={{
            top: '50%',
            left: '50%',
            width: '120px',
            height: '120px',
            borderColor: '#d4a574',
            transform: 'translate(-50%, -50%) rotateZ(60deg)',
            transformStyle: 'preserve-3d',
            animation: 'orbitRing 15s linear infinite'
          }}
        >
          <div 
            className="absolute rounded-full"
            style={{
              width: '6px',
              height: '6px',
              backgroundColor: '#d4a574',
              top: '-3px',
              left: '50%',
              transform: 'translateX(-50%)'
            }}
          />
        </div>
        
        {/* Floating elements */}
        <div 
          className="absolute rounded-full"
          style={{
            top: '20%',
            left: '30%',
            width: '4px',
            height: '4px',
            backgroundColor: '#8a9e6e',
            animation: 'float3d 3s ease-in-out infinite',
            animationDelay: '0s'
          }}
        />
        <div 
          className="absolute rounded-full"
          style={{
            top: '70%',
            left: '80%',
            width: '4px',
            height: '4px',
            backgroundColor: '#c4491a',
            animation: 'float3d 3s ease-in-out infinite',
            animationDelay: '1s'
          }}
        />
        <div 
          className="absolute rounded-full"
          style={{
            top: '40%',
            left: '60%',
            width: '4px',
            height: '4px',
            backgroundColor: '#d4a574',
            animation: 'float3d 3s ease-in-out infinite',
            animationDelay: '2s'
          }}
        />
      </div>
      
      <style>{`
        @keyframes rotate3d {
          0% { transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg); }
          100% { transform: rotateX(360deg) rotateY(360deg) rotateZ(360deg); }
        }
        
        @keyframes float3d {
          0%, 100% { transform: translateY(0) translateZ(0); }
          50% { transform: translateY(-20px) translateZ(30px); }
        }
        
        @keyframes orbitRing {
          0% { transform: rotate(0deg) translateX(60px) rotate(0deg); }
          100% { transform: rotate(360deg) translateX(60px) rotate(-360deg); }
        }
      `}</style>
    </div>
  );
}
