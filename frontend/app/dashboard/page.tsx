"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import {
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownLeft,
  Repeat,
  Send,
  Download,
  BarChart3,
  Globe,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Navigation } from "@/components/navigation"
import { useWallet } from "@/components/wallet-provider"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function DashboardPage() {
  const { connected, publicKey, balance } = useWallet()
  const router = useRouter()
  const [portfolioData, setPortfolioData] = useState({
    totalValue: 127543.21,
    change24h: 12.5,
    assets: [
      {
        name: "Solana",
        symbol: "SOL",
        balance: 45.23,
        value: 4523.45,
        change: 5.2,
        chain: "Solana",
      },
      {
        name: "Ethereum",
        symbol: "ETH",
        balance: 12.45,
        value: 24567.89,
        change: 2.1,
        chain: "Ethereum",
      },
      {
        name: "Polygon",
        symbol: "MATIC",
        balance: 1234.56,
        value: 987.65,
        change: -1.3,
        chain: "Polygon",
      },
      {
        name: "Avalanche",
        symbol: "AVAX",
        balance: 89.12,
        value: 2345.67,
        change: 8.7,
        chain: "Avalanche",
      },
    ],
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
            <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
            <p className="text-[#64748B]">Welcome back! Here's your portfolio overview across all chains.</p>
          </motion.div>

          {/* Portfolio Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8"
          >
            {/* Total Portfolio Value */}
            <Card className="lg:col-span-2 bg-[#1E293B]/50 backdrop-blur-sm border border-white/10">
              <CardHeader>
                <CardTitle className="text-[#F8FAFC] flex items-center justify-between">
                  Total Portfolio Value
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-[#00FFA3] rounded-full animate-pulse"></div>
                    <span className="text-sm text-[#64748B]">Live</span>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <div className="text-4xl font-bold text-white mb-2">${portfolioData.totalValue.toLocaleString()}</div>
                  <div className="flex items-center">
                    {portfolioData.change24h > 0 ? (
                      <TrendingUp className="w-4 h-4 text-[#00FFA3] mr-1" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-[#FF0844] mr-1" />
                    )}
                    <span className={`text-sm ${portfolioData.change24h > 0 ? "text-[#00FFA3]" : "text-[#FF0844]"}`}>
                      {portfolioData.change24h > 0 ? "+" : ""}
                      {portfolioData.change24h}% (24h)
                    </span>
                  </div>
                </div>

                {/* Mock Chart Area */}
                <div className="h-32 bg-gradient-to-r from-[#9945FF]/10 to-[#00FFA3]/10 rounded-lg flex items-center justify-center">
                  <div className="text-[#64748B] text-sm">Portfolio Performance Chart</div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-[#1E293B]/50 backdrop-blur-sm border border-white/10">
              <CardHeader>
                <CardTitle className="text-[#F8FAFC]">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full bg-[#9945FF] hover:bg-[#9945FF]/80 text-white justify-start">
                  <Repeat className="w-4 h-4 mr-2" />
                  Cross-Chain Swap
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-[#9945FF]/30 text-[#9945FF] hover:bg-[#9945FF]/10 justify-start bg-transparent"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Send Assets
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-[#9945FF]/30 text-[#9945FF] hover:bg-[#9945FF]/10 justify-start bg-transparent"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Receive Assets
                </Button>
                <Link href="/assets">
                  <Button
                    variant="outline"
                    className="w-full border-[#9945FF]/30 text-[#9945FF] hover:bg-[#9945FF]/10 justify-start bg-transparent"
                  >
                    <BarChart3 className="w-4 h-4 mr-2" />
                    View All Assets
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>

          {/* Assets Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <Card className="bg-[#1E293B]/50 backdrop-blur-sm border border-white/10">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-[#F8FAFC]">Your Assets</CardTitle>
                <Link href="/assets">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-[#9945FF]/30 text-[#9945FF] hover:bg-[#9945FF]/10 bg-transparent"
                  >
                    View All
                  </Button>
                </Link>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {portfolioData.assets.map((asset, index) => (
                    <motion.div
                      key={asset.symbol}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className="flex items-center justify-between p-4 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-[#9945FF]/20 to-[#00FFA3]/20 rounded-full flex items-center justify-center">
                          <Globe className="w-6 h-6 text-[#9945FF]" />
                        </div>
                        <div>
                          <div className="font-medium text-white">{asset.name}</div>
                          <div className="text-sm text-[#64748B]">
                            {asset.balance} {asset.symbol} • {asset.chain}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-white">${asset.value.toLocaleString()}</div>
                        <div
                          className={`text-sm flex items-center ${
                            asset.change > 0 ? "text-[#00FFA3]" : "text-[#FF0844]"
                          }`}
                        >
                          {asset.change > 0 ? (
                            <ArrowUpRight className="w-3 h-3 mr-1" />
                          ) : (
                            <ArrowDownLeft className="w-3 h-3 mr-1" />
                          )}
                          {asset.change > 0 ? "+" : ""}
                          {asset.change}%
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-8"
          >
            <Card className="bg-[#1E293B]/50 backdrop-blur-sm border border-white/10">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-[#F8FAFC]">Recent Activity</CardTitle>
                <Link href="/transactions">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-[#9945FF]/30 text-[#9945FF] hover:bg-[#9945FF]/10 bg-transparent"
                  >
                    View All
                  </Button>
                </Link>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      type: "swap",
                      from: "ETH",
                      to: "SOL",
                      amount: "2.5",
                      value: "$4,250",
                      time: "2 hours ago",
                      status: "completed",
                    },
                    {
                      type: "receive",
                      asset: "MATIC",
                      amount: "500",
                      value: "$425",
                      time: "5 hours ago",
                      status: "completed",
                    },
                    {
                      type: "send",
                      asset: "SOL",
                      amount: "10",
                      value: "$1,000",
                      time: "1 day ago",
                      status: "completed",
                    },
                  ].map((activity, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 rounded-lg hover:bg-white/5 transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-gradient-to-r from-[#9945FF]/20 to-[#00FFA3]/20 rounded-full flex items-center justify-center">
                          {activity.type === "swap" && <Repeat className="w-5 h-5 text-[#9945FF]" />}
                          {activity.type === "receive" && <Download className="w-5 h-5 text-[#00FFA3]" />}
                          {activity.type === "send" && <Send className="w-5 h-5 text-[#FF6B35]" />}
                        </div>
                        <div>
                          <div className="font-medium text-white">
                            {activity.type === "swap" &&
                              `Swapped ${activity.amount} ${activity.from} to ${activity.to}`}
                            {activity.type === "receive" && `Received ${activity.amount} ${activity.asset}`}
                            {activity.type === "send" && `Sent ${activity.amount} ${activity.asset}`}
                          </div>
                          <div className="text-sm text-[#64748B]">{activity.time}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-white">{activity.value}</div>
                        <div className="text-sm text-[#00FFA3] capitalize">{activity.status}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
