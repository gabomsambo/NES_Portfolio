"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState } from "react"
import { Mail, Linkedin, Github, Send, Sparkles } from "lucide-react"

interface ContactSectionProps {
  email: string
  linkedin: string
  github: string
}

export function ContactSection({ email, linkedin, github }: ContactSectionProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

  const contactMethods = [
    {
      icon: Mail,
      label: "EMAIL",
      value: email,
      href: `mailto:${email}`,
      color: "#16E0BD",
      bgColor: "#16E0BD",
    },
    {
      icon: Linkedin,
      label: "LINKEDIN",
      value: "gabriel-sambo",
      href: linkedin,
      color: "#FFD93D",
      bgColor: "#FFD93D",
    },
    {
      icon: Github,
      label: "GITHUB",
      value: "gabomsambo",
      href: github,
      color: "#FF6B9D",
      bgColor: "#FF6B9D",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  }

  return (
    <section ref={ref} className="py-20 relative overflow-hidden">
      <div className="relative mb-16">
        <div className="flex items-center justify-center gap-4 mb-6">
          <motion.div
            initial={{ rotate: 0, scale: 0 }}
            animate={isInView ? { rotate: 360, scale: 1 } : { rotate: 0, scale: 0 }}
            transition={{ duration: 0.8, ease: "backOut" }}
          >
            <Sparkles className="w-8 h-8 text-[#FFD93D]" />
          </motion.div>
          <h2 className="text-5xl md:text-6xl font-bold text-center font-mono">LET&apos;S CONNECT</h2>
          <motion.div
            initial={{ rotate: 0, scale: 0 }}
            animate={isInView ? { rotate: -360, scale: 1 } : { rotate: 0, scale: 0 }}
            transition={{ duration: 0.8, ease: "backOut" }}
          >
            <Send className="w-8 h-8 text-[#16E0BD]" />
          </motion.div>
        </div>

        <div className="flex justify-center">
          <div className="bg-[#FF6B9D] text-[#1A1A2E] px-6 py-2 border-4 border-[#1A1A2E] shadow-[4px_4px_0_0_#1A1A2E] inline-block">
            <p className="font-bold text-sm md:text-base font-mono">
              OPEN TO COLLABORATIONS • FREELANCE • FULL-TIME ROLES
            </p>
          </div>
        </div>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
      >
        {contactMethods.map((method, index) => {
          const Icon = method.icon
          const isHovered = hoveredCard === method.label

          return (
            <motion.div
              key={method.label}
              variants={itemVariants}
              onHoverStart={() => setHoveredCard(method.label)}
              onHoverEnd={() => setHoveredCard(null)}
              className="relative"
            >
              <a
                href={method.href}
                target={method.label !== "EMAIL" ? "_blank" : undefined}
                rel={method.label !== "EMAIL" ? "noopener noreferrer" : undefined}
                className="block group"
              >
                {/* Arcade machine frame */}
                <div
                  className={`
                    border-4 border-[#1A1A2E] 
                    shadow-[8px_8px_0_0_#1A1A2E]
                    transition-all duration-300
                    ${isHovered ? "translate-x-1 translate-y-1 shadow-[4px_4px_0_0_#1A1A2E]" : ""}
                  `}
                  style={{
                    backgroundColor: isHovered ? method.bgColor : "#FFFBF0",
                  }}
                >
                  {/* Top screen section */}
                  <div
                    className="p-6 border-b-4 border-[#1A1A2E]"
                    style={{
                      backgroundColor: isHovered ? "#1A1A2E" : method.bgColor,
                    }}
                  >
                    <div className="flex items-center justify-center">
                      <div className="relative">
                        <Icon
                          className={`
                            w-12 h-12 transition-all duration-300
                            ${isHovered ? "text-[#FFFBF0] scale-110" : "text-[#1A1A2E]"}
                          `}
                        />
                        {isHovered && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 0.6, repeat: Number.POSITIVE_INFINITY }}
                            className="absolute -top-2 -right-2"
                          >
                            <div className="w-4 h-4 bg-[#FFD93D] border-2 border-[#1A1A2E] rounded-full" />
                          </motion.div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Content section */}
                  <div className="p-6">
                    <div className="text-center space-y-3">
                      <div
                        className="inline-block px-4 py-1 border-2 border-[#1A1A2E] font-mono font-bold text-sm"
                        style={{
                          backgroundColor: isHovered ? "#1A1A2E" : method.bgColor,
                          color: isHovered ? "#FFFBF0" : "#1A1A2E",
                        }}
                      >
                        {method.label}
                      </div>

                      <p
                        className={`
                          font-mono text-sm md:text-base font-bold break-all
                          transition-colors duration-300
                          ${isHovered ? "text-[#1A1A2E]" : "text-[#1A1A2E]"}
                        `}
                      >
                        {method.value}
                      </p>

                      {/* Arrow indicator */}
                      <div className="pt-2">
                        <motion.div
                          animate={isHovered ? { x: [0, 5, 0] } : { x: 0 }}
                          transition={{ duration: 0.6, repeat: isHovered ? Number.POSITIVE_INFINITY : 0 }}
                          className="inline-flex items-center gap-2"
                        >
                          <span
                            className={`
                              font-mono text-xs font-bold
                              ${isHovered ? "text-[#1A1A2E]" : "text-[#1A1A2E]/50"}
                            `}
                          >
                            CLICK TO CONNECT
                          </span>
                          <span
                            className={`
                              text-lg
                              ${isHovered ? "text-[#1A1A2E]" : "text-[#1A1A2E]/50"}
                            `}
                          >
                            →
                          </span>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            </motion.div>
          )
        })}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="mt-16 text-center"
      >
        <div className="inline-block bg-[#1A1A2E] text-[#FFFBF0] px-8 py-4 border-4 border-[#1A1A2E] shadow-[6px_6px_0_0_#16E0BD]">
          <p className="font-mono font-bold text-sm md:text-base">
            💡 ALWAYS EXCITED TO DISCUSS NEW IDEAS AND OPPORTUNITIES
          </p>
        </div>
      </motion.div>
    </section>
  )
}
