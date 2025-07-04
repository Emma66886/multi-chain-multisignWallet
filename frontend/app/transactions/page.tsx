"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Search, ArrowUpRight, Repeat, Send, Download, ExternalLink, Clock } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Navigation } from "@/components/navigation"
import { useWallet } from "@/components/wallet-provider"
import { useRouter } from "next/navigation"

export default function TransactionsPage() {
  const { connected } = useWallet()
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState("all")
  const [selectedChain, setSelectedChain] = useState("all")

  const transactions = [
    {
      id: "0x1234...5678",
      type: "swap",
      from: "ETH",
      to: "SOL",
      amount: "2.5",
      value: "$4,250",
      fee: "$12.50",
      time: "2024-01-15T10:30:00Z",
      status: "completed",
      chain: "Ethereum",
      hash: "0x1234567890abcdef",
    },
    {
      id: "0x2345...6789",
      type: "receive",
      asset: "MATIC",
      amount: "500",
      value: "$425",
      fee: "$2.10",
      time: "2024-01-15T08:15:00Z",
      status: "completed",
      chain: "Polygon",
      hash: "0x2345678901bcdefg",
    },
    {
      id: "0x3456...7890",
      type: "send",
      asset: "SOL",
      amount: "10",
      value: "$1,000",
      fee: "$0.50",
      time: "2024-01-14T16:45:00Z",
      status: "completed",
      chain: "Solana",
      hash: "0x3456789012cdefgh",
    },
    {
      id: "0x4567...8901",
      type: "swap",
      from: "AVAX",
      to: "BNB",
      amount: "25",
      value: "$658",
      fee: "$8.75",
      time: "2024-01-14T14:20:00Z",
      status: "pending",
      chain: "Avalanche",
      hash: "0x4567890123defghi",
    },
    {
      id: "0x5678...9012",
      type: "receive",
      asset: "ETH",
      amount: "1.5",
      value: "$2,960",
      fee: "$15.20",
      time: "2024-01-14T11:10:00Z",
      status: "failed",
      chain: "Ethereum",
      hash: "0x5678901234efghij",
    },
  ]

  const transactionTypes = ["all", "swap", "send", "receive"]
  const chains = ["all", "Solana", "Ethereum", "Polygon", "Avalanche", "BSC"]

  const filteredTransactions = transactions.filter((tx) => {
    const matchesSearch =
      tx.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (tx.asset && tx.asset.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (tx.from && tx.from.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (tx.to && tx.to.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesType = selectedType === "all" || tx.type === selectedType
    const matchesChain = selectedChain === "all" || tx.chain === selectedChain
    return matchesSearch && matchesType && matchesChain
  })

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) return "Less than 1 hour ago"
    if (diffInHours < 24) return `${diffInHours} hours ago`
    return `${Math.floor(diffInHours / 24)} days ago`
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "text-[#00FFA3]"
      case "pending":
        return "text-[#FF6B35]"
      case "failed":
        return "text-[#FF0844]"
      default:
        return "text-[#64748B]"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "swap":
        return <Repeat className="w-5 h-5 text-[#9945FF]" />
      case "send":
        return <Send className="w-5 h-5 text-[#FF6B35]" />
      case "receive":
        return <Download className="w-5 h-5 text-[#00FFA3]" />
      default:
        return <ArrowUpRight className="w-5 h-5 text-[#64748B]" />
    }
  }

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
            <h1 className="text-3xl font-bold mb-2">Transaction History</h1>
            <p className="text-[#64748B]">Track all your cross-chain transactions in one place</p>
          </motion.div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8"
          >
            <Card className="bg-[#1E293B]/50 backdrop-blur-sm border border-white/10">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#64748B] w-4 h-4" />
                      <Input
                        placeholder="Search transactions..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 bg-[#0F172A] border-white/10 text-white placeholder-[#64748B]"
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <div className="flex gap-2">
                      {transactionTypes.map((type) => (
                        <Button
                          key={type}
                          variant={selectedType === type ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSelectedType(type)}
                          className={
                            selectedType === type
                              ? "bg-[#9945FF] hover:bg-[#9945FF]/80 text-white"
                              : "border-[#9945FF]/30 text-[#9945FF] hover:bg-[#9945FF]/10 bg-transparent"
                          }
                        >
                          {type === "all" ? "All Types" : type.charAt(0).toUpperCase() + type.slice(1)}
                        </Button>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      {chains.slice(0, 4).map((chain) => (
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
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Transactions List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            {filteredTransactions.map((transaction, index) => (
              <motion.div
                key={transaction.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <Card className="bg-[#1E293B]/50 backdrop-blur-sm border border-white/10 hover:border-[#9945FF]/30 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-[#9945FF]/20 to-[#00FFA3]/20 rounded-full flex items-center justify-center">
                          {getTypeIcon(transaction.type)}
                        </div>
                        <div>
                          <div className="font-medium text-white">
                            {transaction.type === "swap" &&
                              `Swapped ${transaction.amount} ${transaction.from} to ${transaction.to}`}
                            {transaction.type === "receive" && `Received ${transaction.amount} ${transaction.asset}`}
                            {transaction.type === "send" && `Sent ${transaction.amount} ${transaction.asset}`}
                          </div>
                          <div className="flex items-center space-x-2 text-sm text-[#64748B]">
                            <Clock className="w-3 h-3" />
                            <span>{formatTime(transaction.time)}</span>
                            <span>•</span>
                            <span>{transaction.chain}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-white">{transaction.value}</div>
                        <div className="flex items-center justify-end space-x-2">
                          <span className={`text-sm capitalize ${getStatusColor(transaction.status)}`}>
                            {transaction.status}
                          </span>
                          <Button size="sm" variant="ghost" className="text-[#64748B] hover:text-[#9945FF] p-1">
                            <ExternalLink className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Transaction Details */}
                    <div className="mt-4 pt-4 border-t border-white/10">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <div className="text-[#64748B]">Transaction ID</div>
                          <div className="text-white font-mono">{transaction.id}</div>
                        </div>
                        <div>
                          <div className="text-[#64748B]">Network Fee</div>
                          <div className="text-white">{transaction.fee}</div>
                        </div>
                        <div>
                          <div className="text-[#64748B]">Hash</div>
                          <div className="text-white font-mono">{transaction.hash.slice(0, 10)}...</div>
                        </div>
                        <div>
                          <div className="text-[#64748B]">Date</div>
                          <div className="text-white">{new Date(transaction.time).toLocaleDateString()}</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Empty State */}
          {filteredTransactions.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-center py-12"
            >
              <Card className="bg-[#1E293B]/50 backdrop-blur-sm border border-white/10">
                <CardContent className="p-12">
                  <div className="w-16 h-16 bg-gradient-to-r from-[#9945FF]/20 to-[#00FFA3]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="w-8 h-8 text-[#64748B]" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">No transactions found</h3>
                  <p className="text-[#64748B] mb-6">Try adjusting your search criteria or filters</p>
                  <Button
                    onClick={() => {
                      setSearchTerm("")
                      setSelectedType("all")
                      setSelectedChain("all")
                    }}
                    className="bg-[#9945FF] hover:bg-[#9945FF]/80 text-white"
                  >
                    Clear Filters
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}
