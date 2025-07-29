"use client"

import type React from "react"
import { useState } from "react"
import {
  ArrowRight,
  CheckCircle,
  Globe,
  Shield,
  Zap,
  MessageCircle,
  Menu,
  X,
  Star,
  TrendingUp,
  DollarSign,
  BarChart3,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

const FlagIcon = ({ country }: { country: string }) => {
  const flagEmojis: Record<string, string> = {
    india: "🇮🇳",
    bangladesh: "🇧🇩",
    pakistan: "🇵🇰",
    kenya: "🇰🇪",
    brazil: "🇧🇷",
    egypt: "🇪🇬",
    thailand: "🇹🇭",
    tanzania: "🇹🇿",
    vietnam: "🇻🇳",
    philippines: "🇵🇭",
  }
  return <div className="text-4xl mb-2">{flagEmojis[country] || "🌍"}</div>
}

const SuccessMessage = ({ show, onClose }: { show: boolean; onClose: () => void }) => {
  if (!show) return null
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 max-w-sm w-full text-center">
        <div className="text-green-500 text-5xl mb-4">✅</div>
        <h3 className="text-xl font-bold mb-2">Message Sent!</h3>
        <p className="text-gray-600 mb-4">We'll get back to you within 24 hours.</p>
        <Button onClick={onClose} className="w-full bg-blue-600 hover:bg-blue-700">
          Got it!
        </Button>
      </div>
    </div>
  )
}

export default function PaymentGatewayLanding() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    industry: "",
    country: "",
    message: "",
  })
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" })
    setIsMobileMenuOpen(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const formDataToSend = new FormData()
      formDataToSend.append("name", formData.name)
      formDataToSend.append("email", formData.email)
      formDataToSend.append("company", formData.company)
      formDataToSend.append("industry", formData.industry)
      formDataToSend.append("country", formData.country)
      formDataToSend.append("message", formData.message)

      const response = await fetch("https://formspree.io/f/xzzvgwzl", {
        method: "POST",
        body: formDataToSend,
        headers: {
          Accept: "application/json",
        },
      })

      if (response.ok) {
        setShowSuccess(true)
        setFormData({
          name: "",
          email: "",
          company: "",
          industry: "",
          country: "",
          message: "",
        })
      } else {
        alert("Something went wrong. Please try again or contact us on Telegram.")
      }
    } catch (error) {
      console.error("Form error:", error)
      alert("Something went wrong. Please try again or contact us on Telegram.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleTelegramContact = () => {
    window.open("https://t.me/champan", "_blank")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <SuccessMessage show={showSuccess} onClose={() => setShowSuccess(false)} />

      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">P</span>
              </div>
              <span className="text-xl font-bold text-gray-900">PayGateway</span>
            </div>

            <nav className="hidden md:flex items-center space-x-6">
              <button onClick={() => scrollToSection("features")} className="text-gray-600 hover:text-gray-900">
                Features
              </button>
              <button onClick={() => scrollToSection("regions")} className="text-gray-600 hover:text-gray-900">
                Markets
              </button>
              <button onClick={() => scrollToSection("contact")} className="text-gray-600 hover:text-gray-900">
                Contact
              </button>
            </nav>

            <Button onClick={handleTelegramContact} className="hidden md:flex bg-blue-600 hover:bg-blue-700">
              <MessageCircle className="w-4 h-4 mr-2" />
              Chat Now
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>

          {isMobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t">
              <nav className="flex flex-col space-y-4 pt-4">
                <button
                  onClick={() => scrollToSection("features")}
                  className="text-left text-gray-600 hover:text-gray-900"
                >
                  Features
                </button>
                <button
                  onClick={() => scrollToSection("regions")}
                  className="text-left text-gray-600 hover:text-gray-900"
                >
                  Markets
                </button>
                <button
                  onClick={() => scrollToSection("contact")}
                  className="text-left text-gray-600 hover:text-gray-900"
                >
                  Contact
                </button>
                <Button onClick={handleTelegramContact} className="bg-blue-600 hover:bg-blue-700 w-full mt-4">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Chat Now
                </Button>
              </nav>
            </div>
          )}
        </div>
      </header>

      <section className="py-20 px-4 text-center">
        <div className="container mx-auto max-w-4xl">
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full text-sm text-blue-800 mb-6">
            <Star className="w-4 h-4 mr-2" />
            Trusted by 100,000+ High-Risk Businesses
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Payment Solutions for
            <br />
            <span className="text-blue-600">Emerging Markets</span>
          </h1>

          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Enable seamless payments for forex, lending, gaming, and streaming businesses with local e-wallets and USDT
            across 10+ countries.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="text-2xl font-bold text-gray-900">10+</div>
              <div className="text-sm text-gray-600">Countries</div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="text-2xl font-bold text-gray-900">100K+</div>
              <div className="text-sm text-gray-600">Businesses</div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="text-2xl font-bold text-gray-900">99.9%</div>
              <div className="text-sm text-gray-600">Uptime</div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="text-2xl font-bold text-gray-900">24/7</div>
              <div className="text-sm text-gray-600">Support</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-lg px-8"
              onClick={() => scrollToSection("contact")}
            >
              Get Started Today
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 bg-transparent" onClick={handleTelegramContact}>
              <MessageCircle className="w-5 h-5 mr-2" />
              Chat on Telegram
            </Button>
          </div>
        </div>
      </section>

      <section id="features" className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose Our Gateway?</h2>
            <p className="text-xl text-gray-600">Built for high-volume, high-risk businesses</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-blue-600" />
                </div>
                <CardTitle>High-Risk Friendly</CardTitle>
                <CardDescription>
                  Specialized in forex, lending, gaming, and streaming with tailored risk management
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-8 h-8 text-green-600" />
                </div>
                <CardTitle>Local Payment Methods</CardTitle>
                <CardDescription>
                  Support for MPesa, Nagad, UPI and other popular e-wallets in your markets
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-purple-600" />
                </div>
                <CardTitle>USDT Support</CardTitle>
                <CardDescription>Seamless cryptocurrency payments with USDT for global transactions</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      <section id="regions" className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Serving High-Growth Markets</h2>
            <p className="text-xl text-gray-600">Local payment solutions across emerging economies</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              {
                country: "India",
                key: "india",
                methods: ["UPI", "Paytm", "PhonePe"],
              },
              {
                country: "Bangladesh",
                key: "bangladesh",
                methods: ["Nagad", "bKash"],
              },
              {
                country: "Pakistan",
                key: "pakistan",
                methods: ["JazzCash", "Easypaisa"],
              },
              {
                country: "Kenya",
                key: "kenya",
                methods: ["M-Pesa", "Airtel"],
              },
              {
                country: "Brazil",
                key: "brazil",
                methods: ["PIX", "PicPay"],
              },
              {
                country: "Egypt",
                key: "egypt",
                methods: ["Vodafone", "Orange"],
              },
              {
                country: "Thailand",
                key: "thailand",
                methods: ["TrueMoney", "LINE Pay"],
              },
              {
                country: "Tanzania",
                key: "tanzania",
                methods: ["M-Pesa", "Tigo"],
              },
              {
                country: "Vietnam",
                key: "vietnam",
                methods: ["MoMo", "ZaloPay"],
              },
              {
                country: "Philippines",
                key: "philippines",
                methods: ["GCash", "PayMaya"],
              },
            ].map((region, index) => (
              <Card key={index} className="text-center">
                <CardContent className="p-6">
                  <FlagIcon country={region.key} />
                  <h3 className="font-bold text-lg mb-3">{region.country}</h3>
                  <div className="space-y-2">
                    {region.methods.map((method, idx) => (
                      <div key={idx} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                        {method}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Industries We Serve</h2>
            <p className="text-xl text-gray-600">Specialized solutions for high-volume business sectors</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-green-600" />
                </div>
                <CardTitle>Forex Trading</CardTitle>
              </CardHeader>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <DollarSign className="w-8 h-8 text-blue-600" />
                </div>
                <CardTitle>Lending</CardTitle>
              </CardHeader>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-purple-600" />
                </div>
                <CardTitle>Gaming</CardTitle>
              </CardHeader>
            </Card>
            <Card className="text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="w-8 h-8 text-orange-600" />
                </div>
                <CardTitle>Streaming</CardTitle>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      <section id="contact" className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Ready to Get Started?</h2>
            <p className="text-xl text-gray-600">Contact us today to discuss your payment processing needs</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Get in Touch</CardTitle>
                <CardDescription>Fill out the form and we'll get back to you within 24 hours</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        disabled={isSubmitting}
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="company">Company Name *</Label>
                    <Input
                      id="company"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="industry">Industry *</Label>
                      <select
                        id="industry"
                        value={formData.industry}
                        onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                        required
                        disabled={isSubmitting}
                        className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Select your industry</option>
                        <option value="forex">Forex Trading</option>
                        <option value="lending">Lending</option>
                        <option value="gaming">Gaming</option>
                        <option value="streaming">Streaming</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div>
                      <Label htmlFor="country">Target Country *</Label>
                      <select
                        id="country"
                        value={formData.country}
                        onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                        required
                        disabled={isSubmitting}
                        className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Select target market</option>
                        <option value="india">India</option>
                        <option value="bangladesh">Bangladesh</option>
                        <option value="pakistan">Pakistan</option>
                        <option value="kenya">Kenya</option>
                        <option value="brazil">Brazil</option>
                        <option value="egypt">Egypt</option>
                        <option value="thailand">Thailand</option>
                        <option value="tanzania">Tanzania</option>
                        <option value="vietnam">Vietnam</option>
                        <option value="philippines">Philippines</option>
                        <option value="multiple">Multiple Countries</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us about your business and payment processing needs..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      rows={4}
                      disabled={isSubmitting}
                    />
                  </div>
                  <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={isSubmitting}>
                    {isSubmitting ? "Sending..." : "Send Message"}
                    {!isSubmitting && <ArrowRight className="w-4 h-4 ml-2" />}
                  </Button>
                </form>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4">Why Businesses Choose Us</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">
                        No card payment restrictions - focus on local e-wallets and USDT
                      </span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">High-risk business friendly with competitive rates</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">Local market expertise in 10+ countries</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">24/7 technical support and integration assistance</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">Fast onboarding and same-day approvals</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-blue-600 text-white">
                <CardContent className="p-6 text-center">
                  <MessageCircle className="w-12 h-12 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Prefer to Chat?</h3>
                  <p className="mb-4 opacity-90">Get instant answers on Telegram</p>
                  <Button
                    onClick={handleTelegramContact}
                    variant="secondary"
                    className="bg-white text-blue-600 hover:bg-gray-100"
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Chat on Telegram
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">P</span>
                </div>
                <span className="text-xl font-bold">PayGateway</span>
              </div>
              <p className="text-gray-400 mb-6">
                Enabling high-risk businesses with local payment solutions across emerging markets.
              </p>
              <Button onClick={() => scrollToSection("contact")} className="bg-blue-600 hover:bg-blue-700">
                <MessageCircle className="w-4 h-4 mr-2" />
                Quick Message
              </Button>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Solutions</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Forex Payments</li>
                <li>Lending Platforms</li>
                <li>Gaming Solutions</li>
                <li>Streaming Services</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Markets</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Asia Pacific</li>
                <li>Africa</li>
                <li>Latin America</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <div className="space-y-2 text-gray-400">
                <div className="flex items-center cursor-pointer hover:text-white" onClick={handleTelegramContact}>
                  <MessageCircle className="w-4 h-4 mr-2" />
                  <span>Telegram</span>
                </div>
                <div
                  className="flex items-center cursor-pointer hover:text-white"
                  onClick={() => scrollToSection("contact")}
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  <span>Quick Message</span>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 PayGateway. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
