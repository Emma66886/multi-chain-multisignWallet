import type React from "react"
import type { Metadata } from "next"
import { WalletProvider } from "@/components/wallet-provider"
import "./globals.css"

export const metadata: Metadata = {
  title: "Sominance - Cross-Chain Wallet Platform",
  description: "Manage assets across all blockchain networks using only your Solana wallet",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <WalletProvider>{children}</WalletProvider>
      </body>
    </html>
  )
}
