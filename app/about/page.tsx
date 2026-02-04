"use client"

import Image from "next/image"
import { Heart, Award, Truck, Users, Gift, Star } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { StoreProvider } from "@/lib/store-context"

function AboutContent() {
  const stats = [
    { icon: Users, value: "50,000+", label: "Happy Customers" },
    { icon: Gift, value: "100,000+", label: "Gifts Delivered" },
    { icon: Award, value: "5 Years", label: "Of Love & Service" },
    { icon: Star, value: "4.9", label: "Average Rating" }
  ]

  const team = [
    {
      name: "Sarah Chen",
      role: "Founder & CEO",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop"
    },
    {
      name: "Michael Roberts",
      role: "Head of Curation",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop"
    },
    {
      name: "Emily Watson",
      role: "Customer Experience",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop"
    }
  ]

  const values = [
    {
      title: "Love in Every Detail",
      description: "We believe that the smallest details make the biggest impact. Every product is curated with care and attention."
    },
    {
      title: "Quality You Can Trust",
      description: "We source only the finest products from trusted suppliers, ensuring every gift meets our high standards."
    },
    {
      title: "Making Moments Magical",
      description: "Our mission is to help you create unforgettable moments with beautifully presented gifts that speak from the heart."
    }
  ]

  return (
    <>
      <Header />
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative py-20 md:py-28 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-secondary via-background to-muted" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <Heart className="h-12 w-12 text-primary fill-primary mx-auto mb-6" />
              <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-balance">
                Our Story is Written in Love
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                LoveNest was born from a simple belief: that every expression of love deserves 
                to be beautiful, meaningful, and unforgettable. Since 2021, we&apos;ve been helping 
                couples and loved ones celebrate their special moments with thoughtfully curated gifts.
              </p>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <stat.icon className="h-8 w-8 mx-auto mb-3 opacity-90" />
                  <p className="text-3xl md:text-4xl font-bold mb-1">{stat.value}</p>
                  <p className="text-sm opacity-80">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="relative aspect-square max-w-lg mx-auto lg:mx-0">
                <Image
                  src="https://images.unsplash.com/photo-1518621736915-f3b1c41bfd00?w=600&h=600&fit=crop"
                  alt="Beautiful gift arrangement"
                  fill
                  className="object-cover rounded-2xl"
                />
                <div className="absolute -bottom-6 -right-6 bg-card p-6 rounded-xl shadow-xl">
                  <div className="flex items-center gap-3">
                    <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center">
                      <Heart className="h-7 w-7 text-primary fill-primary" />
                    </div>
                    <div>
                      <p className="font-bold text-lg">Est. 2021</p>
                      <p className="text-sm text-muted-foreground">Spreading Love</p>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
                  Where Every Gift Tells a Story
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    It all started in a small apartment in 2021, with a passion for creating 
                    memorable gift experiences. Our founder, Sarah, noticed that finding the 
                    perfect romantic gift often meant visiting multiple stores or settling for 
                    something generic.
                  </p>
                  <p>
                    She envisioned a place where love could be expressed through carefully 
                    selected, beautifully presented gifts that would make every occasion special. 
                    From that vision, LoveNest was born.
                  </p>
                  <p>
                    Today, we&apos;re proud to have helped over 50,000 customers express their love 
                    in meaningful ways. From classic rose bouquets to personalized keepsakes, 
                    every item in our collection is chosen with one purpose: to help you create 
                    unforgettable moments.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-16 md:py-24 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
                What We Believe
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our values guide everything we do, from product selection to customer service
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {values.map((value, index) => (
                <Card key={value.title} className="border-border/50">
                  <CardContent className="p-6">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <Heart className="h-6 w-6 text-primary fill-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
                Meet Our Team
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                The passionate people behind LoveNest who make the magic happen
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {team.map((member) => (
                <div key={member.name} className="text-center">
                  <div className="relative w-48 h-48 mx-auto mb-4 rounded-full overflow-hidden">
                    <Image
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h3 className="text-lg font-semibold">{member.name}</h3>
                  <p className="text-muted-foreground">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 md:py-24 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <Heart className="h-10 w-10 mx-auto mb-4 fill-current" />
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
              Ready to Spread Love?
            </h2>
            <p className="text-primary-foreground/80 max-w-xl mx-auto mb-8">
              Explore our collection and find the perfect gift for your special someone. 
              Every purchase comes with our promise of quality and care.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default function AboutPage() {
  return (
    <StoreProvider>
      <AboutContent />
    </StoreProvider>
  )
}
