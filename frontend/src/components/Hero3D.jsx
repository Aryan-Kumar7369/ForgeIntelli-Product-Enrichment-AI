import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';

function ForgeCore() {
  const groupRef = useRef(null);
  const icoRef = useRef(null);
  const torusRef = useRef(null);

  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.15;
    if (icoRef.current) icoRef.current.rotation.x += delta * 0.3;
    if (torusRef.current) torusRef.current.rotation.z += delta * 0.2;
  });

  return (
    <group ref={groupRef}>
      {/* Main icosahedron — molten copper wireframe */}
      <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.6}>
        <mesh ref={icoRef}>
          <icosahedronGeometry args={[2, 1]} />
          <MeshDistortMaterial
            color="#c87533"
            emissive="#c87533"
            emissiveIntensity={0.4}
            wireframe
            distort={0.15}
            speed={2}
            roughness={0.3}
          />
        </mesh>
      </Float>

      {/* Orbiting torus — gold accent */}
      <Float speed={2} rotationIntensity={0.6} floatIntensity={0.4}>
        <mesh ref={torusRef} position={[1.5, 1, -1]}>
          <torusGeometry args={[0.8, 0.05, 16, 64]} />
          <meshStandardMaterial
            color="#d4a055"
            emissive="#d4a055"
            emissiveIntensity={0.6}
          />
        </mesh>
      </Float>

      {/* Small orbiting sphere — ember */}
      <Float speed={3} rotationIntensity={1} floatIntensity={1}>
        <mesh position={[-1.8, -0.5, 0.5]}>
          <sphereGeometry args={[0.2, 16, 16]} />
          <meshStandardMaterial
            color="#e8854a"
            emissive="#e8854a"
            emissiveIntensity={0.8}
          />
        </mesh>
      </Float>

      {/* Another small sphere */}
      <Float speed={2.5} rotationIntensity={0.8} floatIntensity={0.8}>
        <mesh position={[2, -1.2, -0.5]}>
          <octahedronGeometry args={[0.35]} />
          <meshStandardMaterial
            color="#c87533"
            emissive="#c87533"
            emissiveIntensity={0.5}
            wireframe
          />
        </mesh>
      </Float>
    </group>
  );
}

export default function Hero3D() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 50 }}
      style={{ background: 'transparent' }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={1} color="#c87533" />
      <pointLight position={[-5, -3, 3]} intensity={0.5} color="#d4a055" />
      <spotLight
        position={[0, 8, 4]}
        angle={0.3}
        penumbra={0.8}
        intensity={0.8}
        color="#e8854a"
      />
      <ForgeCore />
    </Canvas>
  );
}
