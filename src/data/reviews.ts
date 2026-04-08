export interface Review {
  id: string;
  productId: string;
  author: string;
  rating: number;
  title: string;
  body: string;
  date: string;
  verified: boolean;
}

export const reviews: Review[] = [
  // Sunrise Blend
  { id: "r1", productId: "sunrise-blend", author: "Arjun M.", rating: 5, title: "Absolutely incredible", body: "Best light roast I've had. The citrus notes are so clean and bright. Will order again.", date: "2025-12-15", verified: true },
  { id: "r2", productId: "sunrise-blend", author: "Priya K.", rating: 5, title: "Morning essential", body: "This has replaced my regular coffee. So fresh, you can smell it through the bag.", date: "2025-11-28", verified: true },
  { id: "r3", productId: "sunrise-blend", author: "Sam D.", rating: 4, title: "Great but wish it was bigger", body: "Fantastic flavour profile. Would love a 500g option.", date: "2025-11-10", verified: true },

  // Midnight Roast
  { id: "r4", productId: "midnight-roast", author: "Rahul K.", rating: 5, title: "Dark roast perfection", body: "Smoky, bold, and beautifully balanced. Perfect for cold brew.", date: "2025-12-20", verified: true },
  { id: "r5", productId: "midnight-roast", author: "Anjali S.", rating: 4, title: "Rich and bold", body: "Love the chocolate notes. A bit too dark for pour-over but incredible as espresso.", date: "2025-12-05", verified: true },

  // Countryside Medium
  { id: "r6", productId: "countryside-medium", author: "Vikram P.", rating: 5, title: "The perfect everyday coffee", body: "Balanced, smooth, and never bitter. My go-to for morning pour-overs.", date: "2025-12-18", verified: true },
  { id: "r7", productId: "countryside-medium", author: "Meera R.", rating: 5, title: "Crowd pleaser", body: "Everyone who visits asks what coffee this is. Great for guests.", date: "2025-11-22", verified: true },
  { id: "r8", productId: "countryside-medium", author: "Kiran T.", rating: 4, title: "Solid house blend", body: "Reliable, tasty, and well-priced. Exactly what a house blend should be.", date: "2025-10-30", verified: false },

  // Harvest Reserve
  { id: "r9", productId: "harvest-reserve", author: "Deepak N.", rating: 5, title: "Worth every penny", body: "The floral notes are unlike anything else. Truly a micro-lot experience.", date: "2025-12-12", verified: true },

  // Mugs
  { id: "r10", productId: "artisan-mug-cream", author: "Lisa W.", rating: 5, title: "Beautiful craftsmanship", body: "Each mug is genuinely unique. The cream glaze is gorgeous.", date: "2025-12-01", verified: true },
  { id: "r11", productId: "artisan-mug-forest", author: "Arun B.", rating: 5, title: "Love the forest colour", body: "Deep, rich green. Feels substantial in your hands. Daily driver now.", date: "2025-11-15", verified: true },
  { id: "r12", productId: "travel-tumbler", author: "Neha G.", rating: 4, title: "Keeps coffee hot forever", body: "Great tumbler. Coffee was still warm after 5 hours. Slight leak when tilted.", date: "2025-12-08", verified: true },

  // Equipment
  { id: "r13", productId: "pour-over-set", author: "Sanjay M.", rating: 5, title: "Perfect starter kit", body: "Everything you need in one box. The glass carafe is beautiful.", date: "2025-12-19", verified: true },
  { id: "r14", productId: "pour-over-set", author: "Amy L.", rating: 5, title: "Gift that keeps giving", body: "Bought this as a gift and ended up getting one for myself.", date: "2025-11-25", verified: true },
  { id: "r15", productId: "hand-grinder", author: "Rohit C.", rating: 4, title: "Solid grinder", body: "Great grind consistency. A bit of an arm workout but worth it for fresh grounds.", date: "2025-12-14", verified: true },

  // Merch
  { id: "r16", productId: "tote-bag", author: "Maya S.", rating: 5, title: "Sturdy and stylish", body: "Use it for groceries every week. Gets compliments at the store.", date: "2025-12-10", verified: true },
  { id: "r17", productId: "apron", author: "Chef Raj", rating: 5, title: "Professional quality", body: "The waxed canvas is incredibly durable. Leather straps are a nice touch.", date: "2025-12-22", verified: true },
];

export function getProductReviews(productId: string): Review[] {
  return reviews.filter((r) => r.productId === productId);
}

export function getProductRating(productId: string): { avg: number; count: number } {
  const productReviews = getProductReviews(productId);
  if (productReviews.length === 0) return { avg: 0, count: 0 };
  const avg = productReviews.reduce((sum, r) => sum + r.rating, 0) / productReviews.length;
  return { avg: Math.round(avg * 10) / 10, count: productReviews.length };
}
