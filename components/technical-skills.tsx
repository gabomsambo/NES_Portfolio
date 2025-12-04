"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"

export function TechnicalSkills() {
  return (
    <div className="w-full max-w-[1200px] mx-auto px-4">
      {/* Section Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-2">
          <div className="bg-[#111111] text-white px-4 py-2 font-mono text-sm font-bold">02.</div>
          <h3 className="text-3xl font-bold uppercase tracking-tight">TECHNICAL SKILLS</h3>
        </div>
        <div className="border-t-4 border-dashed border-[#111111] mb-3" />
        <p className="text-muted-foreground text-sm">Tools that turn ideas into shipped product.</p>
      </div>

      <div className="mb-8 overflow-hidden bg-card border-4 border-[#111111] py-4">
        <div className="animate-ticker whitespace-nowrap">
          <span className="inline-block font-bold text-lg uppercase tracking-wider text-[#111111]">
            PYTHON • REACT • NEXT.JS • TYPESCRIPT • FASTAPI • POSTGRESQL • DOCKER • OPENAI • SUPABASE • TAILWINDCSS •
            NODE.JS • PYTHON • REACT • NEXT.JS • TYPESCRIPT • FASTAPI • POSTGRESQL • DOCKER • OPENAI • SUPABASE •
            TAILWINDCSS • NODE.JS
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Frontend Card */}
        <BrutalistSkillCard
          category="FRONTEND"
          accentColor="#16E0BD"
          chips={["UI/UX", "FRAMEWORKS", "STYLING"]}
          technologies={[
            { name: "REACT", icon: "⚛️" },
            { name: "NEXT.JS", icon: "▲" },
            { name: "TYPESCRIPT", icon: "📘" },
            { name: "TAILWIND", icon: "🎨" },
            { name: "SHADCN/UI", icon: "🧩" },
            { name: "RADIX UI", icon: "💎" },
            { name: "ZOD", icon: "🔷" },
            { name: "FRAMER", icon: "🎬" },
            { name: "ZUSTAND", icon: "🐻" },
          ]}
        />

        {/* Backend Card */}
        <BrutalistSkillCard
          category="BACKEND"
          accentColor="#FF6B9D"
          chips={["APIS", "FRAMEWORKS", "VALIDATION"]}
          technologies={[
            { name: "PYTHON", icon: "🐍" },
            { name: "FASTAPI", icon: "⚡" },
            { name: "NODE.JS", icon: "🟢" },
            { name: "EXPRESS", icon: "🚂" },
            { name: "REST APIS", icon: "🔌" },
            { name: "PYDANTIC", icon: "✅" },
            { name: "SQLALCHEMY", icon: "🗃️" },
          ]}
        />

        {/* Data & Databases Card */}
        <BrutalistSkillCard
          category="DATA & DB"
          accentColor="#FFD93D"
          chips={["DATABASES", "ORM", "ANALYTICS"]}
          technologies={[
            { name: "POSTGRESQL", icon: "🐘" },
            { name: "SUPABASE", icon: "🔥" },
            { name: "DRIZZLE ORM", icon: "💧" },
            { name: "SQL", icon: "📊" },
            { name: "PANDAS", icon: "🐼" },
            { name: "NUMPY", icon: "🔢" },
            { name: "REDIS", icon: "🔴" },
          ]}
        />

        {/* AI / Machine Learning Card */}
        <BrutalistSkillCard
          category="AI / ML"
          accentColor="#A78BFA"
          chips={["NLP", "MODELS", "VECTORS"]}
          technologies={[
            { name: "HUGGINGFACE", icon: "🤗" },
            { name: "OPENAI API", icon: "🧠" },
            { name: "SCIKIT-LEARN", icon: "📈" },
            { name: "RAG", icon: "🔍" },
            { name: "QDRANT", icon: "📐" },
            { name: "NLP", icon: "🗣️" },
            { name: "LANGCHAIN", icon: "🦜" },
            { name: "BERTOPIC", icon: "📊" },
            { name: "OCR", icon: "👁️" },
          ]}
        />

        {/* DevOps Card */}
        <BrutalistSkillCard
          category="DEVOPS"
          accentColor="#34D399"
          chips={["CONTAINERS", "CI/CD", "CLOUD"]}
          technologies={[
            { name: "DOCKER", icon: "🐳" },
            { name: "GIT", icon: "📋" },
            { name: "GITHUB ACTIONS", icon: "⚙️" },
            { name: "LINUX", icon: "🐧" },
            { name: "VERCEL", icon: "▲" },
            { name: "AWS", icon: "☁️" },
          ]}
        />
      </div>
    </div>
  )
}

function BrutalistSkillCard({
  category,
  accentColor,
  chips,
  technologies,
}: {
  category: string
  accentColor: string
  chips: string[]
  technologies: { name: string; icon: string }[]
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.4 }}
      className="relative bg-card border-4 border-[#111111] p-6 transition-all duration-150 hover:-translate-x-1 hover:-translate-y-1"
      style={{
        boxShadow: "10px 10px 0 #111111",
      }}
      whileHover={{
        boxShadow: "14px 14px 0 #111111",
      }}
    >
      {/* Colored Top Stripe */}
      <div
        className="absolute top-0 left-0 right-0 h-[10px]"
        style={{
          backgroundColor: accentColor,
          marginLeft: "-4px",
          marginRight: "-4px",
          marginTop: "-4px",
        }}
      />

      {/* Rotated Category Label */}
      <div
        className="absolute -top-4 -left-4 px-3 py-1 border-4 border-[#111111] font-bold text-xs uppercase text-[#111111]"
        style={{
          backgroundColor: accentColor,
          transform: "rotate(-35deg)",
          boxShadow: "4px 4px 0 #111111",
        }}
      >
        {category}
      </div>

      {/* Metadata Chips */}
      <div className="flex flex-wrap gap-2 mb-6 mt-4">
        {chips.map((chip, index) => (
          <div
            key={chip}
            className="px-2 py-1 border-2 border-[#111111] text-[10px] font-bold uppercase text-[#111111]"
            style={{
              backgroundColor: index % 2 === 0 ? "#FFFF00" : "#00FFFF",
              boxShadow: "2px 2px 0 #111111",
            }}
          >
            {chip}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3">
        {technologies.map((tech, index) => (
          <motion.div
            key={tech.name}
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ delay: index * 0.05 }}
            className="flex items-center gap-2 bg-card border-2 border-[#111111] p-2 transition-all duration-150 hover:-translate-x-1 hover:-translate-y-1 hover:bg-[#00FFFF] dark:hover:bg-[#00FFFF]/80"
            style={{
              boxShadow: "3px 3px 0 #111111",
            }}
            whileHover={{
              boxShadow: "5px 5px 0 #111111",
            }}
          >
            <span className="text-xl flex-shrink-0">{tech.icon}</span>
            <span className="text-xs font-bold uppercase break-words text-foreground">{tech.name}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
