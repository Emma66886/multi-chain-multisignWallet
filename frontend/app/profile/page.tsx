"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { User, Shield, Award, TrendingUp, Wallet, Globe, Edit, Camera } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Navigation } from "@/components/navigation"
import { useWallet } from "@/components/wallet-provider"
import { useRouter } from "next/navigation"

export default function ProfilePage() {
  const { connected, publicKey, balance } = useWallet()
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState({
    name: "Crypto Enthusiast",
    email: "user@example.com",
    joinDate: "2024-01-01",
    totalTransactions: 156,
    totalVolume: 45678.9,
    favoriteChain: "Solana",
  })

  const stats = [
    {
      label: "Total Portfolio Value",
      value: "$127,543.21",
      change: "+12.5%",
      icon: TrendingUp,
      color: "text-[#00FFA3]",
    },
    {
      label: "Total Transactions",
      value: profile.totalTransactions.toString(),
      change: "+23 this month",
      icon: Wallet,
      color: "text-[#9945FF]",
    },
    {
      label: "Trading Volume",
      value: `$${profile.totalVolume.toLocaleString()}`,
      change: "+8.2% this month",
      icon: Globe,
      color: "text-[#FF6B35]",
    },
    {
      label: "Active Chains",
      value: "5",
      change: "Across networks",
      icon: Shield,
      color: "text-[#1E3A8A]",
    },
  ]

  const achievements = [
    {
      title: "Early Adopter",
      description: "Joined Sominance in the first month",
      icon: Award,
      earned: true,
    },
    {
      title: "Cross-Chain Master",
      description: "Completed transactions on 5+ chains",
      icon: Globe,
      earned: true,
    },
    {
      title: "High Volume Trader",
      description: "Traded over $50,000 in volume",
      icon: TrendingUp,
      earned: false,
    },
    {
      title: "Security Champion",
      description: "Enabled all security features",
      icon: Shield,
      earned: true,
    },
  ]

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
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Profile</h1>
            <p className="text-[#64748B]">Manage your profile information and view your achievements</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Information */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="lg:col-span-1"
            >
              <Card className="bg-[#1E293B]/50 backdrop-blur-sm border border-white/10">
                <CardHeader className="text-center">
                  <div className="relative mx-auto mb-4">
                    <div className="w-24 h-24 bg-gradient-to-r from-[#9945FF] to-[#00FFA3] rounded-full flex items-center justify-center">
                      <User className="w-12 h-12 text-white" />
                    </div>
                    <Button
                      size="sm"
                      className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-[#9945FF] hover:bg-[#9945FF]/80 p-0"
                    >
                      <Camera className="w-4 h-4" />
                    </Button>
                  </div>
                  <CardTitle className="text-[#F8FAFC]">{profile.name}</CardTitle>
                  <p className="text-[#64748B]">{profile.email}</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[#64748B]">Wallet Address</span>
                    <span className="text-white font-mono text-sm">
                      {publicKey?.slice(0, 6)}...{publicKey?.slice(-4)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#64748B]">Member Since</span>
                    <span className="text-white">{new Date(profile.joinDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#64748B]">Favorite Chain</span>
                    <span className="text-white">{profile.favoriteChain}</span>
                  </div>
                  <Button
                    onClick={() => setIsEditing(!isEditing)}
                    className="w-full bg-[#9945FF] hover:bg-[#9945FF]/80 text-white"
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    {isEditing ? "Save Changes" : "Edit Profile"}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Stats and Achievements */}
            <div className="lg:col-span-2 space-y-8">
              {/* Stats Grid */}
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
                <h2 className="text-xl font-semibold text-white mb-4">Statistics</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {stats.map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                    >
                      <Card className="bg-[#1E293B]/50 backdrop-blur-sm border border-white/10">
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between mb-2">
                            <stat.icon className={`w-5 h-5 ${stat.color}`} />
                            <span className="text-sm text-[#64748B]">{stat.change}</span>
                          </div>
                          <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                          <div className="text-sm text-[#64748B]">{stat.label}</div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Achievements */}
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
                <h2 className="text-xl font-semibold text-white mb-4">Achievements</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {achievements.map((achievement, index) => (
                    <motion.div
                      key={achievement.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                    >
                      <Card
                        className={`bg-[#1E293B]/50 backdrop-blur-sm border transition-all duration-300 ${
                          achievement.earned
                            ? "border-[#00FFA3]/30 hover:border-[#00FFA3]/50"
                            : "border-white/10 opacity-60"
                        }`}
                      >
                        <CardContent className="p-6">
                          <div className="flex items-start space-x-4">
                            <div
                              className={`w-12 h-12 rounded-full flex items-center justify-center ${
                                achievement.earned
                                  ? "bg-gradient-to-r from-[#00FFA3]/20 to-[#9945FF]/20"
                                  : "bg-[#64748B]/20"
                              }`}
                            >
                              <achievement.icon
                                className={`w-6 h-6 ${achievement.earned ? "text-[#00FFA3]" : "text-[#64748B]"}`}
                              />
                            </div>
                            <div className="flex-1">
                              <h3
                                className={`font-semibold mb-1 ${achievement.earned ? "text-white" : "text-[#64748B]"}`}
                              >
                                {achievement.title}
                              </h3>
                              <p className="text-sm text-[#64748B]">{achievement.description}</p>
                              {achievement.earned && (
                                <div className="mt-2">
                                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-[#00FFA3]/10 text-[#00FFA3]">
                                    Earned
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
