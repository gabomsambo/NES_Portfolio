"use client"

import type React from "react"

import { motion } from "framer-motion"

interface SocialLink {
  platform: string
  url: string
  icon: React.ComponentType<{ className?: string }>
}

interface FooterProps {
  socialLinks: SocialLink[]
}

export function Footer({ socialLinks }: FooterProps) {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="max-w-[1400px] mx-auto px-5 md:px-4 py-10">
        <div className="flex flex-col items-center space-y-6">
          {/* Social Links */}
          <div className="flex items-center gap-5">
            {socialLinks.map((link) => {
              const Icon = link.icon
              return (
                <motion.a
                  key={link.platform}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2 }}
                  transition={{ duration: 0.2 }}
                  className="text-muted-foreground hover:text-[#00D9FF] transition-colors"
                  aria-label={link.platform}
                >
                  <Icon className="w-4 h-4" />
                </motion.a>
              )
            })}
          </div>

          {/* Built With */}
          <p className="text-xs text-muted-foreground italic text-center">
            Built with Next.js, Tailwind, Framer Motion
          </p>

          {/* Copyright */}
          <p className="text-xs text-muted-foreground text-center">© 2025. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
