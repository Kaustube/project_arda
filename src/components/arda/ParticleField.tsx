import { useRef, useMemo, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float } from '@react-three/drei';
import * as THREE from 'three';

function Particle({ position, color, scale }: { position: [number, number, number]; color: string; scale: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.001;
      meshRef.current.rotation.y += 0.002;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.1;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.2} />
      </mesh>
    </Float>
  );
}

function ParticleField({ count = 50 }: { count?: number }) {
  const particles = useMemo(() => {
    const temp = [];
    const colors = ['#8a9e6e', '#c4491a', '#d4a574', '#3d5a1e'];
    
    for (let i = 0; i < count; i++) {
      const position: [number, number, number] = [
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10
      ];
      const color = colors[Math.floor(Math.random() * colors.length)];
      const scale = 0.5 + Math.random() * 1.5;
      temp.push({ position, color, scale });
    }
    return temp;
  }, [count]);

  return (
    <>
      {particles.map((particle, i) => (
        <Particle key={i} {...particle} />
      ))}
    </>
  );
}

function AnimatedOrbit() {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.05) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh position={[2, 0, 0]}>
        <torusGeometry args={[0.1, 0.03, 16, 32]} />
        <meshStandardMaterial color="#8a9e6e" emissive="#8a9e6e" emissiveIntensity={0.3} />
      </mesh>
      <mesh position={[-2, 0, 0]}>
        <torusGeometry args={[0.1, 0.03, 16, 32]} />
        <meshStandardMaterial color="#c4491a" emissive="#c4491a" emissiveIntensity={0.3} />
      </mesh>
      <mesh position={[0, 2, 0]}>
        <torusGeometry args={[0.1, 0.03, 16, 32]} />
        <meshStandardMaterial color="#d4a574" emissive="#d4a574" emissiveIntensity={0.3} />
      </mesh>
      <mesh position={[0, -2, 0]}>
        <torusGeometry args={[0.1, 0.03, 16, 32]} />
        <meshStandardMaterial color="#3d5a1e" emissive="#3d5a1e" emissiveIntensity={0.3} />
      </mesh>
    </group>
  );
}

export default function ParticleField3D() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={0.8} color="#f5f0e8" />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8a9e6e" />
          
          <ParticleField count={30} />
          <AnimatedOrbit />
          
          <OrbitControls 
            enableZoom={false} 
            enablePan={false} 
            enableRotate={false}
            autoRotate={true}
            autoRotateSpeed={0.5}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
