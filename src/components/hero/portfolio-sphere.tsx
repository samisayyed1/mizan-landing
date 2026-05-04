"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

const GOLD_CREAM = new THREE.Color("#F5E6C8");
const GOLD_PRIMARY = new THREE.Color("#D4A574");
const GOLD_DEEP = new THREE.Color("#8B6F47");

type Curve = {
  geometry: THREE.BufferGeometry;
  color: THREE.Color;
  axis: THREE.Vector3;
  speed: number;
};

function buildOrbitGeometry(seed: number): THREE.BufferGeometry {
  const segments = 96;
  const radius = 1.5 + (seed % 7) * 0.05;
  const a = ((seed * 13.37) % Math.PI) - Math.PI / 2;
  const b = ((seed * 7.91) % Math.PI) - Math.PI / 2;
  const c = ((seed * 3.7) % Math.PI) - Math.PI / 2;

  const points: THREE.Vector3[] = [];
  for (let i = 0; i <= segments; i++) {
    const t = (i / segments) * Math.PI * 2;
    const x = Math.cos(t) * radius;
    const y = Math.sin(t) * radius;
    const z = 0;
    const v = new THREE.Vector3(x, y, z);
    v.applyEuler(new THREE.Euler(a, b, c));
    points.push(v);
  }
  return new THREE.BufferGeometry().setFromPoints(points);
}

function colorForRing(i: number, total: number): THREE.Color {
  const t = i / total;
  if (t < 0.5) {
    return GOLD_CREAM.clone().lerp(GOLD_PRIMARY, t * 2);
  }
  return GOLD_PRIMARY.clone().lerp(GOLD_DEEP, (t - 0.5) * 2);
}

function SphereCurves({ count = 80 }: { count?: number }) {
  const group = useRef<THREE.Group>(null);
  const { mouse } = useThree();

  const curves = useMemo<Curve[]>(() => {
    return Array.from({ length: count }, (_, i) => ({
      geometry: buildOrbitGeometry(i + 1),
      color: colorForRing(i, count),
      axis: new THREE.Vector3(Math.sin(i * 0.7), Math.cos(i * 0.4), Math.sin(i * 0.2)).normalize(),
      speed: 0.04 + (i % 5) * 0.01,
    }));
  }, [count]);

  useFrame((state, delta) => {
    if (!group.current) return;
    group.current.rotation.y += 0.05 * delta;
    group.current.rotation.x += 0.02 * delta;

    const targetX = mouse.y * 0.14;
    const targetY = mouse.x * 0.14;
    group.current.rotation.x +=
      (targetX - (group.current.rotation.x - state.clock.elapsedTime * 0.02 * 0)) * 0.02;
    group.current.rotation.y +=
      (targetY - (group.current.rotation.y - state.clock.elapsedTime * 0.05 * 0)) * 0.02;

    const breathe = 1 + Math.sin(state.clock.elapsedTime / 2) * 0.02;
    group.current.scale.setScalar(breathe);
  });

  return (
    <group ref={group}>
      {curves.map((c, i) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: static memoized curve list, never reordered
        <line key={i}>
          <primitive object={c.geometry} attach="geometry" />
          <lineBasicMaterial
            attach="material"
            color={c.color}
            transparent
            opacity={0.55}
            linewidth={1}
          />
        </line>
      ))}
      <mesh>
        <sphereGeometry args={[0.35, 32, 32]} />
        <meshBasicMaterial color={GOLD_CREAM} transparent opacity={0.18} />
      </mesh>
    </group>
  );
}

function BreathingLight() {
  const ref = useRef<THREE.PointLight>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.intensity = 0.6 + (Math.sin(t / 2) + 1) * 0.2;
  });
  return <pointLight ref={ref} position={[0, 0, 0]} intensity={0.8} color="#F5E6C8" />;
}

export default function PortfolioSphere() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const reduced = useRef(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    reduced.current = mq.matches;
  }, []);

  return (
    <div ref={wrapRef} className="relative h-full w-full" aria-hidden>
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(212,165,116,0.08),transparent_60%)]" />
      <Canvas
        camera={{ position: [0, 0, 4], fov: 50 }}
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.3} />
        <BreathingLight />
        <SphereCurves count={80} />
      </Canvas>
    </div>
  );
}
