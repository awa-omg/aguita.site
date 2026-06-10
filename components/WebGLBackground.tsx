"use client"

import { useRef, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import * as THREE from "three"

function NetworkParticles({ count = 80 }: { count?: number }) {
  const mesh = useRef<THREE.Points>(null)
  const linesMesh = useRef<THREE.LineSegments>(null)

  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const velocities = new Float32Array(count * 3)
    
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10
      
      velocities[i * 3] = (Math.random() - 0.5) * 0.002
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.002
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.001
    }
    
    return { positions, velocities }
  }, [count])

  const linePositions = useMemo(() => {
    return new Float32Array(count * count * 6)
  }, [count])

  const lineColors = useMemo(() => {
    return new Float32Array(count * count * 6)
  }, [count])

  useFrame((state) => {
    if (!mesh.current || !linesMesh.current) return

    const positions = mesh.current.geometry.attributes.position.array as Float32Array
    const time = state.clock.elapsedTime

    // Update particle positions
    for (let i = 0; i < count; i++) {
      positions[i * 3] += particles.velocities[i * 3] + Math.sin(time * 0.1 + i) * 0.0005
      positions[i * 3 + 1] += particles.velocities[i * 3 + 1] + Math.cos(time * 0.1 + i) * 0.0005
      positions[i * 3 + 2] += particles.velocities[i * 3 + 2]

      // Boundary check
      for (let j = 0; j < 3; j++) {
        if (Math.abs(positions[i * 3 + j]) > 10) {
          particles.velocities[i * 3 + j] *= -1
        }
      }
    }

    mesh.current.geometry.attributes.position.needsUpdate = true

    // Update lines
    const linePos = linePositions
    const lineCol = lineColors
    let lineIndex = 0
    const maxDistance = 3

    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        const dx = positions[i * 3] - positions[j * 3]
        const dy = positions[i * 3 + 1] - positions[j * 3 + 1]
        const dz = positions[i * 3 + 2] - positions[j * 3 + 2]
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz)

        if (dist < maxDistance) {
          const alpha = 1 - dist / maxDistance
          
          linePos[lineIndex * 6] = positions[i * 3]
          linePos[lineIndex * 6 + 1] = positions[i * 3 + 1]
          linePos[lineIndex * 6 + 2] = positions[i * 3 + 2]
          linePos[lineIndex * 6 + 3] = positions[j * 3]
          linePos[lineIndex * 6 + 4] = positions[j * 3 + 1]
          linePos[lineIndex * 6 + 5] = positions[j * 3 + 2]

          // Color based on distance - blue to purple
          lineCol[lineIndex * 6] = 0.22 * alpha
          lineCol[lineIndex * 6 + 1] = 0.55 * alpha
          lineCol[lineIndex * 6 + 2] = 0.99 * alpha
          lineCol[lineIndex * 6 + 3] = 0.22 * alpha
          lineCol[lineIndex * 6 + 4] = 0.55 * alpha
          lineCol[lineIndex * 6 + 5] = 0.99 * alpha

          lineIndex++
        }
      }
    }

    if (linesMesh.current.geometry.attributes.position) {
      linesMesh.current.geometry.attributes.position.needsUpdate = true
      linesMesh.current.geometry.attributes.color.needsUpdate = true
      linesMesh.current.geometry.setDrawRange(0, lineIndex * 2)
    }
  })

  return (
    <>
      <points ref={mesh}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={count}
            array={particles.positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.05}
          color="#388bfd"
          transparent
          opacity={0.6}
          sizeAttenuation
        />
      </points>
      <lineSegments ref={linesMesh}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={count * count * 2}
            array={linePositions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={count * count * 2}
            array={lineColors}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial
          vertexColors
          transparent
          opacity={0.15}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>
    </>
  )
}

export function WebGLBackground() {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        gl={{ 
          antialias: false, 
          alpha: true,
          powerPreference: 'low-power'
        }}
        dpr={[1, 1.5]}
      >
        <NetworkParticles count={60} />
      </Canvas>
    </div>
  )
}
