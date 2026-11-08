"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Icosahedron, MeshDistortMaterial, Points, PointMaterial } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function NeuralCore() {
  const mesh = useRef<THREE.Mesh>(null);
  const ring = useRef<THREE.Group>(null);
  useFrame((state, delta) => {
    if (mesh.current) {
      mesh.current.rotation.x += delta * 0.12;
      mesh.current.rotation.y += delta * 0.2;
    }
    if (ring.current) {
      ring.current.rotation.z -= delta * 0.09;
      ring.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.22) * 0.15;
    }
  });
  return (
    <group>
      <Float speed={1.2} rotationIntensity={0.22} floatIntensity={0.45}>
        <Icosahedron ref={mesh} args={[1.15, 5]}>
          <MeshDistortMaterial color="#c6ff3d" roughness={0.22} metalness={0.58} distort={0.28} speed={1.7} />
        </Icosahedron>
      </Float>
      <group ref={ring}>
        <mesh rotation={[Math.PI / 2.3, 0.2, 0]}>
          <torusGeometry args={[1.65, 0.008, 8, 180]} />
          <meshBasicMaterial color="#ff7048" transparent opacity={0.85} />
        </mesh>
        <mesh rotation={[0.7, Math.PI / 2.8, 0.2]}>
          <torusGeometry args={[1.9, 0.006, 8, 180]} />
          <meshBasicMaterial color="#c6ff3d" transparent opacity={0.45} />
        </mesh>
      </group>
    </group>
  );
}

function StarField() {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const data = new Float32Array(900);
    for (let i = 0; i < 300; i++) {
      data[i * 3] = (Math.random() - 0.5) * 9;
      data[i * 3 + 1] = (Math.random() - 0.5) * 7;
      data[i * 3 + 2] = (Math.random() - 0.5) * 4;
    }
    return data;
  }, []);
  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.018;
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.08) * 0.08;
    }
  });
  return <Points ref={ref} positions={positions} stride={3}>
    <PointMaterial transparent color="#c6ff3d" size={0.018} sizeAttenuation depthWrite={false} opacity={0.62} />
  </Points>;
}

export default function MotionScene() {
  return (
    <div className="motion-scene" aria-hidden="true">
      <Canvas camera={{ position: [0, 0, 5.4], fov: 42 }} dpr={[1, 1.6]} gl={{ alpha: true, antialias: true }}>
        <ambientLight intensity={1.15} />
        <pointLight position={[3, 3, 4]} intensity={24} color="#c6ff3d" />
        <pointLight position={[-3, -2, 2]} intensity={9} color="#ff7048" />
        <StarField />
        <NeuralCore />
      </Canvas>
    </div>
  );
}
