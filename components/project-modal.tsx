"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X, Github } from "lucide-react"
import { useEffect } from "react"

interface ProjectModalProps {
  project: {
    id: string
    title: string
    subtitle?: string
    description: string
    role?: string
    highlights?: string[]
    image: string
    tags: string[]
    challenge?: string
    whatIBuilt?: string[]
    keyFindings?: Array<{ metric: string; result: string }>
    contributions?: Array<{ title: string; description: string }>
    githubUrl?: string
  }
  isOpen: boolean
  onClose: () => void
}

export function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    if (isOpen) {
      window.addEventListener("keydown", handleEscape)
      return () => window.removeEventListener("keydown", handleEscape)
    }
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-[#1A1A2E]/90 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", duration: 0.4, bounce: 0.3 }}
              className="relative w-full max-w-5xl max-h-[90vh] overflow-hidden pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Retro TV Frame */}
              <div className="relative bg-[#FFD93D] border-8 border-[#1A1A2E] shadow-[12px_12px_0_0_#1A1A2E]">
                {/* TV Screen Border */}
                <div className="border-6 border-[#1A1A2E] bg-[#FFFBF0]">
                  {/* Close Button - Retro Power Button */}
                  <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 w-12 h-12 bg-[#FF006E] border-4 border-[#1A1A2E] shadow-[3px_3px_0_0_#1A1A2E] hover:shadow-[1px_1px_0_0_#1A1A2E] hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-100 flex items-center justify-center group"
                    aria-label="Close modal"
                  >
                    <X className="w-6 h-6 text-[#FFFBF0] group-hover:rotate-90 transition-transform duration-200" />
                  </button>

                  {/* Scrollable Content */}
                  <div className="max-h-[calc(90vh-4rem)] overflow-y-auto custom-scrollbar">
                    {/* Header with Image */}
                    <div className="relative h-64 md:h-80 overflow-hidden border-b-6 border-[#1A1A2E]">
                      <div
                        className="absolute inset-0 pixelated"
                        style={{
                          backgroundImage: `url(${project.image})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }}
                      />
                      {/* Gradient overlay for text readability */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A2E]/80 to-transparent" />

                      {/* Title Banner */}
                      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                        <motion.div
                          initial={{ x: -50, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.2, duration: 0.4 }}
                        >
                          {project.subtitle && (
                            <div className="inline-block px-3 py-1 bg-[#16E0BD] border-3 border-[#1A1A2E] mb-3">
                              <span className="font-mono text-sm font-bold text-[#1A1A2E]">{project.subtitle}</span>
                            </div>
                          )}
                          <h2 className="font-sans text-2xl md:text-4xl font-bold text-[#FFFBF0] pixel-shadow mb-2">
                            {project.title}
                          </h2>
                          {project.role && (
                            <p className="font-mono text-base md:text-lg text-[#FFD93D]">Role: {project.role}</p>
                          )}
                        </motion.div>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-6 md:p-8 space-y-8">
                      {/* GitHub Button */}
                      {project.githubUrl && (
                        <motion.a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.25, duration: 0.4 }}
                          className="block w-full bg-[#1A1A2E] border-4 border-[#1A1A2E] p-6 hover:bg-[#16E0BD] hover:border-[#1A1A2E] transition-all duration-200 shadow-[6px_6px_0_0_#1A1A2E] hover:shadow-[3px_3px_0_0_#1A1A2E] hover:translate-x-[3px] hover:translate-y-[3px] group"
                        >
                          <div className="flex items-center justify-center gap-4">
                            <Github className="w-8 h-8 text-[#FFD93D] group-hover:text-[#1A1A2E] transition-colors" />
                            <span className="font-mono text-2xl font-bold text-[#FFD93D] group-hover:text-[#1A1A2E] transition-colors">
                              VIEW ON GITHUB
                            </span>
                            <Github className="w-8 h-8 text-[#FFD93D] group-hover:text-[#1A1A2E] transition-colors" />
                          </div>
                        </motion.a>
                      )}

                      {/* Description */}
                      <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.4 }}
                        className="bg-[#FF6B9D]/10 border-4 border-[#FF6B9D] p-6"
                      >
                        <h3 className="font-mono text-xl font-bold text-[#1A1A2E] mb-3 flex items-center gap-2">
                          <span className="text-2xl">▶</span> PROJECT OVERVIEW
                        </h3>
                        <p className="font-sans text-base leading-relaxed text-[#1A1A2E]/90">{project.description}</p>
                      </motion.div>

                      {/* Challenge (if exists) */}
                      {project.challenge && (
                        <motion.div
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.35, duration: 0.4 }}
                          className="bg-[#FFD93D]/20 border-4 border-[#FFD93D] p-6"
                        >
                          <h3 className="font-mono text-xl font-bold text-[#1A1A2E] mb-3 flex items-center gap-2">
                            <span className="text-2xl">⚡</span> THE CHALLENGE
                          </h3>
                          <p className="font-sans text-base leading-relaxed text-[#1A1A2E]/90">{project.challenge}</p>
                        </motion.div>
                      )}

                      {/* What I Built (if exists) */}
                      {project.whatIBuilt && project.whatIBuilt.length > 0 && (
                        <motion.div
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.4, duration: 0.4 }}
                          className="bg-[#16E0BD]/10 border-4 border-[#16E0BD] p-6"
                        >
                          <h3 className="font-mono text-xl font-bold text-[#1A1A2E] mb-4 flex items-center gap-2">
                            <span className="text-2xl">🔧</span> WHAT I BUILT
                          </h3>
                          <div className="space-y-3">
                            {project.whatIBuilt.map((item, index) => (
                              <div key={index} className="flex gap-3">
                                <span className="text-[#16E0BD] font-mono text-lg font-bold flex-shrink-0">▸</span>
                                <p className="font-sans text-base leading-relaxed text-[#1A1A2E]/90">{item}</p>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}

                      {/* Highlights (if exists) */}
                      {project.highlights && project.highlights.length > 0 && (
                        <motion.div
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.45, duration: 0.4 }}
                          className="bg-[#16E0BD]/10 border-4 border-[#16E0BD] p-6"
                        >
                          <h3 className="font-mono text-xl font-bold text-[#1A1A2E] mb-4 flex items-center gap-2">
                            <span className="text-2xl">⭐</span> KEY HIGHLIGHTS
                          </h3>
                          <div className="space-y-3">
                            {project.highlights.map((highlight, index) => (
                              <div key={index} className="flex gap-3">
                                <span className="text-[#16E0BD] font-mono text-lg font-bold flex-shrink-0">▸</span>
                                <p className="font-sans text-base leading-relaxed text-[#1A1A2E]/90">{highlight}</p>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}

                      {/* Key Findings (if exists) */}
                      {project.keyFindings && project.keyFindings.length > 0 && (
                        <motion.div
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.5, duration: 0.4 }}
                          className="bg-[#FFD93D]/20 border-4 border-[#FFD93D] p-6"
                        >
                          <h3 className="font-mono text-xl font-bold text-[#1A1A2E] mb-4 flex items-center gap-2">
                            <span className="text-2xl">📊</span> KEY FINDINGS
                          </h3>
                          <div className="grid gap-3">
                            {project.keyFindings.map((finding, index) => (
                              <div
                                key={index}
                                className="bg-[#FFFBF0] border-3 border-[#1A1A2E] p-4 shadow-[3px_3px_0_0_#1A1A2E]"
                              >
                                <p className="font-mono text-sm font-bold text-[#1A1A2E] mb-1">{finding.metric}</p>
                                <p className="font-sans text-lg font-bold text-[#FF006E]">{finding.result}</p>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}

                      {/* Contributions (if exists) */}
                      {project.contributions && project.contributions.length > 0 && (
                        <motion.div
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.55, duration: 0.4 }}
                          className="bg-[#FF6B9D]/10 border-4 border-[#FF6B9D] p-6"
                        >
                          <h3 className="font-mono text-xl font-bold text-[#1A1A2E] mb-4 flex items-center gap-2">
                            <span className="text-2xl">🎯</span> RESEARCH CONTRIBUTIONS
                          </h3>
                          <div className="grid gap-4">
                            {project.contributions.map((contribution, index) => (
                              <div key={index} className="bg-[#FFFBF0] border-3 border-[#1A1A2E] p-5">
                                <h4 className="font-mono text-base font-bold text-[#FF006E] mb-2">
                                  {contribution.title}
                                </h4>
                                <p className="font-sans text-base leading-relaxed text-[#1A1A2E]/90">
                                  {contribution.description}
                                </p>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}

                      {/* Tech Stack */}
                      <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.6, duration: 0.4 }}
                        className="border-4 border-[#1A1A2E] bg-[#1A1A2E] p-6"
                      >
                        <h3 className="font-mono text-xl font-bold text-[#FFD93D] mb-4">TECH STACK</h3>
                        <div className="flex flex-wrap gap-2">
                          {project.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-3 py-2 font-mono text-sm font-bold bg-[#16E0BD] text-[#1A1A2E] border-3 border-[#FFFBF0] shadow-[2px_2px_0_0_#FFFBF0]"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </div>

                {/* TV Control Buttons (decorative) */}
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#FF006E] border-4 border-[#1A1A2E]" />
                  <div className="w-8 h-8 rounded-full bg-[#16E0BD] border-4 border-[#1A1A2E]" />
                  <div className="w-8 h-8 rounded-full bg-[#FFD93D] border-4 border-[#1A1A2E]" />
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}
