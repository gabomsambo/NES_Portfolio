"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

export function Header() {
  const [theme, setTheme] = useState<"light" | "dark">("light")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    const initialTheme = savedTheme || (prefersDark ? "dark" : "light")

    setTheme(initialTheme)
    document.documentElement.classList.toggle("dark", initialTheme === "dark")
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light"
    setTheme(newTheme)
    localStorage.setItem("theme", newTheme)
    document.documentElement.classList.toggle("dark", newTheme === "dark")
  }

  const navLinks = [
    { name: "PORTFOLIO", href: "#portfolio" },
    { name: "SKILLS", href: "#skills" },
    { name: "RESUME", href: "#resume" },
    { name: "CONTACT", href: "#contact" },
  ]

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#5A189A] border-b-4 border-[#00D9FF] dark:bg-[#0D1B2A] dark:border-[#FF006E]">
        <div className="max-w-[1400px] mx-auto px-5 md:px-4">
          <div className="flex items-center justify-between h-[60px]">
            <a
              href="#top"
              className="font-mono text-[#FFE500] text-base md:text-xl pixel-shadow-sm hover:text-[#FF006E] transition-colors duration-100"
            >
              GABRIEL
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-sm text-[#FFFBF0] hover:text-[#FF006E] border-b-4 border-transparent hover:border-[#FF006E] transition-all duration-100 font-sans dark:hover:text-[#00D9FF] dark:hover:border-[#00D9FF]"
                >
                  {link.name}
                </a>
              ))}

              <button
                onClick={toggleTheme}
                className="bg-[#FF006E] text-[#FFE500] border-4 border-[#1A1A2E] px-3 py-2 font-sans text-sm hover:translate-x-[2px] hover:translate-y-[2px] transition-transform duration-100"
                aria-label="Toggle theme"
              >
                {theme === "light" ? "🌙" : "☀️"}
              </button>
            </nav>

            {/* Mobile Menu Button */}
            <div className="flex md:hidden items-center gap-2">
              <button
                onClick={toggleTheme}
                className="bg-[#FF006E] text-[#FFE500] border-4 border-[#1A1A2E] px-2 py-1 font-sans text-xs"
                aria-label="Toggle theme"
              >
                {theme === "light" ? "🌙" : "☀️"}
              </button>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="bg-[#FF006E] text-[#FFFBF0] border-4 border-[#1A1A2E] px-2 py-1 font-sans text-xs"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? "✕" : "☰"}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.2, ease: "linear" }}
            className="fixed top-[60px] right-0 bottom-0 w-64 bg-[#5A189A] border-l-4 border-[#1A1A2E] md:hidden z-40 dark:bg-[#0D1B2A]"
          >
            <nav className="flex flex-col p-6 gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-base text-[#FFFBF0] hover:text-[#FFE500] transition-colors duration-100 font-sans"
                >
                  {link.name}
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/40 md:hidden z-30"
            style={{ top: "60px" }}
          />
        )}
      </AnimatePresence>
    </>
  )
}
