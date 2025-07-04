"use client"
import { motion, useScroll, useTransform } from "framer-motion"
import { Wallet, Shield, Zap, TrendingUp, ArrowRight, Star, Globe, BarChart3, Repeat } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Navigation } from "@/components/navigation"
import { useWallet } from "@/components/wallet-provider"
import Link from "next/link"

export default function HomePage() {
  const { connected } = useWallet()
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0D0D1F] via-[#0F172A] to-[#1E293B] text-white overflow-x-hidden">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <motion.div style={{ y }} className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 w-72 h-72 bg-[#9945FF]/20 rounded-full blur-3xl"></div>
          <div className="absolute top-40 right-10 w-96 h-96 bg-[#00FFA3]/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-1/2 w-80 h-80 bg-[#1E3A8A]/20 rounded-full blur-3xl"></div>
        </motion.div>

        <div className="max-w-7xl mx-auto relative">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-[#9945FF]/10 border border-[#9945FF]/20 mb-6">
                <Zap className="w-4 h-4 text-[#00FFA3] mr-2" />
                <span className="text-sm text-[#F8FAFC]">Revolutionary Cross-Chain Technology</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                One Wallet,{" "}
                <span className="bg-gradient-to-r from-[#9945FF] to-[#00FFA3] bg-clip-text text-transparent">
                  All Chains
                </span>
              </h1>

              <p className="text-xl text-[#64748B] max-w-3xl mx-auto mb-8">
                Manage assets across all blockchain networks using only your Solana wallet. Experience seamless
                cross-chain DeFi with enterprise-grade security.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
            >
              {connected ? (
                <Link href="/dashboard">
                  <Button size="lg" className="bg-[#9945FF] hover:bg-[#9945FF]/80 text-white px-8 py-4 text-lg">
                    Go to Dashboard
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              ) : (
                <Button size="lg" className="bg-[#9945FF] hover:bg-[#9945FF]/80 text-white px-8 py-4 text-lg">
                  Launch App
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              )}
              <Button
                size="lg"
                variant="outline"
                className="border-[#9945FF]/30 text-[#9945FF] hover:bg-[#9945FF]/10 px-8 py-4 text-lg bg-transparent"
              >
                View Demo
              </Button>
            </motion.div>

            {/* Chain Logos Animation */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="flex justify-center items-center space-x-8 mb-16"
            >
              {["Solana", "Ethereum", "Polygon", "Avalanche", "BSC"].map((chain, index) => (
                <motion.div
                  key={chain}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  className="flex flex-col items-center space-y-2"
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-[#9945FF]/20 to-[#00FFA3]/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/10">
                    <Globe className="w-6 h-6 text-[#9945FF]" />
                  </div>
                  <span className="text-xs text-[#64748B]">{chain}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Powerful Features for{" "}
              <span className="bg-gradient-to-r from-[#9945FF] to-[#00FFA3] bg-clip-text text-transparent">
                Modern DeFi
              </span>
            </h2>
            <p className="text-xl text-[#64748B] max-w-2xl mx-auto">
              Experience the future of cross-chain asset management with our cutting-edge platform
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Wallet,
                title: "Single Wallet Control",
                description:
                  "Manage multi-chain assets with just your Solana wallet. No need for multiple wallets or complex setups.",
                color: "from-[#9945FF] to-[#1E3A8A]",
              },
              {
                icon: Repeat,
                title: "Cross-Chain Swaps",
                description:
                  "Seamlessly swap assets across different blockchains with optimal routing and minimal fees.",
                color: "from-[#00FFA3] to-[#1E3A8A]",
              },
              {
                icon: BarChart3,
                title: "Portfolio Tracking",
                description: "Real-time portfolio analytics with comprehensive performance metrics across all chains.",
                color: "from-[#FF6B35] to-[#9945FF]",
              },
              {
                icon: Shield,
                title: "Enterprise Security",
                description: "Bank-grade security with multi-signature support and advanced encryption protocols.",
                color: "from-[#9945FF] to-[#00FFA3]",
              },
              {
                icon: Zap,
                title: "Lightning Fast",
                description: "Optimized for speed with instant transaction confirmations and real-time updates.",
                color: "from-[#00FFA3] to-[#FF6B35]",
              },
              {
                icon: TrendingUp,
                title: "DeFi Integration",
                description: "Access top DeFi protocols across all supported chains from a single interface.",
                color: "from-[#1E3A8A] to-[#9945FF]",
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="group"
              >
                <Card className="h-full bg-[#1E293B]/50 backdrop-blur-sm border border-white/10 hover:border-[#9945FF]/30 transition-all duration-300">
                  <CardContent className="p-6">
                    <div
                      className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-white">{feature.title}</h3>
                    <p className="text-[#64748B] leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-[#9945FF]/10 to-[#00FFA3]/10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Ready to Experience the Future of{" "}
              <span className="bg-gradient-to-r from-[#9945FF] to-[#00FFA3] bg-clip-text text-transparent">
                Cross-Chain DeFi?
              </span>
            </h2>
            <p className="text-xl text-[#64748B] mb-8 max-w-2xl mx-auto">
              Join thousands of users who are already managing their multi-chain portfolios with Sominance
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              {connected ? (
                <Link href="/dashboard">
                  <Button size="lg" className="bg-[#9945FF] hover:bg-[#9945FF]/80 text-white px-8 py-4 text-lg">
                    Go to Dashboard
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              ) : (
                <Button size="lg" className="bg-[#9945FF] hover:bg-[#9945FF]/80 text-white px-8 py-4 text-lg">
                  Launch App Now
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              )}
            </div>

            <div className="flex items-center justify-center space-x-6 text-sm text-[#64748B]">
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 text-[#00FFA3]" />
                <span>Audited by CertiK</span>
              </div>
              <div className="flex items-center space-x-1">
                <Shield className="w-4 h-4 text-[#00FFA3]" />
                <span>Insured up to $10M</span>
              </div>
              <div className="flex items-center space-x-1">
                <TrendingUp className="w-4 h-4 text-[#00FFA3]" />
                <span>$100M+ TVL</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-[#9945FF] to-[#00FFA3] rounded-lg flex items-center justify-center">
                  <Wallet className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">Sominance</span>
              </div>
              <p className="text-[#64748B] mb-4 max-w-md">
                The revolutionary cross-chain wallet platform that enables seamless asset management across all
                blockchain networks.
              </p>
              <div className="flex space-x-4">
                {["Twitter", "Discord", "Telegram", "GitHub"].map((social) => (
                  <a key={social} href="#" className="text-[#64748B] hover:text-[#9945FF] transition-colors">
                    {social}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-4">Product</h3>
              <div className="space-y-2">
                {[
                  { label: "Features", href: "#features" },
                  { label: "Dashboard", href: "/dashboard" },
                  { label: "Assets", href: "/assets" },
                  { label: "Documentation", href: "#" },
                ].map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="block text-[#64748B] hover:text-[#9945FF] transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-white mb-4">Company</h3>
              <div className="space-y-2">
                {["About", "Blog", "Careers", "Contact"].map((item) => (
                  <a key={item} href="#" className="block text-[#64748B] hover:text-[#9945FF] transition-colors">
                    {item}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center">
            <p className="text-[#64748B] text-sm">© 2024 Sominance. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 sm:mt-0">
              <a href="#" className="text-[#64748B] hover:text-[#9945FF] text-sm transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-[#64748B] hover:text-[#9945FF] text-sm transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
