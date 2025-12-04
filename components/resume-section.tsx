"use client"

import { motion, useInView } from "framer-motion"
import { Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRef } from "react"

interface Stat {
  number: string
  label: string
}

interface TimelineEntry {
  type: "education" | "experience"
  title: string
  organization: string
  date: string
  bullets: string[]
  tags: string[]
}

interface SkillCategories {
  [categoryName: string]: string[]
}

interface ResumeSectionProps {
  stats: Stat[]
  timeline: TimelineEntry[]
  skillCategories: SkillCategories
}

export function ResumeSection({ stats, timeline, skillCategories }: ResumeSectionProps) {
  const handleDownloadPDF = () => {
    console.log("Downloading PDF...")
  }

  return (
    <div className="w-full max-w-[1200px] mx-auto px-4">
      <h2 className="text-5xl font-bold text-center mb-12">Resume</h2>

      {/* PART 1: Download Button + Stats */}
      <div className="flex flex-col md:flex-row gap-6 mb-16">
        {/* Download Button */}
        <div className="w-full md:w-[20%]">
          <Button
            onClick={handleDownloadPDF}
            className="w-full bg-[#00D9FF] hover:bg-[#00B8D9] text-white font-bold h-14 rounded-lg transition-all hover:scale-[1.02]"
          >
            <Download className="mr-2 h-5 w-5" />
            Download PDF
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="w-full md:w-[80%] grid grid-cols-1 sm:grid-cols-3 gap-5">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-muted/50 border border-border border-l-4 border-l-[#00D9FF] rounded-lg p-5 flex flex-col justify-center"
            >
              <div className="text-3xl font-bold text-[#00D9FF] mb-1">{stat.number}</div>
              <div className="text-xs text-muted-foreground uppercase tracking-wide">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* PART 2: Education & Experience Timeline */}
      <div className="mb-16">
        <h3 className="text-4xl font-bold text-center mb-12">Education & Experience</h3>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-[8px] md:left-[20%] top-0 bottom-0 w-[2px] bg-border" />

          {/* Timeline Entries */}
          <div className="space-y-12">
            {timeline.map((entry, index) => (
              <TimelineCard key={index} entry={entry} index={index} />
            ))}
          </div>
        </div>
      </div>

      {/* PART 3: Brutalist Skills Section */}
      <div>
        {/* Section Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-2">
            <div className="bg-[#111111] text-white px-4 py-2 font-mono text-sm font-bold">02.</div>
            <h3 className="text-3xl font-bold uppercase tracking-tight">TECHNICAL SKILLS</h3>
          </div>
          <div className="border-t-4 border-dashed border-[#111111] mb-3" />
          <p className="text-muted-foreground text-sm">Tools that turn ideas into shipped product.</p>
        </div>

        {/* Animated Ticker */}
        <div className="mb-8 overflow-hidden bg-white border-4 border-[#111111] py-4">
          <div className="animate-ticker whitespace-nowrap">
            <span className="inline-block font-bold text-lg uppercase tracking-wider text-[#111111]">
              PYTHON • DJANGO • REACT • TYPESCRIPT • DOCKER • NODE • EXPRESS • POSTGRESQL • PYTHON • DJANGO • REACT •
              TYPESCRIPT • DOCKER • NODE • EXPRESS • POSTGRESQL
            </span>
          </div>
        </div>

        {/* Three-Column Skill Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Frontend Card */}
          <BrutalistSkillCard
            category="FRONTEND"
            accentColor="#00FFFF"
            chips={["UI/UX", "REACT", "TYPESCRIPT"]}
            technologies={[
              { name: "JAVASCRIPT", icon: "JS" },
              { name: "REACT", icon: "⚛" },
              { name: "TYPESCRIPT", icon: "TS" },
              { name: "TAILWIND", icon: "🎨" },
            ]}
          />

          {/* Backend Card */}
          <BrutalistSkillCard
            category="BACKEND"
            accentColor="#FF00FF"
            chips={["APIS", "FRAMEWORKS", "DATABASES"]}
            technologies={[
              { name: "PYTHON", icon: "🐍" },
              { name: "DJANGO", icon: "🎸" },
              { name: "FLASK", icon: "🧪" },
              { name: "NODE.JS", icon: "📦" },
              { name: "EXPRESS", icon: "⚡" },
              { name: "POSTGRESQL", icon: "🐘" },
            ]}
          />

          {/* DevOps Card */}
          <BrutalistSkillCard
            category="DEV OPS"
            accentColor="#FFFF00"
            chips={["CONTAINERIZATION", "INFRASTRUCTURE", "SYSTEMS"]}
            technologies={[
              { name: "DOCKER", icon: "🐳" },
              { name: "NGINX", icon: "🌐" },
              { name: "LINUX", icon: "🐧" },
              { name: "GITHUB", icon: "🔧" },
            ]}
          />
        </div>
      </div>
    </div>
  )
}

function TimelineCard({ entry, index }: { entry: TimelineEntry; index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -30 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
      transition={{ delay: index * 0.15, duration: 0.5 }}
      className="relative pl-8 md:pl-[calc(20%+40px)]"
    >
      {/* Timeline Dot */}
      <motion.div
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : { scale: 0 }}
        transition={{ delay: index * 0.15, type: "spring", stiffness: 200 }}
        className="absolute left-0 md:left-[calc(20%-6px)] top-6 w-3 h-3 rounded-full bg-[#00D9FF] border-4 border-background"
      />

      {/* Card Content */}
      <motion.div
        whileHover={{ y: -4, boxShadow: "0 10px 30px rgba(0, 0, 0, 0.15)" }}
        transition={{ duration: 0.2 }}
        className="bg-card border border-border rounded-xl p-6 shadow-sm"
      >
        <h4 className="text-lg font-bold mb-1">{entry.title}</h4>
        <p className="text-sm text-muted-foreground mb-1">{entry.organization}</p>
        <p className="text-xs text-muted-foreground/70 mb-4">{entry.date}</p>

        <ul className="space-y-2 mb-4">
          {entry.bullets.map((bullet, i) => (
            <li key={i} className="flex items-start text-sm leading-relaxed">
              <span className="mr-2 text-[#00D9FF] mt-1">•</span>
              <span>{bullet}</span>
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-2">
          {entry.tags.map((tag) => (
            <span key={tag} className="px-2 py-1 text-xs rounded bg-muted text-muted-foreground border border-border">
              {tag}
            </span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}

function SkillCategoryCard({
  category,
  skills,
  index,
}: {
  category: string
  skills: string[]
  index: number
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      className="bg-muted/50 border border-border rounded-xl p-6"
    >
      <h4 className="text-base font-bold text-[#00D9FF] mb-3">{category}</h4>
      <div className="h-[1px] bg-border mb-4" />

      <div className="flex flex-wrap gap-3">
        {skills.map((skill, skillIndex) => (
          <motion.span
            key={skill}
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ delay: index * 0.1 + skillIndex * 0.05 }}
            whileHover={{
              scale: 1.05,
              backgroundColor: "#00D9FF",
              color: "#FFFFFF",
              borderColor: "#00D9FF",
            }}
            className="px-3 py-2 text-xs font-medium rounded-full bg-background border border-border cursor-default transition-colors"
          >
            {skill}
          </motion.span>
        ))}
      </div>
    </motion.div>
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
      className="relative bg-white border-4 border-[#111111] p-6 transition-all duration-150 hover:-translate-x-1 hover:-translate-y-1"
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
        className="absolute -top-4 -left-4 px-3 py-1 border-4 border-[#111111] font-bold text-xs uppercase"
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
            className="px-2 py-1 border-2 border-[#111111] text-[10px] font-bold uppercase"
            style={{
              backgroundColor: index % 2 === 0 ? "#FFFF00" : "#00FFFF",
              boxShadow: "2px 2px 0 #111111",
            }}
          >
            {chip}
          </div>
        ))}
      </div>

      {/* Technology Tags Grid */}
      <div className="grid grid-cols-2 gap-3">
        {technologies.map((tech, index) => (
          <motion.div
            key={tech.name}
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ delay: index * 0.05 }}
            className="flex items-center gap-2 bg-white border-2 border-[#111111] p-2 transition-all duration-150 hover:-translate-x-1 hover:-translate-y-1 hover:bg-[#00FFFF]"
            style={{
              boxShadow: "3px 3px 0 #111111",
            }}
            whileHover={{
              boxShadow: "5px 5px 0 #111111",
            }}
          >
            <span className="text-xl">{tech.icon}</span>
            <span className="text-xs font-bold uppercase">{tech.name}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
