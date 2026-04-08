export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: "beans" | "mugs" | "equipment" | "merch";
  badge?: string;
  details?: string[];
  origin?: string;
  roast?: "light" | "medium" | "dark";
  weight?: string;
}

export const products: Product[] = [
  // Beans
  {
    id: "sunrise-blend",
    name: "Sunrise Blend",
    description: "A bright, fruity morning blend with notes of citrus and honey. Sourced from Ethiopian highlands.",
    price: 18.99,
    image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800&h=1000&fit=crop&q=80",
    category: "beans",
    badge: "Bestseller",
    origin: "Ethiopia",
    roast: "light",
    weight: "250g",
    details: ["Single origin", "Hand-picked cherries", "Sun-dried processing"],
  },
  {
    id: "midnight-roast",
    name: "Midnight Roast",
    description: "Bold, smoky, and full-bodied. A dark roast for those who crave intensity.",
    price: 21.99,
    image: "https://images.unsplash.com/photo-1587734195503-904fca47e0e9?w=800&h=1000&fit=crop&q=80",
    category: "beans",
    badge: "New",
    origin: "Colombia",
    roast: "dark",
    weight: "250g",
    details: ["Blend of two origins", "Chocolate & walnut notes", "French roast style"],
  },
  {
    id: "countryside-medium",
    name: "Countryside Medium",
    description: "Our signature balanced medium roast. Caramel sweetness with a smooth, clean finish.",
    price: 19.99,
    image: "https://images.unsplash.com/photo-1611854779393-1b2da9d400fe?w=800&h=1000&fit=crop&q=80",
    category: "beans",
    origin: "Brazil & Guatemala",
    roast: "medium",
    weight: "250g",
    details: ["House blend", "Caramel & nutty notes", "Perfect for espresso"],
  },
  {
    id: "harvest-reserve",
    name: "Harvest Reserve",
    description: "Limited-edition micro-lot from Yirgacheffe. Floral, tea-like, and exceptionally clean.",
    price: 28.99,
    image: "https://images.unsplash.com/photo-1695653422259-8a74ffe90401?w=800&h=1000&fit=crop&q=80",
    category: "beans",
    badge: "Limited",
    origin: "Ethiopia Yirgacheffe",
    roast: "light",
    weight: "200g",
    details: ["Micro-lot", "Washed process", "Jasmine & bergamot notes"],
  },
  // Mugs
  {
    id: "artisan-mug-cream",
    name: "Artisan Ceramic Mug — Cream",
    description: "Hand-thrown ceramic mug in our signature cream glaze. 12oz capacity.",
    price: 32.00,
    image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=800&h=1000&fit=crop&q=80",
    category: "mugs",
    details: ["Handmade ceramic", "Dishwasher safe", "12oz / 350ml"],
  },
  {
    id: "artisan-mug-forest",
    name: "Artisan Ceramic Mug — Forest",
    description: "Hand-thrown ceramic mug in deep forest green. Each piece is unique.",
    price: 32.00,
    image: "https://images.unsplash.com/photo-1577937927133-66ef06acdf18?w=800&h=1000&fit=crop&q=80",
    category: "mugs",
    badge: "Handmade",
    details: ["Handmade ceramic", "Dishwasher safe", "12oz / 350ml"],
  },
  {
    id: "travel-tumbler",
    name: "Country Travel Tumbler",
    description: "Double-walled stainless steel tumbler. Keeps coffee hot for 6 hours.",
    price: 38.00,
    image: "https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?w=800&h=1000&fit=crop&q=80",
    category: "mugs",
    details: ["Stainless steel", "Double-walled vacuum", "16oz / 475ml"],
  },
  // Equipment
  {
    id: "pour-over-set",
    name: "Pour Over Starter Set",
    description: "Everything you need for the perfect pour-over. Includes dripper, filters, and carafe.",
    price: 54.00,
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&h=1000&fit=crop&q=80",
    category: "equipment",
    badge: "Popular",
    details: ["Ceramic dripper", "Glass carafe", "40 paper filters included"],
  },
  {
    id: "hand-grinder",
    name: "Manual Burr Grinder",
    description: "Precision conical burr grinder for the freshest grind. Adjustable from espresso to French press.",
    price: 62.00,
    image: "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=800&h=1000&fit=crop&q=80",
    category: "equipment",
    details: ["Conical burr", "15 grind settings", "Holds 30g beans"],
  },
  // Merch
  {
    id: "tote-bag",
    name: "Country Coffee Tote",
    description: "Organic cotton tote with our logo. Sturdy enough for your weekly coffee haul.",
    price: 24.00,
    image: "https://images.unsplash.com/photo-1622260614153-03223fb72052?w=800&h=1000&fit=crop&q=80",
    category: "merch",
    details: ["100% organic cotton", "Reinforced handles", "Screen-printed logo"],
  },
  {
    id: "notebook",
    name: "Brew Journal",
    description: "Track your brews, ratios, and tasting notes. 120 pages of guided templates.",
    price: 18.00,
    image: "https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=800&h=1000&fit=crop&q=80",
    category: "merch",
    details: ["120 pages", "Guided brew templates", "Lay-flat binding"],
  },
  {
    id: "apron",
    name: "Barista Apron",
    description: "Waxed canvas apron with leather straps. Built for serious home baristas.",
    price: 48.00,
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=1000&fit=crop&q=80",
    category: "merch",
    badge: "New",
    details: ["Waxed canvas", "Adjustable leather straps", "Two front pockets"],
  },
];

export const categories = [
  { id: "all", name: "All Products" },
  { id: "beans", name: "Coffee Beans" },
  { id: "mugs", name: "Mugs & Tumblers" },
  { id: "equipment", name: "Equipment" },
  { id: "merch", name: "Merch" },
] as const;
