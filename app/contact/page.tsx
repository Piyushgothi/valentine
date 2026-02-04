"use client"

import React from "react"

import { useState } from "react"
import { Mail, Phone, MapPin, Clock, Send, MessageCircle, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { StoreProvider } from "@/lib/store-context"

function ContactContent() {
  const [submitted, setSubmitted] = useState(false)

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      details: "+1 (800) LOVE-NEST",
      subtext: "Mon-Fri 9am-6pm EST"
    },
    {
      icon: Mail,
      title: "Email",
      details: "hello@lovenest.com",
      subtext: "We reply within 24 hours"
    },
    {
      icon: MapPin,
      title: "Address",
      details: "123 Love Street",
      subtext: "Romance City, RC 12345"
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: "Mon - Fri: 9am - 6pm",
      subtext: "Sat - Sun: 10am - 4pm"
    }
  ]

  const faqs = [
    {
      question: "What is your return policy?",
      answer: "We offer a 30-day return policy for all unused items in their original packaging. For perishable items like flowers and chocolates, please contact us within 24 hours of delivery."
    },
    {
      question: "Do you offer same-day delivery?",
      answer: "Yes! Same-day delivery is available for orders placed before 2 PM local time. Additional fees may apply based on your location."
    },
    {
      question: "Can I customize my gift?",
      answer: "Absolutely! Many of our products can be personalized. Look for the 'Customize' option on product pages, or contact us for special requests."
    },
    {
      question: "Do you ship internationally?",
      answer: "Currently, we ship within the United States. We're working on expanding our international shipping options soon!"
    }
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <>
      <Header />
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative py-16 md:py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-secondary via-background to-muted" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-2xl mx-auto text-center">
              <Heart className="h-10 w-10 text-primary fill-primary mx-auto mb-4" />
              <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
                Get in Touch
              </h1>
              <p className="text-lg text-muted-foreground">
                Have a question or special request? We&apos;d love to hear from you. 
                Our team is here to help make your gift-giving experience perfect.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Info Cards */}
        <section className="py-12 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {contactInfo.map((info) => (
                <Card key={info.title} className="text-center border-border/50">
                  <CardContent className="p-6">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <info.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-1">{info.title}</h3>
                    <p className="text-foreground">{info.details}</p>
                    <p className="text-sm text-muted-foreground">{info.subtext}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form & FAQ */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MessageCircle className="h-5 w-5" />
                      Send Us a Message
                    </CardTitle>
                    <CardDescription>
                      Fill out the form below and we&apos;ll get back to you as soon as possible.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {submitted ? (
                      <div className="text-center py-8">
                        <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                          <Send className="h-8 w-8 text-green-600" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Message Sent!</h3>
                        <p className="text-muted-foreground">
                          Thank you for reaching out. We&apos;ll respond to your inquiry within 24 hours.
                        </p>
                        <Button
                          variant="outline"
                          className="mt-4 bg-transparent"
                          onClick={() => setSubmitted(false)}
                        >
                          Send Another Message
                        </Button>
                      </div>
                    ) : (
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="name">Name</Label>
                            <Input id="name" placeholder="Your name" required />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" placeholder="you@example.com" required />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone (Optional)</Label>
                          <Input id="phone" type="tel" placeholder="+1 (555) 000-0000" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="subject">Subject</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a subject" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="order">Order Inquiry</SelectItem>
                              <SelectItem value="shipping">Shipping Question</SelectItem>
                              <SelectItem value="return">Return / Exchange</SelectItem>
                              <SelectItem value="custom">Custom Order Request</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="message">Message</Label>
                          <Textarea
                            id="message"
                            placeholder="Tell us how we can help..."
                            rows={5}
                            required
                          />
                        </div>
                        <Button type="submit" className="w-full gap-2">
                          <Send className="h-4 w-4" />
                          Send Message
                        </Button>
                      </form>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* FAQ */}
              <div>
                <h2 className="text-2xl font-serif font-bold mb-6">Frequently Asked Questions</h2>
                <div className="space-y-4">
                  {faqs.map((faq) => (
                    <Card key={faq.question} className="border-border/50">
                      <CardContent className="p-6">
                        <h3 className="font-semibold mb-2">{faq.question}</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {faq.answer}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Additional Help */}
                <Card className="mt-8 bg-primary/5 border-primary/20">
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                      <Heart className="h-5 w-5 text-primary fill-primary" />
                      Need Urgent Help?
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4">
                      For time-sensitive matters, especially regarding Valentine&apos;s Day orders, 
                      please call our priority line.
                    </p>
                    <div className="flex items-center gap-2 text-primary font-medium">
                      <Phone className="h-4 w-4" />
                      +1 (800) LOVE-NEST
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Map Placeholder */}
        <section className="h-80 bg-muted relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="h-12 w-12 text-primary mx-auto mb-4" />
              <p className="text-muted-foreground">
                123 Love Street, Romance City, RC 12345
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default function ContactPage() {
  return (
    <StoreProvider>
      <ContactContent />
    </StoreProvider>
  )
}
