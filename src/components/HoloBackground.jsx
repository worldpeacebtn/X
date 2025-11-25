import React from "react";
import { Canvas } from "@react-three/fiber";
import { Stars, OrbitControls } from "@react-three/drei";

export default function HoloBackground() {
  return (
    <Canvas className="absolute inset-0 w-full h-full !z-0" camera={{ position: [0, 0, 5] }}>
      <Stars
        radius={120}
        depth={80}
        count={10000}
        factor={4}
        saturation={0}
        fade
        speed={2}
      />
      <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
    </Canvas>
  );
}
