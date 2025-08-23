"use client"

import { Canvas } from "@react-three/fiber"
import { OrbitControls, Float, Sphere, Box } from "@react-three/drei"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Award } from "lucide-react"

const skills = [
  { category: "Programming", items: ["Python", "C", "Java", "HTML", "CSS"] },
  { category: "AI/ML", items: ["Machine Learning", "XGBoost", "Random Forest", "Data Analysis", "Pandas"] },
  { category: "Specializations", items: ["Data Structures", "Algorithms", "Cloud Computing", "Jupyter Notebook"] },
  { category: "Tools & Platforms", items: ["GitHub", "ORCID", "Linktree", "VS Code"] },
]

const certifications = [
  {
    title: "Oracle Cloud Infrastructure Foundations",
    issuer: "Oracle",
    date: "2024",
    credentialId: "Oracle Certified",
    link: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=E324C7AAA577250F7EAF5C442478B73643541A147826A0FD1DD650F571F85B11",
  },
  {
    title: "Job Simulation Certificate",
    issuer: "Forage",
    date: "2024",
    credentialId: "Forage Certified",
    link: "https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/ifobHAoMjQs9s6bKS/gMTdCXwDdLYoXZ3wG_ifobHAoMjQs9s6bKS_daY5Hd7K26Siu5ZuZ_1755031163937_completion_certificate.pdf",
  },
]

function AnimatedScene() {
  return (
    <>
      <ambientLight intensity={0.6} />
      <pointLight position={[10, 10, 10]} />

      <Float speed={1} rotationIntensity={0.5} floatIntensity={1}>
        <Sphere args={[1, 32, 32]} position={[0, 0, 0]}>
          <meshStandardMaterial color="#8b5cf6" wireframe />
        </Sphere>
      </Float>

      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
        <Box args={[0.8, 0.8, 0.8]} position={[2, 1, -1]}>
          <meshStandardMaterial color="#1f2937" />
        </Box>
      </Float>

      <Float speed={0.8} rotationIntensity={0.4} floatIntensity={1.2}>
        <Box args={[0.6, 0.6, 0.6]} position={[-2, -1, 1]}>
          <meshStandardMaterial color="#6b7280" />
        </Box>
      </Float>

      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
    </>
  )
}

export function AboutSection() {
  return (
    <section id="about" className="py-20 px-6 bg-slate-800/40 backdrop-blur-sm border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* 3D Animation */}
          <div className="h-96 lg:h-[500px]">
            <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
              <AnimatedScene />
            </Canvas>
          </div>

          {/* Content */}
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-[family-name:var(--font-playfair)] drop-shadow-lg">
                About Me
              </h2>
              <div className="space-y-4 text-lg text-slate-200 leading-relaxed drop-shadow-md">
                <p>
                  I'm Sounak Sarkar, a passionate 3rd year B.Tech student specializing in Computer Science Engineering
                  with AI-ML at DSCSIT'26. I'm deeply enthusiastic about machine learning, data analysis, and developing
                  innovative solutions using Python.
                </p>
                <p>
                  Currently focusing on advanced Python libraries, ML algorithms, and learning deep learning and gen AI.
                  I enjoy working on healthcare prediction models and data analysis projects that can make a real-world
                  impact.
                </p>
                <p>
                  📧 <strong>Email:</strong> hrick3130@gmail.com
                  <br />🔗 <strong>GitHub:</strong> sounakss7
                  <br />📍 <strong>Location:</strong> Kolkata, India
                </p>
              </div>
            </div>

            {/* Skills Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {skills.map((skillGroup) => (
                <Card
                  key={skillGroup.category}
                  className="hover:shadow-lg transition-shadow duration-300 bg-slate-700/60 backdrop-blur-md border-slate-600/50 hover:border-purple-500/50"
                >
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-white mb-4">{skillGroup.category}</h3>
                    <div className="flex flex-wrap gap-2">
                      {skillGroup.items.map((skill) => (
                        <Badge
                          key={skill}
                          variant="outline"
                          className="border-purple-400 text-purple-300 hover:bg-purple-400 hover:text-slate-900 transition-colors"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="mt-16">
            <div className="text-center mb-12">
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 font-[family-name:var(--font-playfair)] drop-shadow-lg">
                Certifications & Achievements
              </h3>
              <p className="text-lg text-slate-300 max-w-2xl mx-auto">
                Professional certifications that validate my expertise in AI/ML and software development
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              {certifications.map((cert, index) => (
                <Card
                  key={index}
                  className="hover:shadow-xl transition-all duration-300 bg-slate-700/60 backdrop-blur-md border-slate-600/50 hover:border-purple-500/50 hover:scale-105"
                >
                  <CardContent className="p-6 text-center">
                    <div className="flex justify-center mb-4">
                      <Award className="w-12 h-12 text-purple-400" />
                    </div>
                    <h4 className="text-lg font-semibold text-white mb-2">{cert.title}</h4>
                    <p className="text-purple-300 font-medium mb-1">{cert.issuer}</p>
                    <p className="text-slate-400 text-sm mb-2">{cert.date}</p>
                    <Badge variant="outline" className="border-slate-500 text-slate-300 text-xs">
                      ID: {cert.credentialId}
                    </Badge>
                    {cert.link && (
                      <div className="mt-3">
                        <a
                          href={cert.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-purple-400 hover:text-purple-300 text-sm underline"
                        >
                          View Certificate
                        </a>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
