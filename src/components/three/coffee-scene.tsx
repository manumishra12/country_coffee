"use client";

import { Suspense, useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment, MeshDistortMaterial, Stars } from "@react-three/drei";
import type { Mesh, Group, Points } from "three";
import * as THREE from "three";

function CoffeeBean({ position, scale, speed, color = "#4A2C20" }: {
  position: [number, number, number];
  scale: number;
  speed: number;
  color?: string;
}) {
  const meshRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * speed) * 0.3;
    meshRef.current.rotation.y += 0.005 * speed;
    meshRef.current.rotation.z = Math.cos(state.clock.elapsedTime * speed * 0.5) * 0.1;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.8}>
      <mesh ref={meshRef} position={position} scale={scale} castShadow>
        <torusGeometry args={[0.8, 0.35, 16, 32]} />
        <MeshDistortMaterial
          color={color}
          roughness={0.4}
          metalness={0.15}
          distort={0.25}
          speed={1.5}
        />
      </mesh>
    </Float>
  );
}

function SteamParticles() {
  const pointsRef = useRef<Points>(null);
  const count = 200;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 3;
      pos[i * 3 + 1] = Math.random() * 6 - 1;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 3;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const positions = pointsRef.current.geometry.attributes.position;
    for (let i = 0; i < count; i++) {
      const y = positions.getY(i);
      positions.setY(i, y > 5 ? -1 : y + 0.008);
      positions.setX(i, positions.getX(i) + Math.sin(state.clock.elapsedTime + i) * 0.001);
    }
    positions.needsUpdate = true;
    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.02;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#C4A882"
        transparent
        opacity={0.4}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

function GoldenRing() {
  const meshRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = state.clock.elapsedTime * 0.1;
    meshRef.current.rotation.z = state.clock.elapsedTime * 0.05;
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -2]}>
      <torusGeometry args={[3, 0.02, 16, 100]} />
      <meshStandardMaterial
        color="#C4A882"
        emissive="#C4A882"
        emissiveIntensity={0.3}
        transparent
        opacity={0.3}
      />
    </mesh>
  );
}

function Scene() {
  const groupRef = useRef<Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.05;
  });

  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={0.6} castShadow color="#FFF5E1" />
      <pointLight position={[-3, 2, -2]} color="#C4A882" intensity={0.4} />
      <pointLight position={[3, -1, 3]} color="#6B4226" intensity={0.3} />

      <group ref={groupRef}>
        <CoffeeBean position={[0, 0.3, 0]} scale={1.6} speed={0.6} color="#3D2415" />
        <CoffeeBean position={[-2.8, 1.0, -1.5]} scale={0.8} speed={1.0} color="#5A3520" />
        <CoffeeBean position={[2.5, -0.5, -0.8]} scale={1.0} speed={0.8} color="#4A2C20" />
        <CoffeeBean position={[1.2, 2.0, -2.5]} scale={0.6} speed={1.2} color="#6B4226" />
        <CoffeeBean position={[-1.5, -1.8, 0.5]} scale={0.7} speed={0.7} color="#3D2415" />
        <CoffeeBean position={[0.5, -2.5, -1]} scale={0.5} speed={1.5} color="#5A3520" />
        <CoffeeBean position={[-3, -0.5, -2]} scale={0.4} speed={1.3} color="#4A2C20" />
      </group>

      <SteamParticles />
      <GoldenRing />
      <Stars radius={50} depth={30} count={500} factor={2} fade speed={0.5} />
      <Environment preset="studio" />
    </>
  );
}

export function CoffeeScene() {
  return (
    <div className="absolute inset-0 z-0">
      <Suspense fallback={
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 border-2 border-mocha/20 border-t-mocha rounded-full animate-spin" />
        </div>
      }>
        <Canvas
          camera={{ position: [0, 0, 6], fov: 45 }}
          gl={{ alpha: true, antialias: true }}
          style={{ background: "transparent" }}
          dpr={[1, 2]}
        >
          <Scene />
        </Canvas>
      </Suspense>
    </div>
  );
}
