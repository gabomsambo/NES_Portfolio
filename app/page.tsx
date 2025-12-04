"use client"

import type React from "react"
import { useState } from "react"

import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { FeaturedProjectCard } from "@/components/featured-project-card"
import { ProjectGallery } from "@/components/project-gallery"
import { TechnicalSkills } from "@/components/technical-skills"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { AboutMe } from "@/components/about-me"
import { FeaturedThesisModal } from "@/components/featured-thesis-modal"
import { Github, Linkedin, Twitter } from "lucide-react"
import { motion } from "framer-motion"
import dynamic from "next/dynamic"

const NLPDemo = dynamic(() => import("@/components/nlp-demo").then((mod) => ({ default: mod.NLPDemo })), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center py-20">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
    </div>
  ),
})

function AnimatedSection({
  id,
  children,
  className = "",
}: {
  id?: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.section>
  )
}

export default function Home() {
  const [isFeaturedModalOpen, setIsFeaturedModalOpen] = useState(false)

  const projects = [
    {
      id: "1",
      title: "Greenwashing Detection in Corporate Climate Communications",
      subtitle: "Undergraduate Thesis Project",
      description:
        "Corporate greenwashing—making misleading claims about environmental responsibility—has become a critical issue as fossil fuel companies face mounting pressure to demonstrate climate action. I designed and deployed a multi-model NLP system that analyzes how companies craft environmental messaging, revealing the gap between corporate rhetoric and verifiable commitments.",
      challenge:
        "With 100+ sustainability reports published annually by Fortune 500 companies alone, manual verification doesn't scale. I built an automated pipeline that processes regulatory filings, sustainability reports, press releases, and social media to detect five quantifiable greenwashing indicators: strategic vagueness, weak commitments, hedging language, selective disclosure, and aspirational framing.",
      whatIBuilt: [
        "Orchestrated 14+ specialized transformer models (ClimateBERT, ESGBERT, RoBERTa) with a gated classification architecture that conditionally activates models based on content relevance—reducing compute by skipping irrelevant text",
        "Processed 12,500+ text segments across SEC 10-K filings, sustainability reports, press releases, Facebook posts, and Reddit discussions spanning 2019-2023",
        "Developed lexicon-based rhetorical framing analysis with TF-IDF expansion to detect three strategic frames: Technological Optimism, Economic Growth, and Risk Mitigation",
        "Built Named Entity Recognition pipeline using RoBERTa-large-NER to analyze strategic entity omission patterns in corporate communications",
        "Integrated Phi-4 LLM (14B, 4-bit quantized) for final classification synthesis when BERT models disagreed",
      ],
      keyFindings: [
        {
          metric: "Vague language prevalence",
          result: "75.59% of ESG communications",
        },
        {
          metric: "Weak/absent commitments",
          result: "92.50% (strong commitments only 5-8%)",
        },
        {
          metric: "High-risk in sustainability reports",
          result: "50-63% vs. 14% in regulated 10-K filings",
        },
        {
          metric: '"Technological Optimism" framing increase',
          result: "+100% post-COP26 (17.82% → 35.69%)",
        },
        {
          metric: "Public sentiment divergence",
          result: "Corporate: 72.78% positive vs. Public: 31.61% positive",
        },
        {
          metric: "Entity density in high-risk content",
          result: "53.6% fewer verifiable named entities",
        },
      ],
      contributions: [
        {
          title: "Regulatory vs. Voluntary Disclosure Gap",
          description:
            "Demonstrated that voluntary sustainability reports show 3.5x higher greenwashing risk than SEC-regulated filings",
        },
        {
          title: "Novel Entity Omission Indicator",
          description:
            "Identified entity omission as a novel greenwashing indicator—high-risk segments systematically avoid naming specific partners, locations, and beneficiaries",
        },
        {
          title: "Corporate-Public Sentiment Divergence",
          description:
            "Revealed that peak corporate optimism (2021-2022) coincided with peak public skepticism (47.6% negative sentiment)",
        },
      ],
      image: "/ai-nlp-machine-learning-visualization.jpg",
      tags: ["Python", "scikit-learn", "NLTK", "spaCy", "Gensim", "NLP"],
      link: "#",
      githubUrl: "https://github.com/gabomsambo",
    },
    {
      id: "2",
      title: "Travel Dreams Collection",
      subtitle: "Travel Dreams → Full-Stack Engineering Focus",
      description:
        "Built a web app that transforms scattered travel screenshots into an organized, searchable destination database. Features multi-algorithm duplicate detection with geo-proximity matching, a 40-field database schema with 12 performance indexes, and a keyboard-first UX with vim-style navigation for rapid bulk review of 500+ items.",
      role: "Full-Stack Developer",
      highlights: [
        "Designed multi-algorithm duplicate detection combining Levenshtein distance, Jaccard token similarity, and Haversine geo-proximity (500m) with adaptive weighting when data is incomplete",
        "Architected 8 database tables with 12 performance indexes, transaction-wrapped mutations with audit trails, and deterministic UUID generation for idempotent operations",
        "Built 36 API endpoints with provider fallback patterns, rate limiting, cost tracking, and comprehensive error handling",
        "Created reusable React hooks for bulk selection (Shift/Ctrl+click range selection), adaptive virtualization (device-aware thresholds), and keyboard navigation (j/k/c/x)",
      ],
      image: "/chat-application-messaging-interface.jpg",
      tags: ["TypeScript", "Next.js 15", "Drizzle ORM", "PostgreSQL", "Radix UI", "Zod"],
      link: "#",
      githubUrl: "https://github.com/gabomsambo/travel-dream",
    },
    {
      id: "3",
      title: "Fake News Detection via NLP",
      subtitle: "ML Research Project",
      description:
        "Built an AI-powered fake news detection system that analyzes headline-body stance relationships and linguistic patterns to assess article credibility. Trained a Gradient Boosting classifier on 50,000+ article pairs from the Fake News Challenge dataset, achieving 92% accuracy through custom feature engineering combining Word2Vec embeddings, TF-IDF vectors, and sentiment analysis.",
      role: "ML Engineer & NLP Developer",
      highlights: [
        "Engineered 7+ custom NLP feature types (Word2Vec, TF-IDF, POS tagging, NER, refuting words) totaling 10,600+ dimensions",
        "Achieved 92% accuracy on Fake News Challenge stance detection benchmark using 10-fold cross-validation",
        "Built hybrid sentiment analysis pipeline combining VADER (80%) + TextBlob (20%) for robust credibility scoring",
        "Aggregated 5 fake news domain databases (1,000+ flagged sources) and optimized feature caching from 30 min → <1 sec",
      ],
      image: "/ecommerce-shopping-cart-online-store.jpg",
      tags: ["Python", "scikit-learn", "NLTK", "spaCy", "Gensim", "NLP"],
      link: "#",
      githubUrl: "https://github.com/gabomsambo",
    },
    {
      id: "4",
      title: "Task Management Tool",
      subtitle: "Productivity Application",
      description:
        "Created a collaborative project management tool with drag-and-drop kanban boards, task assignments, due dates, and team collaboration features for agile workflows.",
      role: "Frontend Developer",
      highlights: [
        "Implemented drag-and-drop functionality using DnD Kit for intuitive task management",
        "Built real-time collaboration features with Firebase for multi-user synchronization",
        "Designed responsive UI with custom components and smooth animations",
      ],
      image: "/kanban-board-task-management-productivity.jpg",
      tags: ["React", "TypeScript", "Firebase", "DnD Kit", "Tailwind"],
      link: "#",
      githubUrl: "https://github.com/gabomsambo",
    },
    {
      id: "5",
      title: "NLP Learning Workflow",
      subtitle: "Document Processing & Learning Platform",
      description:
        "Built a self-updating learning system that discovers, processes, and synthesizes academic research papers into structured lessons with spaced repetition scheduling. Features a fault-tolerant PDF extraction pipeline with 4-layer fallback, semantic chunking with vector storage, and FSRS algorithm implementation for optimized retention.",
      role: "Full-Stack Developer & Systems Engineer",
      highlights: [
        "Designed fault-tolerant document processing pipeline with 4-layer extraction fallback (LayoutLMv3 → PyMuPDF → pypdf → pdfminer) achieving ~99% success on multi-column academic PDFs",
        "Built semantic chunking system with Qdrant vector store, 1536-dim embeddings, pillar-based namespace isolation, and deterministic UUIDs preventing duplicate ingestion",
        "Implemented FSRS spaced repetition algorithm (18 tunable parameters) with background optimization jobs analyzing user review history for personalized retention curves",
        "Architected multi-source data aggregation combining ArXiv API, Semantic Scholar API, and citation networks with rate limiting and exponential backoff",
      ],
      image: "/weather-dashboard-forecast-data-visualization.jpg",
      tags: ["Python", "FastAPI", "Qdrant", "PostgreSQL", "Pydantic", "Docker"],
      link: "#",
      githubUrl: "https://github.com/gabomsambo/nlp-learning-workflow",
    },
    {
      id: "6",
      title: "LinguaLog",
      subtitle: "Multilingual Web Application",
      description:
        "Built a language learning journal that provides feedback on writing practice with comprehensive internationalization supporting 20+ target languages, including full RTL layout switching for Arabic and Hebrew. Features a cascading configuration system that merges user preferences with per-request overrides, enabling granular control over application behavior without code changes.",
      role: "Full-Stack Developer",
      highlights: [
        "Implemented i18n architecture using i18next with namespace separation, dynamic RTL layout switching, and pseudolocalization mode for identifying untranslated strings during development",
        "Designed cascading configuration resolver that merges defaults → user profile → request overrides, generating context-aware behavior without conditional logic throughout the codebase",
        "Built type-safe API layer with centralized auth header injection, consistent error handling, and TypeScript interfaces mirroring backend Pydantic schemas for compile-time contract validation",
        "Created component library using Radix UI primitives with Framer Motion animations, ensuring consistent accessibility patterns and RTL-compatible layouts across all interactive elements",
      ],
      image: "/code-editor-syntax-highlighting-developer-tools.jpg",
      tags: ["TypeScript", "Next.js 15", "i18next", "Radix UI", "Tailwind CSS", "FastAPI"],
      link: "#",
      githubUrl: "https://github.com/gabomsambo/lingualog",
    },
    {
      id: "7",
      title: "Distributed API Rate Limiter",
      subtitle: "Infrastructure & Backend System",
      description:
        "Built a high-performance distributed rate limiting system that protects APIs from abuse while maintaining sub-millisecond latency. Implements multiple algorithms (token bucket, sliding window, fixed window) with Redis-backed distributed state, serving 10,000+ requests/second across multiple service instances.",
      role: "Backend Engineer",
      highlights: [
        "Designed hybrid rate limiting strategy combining token bucket for burst handling and sliding window log for precise request tracking with 99.9% accuracy",
        "Implemented Redis-backed distributed state with Lua scripts for atomic operations, achieving <2ms p99 latency at 10,000 req/s",
        "Built tiered rate limit policies supporting per-user, per-IP, per-endpoint, and global limits with configurable time windows (second/minute/hour/day)",
        "Created monitoring dashboard with real-time metrics, abuse detection patterns, and automatic IP blacklisting with exponential backoff",
      ],
      image: "/placeholder.svg?height=400&width=600",
      tags: ["Go", "Redis", "Docker", "Prometheus", "Grafana", "Kubernetes"],
      link: "#",
      githubUrl: "https://github.com/gabomsambo",
    },
  ]

  const featuredThesis = {
    title: "Greenwashing Detection in Corporate Climate Communications",
    subtitle: "Research Project",
    description:
      "Corporate greenwashing—making misleading claims about environmental responsibility—has become a critical issue as fossil fuel companies face mounting pressure to demonstrate climate action. I designed and deployed a multi-model NLP system that analyzes how companies craft environmental messaging, revealing the gap between corporate rhetoric and verifiable commitments.",
    imageUrl: "/ai-nlp-machine-learning-visualization.jpg",
    challenge:
      "With 100+ sustainability reports published annually by Fortune 500 companies alone, manual verification doesn't scale. I built an automated pipeline that processes regulatory filings, sustainability reports, press releases, and social media to detect five quantifiable greenwashing indicators: strategic vagueness, weak commitments, hedging language, selective disclosure, and aspirational framing.",
    whatIBuilt: [
      "Orchestrated 14+ specialized transformer models (ClimateBERT, ESGBERT, RoBERTa) with a gated classification architecture that conditionally activates models based on content relevance—reducing compute by skipping irrelevant text",
      "Processed 12,500+ text segments across SEC 10-K filings, sustainability reports, press releases, Facebook posts, and Reddit discussions spanning 2019-2023",
      "Developed lexicon-based rhetorical framing analysis with TF-IDF expansion to detect three strategic frames: Technological Optimism, Economic Growth, and Risk Mitigation",
      "Built Named Entity Recognition pipeline using RoBERTa-large-NER to analyze strategic entity omission patterns in corporate communications",
      "Integrated Phi-4 LLM (14B, 4-bit quantized) for final classification synthesis when BERT models disagreed",
    ],
    keyFindings: [
      {
        metric: "Vague language prevalence",
        result: "75.59% of ESG communications",
      },
      {
        metric: "Weak/absent commitments",
        result: "92.50% (strong commitments only 5-8%)",
      },
      {
        metric: "High-risk in sustainability reports",
        result: "50-63% vs. 14% in regulated 10-K filings",
      },
      {
        metric: '"Technological Optimism" framing increase',
        result: "+100% post-COP26 (17.82% → 35.69%)",
      },
      {
        metric: "Public sentiment divergence",
        result: "Corporate: 72.78% positive vs. Public: 31.61% positive",
      },
      {
        metric: "Entity density in high-risk content",
        result: "53.6% fewer verifiable named entities",
      },
    ],
    contributions: [
      {
        title: "Regulatory vs. Voluntary Disclosure Gap",
        description:
          "Demonstrated that voluntary sustainability reports show 3.5x higher greenwashing risk than SEC-regulated filings",
      },
      {
        title: "Novel Entity Omission Indicator",
        description:
          "Identified entity omission as a novel greenwashing indicator—high-risk segments systematically avoid naming specific partners, locations, and beneficiaries",
      },
      {
        title: "Corporate-Public Sentiment Divergence",
        description:
          "Revealed that peak corporate optimism (2021-2022) coincided with peak public skepticism (47.6% negative sentiment)",
      },
    ],
  }

  return (
    <motion.div id="top" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <Header />
      <main className="pt-[52px]">
        <Hero />

        <div className="space-y-[40px] md:space-y-[60px]">
          <AnimatedSection id="about">
            <div className="max-w-[1400px] mx-auto px-5 md:px-4">
              <AboutMe />
            </div>
          </AnimatedSection>

          <AnimatedSection>
            <div className="max-w-[1400px] mx-auto px-5 md:px-4">
              <FeaturedProjectCard
                title={featuredThesis.title}
                subtitle={featuredThesis.subtitle}
                description={featuredThesis.description}
                imageUrl={featuredThesis.imageUrl}
                onViewClick={() => setIsFeaturedModalOpen(true)}
              />
            </div>
          </AnimatedSection>

          <AnimatedSection id="portfolio">
            <div className="max-w-[1400px] mx-auto px-5 md:px-4">
              <ProjectGallery projects={projects.slice(1)} />
            </div>
          </AnimatedSection>

          <AnimatedSection id="skills">
            <div className="max-w-[1400px] mx-auto px-5 md:px-4">
              <TechnicalSkills />
            </div>
          </AnimatedSection>

          <AnimatedSection id="contact">
            <div className="max-w-[1400px] mx-auto px-5 md:px-4">
              <ContactSection
                email="gabriel.m.sambo@gmail.com"
                linkedin="https://www.linkedin.com/in/gabriel-sambo/"
                github="https://github.com/gabomsambo"
              />
            </div>
          </AnimatedSection>
        </div>
      </main>

      <Footer
        socialLinks={[
          { platform: "GitHub", url: "https://github.com/gabomsambo", icon: Github },
          { platform: "LinkedIn", url: "https://www.linkedin.com/in/gabriel-sambo/", icon: Linkedin },
          { platform: "Twitter", url: "https://twitter.com/yourname", icon: Twitter },
        ]}
      />

      <FeaturedThesisModal
        isOpen={isFeaturedModalOpen}
        onClose={() => setIsFeaturedModalOpen(false)}
        title={featuredThesis.title}
        subtitle={featuredThesis.subtitle}
        imageUrl={featuredThesis.imageUrl}
        challenge={featuredThesis.challenge}
        whatIBuilt={featuredThesis.whatIBuilt}
        keyFindings={featuredThesis.keyFindings}
        contributions={featuredThesis.contributions}
      />
    </motion.div>
  )
}
