"use client"

import { useState } from "react"
import { motion, useMotionValue, useTransform, animate } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

interface PredictionResult {
  confidence: number
  authenticity: number
  marketing: number
  verification: number
  topWords: string[]
}

interface NLPDemoProps {
  onAnalyze?: (text: string) => Promise<PredictionResult>
}

export function NLPDemo({ onAnalyze }: NLPDemoProps) {
  const [inputText, setInputText] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<PredictionResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const maxChars = 1000
  const charCount = inputText.length

  // Motion value for animated score
  const scoreMotion = useMotionValue(0)
  const displayScore = useTransform(scoreMotion, (latest) => Math.round(latest))

  const handleAnalyze = async () => {
    if (!inputText.trim()) return

    setIsLoading(true)
    setError(null)

    try {
      // Use provided onAnalyze function or mock data
      const prediction = onAnalyze
        ? await onAnalyze(inputText)
        : await new Promise<PredictionResult>((resolve) => {
            setTimeout(() => {
              resolve({
                confidence: 72,
                authenticity: 85,
                marketing: 72,
                verification: 60,
                topWords: ["eco-friendly", "carbon", "packaging", "sustainable", "reduces"],
              })
            }, 1000)
          })

      setResult(prediction)

      // Animate the score counter
      animate(scoreMotion, prediction.confidence, {
        duration: 0.8,
        ease: "easeOut",
      })
    } catch (err) {
      setError("Failed to analyze text. Please try again.")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const getScoreColor = (score: number) => {
    if (score < 40) return "#10B981" // Green (low greenwashing)
    if (score < 70) return "#FBBF24" // Amber (medium)
    return "#EF4444" // Red (high greenwashing)
  }

  const getWordImportance = (index: number) => {
    const opacity = 1 - index * 0.15
    return `rgba(239, 68, 68, ${opacity})`
  }

  return (
    <section className="py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-[800px] mx-auto"
      >
        <h2 className="text-[40px] font-bold text-center mb-4">Greenwashing Classifier Demo</h2>
        <p className="text-base text-muted-foreground text-center mb-12">
          Paste any text to analyze greenwashing likelihood
        </p>

        {/* Input Area */}
        <div className="space-y-4 mb-8">
          <textarea
            value={inputText}
            onChange={(e) => {
              if (e.target.value.length <= maxChars) {
                setInputText(e.target.value)
              }
            }}
            placeholder="Enter text here..."
            className="w-full h-[400px] md:h-[400px] sm:h-[300px] p-4 text-sm leading-relaxed rounded-lg border border-border bg-background resize-none focus:outline-none focus:ring-2 focus:ring-[#00D9FF] transition-all"
          />
          <div className="flex justify-between items-center">
            <div className="text-xs text-muted-foreground text-right flex-1">
              {charCount} / {maxChars} characters
            </div>
          </div>
          <Button
            onClick={handleAnalyze}
            disabled={isLoading || !inputText.trim()}
            className="w-full bg-[#00D9FF] hover:bg-[#00B8DD] text-white text-base h-12 transition-all hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              "Analyze"
            )}
          </Button>
        </div>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 mb-8 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400 text-sm"
          >
            {error}
          </motion.div>
        )}

        {/* Output Area */}
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
            className="space-y-6"
          >
            {/* Confidence Score Bar */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <span className="text-lg font-bold">Greenwashing Confidence:</span>
                <motion.span className="text-lg font-bold" style={{ color: getScoreColor(result.confidence) }}>
                  {displayScore}%
                </motion.span>
              </div>
              <div className="h-8 bg-muted rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${result.confidence}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="h-full rounded-full"
                  style={{
                    background: `linear-gradient(to right, #10B981 0%, #FBBF24 50%, #EF4444 100%)`,
                    backgroundSize: `${(100 / result.confidence) * 100}% 100%`,
                    backgroundPosition: "left",
                  }}
                />
              </div>
            </div>

            {/* Prediction Details */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { label: "Authenticity", value: result.authenticity },
                { label: "Marketing Language", value: result.marketing },
                { label: "Claim Verification", value: result.verification },
              ].map((detail, index) => (
                <motion.div
                  key={detail.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="p-3 bg-muted/50 border border-border rounded-lg text-center"
                >
                  <div className="text-xs text-muted-foreground mb-1">{detail.label}</div>
                  <div className="text-base font-semibold">{detail.value}%</div>
                </motion.div>
              ))}
            </div>

            {/* Word Importance Visualization */}
            <div>
              <h3 className="text-sm font-semibold mb-3">Top Important Words:</h3>
              <div className="flex flex-wrap gap-2">
                {result.topWords.map((word, index) => (
                  <motion.span
                    key={word}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="px-3 py-1.5 rounded-md text-sm font-medium text-white"
                    style={{ backgroundColor: getWordImportance(index) }}
                  >
                    {word}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </section>
  )
}
