"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X, ChevronDown } from "lucide-react"
import { useEffect, useState } from "react"

interface KeyFinding {
  metric: string
  result: string
}

interface Contribution {
  title: string
  description: string
}

interface FeaturedThesisModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  subtitle: string
  description: string
  challenge: string
  whatIBuilt: string[]
  keyFindings: KeyFinding[]
  contributions: Contribution[]
  imageUrl?: string
}

export function FeaturedThesisModal({
  isOpen,
  onClose,
  title,
  subtitle,
  description,
  challenge,
  whatIBuilt,
  keyFindings,
  contributions,
  imageUrl,
}: FeaturedThesisModalProps) {
  const [expandedSection, setExpandedSection] = useState<string | null>("overview")

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

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section)
  }

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
            className="fixed inset-0 bg-[#1A1A2E]/95 backdrop-blur-md z-50"
            onClick={onClose}
          />

          {/* Modal Container - Research Paper Style */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 30 }}
              transition={{ type: "spring", duration: 0.5, bounce: 0.25 }}
              className="relative w-full max-w-6xl max-h-[90vh] overflow-hidden pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Academic Paper Frame */}
              <div className="relative bg-[#FFFBF0] border-8 border-[#1A1A2E] shadow-[16px_16px_0_0_#16E0BD]">
                {/* Header Strip */}
                <div className="bg-[#FF6B35] border-b-6 border-[#1A1A2E] p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-[#39FF14] border-2 border-[#1A1A2E] animate-pulse" />
                    <span className="font-mono text-sm font-bold text-[#FFFBF0] uppercase tracking-wider">
                      Research Project — Technical Document
                    </span>
                  </div>
                  <button
                    onClick={onClose}
                    className="w-10 h-10 bg-[#1A1A2E] border-3 border-[#FFFBF0] hover:bg-[#FF006E] transition-colors duration-200 flex items-center justify-center group"
                    aria-label="Close modal"
                  >
                    <X className="w-5 h-5 text-[#FFFBF0]" />
                  </button>
                </div>

                {/* Scrollable Content */}
                <div className="max-h-[calc(90vh-8rem)] overflow-y-auto custom-scrollbar">
                  {/* Title Section with Image */}
                  <div className="p-8 md:p-12 border-b-6 border-[#1A1A2E] bg-gradient-to-br from-[#FFFBF0] to-[#FFD93D]/10">
                    <div className="grid md:grid-cols-2 gap-8">
                      <div>
                        <motion.div
                          initial={{ x: -30, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.2, duration: 0.5 }}
                        >
                          <div className="inline-block px-4 py-2 bg-[#16E0BD] border-3 border-[#1A1A2E] mb-4">
                            <span className="font-mono text-xs font-bold text-[#1A1A2E] uppercase tracking-wide">
                              {subtitle}
                            </span>
                          </div>
                          <h2 className="font-sans text-3xl md:text-5xl font-bold text-[#1A1A2E] pixel-shadow leading-tight mb-6">
                            {title}
                          </h2>
                          <p className="font-sans text-lg leading-relaxed text-[#1A1A2E]/80">{description}</p>
                        </motion.div>
                      </div>
                      <motion.div
                        initial={{ x: 30, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        className="h-64 md:h-full min-h-[250px] border-6 border-[#1A1A2E] shadow-[6px_6px_0_0_#1A1A2E] overflow-hidden"
                      >
                        <div
                          className="w-full h-full pixelated"
                          style={
                            imageUrl
                              ? {
                                  backgroundImage: `url(${imageUrl})`,
                                  backgroundSize: "cover",
                                  backgroundPosition: "center",
                                }
                              : {
                                  background: "linear-gradient(135deg, #16E0BD 0%, #FFD93D 100%)",
                                }
                          }
                        />
                      </motion.div>
                    </div>
                  </div>

                  {/* Accordion Sections */}
                  <div className="p-8 md:p-12 space-y-4">
                    {/* Overview Section */}
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.4, duration: 0.4 }}
                      className="border-4 border-[#1A1A2E] overflow-hidden"
                    >
                      <button
                        onClick={() => toggleSection("overview")}
                        className="w-full bg-[#FF6B9D] hover:bg-[#FF006E] transition-colors p-6 flex items-center justify-between border-b-4 border-[#1A1A2E]"
                      >
                        <h3 className="font-mono text-xl font-bold text-[#FFFBF0] uppercase flex items-center gap-3">
                          <span className="text-2xl">01</span> Research Overview
                        </h3>
                        <motion.div
                          animate={{ rotate: expandedSection === "overview" ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <ChevronDown className="w-6 h-6 text-[#FFFBF0]" />
                        </motion.div>
                      </button>
                      <AnimatePresence>
                        {expandedSection === "overview" && (
                          <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: "auto" }}
                            exit={{ height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="bg-[#FFFBF0] p-6 space-y-6">
                              <div>
                                <h4 className="font-mono text-lg font-bold text-[#FF6B35] mb-3 flex items-center gap-2">
                                  <span className="text-[#16E0BD]">▸</span> The Challenge
                                </h4>
                                <p className="font-sans text-base leading-relaxed text-[#1A1A2E]/80">{challenge}</p>
                              </div>
                              <div>
                                <h4 className="font-mono text-lg font-bold text-[#FF6B35] mb-3 flex items-center gap-2">
                                  <span className="text-[#16E0BD]">▸</span> What I Built
                                </h4>
                                <ul className="space-y-3">
                                  {whatIBuilt.map((item, index) => (
                                    <li key={index} className="flex gap-3">
                                      <span className="text-[#16E0BD] font-mono text-lg font-bold flex-shrink-0">
                                        {String(index + 1).padStart(2, "0")}
                                      </span>
                                      <span className="font-sans text-base leading-relaxed text-[#1A1A2E]/80">
                                        {item}
                                      </span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>

                    {/* Key Findings Section */}
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.5, duration: 0.4 }}
                      className="border-4 border-[#1A1A2E] overflow-hidden"
                    >
                      <button
                        onClick={() => toggleSection("findings")}
                        className="w-full bg-[#FFD93D] hover:bg-[#FFC300] transition-colors p-6 flex items-center justify-between border-b-4 border-[#1A1A2E]"
                      >
                        <h3 className="font-mono text-xl font-bold text-[#1A1A2E] uppercase flex items-center gap-3">
                          <span className="text-2xl">02</span> Key Findings & Data
                        </h3>
                        <motion.div
                          animate={{ rotate: expandedSection === "findings" ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <ChevronDown className="w-6 h-6 text-[#1A1A2E]" />
                        </motion.div>
                      </button>
                      <AnimatePresence>
                        {expandedSection === "findings" && (
                          <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: "auto" }}
                            exit={{ height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="bg-[#FFFBF0] p-6">
                              <div className="grid md:grid-cols-2 gap-4">
                                {keyFindings.map((finding, index) => (
                                  <motion.div
                                    key={index}
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ delay: 0.1 * index, duration: 0.3 }}
                                    className="bg-[#16E0BD] border-4 border-[#1A1A2E] p-5 shadow-[4px_4px_0_0_#1A1A2E]"
                                  >
                                    <p className="font-mono text-sm font-bold text-[#1A1A2E] mb-2 uppercase">
                                      {finding.metric}
                                    </p>
                                    <p className="font-sans text-2xl font-bold text-[#1A1A2E]">{finding.result}</p>
                                  </motion.div>
                                ))}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>

                    {/* Contributions Section */}
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.6, duration: 0.4 }}
                      className="border-4 border-[#1A1A2E] overflow-hidden"
                    >
                      <button
                        onClick={() => toggleSection("contributions")}
                        className="w-full bg-[#16E0BD] hover:bg-[#00D9FF] transition-colors p-6 flex items-center justify-between border-b-4 border-[#1A1A2E]"
                      >
                        <h3 className="font-mono text-xl font-bold text-[#1A1A2E] uppercase flex items-center gap-3">
                          <span className="text-2xl">03</span> Research Contributions
                        </h3>
                        <motion.div
                          animate={{ rotate: expandedSection === "contributions" ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <ChevronDown className="w-6 h-6 text-[#1A1A2E]" />
                        </motion.div>
                      </button>
                      <AnimatePresence>
                        {expandedSection === "contributions" && (
                          <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: "auto" }}
                            exit={{ height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="bg-[#FFFBF0] p-6 space-y-4">
                              {contributions.map((contribution, index) => (
                                <motion.div
                                  key={index}
                                  initial={{ x: -20, opacity: 0 }}
                                  animate={{ x: 0, opacity: 1 }}
                                  transition={{ delay: 0.1 * index, duration: 0.4 }}
                                  className="border-l-6 border-[#FF6B9D] bg-[#FF6B9D]/10 p-5"
                                >
                                  <h4 className="font-mono text-base font-bold text-[#1A1A2E] mb-2">
                                    {contribution.title}
                                  </h4>
                                  <p className="font-sans text-base leading-relaxed text-[#1A1A2E]/80">
                                    {contribution.description}
                                  </p>
                                </motion.div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  </div>

                  {/* Footer Banner */}
                  <div className="bg-[#1A1A2E] p-6 text-center border-t-6 border-[#16E0BD]">
                    <p className="font-mono text-sm text-[#FFD93D] uppercase tracking-wider">
                      End of Research Document
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}
