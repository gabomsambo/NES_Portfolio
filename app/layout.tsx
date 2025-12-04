import type React from "react"
import type { Metadata } from "next"
import { Press_Start_2P, VT323 } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const pressStart2P = Press_Start_2P({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-pixel-title",
})

const vt323 = VT323({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-pixel-body",
})

export const metadata: Metadata = {
  title: "Gabriel - Portfolio",
  description: "Personal portfolio website",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${pressStart2P.variable} ${vt323.variable} font-pixel-body antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
