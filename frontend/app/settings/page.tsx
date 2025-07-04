"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Shield, Bell, Palette, Key, Save } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Navigation } from "@/components/navigation"
import { useWallet } from "@/components/wallet-provider"
import { useRouter } from "next/navigation"

export default function SettingsPage() {
  const { connected, publicKey } = useWallet()
  const router = useRouter()
  const [showPrivateKey, setShowPrivateKey] = useState(false)
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      push: false,
      transactions: true,
      priceAlerts: true,
      security: true,
    },
    security: {
      twoFactor: false,
      biometric: true,
      autoLock: true,
      autoLockTime: "5",
    },
    preferences: {
      currency: "USD",
      language: "English",
      theme: "dark",
      hideBalances: false,
    },
    privacy: {
      analytics: true,
      crashReports: true,
      marketing: false,
    },
  })

  useEffect(() => {
    if (!connected) {
      router.push("/")
    }
  }, [connected, router])

  const updateSetting = (category: string, key: string, value: any) => {
    setSettings((prev) => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [key]: value,
      },
    }))
  }

  if (!connected) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0D0D1F] via-[#0F172A] to-[#1E293B] text-white">
      <Navigation />

      <div className="pt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Settings</h1>
            <p className="text-[#64748B]">Manage your account preferences and security settings</p>
          </motion.div>

          <div className="space-y-8">
            {/* Account Information */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <Card className="bg-[#1E293B]/50 backdrop-blur-sm border border-white/10">
                <CardHeader>
                  <CardTitle className="flex items-center text-[#F8FAFC]">
                    <Key className="w-5 h-5 mr-2" />
                    Account Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-[#F8FAFC] mb-2">Wallet Address</label>
                    <div className="flex items-center space-x-2">
                      <Input
                        value={publicKey || ""}
                        readOnly
                        className="bg-[#0F172A] border-white/10 text-white font-mono"
                      />
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-[#9945FF]/30 text-[#9945FF] hover:bg-[#9945FF]/10 bg-transparent"
                      >
                        Copy
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Security Settings */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <Card className="bg-[#1E293B]/50 backdrop-blur-sm border border-white/10">
                <CardHeader>
                  <CardTitle className="flex items-center text-[#F8FAFC]">
                    <Shield className="w-5 h-5 mr-2" />
                    Security
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-white">Two-Factor Authentication</div>
                      <div className="text-sm text-[#64748B]">Add an extra layer of security to your account</div>
                    </div>
                    <Switch
                      checked={settings.security.twoFactor}
                      onCheckedChange={(checked) => updateSetting("security", "twoFactor", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-white">Biometric Authentication</div>
                      <div className="text-sm text-[#64748B]">Use fingerprint or face recognition</div>
                    </div>
                    <Switch
                      checked={settings.security.biometric}
                      onCheckedChange={(checked) => updateSetting("security", "biometric", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-white">Auto-Lock</div>
                      <div className="text-sm text-[#64748B]">Automatically lock the app after inactivity</div>
                    </div>
                    <Switch
                      checked={settings.security.autoLock}
                      onCheckedChange={(checked) => updateSetting("security", "autoLock", checked)}
                    />
                  </div>

                  {settings.security.autoLock && (
                    <div>
                      <label className="block text-sm font-medium text-[#F8FAFC] mb-2">Auto-Lock Time (minutes)</label>
                      <Input
                        type="number"
                        value={settings.security.autoLockTime}
                        onChange={(e) => updateSetting("security", "autoLockTime", e.target.value)}
                        className="bg-[#0F172A] border-white/10 text-white w-32"
                      />
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Notifications */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <Card className="bg-[#1E293B]/50 backdrop-blur-sm border border-white/10">
                <CardHeader>
                  <CardTitle className="flex items-center text-[#F8FAFC]">
                    <Bell className="w-5 h-5 mr-2" />
                    Notifications
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-white">Email Notifications</div>
                      <div className="text-sm text-[#64748B]">Receive updates via email</div>
                    </div>
                    <Switch
                      checked={settings.notifications.email}
                      onCheckedChange={(checked) => updateSetting("notifications", "email", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-white">Push Notifications</div>
                      <div className="text-sm text-[#64748B]">Receive push notifications on your device</div>
                    </div>
                    <Switch
                      checked={settings.notifications.push}
                      onCheckedChange={(checked) => updateSetting("notifications", "push", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-white">Transaction Alerts</div>
                      <div className="text-sm text-[#64748B]">Get notified about transaction status</div>
                    </div>
                    <Switch
                      checked={settings.notifications.transactions}
                      onCheckedChange={(checked) => updateSetting("notifications", "transactions", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-white">Price Alerts</div>
                      <div className="text-sm text-[#64748B]">Receive alerts for significant price changes</div>
                    </div>
                    <Switch
                      checked={settings.notifications.priceAlerts}
                      onCheckedChange={(checked) => updateSetting("notifications", "priceAlerts", checked)}
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Preferences */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
              <Card className="bg-[#1E293B]/50 backdrop-blur-sm border border-white/10">
                <CardHeader>
                  <CardTitle className="flex items-center text-[#F8FAFC]">
                    <Palette className="w-5 h-5 mr-2" />
                    Preferences
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-[#F8FAFC] mb-2">Currency</label>
                      <select
                        value={settings.preferences.currency}
                        onChange={(e) => updateSetting("preferences", "currency", e.target.value)}
                        className="w-full bg-[#0F172A] border border-white/10 rounded-md px-3 py-2 text-white"
                      >
                        <option value="USD">USD ($)</option>
                        <option value="EUR">EUR (€)</option>
                        <option value="GBP">GBP (£)</option>
                        <option value="JPY">JPY (¥)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#F8FAFC] mb-2">Language</label>
                      <select
                        value={settings.preferences.language}
                        onChange={(e) => updateSetting("preferences", "language", e.target.value)}
                        className="w-full bg-[#0F172A] border border-white/10 rounded-md px-3 py-2 text-white"
                      >
                        <option value="English">English</option>
                        <option value="Spanish">Español</option>
                        <option value="French">Français</option>
                        <option value="German">Deutsch</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-white">Hide Balances</div>
                      <div className="text-sm text-[#64748B]">Hide balance amounts for privacy</div>
                    </div>
                    <Switch
                      checked={settings.preferences.hideBalances}
                      onCheckedChange={(checked) => updateSetting("preferences", "hideBalances", checked)}
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Save Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex justify-end"
            >
              <Button className="bg-[#9945FF] hover:bg-[#9945FF]/80 text-white">
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
