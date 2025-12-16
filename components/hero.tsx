"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"

interface HeroProps {
  onViewWorkClick?: () => void
  photoSrc?: string
  photoAlt?: string
  heroHeading?: string
  heroSubheading?: string
}

export function Hero({
  onViewWorkClick,
  photoSrc = "/portrait.png",
  photoAlt = "Gabriel",
  heroHeading = "Hi, I'm Gabriel - a software engineer building useful software one problem at a time.",
  heroSubheading = "Based in Spain — working on web apps, automation, and smarter workflows.",
}: HeroProps) {
  const [isHovering, setIsHovering] = useState(false)
  const [displayedText1, setDisplayedText1] = useState("")
  const [displayedText2, setDisplayedText2] = useState("")
  const text1 = "Hi, I'm Gabriel"
  const text2 = "a software engineer building useful software one problem at a time."
  const typingSpeed = 50

  useEffect(() => {
    let currentIndex = 0
    const interval = setInterval(() => {
      if (currentIndex <= text1.length) {
        setDisplayedText1(text1.slice(0, currentIndex))
        currentIndex++
      } else if (currentIndex <= text1.length + text2.length) {
        setDisplayedText2(text2.slice(0, currentIndex - text1.length))
        currentIndex++
      } else {
        clearInterval(interval)
      }
    }, typingSpeed)

    return () => clearInterval(interval)
  }, [])

  const handleViewWork = () => {
    if (onViewWorkClick) {
      onViewWorkClick()
    } else {
      document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth" })
    }
  }

  const handleDownloadResume = () => {
    const link = document.createElement("a")
    link.href = "/Gabriel_Sambo_Resume_SWE.pdf"
    link.download = "Gabriel_Sambo_Resume_SWE.pdf"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <section className="relative min-h-[calc(100vh-80px)] flex items-center justify-center px-4 md:px-10 lg:px-10 overflow-hidden bg-[#5A189A] dark:bg-[#0D1B2A] scanlines">
      <div className="w-full max-w-[1400px] mx-auto flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-10 relative z-10">
        {/* LEFT COLUMN - Text Content */}
        <div className="w-full lg:w-1/2 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0, ease: "easeOut" }}
          >
            <h1 className="font-mono text-[28px] md:text-[36px] lg:text-[48px] text-[#FFE500] leading-[1.3] pixel-shadow">
              {displayedText1}
            </h1>
            <p className="font-mono text-[18px] md:text-[22px] lg:text-[28px] mt-2 text-[#FFE500] leading-[1.3] pixel-shadow min-h-[80px] md:min-h-[90px] lg:min-h-[100px]">
              {displayedText2}
              {displayedText1.length === text1.length && <span className="animate-pulse">|</span>}
            </p>
          </motion.div>

          <motion.p
            className="font-sans text-[14px] md:text-[16px] lg:text-[18px] text-[#FFFBF0] mb-8 mt-6 leading-[1.4] pixel-shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            {heroSubheading}
          </motion.p>

          <motion.div
            className="flex flex-col md:flex-row items-center lg:items-start lg:justify-start justify-center gap-4 mt-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          >
            <button
              onClick={handleViewWork}
              className="w-full md:w-auto bg-[#FF006E] text-[#FFFBF0] border-4 border-[#1A1A2E] px-6 py-3 font-sans text-sm font-bold hover:bg-[#00D9FF] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[inset_-2px_-2px_0px_rgba(0,0,0,0.3)] active:translate-x-[4px] active:translate-y-[4px] transition-all duration-100 shadow-[inset_-4px_-4px_0px_rgba(0,0,0,0.3)]"
            >
              VIEW WORK
            </button>
            <button
              onClick={handleDownloadResume}
              className="w-full md:w-auto bg-[#00D9FF] text-[#5A189A] border-4 border-[#1A1A2E] px-6 py-3 font-sans text-sm font-bold hover:bg-[#39FF14] hover:text-[#1A1A2E] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[inset_-2px_-2px_0px_rgba(0,0,0,0.3)] active:translate-x-[4px] active:translate-y-[4px] transition-all duration-100 shadow-[inset_-4px_-4px_0px_rgba(0,0,0,0.3)]"
            >
              DOWNLOAD RESUME
            </button>
          </motion.div>
        </div>

        <motion.div
          className="w-full lg:w-1/2 flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        >
          <div className="relative">
            {/* Photo Frame Container */}
            <div
              className={`
                relative w-[200px] h-[200px] md:w-[250px] md:h-[250px] lg:w-[300px] lg:h-[300px]
                border-8 border-[#FF006E] overflow-hidden
                photo-frame
                ${isHovering ? "photo-frame-hover" : ""}
              `}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              style={{
                boxShadow: "inset -4px -4px 0px rgba(0,0,0,0.3), inset 4px 4px 0px rgba(255, 213, 255, 0.5)",
              }}
            >
              {/* Animated Gradient Background */}
              <div className="absolute inset-0 gradient-bg" />

              {/* Photo Image */}
              <img
                src={photoSrc || "/placeholder.svg"}
                alt={photoAlt}
                className="relative w-full h-full object-cover opacity-95 pixelated-image"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
