"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface WalletContextType {
  connected: boolean
  connecting: boolean
  publicKey: string | null
  connect: () => Promise<void>
  disconnect: () => void
  balance: number | null
}

const WalletContext = createContext<WalletContextType | null>(null)

export function useWallet() {
  const context = useContext(WalletContext)
  if (!context) {
    throw new Error("useWallet must be used within a WalletProvider")
  }
  return context
}

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [connected, setConnected] = useState(false)
  const [connecting, setConnecting] = useState(false)
  const [publicKey, setPublicKey] = useState<string | null>(null)
  const [balance, setBalance] = useState<number | null>(null)

  // Check if wallet is already connected on mount
  useEffect(() => {
    checkWalletConnection()
  }, [])

  const checkWalletConnection = async () => {
    try {
      if (typeof window !== "undefined" && window.solana) {
        const response = await window.solana.connect({ onlyIfTrusted: true })
        if (response.publicKey) {
          setConnected(true)
          setPublicKey(response.publicKey.toString())
          // Simulate balance fetch
          setBalance(Math.random() * 100)
        }
      }
    } catch (error) {
      console.log("Wallet not connected")
    }
  }

  const connect = async () => {
    if (typeof window === "undefined") return

    setConnecting(true)
    try {
      // Check if Phantom wallet is installed
      if (!window.solana) {
        window.open("https://phantom.app/", "_blank")
        throw new Error("Phantom wallet not found! Please install Phantom wallet.")
      }

      const response = await window.solana.connect()
      if (response.publicKey) {
        setConnected(true)
        setPublicKey(response.publicKey.toString())
        // Simulate balance fetch
        setBalance(Math.random() * 100)
      }
    } catch (error) {
      console.error("Failed to connect wallet:", error)
      alert("Failed to connect wallet. Please make sure Phantom is installed.")
    } finally {
      setConnecting(false)
    }
  }

  const disconnect = async () => {
    try {
      if (window.solana) {
        await window.solana.disconnect()
      }
      setConnected(false)
      setPublicKey(null)
      setBalance(null)
    } catch (error) {
      console.error("Failed to disconnect wallet:", error)
    }
  }

  return (
    <WalletContext.Provider
      value={{
        connected,
        connecting,
        publicKey,
        connect,
        disconnect,
        balance,
      }}
    >
      {children}
    </WalletContext.Provider>
  )
}

// Extend Window interface for Solana wallet
declare global {
  interface Window {
    solana?: {
      isPhantom?: boolean
      connect: (options?: { onlyIfTrusted?: boolean }) => Promise<{ publicKey: { toString(): string } }>
      disconnect: () => Promise<void>
      on: (event: string, callback: () => void) => void
    }
  }
}
