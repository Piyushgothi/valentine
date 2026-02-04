"use client"

import { use, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Heart, ShoppingBag, Star, Minus, Plus, Truck, Shield, RotateCcw, ArrowLeft, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductCard } from "@/components/product-card"
import { StoreProvider, useStore } from "@/lib/store-context"
import { getProductById, products } from "@/lib/products"
import { cn } from "@/lib/utils"

interface ProductPageProps {
  params: Promise<{ id: string }>
}

function ProductContent({ productId }: { productId: string }) {
  const router = useRouter()
  const product = getProductById(productId)
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } = useStore()
  const [quantity, setQuantity] = useState(1)
  const [addedToCart, setAddedToCart] = useState(false)

  if (!product) {
    return (
      <>
        <Header />
        <main className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
            <Link href="/shop">
              <Button>Back to Shop</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  const inWishlist = isInWishlist(product.id)
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4)

  const handleAddToCart = () => {
    addToCart(product, quantity)
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2000)
  }

  const handleBuyNow = () => {
    addToCart(product, quantity)
    router.push("/checkout")
  }

  const handleWishlist = () => {
    if (inWishlist) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist(product)
    }
  }

  return (
    <>
      <Header />
      <main className="min-h-screen">
        {/* Breadcrumb */}
        <div className="bg-secondary/30 py-4">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link href="/" className="hover:text-primary transition-colors">
                Home
              </Link>
              <span>/</span>
              <Link href="/shop" className="hover:text-primary transition-colors">
                Shop
              </Link>
              <span>/</span>
              <span className="text-foreground">{product.name}</span>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8 md:py-12">
          {/* Back Button */}
          <Button
            variant="ghost"
            className="mb-6 gap-2"
            onClick={() => router.back()}
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>

          {/* Product Details */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Image */}
            <div className="relative">
              <div className="aspect-square relative overflow-hidden rounded-2xl bg-muted">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                />
                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {product.badge && (
                    <span className="bg-primary text-primary-foreground text-sm font-medium px-3 py-1 rounded">
                      {product.badge}
                    </span>
                  )}
                  {discount && (
                    <span className="bg-accent text-accent-foreground text-sm font-medium px-3 py-1 rounded">
                      -{discount}% OFF
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Info */}
            <div>
              <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-6">
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "h-5 w-5",
                        i < Math.floor(product.rating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "fill-muted text-muted"
                      )}
                    />
                  ))}
                </div>
                <span className="font-medium">{product.rating}</span>
                <span className="text-muted-foreground">({product.reviews} reviews)</span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-3xl font-bold text-primary">
                  ${product.price.toFixed(2)}
                </span>
                {product.originalPrice && (
                  <span className="text-xl text-muted-foreground line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-muted-foreground leading-relaxed mb-8">
                {product.description}
              </p>

              {/* Stock Status */}
              <div className="flex items-center gap-2 mb-6">
                <div className={cn(
                  "h-3 w-3 rounded-full",
                  product.inStock ? "bg-green-500" : "bg-red-500"
                )} />
                <span className={product.inStock ? "text-green-600" : "text-red-600"}>
                  {product.inStock ? "In Stock" : "Out of Stock"}
                </span>
              </div>

              {/* Quantity */}
              <div className="flex items-center gap-4 mb-6">
                <span className="font-medium">Quantity:</span>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity((q) => q + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button
                  size="lg"
                  className={cn(
                    "flex-1 gap-2",
                    addedToCart
                      ? "bg-green-600 hover:bg-green-600"
                      : "bg-primary hover:bg-primary/90"
                  )}
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                >
                  {addedToCart ? (
                    <>
                      <Check className="h-5 w-5" />
                      Added to Cart
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="h-5 w-5" />
                      Add to Cart
                    </>
                  )}
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="flex-1 border-primary text-primary hover:bg-primary/10 bg-transparent"
                  onClick={handleBuyNow}
                  disabled={!product.inStock}
                >
                  Buy Now
                </Button>
                <Button
                  size="lg"
                  variant="ghost"
                  className={cn(inWishlist && "text-primary")}
                  onClick={handleWishlist}
                >
                  <Heart className={cn("h-5 w-5", inWishlist && "fill-primary")} />
                </Button>
              </div>

              {/* Features */}
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
                  <Truck className="h-5 w-5 text-primary flex-shrink-0" />
                  <div>
                    <p className="font-medium text-sm">Free Shipping</p>
                    <p className="text-xs text-muted-foreground">On orders over $50</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
                  <Shield className="h-5 w-5 text-primary flex-shrink-0" />
                  <div>
                    <p className="font-medium text-sm">Secure Payment</p>
                    <p className="text-xs text-muted-foreground">100% protected</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
                  <RotateCcw className="h-5 w-5 text-primary flex-shrink-0" />
                  <div>
                    <p className="font-medium text-sm">Easy Returns</p>
                    <p className="text-xs text-muted-foreground">30-day returns</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="mt-12">
            <Tabs defaultValue="description">
              <TabsList className="grid w-full grid-cols-3 max-w-md">
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>
              <TabsContent value="description" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <p className="text-muted-foreground leading-relaxed">
                      {product.description}
                    </p>
                    <p className="text-muted-foreground leading-relaxed mt-4">
                      Make this Valentine&apos;s Day unforgettable with our carefully curated selection. 
                      Each product is chosen with love and attention to detail, ensuring that your special 
                      someone receives nothing but the best. Our commitment to quality means every item 
                      meets our high standards for presentation and lasting impression.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="details" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <ul className="space-y-3 text-muted-foreground">
                      <li className="flex justify-between py-2 border-b border-border">
                        <span>Category</span>
                        <span className="font-medium text-foreground capitalize">
                          {product.category.replace(/-/g, " ")}
                        </span>
                      </li>
                      <li className="flex justify-between py-2 border-b border-border">
                        <span>Availability</span>
                        <span className={cn(
                          "font-medium",
                          product.inStock ? "text-green-600" : "text-red-600"
                        )}>
                          {product.inStock ? "In Stock" : "Out of Stock"}
                        </span>
                      </li>
                      <li className="flex justify-between py-2 border-b border-border">
                        <span>SKU</span>
                        <span className="font-medium text-foreground">LN-{product.id.padStart(4, "0")}</span>
                      </li>
                      <li className="flex justify-between py-2">
                        <span>Gift Wrapping</span>
                        <span className="font-medium text-foreground">Available</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="reviews" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="text-center">
                        <p className="text-4xl font-bold text-primary">{product.rating}</p>
                        <div className="flex gap-1 justify-center my-1">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={cn(
                                "h-4 w-4",
                                i < Math.floor(product.rating)
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "fill-muted text-muted"
                              )}
                            />
                          ))}
                        </div>
                        <p className="text-sm text-muted-foreground">{product.reviews} reviews</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      {/* Sample reviews */}
                      <div className="border-b border-border pb-4">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex gap-0.5">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            ))}
                          </div>
                          <span className="font-medium">Perfect Gift!</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Exactly what I was looking for. My partner absolutely loved it. 
                          The quality exceeded my expectations.
                        </p>
                        <p className="text-xs text-muted-foreground mt-2">- Happy Customer, 2 days ago</p>
                      </div>
                      <div className="border-b border-border pb-4">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex gap-0.5">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star key={i} className={cn(
                                "h-4 w-4",
                                i < 4 ? "fill-yellow-400 text-yellow-400" : "fill-muted text-muted"
                              )} />
                            ))}
                          </div>
                          <span className="font-medium">Great Quality</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Beautiful packaging and fast delivery. Would definitely recommend 
                          LoveNest for Valentine&apos;s shopping.
                        </p>
                        <p className="text-xs text-muted-foreground mt-2">- Sarah M., 1 week ago</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl md:text-3xl font-serif font-bold mb-8">
                You May Also Like
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}

export default function ProductPage({ params }: ProductPageProps) {
  const { id } = use(params)
  
  return (
    <StoreProvider>
      <ProductContent productId={id} />
    </StoreProvider>
  )
}
