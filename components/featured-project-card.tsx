"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"

interface KeyFinding {
  metric: string
  result: string
}

interface Contribution {
  title: string
  description: string
}

interface FeaturedProjectCardProps {
  title: string
  subtitle: string
  description: string
  imageUrl?: string
  onViewClick: () => void
}

export function FeaturedProjectCard({ title, subtitle, description, imageUrl, onViewClick }: FeaturedProjectCardProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3, ease: "linear" }}
      className="w-full max-w-[1100px] mx-auto mt-10"
    >
      <motion.div
        whileHover={{ y: -4, scale: 1.02 }}
        transition={{ duration: 0.2, ease: "linear" }}
        onClick={onViewClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="arcade-frame bg-[#FFFBF0] dark:bg-[#1A2B3C] hover:border-[#16E0BD] transition-all duration-200 overflow-hidden cursor-pointer group relative"
      >
        {/* Featured Badge */}
        <div className="absolute top-4 left-4 z-10">
          <motion.div
            animate={{ rotate: isHovered ? [0, -5, 5, -5, 0] : 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block px-3 py-1.5 bg-[#39FF14] text-[#1A1A2E] border-4 border-[#1A1A2E] shadow-[4px_4px_0_0_#1A1A2E] group-hover:shadow-[6px_6px_0_0_#1A1A2E] transition-all"
          >
            <span className="font-mono text-xs font-bold uppercase tracking-wider">★ FEATURED RESEARCH ★</span>
          </motion.div>
        </div>

        <div className="flex flex-col lg:flex-row">
          {/* Large Image Section */}
          <div className="w-full lg:w-[40%] relative h-[280px] lg:h-[350px] border-b-8 lg:border-b-0 lg:border-r-8 border-[#1A1A2E]">
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
                      background: "linear-gradient(135deg, #16E0BD 0%, #00D9FF 50%, #FF6B9D 100%)",
                    }
              }
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A2E]/60 via-transparent to-transparent" />
          </div>

          {/* Content Section */}
          <div className="w-full lg:w-[60%] flex flex-col justify-between p-6 lg:p-8">
            <div>
              <motion.h3
                animate={{ x: isHovered ? 4 : 0 }}
                className="font-sans text-2xl lg:text-3xl font-bold text-[#1A1A2E] leading-tight pixel-shadow-sm mb-3"
              >
                {title}
              </motion.h3>
              <p className="font-mono text-base text-[#FF6B35] mb-4 uppercase tracking-wide">{subtitle}</p>
              <p className="font-sans text-sm lg:text-base leading-relaxed text-[#1A1A2E] mb-6">{description}</p>
            </div>

            {/* CTA with animated arrow */}
            <motion.div
              animate={{ x: isHovered ? 8 : 0 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-3"
            >
              <div className="flex-1 h-1 bg-[#FFD93D]" />
              <div className="font-mono text-base font-bold text-[#00D9FF] uppercase tracking-wider flex items-center gap-2">
                Click to Explore
                <motion.span
                  animate={{ x: isHovered ? [0, 5, 0] : 0 }}
                  transition={{ duration: 0.6, repeat: isHovered ? Number.POSITIVE_INFINITY : 0 }}
                  className="text-xl"
                >
                  →
                </motion.span>
              </div>
            </motion.div>

            {/* Decorative corner accent */}
            <div className="absolute bottom-4 right-4 w-12 h-12 border-r-4 border-b-4 border-[#FF6B9D] opacity-50" />
          </div>
        </div>

        {/* Hover glow effect */}
        <motion.div
          animate={{ opacity: isHovered ? 1 : 0 }}
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(circle at center, rgba(22, 224, 189, 0.1) 0%, transparent 70%)",
          }}
        />
      </motion.div>
    </motion.div>
  )
}
