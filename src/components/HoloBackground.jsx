import React from "react";
import { Canvas } from "@react-three/fiber";
import { Stars, OrbitControls } from "@react-three/drei";

export default function HoloBackground() {
  return (
    <Canvas className="absolute inset-0 w-full h-full !z-0" camera={{ position: [0, 0, 5] }}>
      <Stars
        radius={92}
        depth={35}
        count={4200}
        factor={4}
        saturation={0}
        fade
        speed={1.3}  // <--- make stars move
      />
      <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
    </Canvas>
  );
}
