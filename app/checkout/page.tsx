"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { CreditCard, Building2, Wallet, ArrowLeft, Check, Truck, Gift, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { StoreProvider, useStore } from "@/lib/store-context"
import { cn } from "@/lib/utils"

function CheckoutContent() {
  const router = useRouter()
  const { cart, cartTotal, clearCart } = useStore()
  const [step, setStep] = useState(1)
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [giftWrap, setGiftWrap] = useState(false)
  const [orderPlaced, setOrderPlaced] = useState(false)

  const shippingCost = cartTotal >= 50 ? 0 : 5.99
  const giftWrapCost = giftWrap ? 4.99 : 0
  const finalTotal = cartTotal + shippingCost + giftWrapCost

  const handlePlaceOrder = () => {
    setOrderPlaced(true)
    clearCart()
  }

  if (cart.length === 0 && !orderPlaced) {
    router.push("/cart")
    return null
  }

  if (orderPlaced) {
    return (
      <>
        <Header />
        <main className="min-h-screen">
          <div className="container mx-auto px-4 py-16 md:py-24">
            <div className="max-w-md mx-auto text-center">
              <div className="h-24 w-24 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                <Check className="h-12 w-12 text-green-600" />
              </div>
              <h1 className="text-2xl font-serif font-bold mb-4">Order Placed Successfully!</h1>
              <p className="text-muted-foreground mb-2">
                Thank you for your order! We&apos;ll send you a confirmation email shortly.
              </p>
              <p className="text-sm text-muted-foreground mb-8">
                Order #LN{Math.random().toString(36).substring(2, 8).toUpperCase()}
              </p>
              <div className="space-y-3">
                <Link href="/shop">
                  <Button size="lg" className="w-full">
                    Continue Shopping
                  </Button>
                </Link>
                <Link href="/">
                  <Button size="lg" variant="outline" className="w-full bg-transparent">
                    Back to Home
                  </Button>
                </Link>
              </div>
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
      <main className="min-h-screen bg-muted/30">
        <div className="container mx-auto px-4 py-8 md:py-12">
          {/* Back Button */}
          <Button variant="ghost" className="mb-6 gap-2" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4" />
            Back to Cart
          </Button>

          {/* Progress Steps */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="flex items-center justify-between">
              {["Shipping", "Payment", "Review"].map((label, index) => (
                <div key={label} className="flex items-center">
                  <div className="flex items-center">
                    <div
                      className={cn(
                        "h-10 w-10 rounded-full flex items-center justify-center text-sm font-medium",
                        step > index + 1
                          ? "bg-green-600 text-white"
                          : step === index + 1
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground"
                      )}
                    >
                      {step > index + 1 ? <Check className="h-5 w-5" /> : index + 1}
                    </div>
                    <span
                      className={cn(
                        "ml-2 text-sm font-medium hidden sm:block",
                        step >= index + 1 ? "text-foreground" : "text-muted-foreground"
                      )}
                    >
                      {label}
                    </span>
                  </div>
                  {index < 2 && (
                    <div
                      className={cn(
                        "h-0.5 w-12 sm:w-24 mx-2 sm:mx-4",
                        step > index + 1 ? "bg-green-600" : "bg-muted"
                      )}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Form */}
            <div className="lg:col-span-2">
              {/* Step 1: Shipping */}
              {step === 1 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Truck className="h-5 w-5" />
                      Shipping Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name</Label>
                        <Input id="firstName" placeholder="John" className="mt-1" />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" placeholder="Doe" className="mt-1" />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="john@example.com" className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone</Label>
                      <Input id="phone" type="tel" placeholder="+1 (555) 000-0000" className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="address">Address</Label>
                      <Input id="address" placeholder="123 Love Street" className="mt-1" />
                    </div>
                    <div className="grid sm:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="city">City</Label>
                        <Input id="city" placeholder="Romance City" className="mt-1" />
                      </div>
                      <div>
                        <Label htmlFor="state">State</Label>
                        <Input id="state" placeholder="RC" className="mt-1" />
                      </div>
                      <div>
                        <Label htmlFor="zip">ZIP Code</Label>
                        <Input id="zip" placeholder="12345" className="mt-1" />
                      </div>
                    </div>

                    {/* Gift Wrap Option */}
                    <div className="flex items-start gap-3 p-4 bg-muted rounded-lg">
                      <Checkbox
                        id="giftWrap"
                        checked={giftWrap}
                        onCheckedChange={(checked) => setGiftWrap(checked as boolean)}
                      />
                      <div>
                        <Label htmlFor="giftWrap" className="cursor-pointer flex items-center gap-2">
                          <Gift className="h-4 w-4 text-primary" />
                          Add Gift Wrapping (+$4.99)
                        </Label>
                        <p className="text-sm text-muted-foreground mt-1">
                          Beautiful Valentine&apos;s Day gift wrap with a personalized card
                        </p>
                      </div>
                    </div>

                    <Button onClick={() => setStep(2)} className="w-full mt-4">
                      Continue to Payment
                    </Button>
                  </CardContent>
                </Card>
              )}

              {/* Step 2: Payment */}
              {step === 2 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CreditCard className="h-5 w-5" />
                      Payment Method
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                      <div className="grid gap-4">
                        <Label
                          htmlFor="card"
                          className={cn(
                            "flex items-center gap-4 p-4 border rounded-lg cursor-pointer transition-colors",
                            paymentMethod === "card" ? "border-primary bg-primary/5" : "border-border"
                          )}
                        >
                          <RadioGroupItem value="card" id="card" />
                          <CreditCard className="h-5 w-5" />
                          <div>
                            <p className="font-medium">Credit / Debit Card</p>
                            <p className="text-sm text-muted-foreground">Visa, Mastercard, Amex</p>
                          </div>
                        </Label>

                        <Label
                          htmlFor="upi"
                          className={cn(
                            "flex items-center gap-4 p-4 border rounded-lg cursor-pointer transition-colors",
                            paymentMethod === "upi" ? "border-primary bg-primary/5" : "border-border"
                          )}
                        >
                          <RadioGroupItem value="upi" id="upi" />
                          <Wallet className="h-5 w-5" />
                          <div>
                            <p className="font-medium">UPI Payment</p>
                            <p className="text-sm text-muted-foreground">Google Pay, PhonePe, Paytm</p>
                          </div>
                        </Label>

                        <Label
                          htmlFor="cod"
                          className={cn(
                            "flex items-center gap-4 p-4 border rounded-lg cursor-pointer transition-colors",
                            paymentMethod === "cod" ? "border-primary bg-primary/5" : "border-border"
                          )}
                        >
                          <RadioGroupItem value="cod" id="cod" />
                          <Building2 className="h-5 w-5" />
                          <div>
                            <p className="font-medium">Cash on Delivery</p>
                            <p className="text-sm text-muted-foreground">Pay when you receive</p>
                          </div>
                        </Label>
                      </div>
                    </RadioGroup>

                    {/* Card Details */}
                    {paymentMethod === "card" && (
                      <div className="space-y-4 p-4 bg-muted rounded-lg">
                        <div>
                          <Label htmlFor="cardNumber">Card Number</Label>
                          <Input
                            id="cardNumber"
                            placeholder="1234 5678 9012 3456"
                            className="mt-1"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="expiry">Expiry Date</Label>
                            <Input id="expiry" placeholder="MM/YY" className="mt-1" />
                          </div>
                          <div>
                            <Label htmlFor="cvv">CVV</Label>
                            <Input id="cvv" placeholder="123" className="mt-1" />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="cardName">Name on Card</Label>
                          <Input id="cardName" placeholder="John Doe" className="mt-1" />
                        </div>
                      </div>
                    )}

                    {paymentMethod === "upi" && (
                      <div className="p-4 bg-muted rounded-lg">
                        <Label htmlFor="upiId">UPI ID</Label>
                        <Input id="upiId" placeholder="name@upi" className="mt-1" />
                      </div>
                    )}

                    <div className="flex gap-4">
                      <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                        Back
                      </Button>
                      <Button onClick={() => setStep(3)} className="flex-1">
                        Review Order
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Step 3: Review */}
              {step === 3 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Review Your Order</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Order Items */}
                    <div>
                      <h3 className="font-medium mb-4">Order Items ({cart.length})</h3>
                      <div className="space-y-3">
                        {cart.map((item) => (
                          <div key={item.id} className="flex gap-4">
                            <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                              <Image
                                src={item.image || "/placeholder.svg"}
                                alt={item.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <p className="font-medium line-clamp-1">{item.name}</p>
                              <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                            </div>
                            <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Separator />

                    {/* Payment Method */}
                    <div>
                      <h3 className="font-medium mb-2">Payment Method</h3>
                      <p className="text-muted-foreground capitalize">
                        {paymentMethod === "card"
                          ? "Credit / Debit Card"
                          : paymentMethod === "upi"
                            ? "UPI Payment"
                            : "Cash on Delivery"}
                      </p>
                    </div>

                    <div className="flex gap-4">
                      <Button variant="outline" onClick={() => setStep(2)} className="flex-1">
                        Back
                      </Button>
                      <Button onClick={handlePlaceOrder} className="flex-1 gap-2">
                        <Lock className="h-4 w-4" />
                        Place Order
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Order Summary */}
            <div>
              <Card className="sticky top-24">
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-6">Order Summary</h2>

                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Subtotal ({cart.length} item{cart.length !== 1 ? "s" : ""})
                      </span>
                      <span>${cartTotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Shipping</span>
                      <span>
                        {shippingCost === 0 ? (
                          <span className="text-green-600">FREE</span>
                        ) : (
                          `$${shippingCost.toFixed(2)}`
                        )}
                      </span>
                    </div>
                    {giftWrap && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Gift Wrap</span>
                        <span>${giftWrapCost.toFixed(2)}</span>
                      </div>
                    )}
                  </div>

                  <Separator className="my-4" />

                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-primary">${finalTotal.toFixed(2)}</span>
                  </div>

                  {/* Trust Badges */}
                  <div className="mt-6 pt-6 border-t border-border space-y-2">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Lock className="h-4 w-4" />
                      <span>Secure checkout</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Truck className="h-4 w-4" />
                      <span>Fast, reliable delivery</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default function CheckoutPage() {
  return (
    <StoreProvider>
      <CheckoutContent />
    </StoreProvider>
  )
}
