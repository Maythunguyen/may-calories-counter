"use client"
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Suspense } from "react";
import { Model } from './Model';


const FloatingObjects = () => {
  return (
    <Canvas camera={{ position: [0, 0, 4], fov: 45 }}>
      <Suspense fallback={null}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} />
        <Model scale={3}/>
        <OrbitControls enableDamping />
      </Suspense>
    </Canvas>
  )
}

export default FloatingObjects
