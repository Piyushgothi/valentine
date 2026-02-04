"use client"

import Link from "next/link"
import { Heart, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductCard } from "@/components/product-card"
import { StoreProvider, useStore } from "@/lib/store-context"

function WishlistContent() {
  const { wishlist } = useStore()

  if (wishlist.length === 0) {
    return (
      <>
        <Header />
        <main className="min-h-screen">
          <div className="container mx-auto px-4 py-16 md:py-24">
            <div className="max-w-md mx-auto text-center">
              <div className="h-24 w-24 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
                <Heart className="h-12 w-12 text-muted-foreground" />
              </div>
              <h1 className="text-2xl font-serif font-bold mb-4">Your Wishlist is Empty</h1>
              <p className="text-muted-foreground mb-8">
                Save your favorite items to your wishlist and they&apos;ll appear here. 
                Start exploring our Valentine&apos;s collection!
              </p>
              <Link href="/shop">
                <Button size="lg" className="gap-2">
                  Explore Products
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Header />
      <main className="min-h-screen">
        {/* Page Header */}
        <div className="bg-secondary/50 py-8 md:py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-center mb-2">
              My Wishlist
            </h1>
            <p className="text-muted-foreground text-center">
              {wishlist.length} item{wishlist.length !== 1 ? "s" : ""} saved for later
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8 md:py-12">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {wishlist.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link href="/shop">
              <Button variant="outline" className="gap-2 bg-transparent">
                Continue Shopping
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default function WishlistPage() {
  return (
    <StoreProvider>
      <WishlistContent />
    </StoreProvider>
  )
}
