"use client"

import { useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import * as THREE from "three"

function SubtleGradient() {
  const mesh = useMemo(() => {
    const geometry = new THREE.PlaneGeometry(20, 20, 32, 32)
    const positions = geometry.attributes.position.array as Float32Array
    
    for (let i = 0; i < positions.length; i += 3) {
      positions[i + 2] = Math.sin(positions[i] * 0.5) * Math.cos(positions[i + 1] * 0.5) * 0.3
    }
    
    geometry.attributes.position.needsUpdate = true
    return geometry
  }, [])

  useFrame((state) => {
    const time = state.clock.elapsedTime
    const positions = mesh.attributes.position.array as Float32Array
    
    for (let i = 0; i < positions.length; i += 3) {
      positions[i + 2] = Math.sin(positions[i] * 0.5 + time * 0.1) * Math.cos(positions[i + 1] * 0.5 + time * 0.1) * 0.3
    }
    
    mesh.attributes.position.needsUpdate = true
  })

  return (
    <mesh geometry={mesh}>
      <meshBasicMaterial
        color="#388bfd"
        transparent
        opacity={0.03}
        wireframe={false}
      />
    </mesh>
  )
}

export function WebGLBackground() {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        gl={{ 
          antialias: false, 
          alpha: true,
          powerPreference: 'low-power'
        }}
        dpr={[1, 1.2]}
      >
        <SubtleGradient />
      </Canvas>
    </div>
  )
}
