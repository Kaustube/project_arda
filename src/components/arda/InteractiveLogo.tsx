import { useRef, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, PresentationControls } from '@react-three/drei';
import * as THREE from 'three';

function Logo3D() {
  const meshRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += hovered ? 0.02 : 0.005;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <group 
      ref={meshRef} 
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Central sphere */}
      <mesh>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial 
          color="#3d5a1e" 
          emissive="#3d5a1e" 
          emissiveIntensity={hovered ? 0.4 : 0.2}
          metalness={0.3}
          roughness={0.4}
        />
      </mesh>
      
      {/* Orbiting rings */}
      <group rotation={[Math.PI / 6, 0, 0]}>
        <mesh>
          <torusGeometry args={[1.5, 0.05, 16, 32]} />
          <meshStandardMaterial color="#8a9e6e" emissive="#8a9e6e" emissiveIntensity={0.3} />
        </mesh>
      </group>
      
      <group rotation={[0, Math.PI / 6, 0]}>
        <mesh>
          <torusGeometry args={[1.8, 0.03, 16, 32]} />
          <meshStandardMaterial color="#c4491a" emissive="#c4491a" emissiveIntensity={0.3} />
        </mesh>
      </group>
      
      <group rotation={[0, 0, Math.PI / 6]}>
        <mesh>
          <torusGeometry args={[2.1, 0.02, 16, 32]} />
          <meshStandardMaterial color="#d4a574" emissive="#d4a574" emissiveIntensity={0.3} />
        </mesh>
      </group>
      
      {/* Floating particles around logo */}
      {[...Array(8)].map((_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        const radius = 2.5;
        return (
          <mesh key={i} position={[Math.cos(angle) * radius, 0, Math.sin(angle) * radius]}>
            <sphereGeometry args={[0.05, 8, 8]} />
            <meshStandardMaterial 
              color={i % 2 === 0 ? "#8a9e6e" : "#c4491a"} 
              emissive={i % 2 === 0 ? "#8a9e6e" : "#c4491a"} 
              emissiveIntensity={0.5} 
            />
          </mesh>
        );
      })}
    </group>
  );
}

export default function InteractiveLogo() {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.6} />
          <pointLight position={[10, 10, 10]} intensity={1} color="#f5f0e8" />
          <pointLight position={[-10, -10, -10]} intensity={0.6} color="#8a9e6e" />
          
          <PresentationControls
            global
            rotation={[0, -0.3, 0]}
            polar={[0, Math.PI / 4]}
            azimuth={[-Math.PI / 4, Math.PI / 4]}
          >
            <Float speed={2} rotationIntensity={0.4} floatIntensity={0.4}>
              <Logo3D />
            </Float>
          </PresentationControls>
        </Suspense>
      </Canvas>
    </div>
  );
}
