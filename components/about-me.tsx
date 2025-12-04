"use client"

import { motion } from "framer-motion"
import { Sparkles, Code2, Lightbulb, Heart } from "lucide-react"

export function AboutMe() {
  return (
    <section className="py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-[1000px] mx-auto"
      >
        {/* Section Title */}
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-[40px] font-bold mb-3"
          >
            About Me
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="w-20 h-1 bg-[#FF006E] mx-auto"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Left Column - Bio */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="border-4 border-[#1A1A2E] bg-background p-8 shadow-[8px_8px_0_0_#1A1A2E] hover:shadow-[12px_12px_0_0_#1A1A2E] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-[#00D9FF] border-4 border-[#1A1A2E] flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-[#1A1A2E]" />
              </div>
              <h3 className="text-2xl font-bold text-foreground">Who I Am</h3>
            </div>
            <div className="space-y-4 text-base leading-relaxed text-foreground">
              <p>
                I am a software engineer who enjoys solving real problems, I like taking chaos and turning it into
                something useful. My work ranges from LLM pipelines to full stack web applications, applied NLP research
                and automation tools used in the hospitality business. I'm currently looking for opportunities where I
                can keep growing, collaborate, and build reliable software.
              </p>
            </div>
          </motion.div>

          {/* Right Column - Values Grid */}
          <div className="grid grid-cols-1 gap-6">
            {[
              {
                icon: Code2,
                color: "#FF006E",
                title: "Clean Code",
                description: "I believe in writing maintainable, well-documented code that others can understand.",
              },
              {
                icon: Lightbulb,
                color: "#FFE500",
                title: "Problem Solving",
                description: "Every challenge is an opportunity to learn and create innovative solutions.",
              },
              {
                icon: Heart,
                color: "#00D9FF",
                title: "Impact First",
                description: "Technology should serve people and make a positive difference in the world.",
              },
            ].map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="border-4 border-[#1A1A2E] bg-background p-6 shadow-[6px_6px_0_0_#1A1A2E] hover:shadow-[8px_8px_0_0_#1A1A2E] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all"
              >
                <div className="flex items-start gap-4">
                  <div
                    className="w-10 h-10 border-4 border-[#1A1A2E] flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: value.color }}
                  >
                    <value.icon className="w-5 h-5 text-[#1A1A2E]" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold mb-2 text-foreground">{value.title}</h4>
                    <p className="text-sm leading-relaxed text-foreground">{value.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom Banner - Fun Facts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="mt-12 border-4 border-[#1A1A2E] bg-[#5A189A] p-6 shadow-[8px_8px_0_0_#1A1A2E]"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4 flex-1">
              <div className="w-16 h-16 bg-[#FFE500] border-4 border-[#1A1A2E] flex items-center justify-center text-3xl flex-shrink-0">
                ☕
              </div>
              <div className="text-white">
                <h4 className="font-bold text-lg mb-1">Fun Fact</h4>
                <p className="text-sm leading-relaxed">
                  When I'm not coding, I'm learning languages and collecting moments—one café, one city, one accent at a
                  time.
                </p>
              </div>
            </div>

            {/* Language Jar */}
            <div className="relative flex-shrink-0">
              {/* Jar Container */}
              <div className="relative w-32 h-40 bg-[#FFFBF0]/90 border-4 border-[#1A1A2E] rounded-t-lg overflow-hidden">
                {/* Jar Lid */}
                <div className="absolute top-0 left-0 right-0 h-6 bg-[#00D9FF] border-b-4 border-[#1A1A2E]" />

                {/* Language Tags Inside Jar */}
                <div className="absolute inset-0 top-6 p-2 flex flex-col gap-2 items-center justify-center">
                  {[
                    { lang: "Español", delay: 0.9, rotate: -8 },
                    { lang: "Français", delay: 1.0, rotate: 5 },
                    { lang: "Italiano", delay: 1.1, rotate: -3 },
                    { lang: "日本語", delay: 1.2, rotate: 7 },
                  ].map((item) => (
                    <motion.div
                      key={item.lang}
                      initial={{ y: -20, opacity: 0, rotate: 0 }}
                      whileInView={{ y: 0, opacity: 1, rotate: item.rotate }}
                      viewport={{ once: true }}
                      transition={{ delay: item.delay, type: "spring", bounce: 0.5 }}
                      className="px-3 py-1 bg-[#FF006E] border-2 border-[#1A1A2E] text-[#FFFBF0] text-xs font-bold whitespace-nowrap shadow-[2px_2px_0_0_#1A1A2E]"
                    >
                      {item.lang}
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Jar Label */}
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 1.3, type: "spring" }}
                className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 bg-[#FFE500] border-3 border-[#1A1A2E] text-[10px] font-bold whitespace-nowrap"
              >
                COLLECTION
              </motion.div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
