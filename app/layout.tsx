import React from "react"
import type { Metadata } from "next"
import { Playfair_Display, Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

import { StoreProvider } from "@/lib/store-context"

const _playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
})

const _inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "LoveNest - Make This Valentine's Day Unforgettable",
  description:
    "Discover the perfect Valentine's gifts for your loved ones. From romantic rose bouquets to customized gifts, find everything to make this Valentine's Day special.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        {/* 🔥 THIS IS THE KEY FIX */}
        <StoreProvider>
          {children}
        </StoreProvider>

        <Analytics />
      </body>
    </html>
  )
}
