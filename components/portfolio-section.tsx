"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github } from "lucide-react"

const projects = [
  {
    id: 1,
    title: "Heart Disease Prediction",
    description:
      "ML model using Random Forest Classifier to predict heart disease risk based on patient health metrics like age, cholesterol levels, and maximum heart rate",
    image: "/heart-disease-prediction-dashboard.png",
    technologies: ["Python", "Random Forest", "Jupyter Notebook", "Machine Learning"],
    liveUrl: "#",
    githubUrl: "https://github.com/sounakss7/-Heart-Disease-Prediction-Using-Random-Forest-Classifier-",
  },
  {
    id: 2,
    title: "Breast Cancer Detection",
    description:
      "XGBoost classifier model to classify breast cancer tumors as malignant or benign with high accuracy using advanced gradient boosting techniques",
    image: "/breast-cancer-detection-xgboost.png",
    technologies: ["Python", "XGBoost", "Machine Learning", "Data Analysis"],
    liveUrl: "#",
    githubUrl: "https://github.com/sounakss7/Breast_Cancer_detection-USING-XGBOOST-classifier",
  },
]

export function PortfolioSection() {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)

  return (
    <section id="portfolio" className="py-20 px-6 bg-slate-900/40 backdrop-blur-sm border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 font-[family-name:var(--font-playfair)] drop-shadow-lg">
            Featured Projects
          </h2>
          <p className="text-xl text-slate-200 max-w-2xl mx-auto drop-shadow-md">
            Machine Learning projects and data analysis work showcasing my expertise in AI/ML and Python development
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <Card
              key={project.id}
              className={`group cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 bg-slate-800/60 backdrop-blur-md border-slate-700/50 hover:border-purple-500/50 ${
                hoveredProject === project.id ? "scale-105" : ""
              }`}
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              <div className="relative overflow-hidden rounded-t-lg">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              <CardHeader>
                <CardTitle className="text-2xl font-bold text-white">{project.title}</CardTitle>
                <CardDescription className="text-slate-300 text-base">{project.description}</CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <Badge
                      key={tech}
                      variant="secondary"
                      className="bg-purple-500/20 text-purple-300 border-purple-500/30"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>

                <div className="flex gap-3 pt-2">
                  <Button
                    size="sm"
                    className="bg-purple-600 hover:bg-purple-700 text-white shadow-lg"
                    onClick={() => window.open(project.githubUrl, "_blank")}
                  >
                    <Github className="w-4 h-4 mr-2" />
                    View Code
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-slate-900 bg-transparent shadow-lg"
                    onClick={() => window.open("mailto:hrick3130@gmail.com", "_blank")}
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Contact
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
