import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";

function MovingOrbs() {
  const meshRef = useRef();
  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.02;
      meshRef.current.rotation.x = clock.getElapsedTime() * 0.01;
    }
  });
  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={0.5} />
    </mesh>
  );
}

export default function HoloBackground() {
  return (
    <Canvas className="absolute inset-0 w-full h-full !z-0" camera={{ position: [0, 0, 5] }}>
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} />
      <Stars radius={150} depth={80} count={15000} factor={5} saturation={0} fade speed={2} />
      <MovingOrbs />
    </Canvas>
  );
}
