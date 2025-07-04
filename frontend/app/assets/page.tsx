"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Search, Globe, Send, Download, Repeat, Plus, TrendingUp, TrendingDown } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Navigation } from "@/components/navigation"
import { useWallet } from "@/components/wallet-provider"
import { useRouter } from "next/navigation"

export default function AssetsPage() {
  const { connected } = useWallet()
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedChain, setSelectedChain] = useState("all")

  const assets = [
    {
      name: "Solana",
      symbol: "SOL",
      balance: 45.23,
      value: 4523.45,
      price: 100.12,
      change: 5.2,
      chain: "Solana",
      logo: "SOL",
    },
    {
      name: "Ethereum",
      symbol: "ETH",
      balance: 12.45,
      value: 24567.89,
      price: 1973.45,
      change: 2.1,
      chain: "Ethereum",
      logo: "ETH",
    },
    {
      name: "Polygon",
      symbol: "MATIC",
      balance: 1234.56,
      value: 987.65,
      price: 0.8,
      change: -1.3,
      chain: "Polygon",
      logo: "MATIC",
    },
    {
      name: "Avalanche",
      symbol: "AVAX",
      balance: 89.12,
      value: 2345.67,
      price: 26.32,
      change: 8.7,
      chain: "Avalanche",
      logo: "AVAX",
    },
    {
      name: "BNB",
      symbol: "BNB",
      balance: 15.67,
      value: 3456.78,
      price: 220.45,
      change: -0.5,
      chain: "BSC",
      logo: "BNB",
    },
  ]

  const chains = ["all", "Solana", "Ethereum", "Polygon", "Avalanche", "BSC"]

  const filteredAssets = assets.filter((asset) => {
    const matchesSearch =
      asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asset.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesChain = selectedChain === "all" || asset.chain === selectedChain
    return matchesSearch && matchesChain
  })

  useEffect(() => {
    if (!connected) {
      router.push("/")
    }
  }, [connected, router])

  if (!connected) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0D0D1F] via-[#0F172A] to-[#1E293B] text-white">
      <Navigation />

      <div className="pt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Assets</h1>
            <p className="text-[#64748B]">Manage your cross-chain portfolio with ease</p>
          </motion.div>

          {/* Filters and Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8"
          >
            <Card className="bg-[#1E293B]/50 backdrop-blur-sm border border-white/10">
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#64748B] w-4 h-4" />
                      <Input
                        placeholder="Search assets..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 bg-[#0F172A] border-white/10 text-white placeholder-[#64748B]"
                      />
                    </div>
                  </div>
                  <div className="flex gap-2 overflow-x-auto">
                    {chains.map((chain) => (
                      <Button
                        key={chain}
                        variant={selectedChain === chain ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedChain(chain)}
                        className={
                          selectedChain === chain
                            ? "bg-[#9945FF] hover:bg-[#9945FF]/80 text-white"
                            : "border-[#9945FF]/30 text-[#9945FF] hover:bg-[#9945FF]/10 bg-transparent"
                        }
                      >
                        {chain === "all" ? "All Chains" : chain}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Assets Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8"
          >
            {filteredAssets.map((asset, index) => (
              <motion.div
                key={asset.symbol}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="group"
              >
                <Card className="bg-[#1E293B]/50 backdrop-blur-sm border border-white/10 hover:border-[#9945FF]/30 transition-all duration-300">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-r from-[#9945FF]/20 to-[#00FFA3]/20 rounded-full flex items-center justify-center">
                          <Globe className="w-6 h-6 text-[#9945FF]" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-white">{asset.name}</h3>
                          <p className="text-sm text-[#64748B]">
                            {asset.symbol} • {asset.chain}
                          </p>
                        </div>
                      </div>
                      <div
                        className={`flex items-center text-sm ${
                          asset.change > 0 ? "text-[#00FFA3]" : "text-[#FF0844]"
                        }`}
                      >
                        {asset.change > 0 ? (
                          <TrendingUp className="w-4 h-4 mr-1" />
                        ) : (
                          <TrendingDown className="w-4 h-4 mr-1" />
                        )}
                        {asset.change > 0 ? "+" : ""}
                        {asset.change}%
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-3">
                      <div>
                        <div className="text-2xl font-bold text-white">${asset.value.toLocaleString()}</div>
                        <div className="text-sm text-[#64748B]">
                          {asset.balance} {asset.symbol} @ ${asset.price}
                        </div>
                      </div>

                      <div className="flex space-x-2">
                        <Button size="sm" className="flex-1 bg-[#9945FF] hover:bg-[#9945FF]/80 text-white">
                          <Send className="w-4 h-4 mr-1" />
                          Send
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1 border-[#9945FF]/30 text-[#9945FF] hover:bg-[#9945FF]/10 bg-transparent"
                        >
                          <Download className="w-4 h-4 mr-1" />
                          Receive
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-[#9945FF]/30 text-[#9945FF] hover:bg-[#9945FF]/10 bg-transparent"
                        >
                          <Repeat className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Add Asset Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-center"
          >
            <Button
              size="lg"
              variant="outline"
              className="border-[#9945FF]/30 text-[#9945FF] hover:bg-[#9945FF]/10 bg-transparent"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add New Asset
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
