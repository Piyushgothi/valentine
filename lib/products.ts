import type { Product } from "./store-context"

export const products: Product[] = [
  {
    id: "1",
    name: "Classic Red Rose Bouquet",
    price: 49.99,
    originalPrice: 69.99,
    image: "https://images.unsplash.com/photo-1518621736915-f3b1c41bfd00?w=400&h=400&fit=crop",
    category: "gifts-for-her",
    description: "A stunning arrangement of 24 premium red roses, hand-tied with satin ribbon. Perfect for expressing your deepest love.",
    rating: 4.9,
    reviews: 328,
    inStock: true,
    badge: "Best Seller"
  },
  {
    id: "2",
    name: "Luxury Teddy Bear",
    price: 34.99,
    originalPrice: 44.99,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop",
    category: "gifts-for-her",
    description: "An adorable 18-inch plush teddy bear with a soft velvet bow. A cuddly companion to treasure forever.",
    rating: 4.8,
    reviews: 215,
    inStock: true,
    badge: "Valentine Special"
  },
  {
    id: "3",
    name: "Premium Chocolate Gift Box",
    price: 59.99,
    image: "https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=400&h=400&fit=crop",
    category: "gifts-for-him",
    description: "Handcrafted Belgian chocolates in a luxurious heart-shaped box. 24 assorted flavors including dark, milk, and white chocolate.",
    rating: 4.7,
    reviews: 189,
    inStock: true
  },
  {
    id: "4",
    name: "Couple Rings Set",
    price: 129.99,
    originalPrice: 179.99,
    image: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=400&h=400&fit=crop",
    category: "couple-gifts",
    description: "Matching sterling silver couple rings with engraved hearts. Adjustable size fits most.",
    rating: 4.9,
    reviews: 156,
    inStock: true,
    badge: "Limited Edition"
  },
  {
    id: "5",
    name: "Romantic Photo Frame",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e35a6?w=400&h=400&fit=crop",
    category: "couple-gifts",
    description: "Elegant wooden photo frame with 'Forever & Always' engraving. Holds two 4x6 photos.",
    rating: 4.6,
    reviews: 98,
    inStock: true
  },
  {
    id: "6",
    name: "Heart Pendant Necklace",
    price: 79.99,
    originalPrice: 99.99,
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=400&fit=crop",
    category: "gifts-for-her",
    description: "18K gold-plated heart pendant with cubic zirconia stones. Comes with a delicate chain.",
    rating: 4.8,
    reviews: 267,
    inStock: true,
    badge: "Top Rated"
  },
  {
    id: "7",
    name: "Valentine Greeting Card Set",
    price: 14.99,
    image: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=400&h=400&fit=crop",
    category: "gifts-for-him",
    description: "Set of 6 handmade Valentine cards with romantic messages and beautiful illustrations.",
    rating: 4.5,
    reviews: 72,
    inStock: true
  },
  {
    id: "8",
    name: "Customized Love Mug",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=400&h=400&fit=crop",
    category: "couple-gifts",
    description: "Ceramic mug with custom photo and message. Dishwasher safe. Perfect for morning coffee together.",
    rating: 4.7,
    reviews: 134,
    inStock: true
  },
  {
    id: "9",
    name: "Valentine Combo Pack",
    price: 149.99,
    originalPrice: 199.99,
    image: "https://images.unsplash.com/photo-1518621736915-f3b1c41bfd00?w=400&h=400&fit=crop",
    category: "couple-gifts",
    description: "Complete Valentine gift set: Rose bouquet, chocolates, teddy bear, and greeting card. Everything for the perfect surprise.",
    rating: 5.0,
    reviews: 89,
    inStock: true,
    badge: "Best Value"
  },
  {
    id: "10",
    name: "Scented Candle Set",
    price: 39.99,
    image: "https://images.unsplash.com/photo-1602607434774-42bb1cf8e5e1?w=400&h=400&fit=crop",
    category: "gifts-for-her",
    description: "Set of 3 romantic scented candles: Rose, Vanilla, and Jasmine. Burns for 40+ hours each.",
    rating: 4.6,
    reviews: 108,
    inStock: true
  },
  {
    id: "11",
    name: "Silk Tie & Cufflinks Set",
    price: 54.99,
    originalPrice: 74.99,
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&h=400&fit=crop",
    category: "gifts-for-him",
    description: "Premium silk tie with matching cufflinks in an elegant gift box. Perfect for the dapper gentleman.",
    rating: 4.7,
    reviews: 86,
    inStock: true
  },
  {
    id: "12",
    name: "Love Letter Writing Kit",
    price: 19.99,
    image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=400&h=400&fit=crop",
    category: "gifts-for-him",
    description: "Vintage-style stationery set with parchment paper, envelopes, wax seal, and calligraphy pen.",
    rating: 4.4,
    reviews: 54,
    inStock: true
  }
]

export const categories = [
  { id: "gifts-for-her", name: "Gifts for Her", icon: "heart" },
  { id: "gifts-for-him", name: "Gifts for Him", icon: "gift" },
  { id: "couple-gifts", name: "Couple Gifts", icon: "hearts" }
]

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id)
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter((p) => p.category === category)
}

export function getBestSellers(): Product[] {
  return products.filter((p) => p.badge === "Best Seller" || p.rating >= 4.8).slice(0, 4)
}

export function getFeaturedDeals(): Product[] {
  return products.filter((p) => p.originalPrice).slice(0, 4)
}
