"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { Wallet, Menu, X, ChevronDown, LogOut, User, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useWallet } from "@/components/wallet-provider"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { connected, connecting, publicKey, connect, disconnect } = useWallet()
  const pathname = usePathname()

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/dashboard", label: "Dashboard" },
    { href: "/assets", label: "Assets" },
    { href: "/transactions", label: "Transactions" },
  ]

  const formatAddress = (address: string) => {
    return `${address.slice(0, 4)}...${address.slice(-4)}`
  }

  return (
    <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-[#0D0D1F]/80 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-[#9945FF] to-[#00FFA3] rounded-lg flex items-center justify-center">
              <Wallet className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white">Sominance</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm transition-colors ${
                  pathname === item.href ? "text-[#9945FF]" : "text-[#F8FAFC] hover:text-[#9945FF]"
                }`}
              >
                {item.label}
              </Link>
            ))}

            {connected ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="border-[#9945FF]/30 text-[#9945FF] hover:bg-[#9945FF]/10 bg-transparent"
                  >
                    <Wallet className="w-4 h-4 mr-2" />
                    {formatAddress(publicKey!)}
                    <ChevronDown className="w-4 h-4 ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-[#1E293B] border-white/10">
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="flex items-center">
                      <User className="w-4 h-4 mr-2" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/settings" className="flex items-center">
                      <Settings className="w-4 h-4 mr-2" />
                      Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-white/10" />
                  <DropdownMenuItem onClick={disconnect} className="text-[#FF0844]">
                    <LogOut className="w-4 h-4 mr-2" />
                    Disconnect
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button onClick={connect} disabled={connecting} className="bg-[#9945FF] hover:bg-[#9945FF]/80 text-white">
                {connecting ? "Connecting..." : "Connect Wallet"}
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-[#0D0D1F]/95 backdrop-blur-md border-t border-white/10"
        >
          <div className="px-4 py-4 space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`block text-sm transition-colors ${
                  pathname === item.href ? "text-[#9945FF]" : "text-[#F8FAFC] hover:text-[#9945FF]"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            {connected ? (
              <div className="space-y-2">
                <div className="text-sm text-[#64748B]">Connected: {formatAddress(publicKey!)}</div>
                <Button
                  onClick={disconnect}
                  variant="outline"
                  className="w-full border-[#FF0844]/30 text-[#FF0844] hover:bg-[#FF0844]/10 bg-transparent"
                >
                  Disconnect
                </Button>
              </div>
            ) : (
              <Button
                onClick={connect}
                disabled={connecting}
                className="w-full bg-[#9945FF] hover:bg-[#9945FF]/80 text-white"
              >
                {connecting ? "Connecting..." : "Connect Wallet"}
              </Button>
            )}
          </div>
        </motion.div>
      )}
    </nav>
  )
}
