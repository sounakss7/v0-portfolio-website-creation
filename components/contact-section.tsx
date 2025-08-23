"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, MapPin, Github, Linkedin, ExternalLink } from "lucide-react"

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const subject = encodeURIComponent(`Portfolio Contact from ${formData.name}`)
    const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`)
    window.open(`mailto:hrick3130@gmail.com?subject=${subject}&body=${body}`, "_blank")
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <section id="contact" className="py-20 px-6 bg-slate-900/40 backdrop-blur-sm border-t border-white/10">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 font-[family-name:var(--font-playfair)] drop-shadow-lg">
            Let's Connect
          </h2>
          <p className="text-xl text-slate-200 max-w-2xl mx-auto drop-shadow-md">
            Interested in collaboration or have questions about my projects? Let's discuss opportunities in AI/ML and
            data science
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="hover:shadow-xl transition-shadow duration-300 bg-slate-800/60 backdrop-blur-md border-slate-700/50">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-white">Send a Message</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-slate-200">
                    Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                    className="focus:ring-purple-500 focus:border-purple-500 bg-slate-700/50 border-slate-600 text-white placeholder-slate-400"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-slate-200">
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your.email@example.com"
                    className="focus:ring-purple-500 focus:border-purple-500 bg-slate-700/50 border-slate-600 text-white placeholder-slate-400"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-slate-200">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project or collaboration ideas..."
                    rows={5}
                    className="focus:ring-purple-500 focus:border-purple-500 resize-none bg-slate-700/50 border-slate-600 text-white placeholder-slate-400"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 text-lg shadow-lg"
                >
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <div className="space-y-8">
            <Card className="hover:shadow-lg transition-shadow duration-300 bg-slate-700/60 backdrop-blur-md border-slate-600/50">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-white mb-6">Get in Touch</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-slate-200">
                    <Mail className="w-5 h-5 text-purple-400" />
                    <span>hrick3130@gmail.com</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-200">
                    <MapPin className="w-5 h-5 text-purple-400" />
                    <span>Kolkata, India</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-200">
                    <ExternalLink className="w-5 h-5 text-purple-400" />
                    <span>Available for internships & collaborations</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow duration-300 bg-slate-700/60 backdrop-blur-md border-slate-600/50">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-white mb-6">Connect With Me</h3>
                <div className="flex gap-4">
                  <Button
                    variant="outline"
                    size="icon"
                    className="border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-slate-900 bg-transparent shadow-lg"
                    onClick={() => window.open("https://github.com/sounakss7", "_blank")}
                  >
                    <Github className="w-5 h-5" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-slate-900 bg-transparent shadow-lg"
                    onClick={() => window.open("https://www.linkedin.com/in/sounak-sarkar-aa230a248/", "_blank")}
                  >
                    <Linkedin className="w-5 h-5" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="border-amber-400 text-amber-400 hover:bg-amber-400 hover:text-slate-900 bg-transparent shadow-lg"
                    onClick={() => window.open("https://linktr.ee/sounakss7", "_blank")}
                  >
                    <ExternalLink className="w-5 h-5" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="text-center lg:text-left">
              <p className="text-slate-200 mb-4 drop-shadow-md">
                Open to internships, research opportunities, and AI/ML project collaborations
              </p>
              <Button
                variant="outline"
                className="border-green-400 text-green-400 hover:bg-green-400 hover:text-slate-900 bg-transparent shadow-lg"
                onClick={() => window.open("https://orcid.org/0009-0007-0157-0450", "_blank")}
              >
                View ORCID Profile
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
