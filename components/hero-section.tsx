"use client"

import type React from "react"

import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Float, Environment, Stars } from "@react-three/drei"
import { Button } from "@/components/ui/button"
import { ArrowDown } from "lucide-react"
import { useRef, useMemo, useEffect, useState } from "react"
import type * as THREE from "three"

function Canvas3DErrorBoundary({ children }: { children: React.ReactNode }) {
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    const handleError = (error: ErrorEvent) => {
      console.error("[v0] Canvas error caught:", error)
      setHasError(true)
    }

    window.addEventListener("error", handleError)
    return () => window.removeEventListener("error", handleError)
  }, [])

  if (hasError) {
    return (
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 flex items-center justify-center">
        <div className="text-white text-center">
          <p>3D visualization temporarily unavailable</p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}

function hasWebGLSupport(): boolean {
  try {
    const canvas = document.createElement("canvas")
    const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl")
    return !!gl
  } catch (e) {
    return false
  }
}

function AnimatedParticles() {
  const points = useRef<THREE.Points>(null!)
  const particleCount = 800 // Reduced particle count for better performance

  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(particleCount * 3)
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20
    }
    return positions
  }, [])

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.x = state.clock.elapsedTime * 0.05
      points.current.rotation.y = state.clock.elapsedTime * 0.075
    }
  })

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={particleCount} array={particlesPosition} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.02} color="#8b5cf6" transparent opacity={0.6} />
    </points>
  )
}

function FloatingCube() {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.3
      meshRef.current.rotation.y = Math.cos(state.clock.elapsedTime * 0.5) * 0.3
    }
  })

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={meshRef} position={[3, 1, -2]}>
        <boxGeometry args={[1.2, 1.2, 1.2]} />
        <meshStandardMaterial
          color="#8b5cf6"
          metalness={0.7}
          roughness={0.2}
          emissive="#4c1d95"
          emissiveIntensity={0.1}
        />
      </mesh>
    </Float>
  )
}

function FloatingSphere() {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.5
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1.5}>
      <mesh ref={meshRef} position={[-3, -1, 1]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial
          color="#1f2937"
          metalness={0.8}
          roughness={0.1}
          emissive="#0f172a"
          emissiveIntensity={0.2}
        />
      </mesh>
    </Float>
  )
}

function FloatingTorus() {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.3
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2
    }
  })

  return (
    <Float speed={1.8} rotationIntensity={0.8} floatIntensity={1.2}>
      <mesh ref={meshRef} position={[0, 2, -3]}>
        <torusGeometry args={[1, 0.4, 16, 100]} />
        <meshStandardMaterial
          color="#6366f1"
          metalness={0.6}
          roughness={0.3}
          emissive="#312e81"
          emissiveIntensity={0.15}
        />
      </mesh>
    </Float>
  )
}

function Scene3D() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8b5cf6" />
      <directionalLight position={[0, 5, 5]} intensity={0.4} />

      <AnimatedParticles />

      <Stars radius={50} depth={50} count={1500} factor={4} saturation={0} fade speed={1} />

      <FloatingCube />
      <FloatingSphere />
      <FloatingTorus />

      <Environment preset="night" background={false} />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 2}
      />
    </>
  )
}

export function HeroSection({ disable3D = false }: { disable3D?: boolean }) {
  const [isMounted, setIsMounted] = useState(false)
  const [hasWebGL, setHasWebGL] = useState(true) // Added WebGL support state

  useEffect(() => {
    setIsMounted(true)
    setHasWebGL(hasWebGLSupport())
  }, [])

  const scrollToPortfolio = () => {
    if (typeof window !== "undefined" && document) {
      const portfolioElement = document.getElementById("portfolio")
      if (portfolioElement) {
        portfolioElement.scrollIntoView({ behavior: "smooth" })
      }
    }
  }

  return (
    <section className="relative h-screen w-full overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900"></div>

      {/* 3D Canvas Background */}
      {!disable3D && isMounted && hasWebGL ? (
        <Canvas3DErrorBoundary>
          <div className="absolute inset-0">
            <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
              <Scene3D />
            </Canvas>
          </div>
        </Canvas3DErrorBoundary>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900/40 to-slate-900">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-slate-900/50 to-slate-900"></div>
        </div>
      )}

      {/* Content Overlay */}
      <div className="relative z-10 flex h-full items-center justify-center">
        <div className="text-center space-y-6 max-w-4xl mx-auto px-6">
          <h1 className="text-6xl md:text-8xl font-bold text-white font-[family-name:var(--font-playfair)] drop-shadow-2xl">
            Sounak
            <span className="block text-purple-400">Sarkar</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto leading-relaxed drop-shadow-lg">
            B.Tech CSE(AI-ML) Student | Passionate about Machine Learning, Data Analysis & Python Development
          </p>
          <p className="text-lg text-gray-300 drop-shadow-md">
            📍 Kolkata | 🎯 Currently learning deep learning and gen AI
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <Button
              size="lg"
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 text-lg shadow-2xl border border-purple-500/50"
              onClick={scrollToPortfolio}
            >
              View My Projects
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-purple-400 text-purple-300 hover:bg-purple-600 hover:text-white px-8 py-3 text-lg bg-transparent backdrop-blur-sm shadow-xl"
              onClick={() => window.open("mailto:hrick3130@gmail.com", "_blank")}
            >
              Contact Me
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <button
          onClick={scrollToPortfolio}
          className="animate-bounce text-purple-400 hover:text-purple-300 transition-colors drop-shadow-lg"
        >
          <ArrowDown size={32} />
        </button>
      </div>
    </section>
  )
}
