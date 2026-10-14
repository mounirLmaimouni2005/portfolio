'use client';

import { MutableRefObject, useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { RoundedBox, ContactShadows, Float } from '@react-three/drei';
import * as THREE from 'three';

type Pointer = MutableRefObject<{ x: number; y: number }>;

function useCodeTexture() {
  return useMemo(() => {
    const s = 256;
    const c = document.createElement('canvas');
    c.width = c.height = s;
    const ctx = c.getContext('2d')!;
    ctx.clearRect(0, 0, s, s);
    ctx.fillStyle = '#ffffff';
    ctx.font = '700 132px ui-monospace, "Courier New", monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('</>', s / 2, s / 2 + 8);
    const tex = new THREE.CanvasTexture(c);
    tex.anisotropy = 4;
    tex.needsUpdate = true;
    return tex;
  }, []);
}

function Cube({ pointer }: { pointer: Pointer }) {
  const g = useRef<THREE.Group>(null);
  const tex = useCodeTexture();
  useFrame(() => {
    const o = g.current;
    if (!o) return;
    o.rotation.y = THREE.MathUtils.lerp(o.rotation.y, -0.5 + pointer.current.x * 0.3, 0.05);
    o.rotation.x = THREE.MathUtils.lerp(o.rotation.x, 0.05 - pointer.current.y * 0.15, 0.05);
  });
  return (
    <Float speed={1.3} rotationIntensity={0.08} floatIntensity={0.4}>
      <group ref={g} position={[0, 0.62, 0]}>
        <RoundedBox args={[1.5, 1.5, 1.5]} radius={0.18} smoothness={6}>
          <meshStandardMaterial color="#20463a" roughness={0.24} metalness={0.38} />
        </RoundedBox>
        <mesh position={[0, 0, 0.77]}>
          <planeGeometry args={[1.06, 1.06]} />
          <meshBasicMaterial map={tex} transparent />
        </mesh>
      </group>
    </Float>
  );
}

function OrbitRing() {
  const r = useRef<THREE.Mesh>(null);
  useFrame((_, d) => {
    if (r.current) r.current.rotation.z += d * 0.5;
  });
  return (
    <group position={[0, 0.5, 0]} rotation={[Math.PI / 2.5, 0, 0]}>
      <mesh ref={r}>
        <torusGeometry args={[1.55, 0.018, 16, 140]} />
        <meshStandardMaterial color="#ffffff" emissive="#c7e9d5" emissiveIntensity={0.95} roughness={0.25} />
      </mesh>
    </group>
  );
}

function Podium() {
  return (
    <group position={[0, -0.95, 0]}>
      {/* glow base */}
      <mesh position={[0, -0.24, 0]}>
        <cylinderGeometry args={[2.0, 2.0, 0.12, 64]} />
        <meshStandardMaterial color="#2f6b52" emissive="#3f8f6f" emissiveIntensity={0.75} roughness={0.5} />
      </mesh>
      {/* lower tier */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[1.75, 1.8, 0.34, 64]} />
        <meshStandardMaterial color="#e9ede5" roughness={0.85} />
      </mesh>
      {/* upper tier */}
      <mesh position={[0, 0.3, 0]}>
        <cylinderGeometry args={[1.32, 1.4, 0.28, 64]} />
        <meshStandardMaterial color="#f6f7f2" roughness={0.75} />
      </mesh>
    </group>
  );
}

export default function Scene3D({ pointer }: { pointer: Pointer }) {
  return (
    <Canvas
      className="!absolute inset-0"
      style={{ pointerEvents: 'none' }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      camera={{ fov: 34, position: [0, 1.7, 7] }}
    >
      <ambientLight intensity={0.82} />
      <directionalLight position={[3, 6, 4]} intensity={1.15} />
      <directionalLight position={[-4, 2, 2]} intensity={0.35} color="#e8efe8" />
      <directionalLight position={[-2, 3, -4]} intensity={0.5} color="#ffffff" />
      <pointLight position={[2.4, 3, 3]} intensity={0.7} color="#dfeee6" />
      <Podium />
      <Cube pointer={pointer} />
      <OrbitRing />
      <Float speed={1.1} floatIntensity={0.5}>
        <mesh position={[1.75, -0.55, 0.9]}>
          <sphereGeometry args={[0.3, 32, 32]} />
          <meshStandardMaterial color="#21473b" roughness={0.32} />
        </mesh>
      </Float>
      <Float speed={1.25} floatIntensity={0.5}>
        <mesh position={[0.7, -1.05, 1.3]}>
          <sphereGeometry args={[0.2, 32, 32]} />
          <meshStandardMaterial color="#f4f3ef" roughness={0.5} />
        </mesh>
      </Float>
      <ContactShadows position={[0, -1.28, 0]} opacity={0.26} scale={10} blur={3.2} far={4.5} color="#1a2b22" />
    </Canvas>
  );
}
