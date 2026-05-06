import { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function Particle({ position, color, size, speed }: { 
  position: [number, number, number]; 
  color: string; 
  size: number; 
  speed: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const initialY = position[1];
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = initialY + Math.sin(state.clock.elapsedTime * speed) * 0.5;
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.02;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[size, 8, 8]} />
      <meshStandardMaterial 
        color={color} 
        emissive={color} 
        emissiveIntensity={0.3}
        transparent
        opacity={0.6}
      />
    </mesh>
  );
}

function OrganicShape({ position, rotation, scale, color }: {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number;
  color: string;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = rotation[0] + Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
      meshRef.current.rotation.y = rotation[1] + state.clock.elapsedTime * 0.05;
      meshRef.current.rotation.z = rotation[2] + Math.cos(state.clock.elapsedTime * 0.15) * 0.1;
    }
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <dodecahedronGeometry args={[1, 0]} />
      <meshStandardMaterial 
        color={color} 
        emissive={color} 
        emissiveIntensity={0.2}
        metalness={0.4}
        roughness={0.5}
      />
    </mesh>
  );
}

export default function FloatingParticles() {
  const particles = useMemo(() => {
    const temp = [];
    const colors = ['#8a9e6e', '#c4491a', '#d4a574', '#3d5a1e'];
    
    for (let i = 0; i < 40; i++) {
      const position: [number, number, number] = [
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 10
      ];
      const color = colors[Math.floor(Math.random() * colors.length)];
      const size = 0.02 + Math.random() * 0.08;
      const speed = 0.5 + Math.random() * 1.5;
      temp.push({ position, color, size, speed });
    }
    return temp;
  }, []);

  const organicShapes = useMemo(() => {
    const temp = [];
    const colors = ['#8a9e6e', '#c4491a', '#d4a574'];
    
    for (let i = 0; i < 6; i++) {
      const position: [number, number, number] = [
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 8
      ];
      const rotation: [number, number, number] = [
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      ];
      const scale = 0.3 + Math.random() * 0.7;
      const color = colors[Math.floor(Math.random() * colors.length)];
      temp.push({ position, rotation, scale, color });
    }
    return temp;
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 12], fov: 75 }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.4} />
          <pointLight position={[15, 15, 5]} intensity={0.8} color="#f5f0e8" />
          <pointLight position={[-15, -15, -5]} intensity={0.5} color="#8a9e6e" />
          <directionalLight position={[5, 5, 5]} intensity={0.3} color="#d4a574" />
          
          {particles.map((particle, i) => (
            <Particle key={`particle-${i}`} {...particle} />
          ))}
          
          {organicShapes.map((shape, i) => (
            <OrganicShape key={`shape-${i}`} {...shape} />
          ))}
        </Suspense>
      </Canvas>
    </div>
  );
}
