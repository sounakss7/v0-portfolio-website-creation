"use client"

import { HeroSection } from "@/components/hero-section"
import { PortfolioSection } from "@/components/portfolio-section"
import { AboutSection } from "@/components/about-section"
import { ContactSection } from "@/components/contact-section"
import { Navigation } from "@/components/navigation"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Stars } from "@react-three/drei"
import { useRef } from "react"
import LeetCodeSection from "@/components/leetcode-section"

function ParticleField() {
  const particlesRef = useRef()

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={2000}
          array={new Float32Array(Array.from({ length: 6000 }, () => (Math.random() - 0.5) * 100))}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.1} color="#8b5cf6" transparent opacity={0.6} />
    </points>
  )
}

function FloatingShapes() {
  return (
    <>
      <mesh position={[-20, 10, -10]} rotation={[0, 0, 0]}>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial color="#8b5cf6" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[25, -15, -20]} rotation={[0, 0, 0]}>
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshStandardMaterial color="#06b6d4" metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh position={[15, 20, -15]} rotation={[0, 0, 0]}>
        <torusGeometry args={[2, 0.5, 16, 100]} />
        <meshStandardMaterial color="#f59e0b" metalness={0.7} roughness={0.3} />
      </mesh>
    </>
  )
}

export default function Home() {
  return (
    <main className="min-h-screen relative">
      <div className="fixed inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 30], fov: 75 }}>
          <ambientLight intensity={0.3} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <directionalLight position={[-10, -10, -5]} intensity={0.5} />
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
          <ParticleField />
          <FloatingShapes />
          <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
        </Canvas>
      </div>

      <div className="fixed inset-0 z-10 bg-gradient-to-br from-slate-900/80 via-purple-900/20 to-slate-900/80 backdrop-blur-[1px]" />

      <div className="relative z-20">
        <Navigation />
        <div id="home">
          <HeroSection />
        </div>
        <PortfolioSection />
        <AboutSection />
        <LeetCodeSection />
        <ContactSection />
      </div>
    </main>
  )
}
