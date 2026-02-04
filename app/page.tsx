"use client"

import Link from "next/link"
import Image from "next/image"
import { Heart, Gift, Sparkles, ArrowRight, Star, Truck, Shield, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductCard } from "@/components/product-card"
import { StoreProvider } from "@/lib/store-context"
import { getBestSellers, getFeaturedDeals, categories } from "@/lib/products"
import { useEffect, useState } from "react"

function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  useEffect(() => {
    // Valentine's Day 2026
    const valentinesDay = new Date("2026-02-14T00:00:00")

    const updateCountdown = () => {
      const now = new Date()
      const diff = valentinesDay.getTime() - now.getTime()

      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / (1000 * 60)) % 60),
          seconds: Math.floor((diff / 1000) % 60)
        })
      }
    }

    updateCountdown()
    const interval = setInterval(updateCountdown, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex justify-center gap-4 md:gap-6">
      {[
        { value: timeLeft.days, label: "Days" },
        { value: timeLeft.hours, label: "Hours" },
        { value: timeLeft.minutes, label: "Minutes" },
        { value: timeLeft.seconds, label: "Seconds" }
      ].map((item) => (
        <div key={item.label} className="text-center">
          <div className="bg-card rounded-lg p-3 md:p-4 min-w-[60px] md:min-w-[80px] shadow-lg">
            <span className="text-2xl md:text-4xl font-bold text-primary">
              {String(item.value).padStart(2, "0")}
            </span>
          </div>
          <span className="text-xs md:text-sm text-foreground/80 mt-2 block">{item.label}</span>
        </div>
      ))}
    </div>
  )
}

function HeroSection() {
  return (
    <section className="relative min-h-[600px] md:min-h-[700px] flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-secondary via-background to-muted">
        <div className="absolute inset-0 opacity-10">
          {/* Decorative hearts pattern */}
          <div className="absolute top-20 left-10 text-primary">
            <Heart className="h-12 w-12 fill-current animate-pulse" />
          </div>
          <div className="absolute top-40 right-20 text-accent">
            <Heart className="h-8 w-8 fill-current animate-pulse delay-75" />
          </div>
          <div className="absolute bottom-32 left-1/4 text-primary">
            <Heart className="h-6 w-6 fill-current animate-pulse delay-150" />
          </div>
          <div className="absolute bottom-20 right-1/3 text-accent">
            <Heart className="h-10 w-10 fill-current animate-pulse delay-300" />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Sparkles className="h-4 w-4" />
              Valentine&apos;s Day Special
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-serif leading-tight mb-6 text-balance">
              Make This Valentine&apos;s Day{" "}
              <span className="text-primary">Unforgettable</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Discover the perfect gifts that speak the language of love. From romantic roses to 
              thoughtful treasures, find everything to make your special someone feel cherished.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href="/shop">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2 px-8">
                  Shop Now
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/shop?category=couple-gifts">
                <Button size="lg" variant="outline" className="gap-2 px-8 border-primary text-primary hover:bg-primary/10 bg-transparent">
                  <Gift className="h-4 w-4" />
                  Couple Gifts
                </Button>
              </Link>
            </div>
          </div>
          <div className="relative hidden lg:block">
            <div className="relative aspect-square max-w-lg mx-auto">
              <Image
                src="https://images.unsplash.com/photo-1518621736915-f3b1c41bfd00?w=600&h=600&fit=crop"
                alt="Beautiful rose bouquet for Valentine's Day"
                fill
                className="object-cover rounded-3xl shadow-2xl"
                priority
              />
              {/* Floating card */}
              <div className="absolute -bottom-4 -left-4 bg-card p-4 rounded-xl shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Heart className="h-6 w-6 text-primary fill-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">10,000+</p>
                    <p className="text-sm text-muted-foreground">Happy Couples</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function CountdownSection() {
  return (
    <section className="py-16 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 text-center">
        <Heart className="h-10 w-10 mx-auto mb-4 fill-current animate-pulse" />
        <h2 className="text-2xl md:text-3xl font-serif font-bold mb-2">
          Valentine&apos;s Day is Coming!
        </h2>
        <p className="text-primary-foreground/80 mb-8 max-w-md mx-auto">
          Don&apos;t miss out on the perfect gift. Order now for guaranteed delivery!
        </p>
        <CountdownTimer />
      </div>
    </section>
  )
}

function CategoriesSection() {
  const categoryImages: Record<string, string> = {
    "gifts-for-her": "https://images.unsplash.com/photo-1518621736915-f3b1c41bfd00?w=400&h=300&fit=crop",
    "gifts-for-him": "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&h=300&fit=crop",
    "couple-gifts": "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=400&h=300&fit=crop"
  }

  return (
    <section className="py-16 md:py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
            Shop by Category
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Find the perfect gift for your special someone
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link key={category.id} href={`/shop?category=${category.id}`}>
              <Card className="group overflow-hidden border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-xl">
                <div className="relative h-48 md:h-56 overflow-hidden">
                  <Image
                    src={categoryImages[category.id] || "/placeholder.svg"}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl font-semibold text-card font-serif">{category.name}</h3>
                    <p className="text-card/80 text-sm mt-1 flex items-center gap-1">
                      Shop Now <ArrowRight className="h-4 w-4" />
                    </p>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

function FeaturedDealsSection() {
  const deals = getFeaturedDeals()

  return (
    <section className="py-16 md:py-20 bg-secondary/50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium mb-3">
              <Sparkles className="h-4 w-4" />
              Limited Time
            </div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold">
              Valentine Deals
            </h2>
          </div>
          <Link href="/shop" className="mt-4 md:mt-0">
            <Button variant="ghost" className="gap-2 text-primary hover:text-primary/80">
              View All Deals <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {deals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}

function BestSellersSection() {
  const bestSellers = getBestSellers()

  return (
    <section className="py-16 md:py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 bg-accent/20 text-accent-foreground px-3 py-1 rounded-full text-sm font-medium mb-3">
              <Star className="h-4 w-4 fill-current" />
              Customer Favorites
            </div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold">
              Best Sellers
            </h2>
          </div>
          <Link href="/shop" className="mt-4 md:mt-0">
            <Button variant="ghost" className="gap-2 text-primary hover:text-primary/80">
              View All Products <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}

function TestimonialsSection() {
  const testimonials = [
    {
      name: "Sarah M.",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop",
      text: "The rose bouquet was absolutely stunning! My partner was so happy. Will definitely order again.",
      rating: 5
    },
    {
      name: "Michael K.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
      text: "Fast delivery and beautiful packaging. The couple rings were exactly as pictured. Perfect!",
      rating: 5
    },
    {
      name: "Emily R.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
      text: "LoveNest made our Valentine's Day so special. The personalized gifts were a hit!",
      rating: 5
    }
  ]

  return (
    <section className="py-16 md:py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
            Love Stories from Our Customers
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            See why thousands of couples choose LoveNest for their special moments
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.name} className="border-border/50">
              <CardContent className="p-6">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-foreground/80 mb-6 leading-relaxed">&ldquo;{testimonial.text}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <Image
                    src={testimonial.image || "/placeholder.svg"}
                    alt={testimonial.name}
                    width={48}
                    height={48}
                    className="rounded-full object-cover"
                  />
                  <span className="font-medium">{testimonial.name}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

function FeaturesSection() {
  const features = [
    {
      icon: Truck,
      title: "Free Shipping",
      description: "On orders over $50"
    },
    {
      icon: Shield,
      title: "Secure Payment",
      description: "100% secure checkout"
    },
    {
      icon: Clock,
      title: "Same Day Delivery",
      description: "Order before 2 PM"
    },
    {
      icon: Gift,
      title: "Gift Wrapping",
      description: "Beautiful presentation"
    }
  ]

  return (
    <section className="py-12 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {features.map((feature) => (
            <div key={feature.title} className="text-center">
              <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 text-primary mb-3">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function HomeContent() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <CountdownSection />
        <CategoriesSection />
        <FeaturedDealsSection />
        <BestSellersSection />
        <TestimonialsSection />
        <FeaturesSection />
      </main>
      <Footer />
    </>
  )
}

export default function HomePage() {
  return (
    <StoreProvider>
      <HomeContent />
    </StoreProvider>
  )
}
