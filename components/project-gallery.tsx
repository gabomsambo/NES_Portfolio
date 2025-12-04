"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import { ProjectModal } from "./project-modal"

interface Project {
  id: string
  title: string
  subtitle?: string
  description: string
  role?: string
  highlights?: string[]
  image: string
  tags: string[]
  link: string
}

interface ProjectGalleryProps {
  projects: Project[]
}

const nesColors = ["#FF006E", "#00D9FF", "#FFE500", "#39FF14", "#FF6B35", "#00D9FF"]

export function ProjectGallery({ projects }: ProjectGalleryProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  return (
    <>
      <section ref={ref} className="py-20">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="font-mono text-3xl md:text-4xl mb-3 text-[#FF006E] pixel-shadow">PORTFOLIO</h2>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-[1200px] mx-auto">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{
                duration: 0.3,
                delay: index * 0.15,
                ease: "linear",
              }}
            >
              <ProjectCard
                project={project}
                bgColor={nesColors[index % nesColors.length]}
                onOpenModal={() => setSelectedProject(project)}
              />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Modal Component */}
      <ProjectModal
        project={selectedProject || projects[0]}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </>
  )
}

function ProjectCard({
  project,
  bgColor,
  onOpenModal,
}: {
  project: Project
  bgColor: string
  onOpenModal: () => void
}) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className="group relative overflow-hidden border-6 border-[#1A1A2E] transition-all duration-100 cursor-pointer hover:-translate-y-1"
      style={{
        boxShadow: isHovered
          ? "inset -2px -2px 0px rgba(0,0,0,0.3), 0 8px 0 rgba(0,0,0,0.3)"
          : "inset -4px -4px 0px rgba(0,0,0,0.3)",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onOpenModal}
    >
      {/* Image Area with pixelated filter */}
      <div className="relative w-full h-[140px] md:h-[150px] lg:h-[160px] overflow-hidden">
        <div
          className="absolute inset-0 pixelated"
          style={{
            backgroundImage: `url(${project.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        {isHovered && (
          <div className="absolute inset-0 flex items-center justify-center" style={{ backgroundColor: "#5A189A" }}>
            <div className="text-[#FFE500] font-sans text-lg font-bold">▶ VIEW PROJECT</div>
          </div>
        )}
      </div>

      {/* Content Area */}
      <div className="p-6" style={{ backgroundColor: bgColor }}>
        <h3 className="font-sans text-base font-bold mb-2 text-[#1A1A2E] dark:text-[#FFFBF0]">{project.title}</h3>

        {/* Description */}
        <p className="font-sans text-sm text-[#1A1A2E]/90 mb-4 line-clamp-3 dark:text-[#FFFBF0]/90">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 text-xs font-sans bg-[#FFFBF0] text-[#1A1A2E] border-2 border-[#1A1A2E]"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
