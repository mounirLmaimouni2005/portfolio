'use client';

import { MutableRefObject, useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

type Pointer = MutableRefObject<{ x: number; y: number }>;

/** Soft round sprite for particles (generated in-memory, no network). */
function useDotTexture() {
  return useMemo(() => {
    const size = 64;
    const c = document.createElement('canvas');
    c.width = c.height = size;
    const ctx = c.getContext('2d')!;
    const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    g.addColorStop(0, 'rgba(255,255,255,1)');
    g.addColorStop(0.35, 'rgba(255,255,255,0.85)');
    g.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, size, size);
    const tex = new THREE.CanvasTexture(c);
    tex.needsUpdate = true;
    return tex;
  }, []);
}

function Rings({ pointer }: { pointer: Pointer }) {
  const group = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    const g = group.current;
    if (!g) return;
    g.rotation.z += delta * 0.05;
    g.rotation.y = THREE.MathUtils.lerp(g.rotation.y, pointer.current.x * 0.5, 0.06);
    g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, -pointer.current.y * 0.4, 0.06);
  });

  return (
    <group ref={group}>
      <mesh rotation={[Math.PI / 2.4, 0, 0]}>
        <torusGeometry args={[2.1, 0.022, 16, 140]} />
        <meshStandardMaterial
          color="#2563EB"
          metalness={0.5}
          roughness={0.25}
          transparent
          opacity={0.55}
          emissive="#2563EB"
          emissiveIntensity={0.18}
        />
      </mesh>
      <mesh rotation={[Math.PI / 3, Math.PI / 6, 0]}>
        <torusGeometry args={[2.6, 0.014, 16, 160]} />
        <meshStandardMaterial color="#3B82F6" metalness={0.5} roughness={0.3} transparent opacity={0.4} />
      </mesh>
      <mesh rotation={[Math.PI / 2.1, -Math.PI / 8, 0]}>
        <torusGeometry args={[3.1, 0.01, 16, 180]} />
        <meshStandardMaterial color="#64748B" metalness={0.4} roughness={0.45} transparent opacity={0.22} />
      </mesh>

      {/* faint glass disc for depth */}
      <mesh position={[0, 0, -0.5]}>
        <circleGeometry args={[1.75, 72]} />
        <meshStandardMaterial color="#DBEAFE" transparent opacity={0.07} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

function Particles({ pointer }: { pointer: Pointer }) {
  const ref = useRef<THREE.Points>(null);
  const tex = useDotTexture();

  const { positions } = useMemo(() => {
    const count = 170;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = THREE.MathUtils.randFloat(1.3, 4.3);
      const a = Math.random() * Math.PI * 2;
      positions[i * 3] = Math.cos(a) * r * THREE.MathUtils.randFloat(0.5, 1);
      positions[i * 3 + 1] = Math.sin(a) * r * THREE.MathUtils.randFloat(0.5, 1);
      positions[i * 3 + 2] = THREE.MathUtils.randFloatSpread(3) - 1;
    }
    return { positions, count };
  }, []);

  useFrame((_, delta) => {
    const p = ref.current;
    if (!p) return;
    p.rotation.z += delta * 0.02;
    p.rotation.y = THREE.MathUtils.lerp(p.rotation.y, pointer.current.x * 0.3, 0.05);
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        map={tex}
        transparent
        opacity={0.6}
        color="#2563EB"
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

export default function ThreeScene({ pointer }: { pointer: Pointer }) {
  return (
    <Canvas
      className="!absolute inset-0"
      style={{ pointerEvents: 'none' }}
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      camera={{ fov: 45, position: [0, 0, 7] }}
    >
      <ambientLight intensity={0.85} />
      <directionalLight position={[5, 5, 5]} intensity={0.6} />
      <pointLight position={[-3, 2, 3]} intensity={2.2} color="#3B82F6" />
      <Float speed={1.1} rotationIntensity={0.4} floatIntensity={0.7}>
        <Rings pointer={pointer} />
        <Particles pointer={pointer} />
      </Float>
    </Canvas>
  );
}
