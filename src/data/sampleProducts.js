// ─── Sample Product Data ──────────────────────────────────────────────
// Used for development & demo. In production these live in Firestore.

const sampleProducts = [
  {
    id: "prod_001",
    name: "Wireless Noise-Cancelling Headphones",
    description: "Premium over-ear headphones with active noise cancellation, 30-hour battery life, and ultra-comfortable memory foam ear cups. Perfect for music lovers and remote workers.",
    price: 4999,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80",
    stock: 25,
    rating: 4.5,
    reviews: [
      { user: "Rahul S.", rating: 5, comment: "Best headphones I've ever owned!", date: "2026-02-15" },
      { user: "Priya M.", rating: 4, comment: "Great sound quality, slightly heavy.", date: "2026-02-20" }
    ]
  },
  {
    id: "prod_002",
    name: "Smart Fitness Watch Pro",
    description: "Track your fitness goals with heart rate monitoring, GPS, sleep tracking, and 7-day battery life. Water resistant up to 50 meters.",
    price: 3499,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80",
    stock: 40,
    rating: 4.3,
    reviews: [
      { user: "Amit K.", rating: 4, comment: "Accurate fitness tracking!", date: "2026-01-10" }
    ]
  },
  {
    id: "prod_003",
    name: "Premium Cotton Casual Shirt",
    description: "100% organic cotton slim-fit casual shirt. Breathable fabric perfect for all seasons. Available in multiple colors.",
    price: 1299,
    category: "Clothing",
    image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=500&q=80",
    stock: 100,
    rating: 4.7,
    reviews: [
      { user: "Vikram P.", rating: 5, comment: "Super comfortable and fits perfectly.", date: "2026-03-01" }
    ]
  },
  {
    id: "prod_004",
    name: "Running Shoes Ultra Boost",
    description: "Lightweight running shoes with responsive cushioning and breathable mesh upper. Engineered for long-distance comfort.",
    price: 5999,
    category: "Clothing",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80",
    stock: 30,
    rating: 4.6,
    reviews: [
      { user: "Sneha R.", rating: 5, comment: "So light and comfortable for running!", date: "2026-02-28" },
      { user: "Karan D.", rating: 4, comment: "Great shoes, bit narrow for wide feet.", date: "2026-03-02" }
    ]
  },
  {
    id: "prod_005",
    name: "Minimalist Desk Lamp",
    description: "Modern LED desk lamp with adjustable brightness, color temperature control, and wireless charging base. Sleek aluminum design.",
    price: 2199,
    category: "Home",
    image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=500&q=80",
    stock: 55,
    rating: 4.4,
    reviews: []
  },
  {
    id: "prod_006",
    name: "Organic Green Tea Collection",
    description: "Assorted pack of 50 organic green tea bags. Includes jasmine, matcha, and classic green tea variants. Rich in antioxidants.",
    price: 699,
    category: "Home",
    image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=500&q=80",
    stock: 200,
    rating: 4.2,
    reviews: [
      { user: "Meera J.", rating: 4, comment: "Refreshing taste, great for mornings.", date: "2026-01-25" }
    ]
  },
  {
    id: "prod_007",
    name: "JavaScript: The Definitive Guide",
    description: "The ultimate reference for JavaScript developers. Covers ES2025+, async patterns, modules, and modern web APIs. 7th Edition.",
    price: 899,
    category: "Books",
    image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=500&q=80",
    stock: 75,
    rating: 4.8,
    reviews: [
      { user: "Arjun N.", rating: 5, comment: "Must-read for every JS developer.", date: "2026-02-05" }
    ]
  },
  {
    id: "prod_008",
    name: "Wireless Bluetooth Speaker",
    description: "Portable waterproof speaker with 360° sound, 20-hour battery, and deep bass. Connect two speakers for stereo mode.",
    price: 2499,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&q=80",
    stock: 60,
    rating: 4.1,
    reviews: [
      { user: "Deepak V.", rating: 4, comment: "Solid bass for its size.", date: "2026-02-18" }
    ]
  },
  {
    id: "prod_009",
    name: "Leather Crossbody Bag",
    description: "Handcrafted genuine leather crossbody bag with adjustable strap. Features multiple compartments and vintage brass hardware.",
    price: 3299,
    category: "Clothing",
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500&q=80",
    stock: 20,
    rating: 4.6,
    reviews: []
  },
  {
    id: "prod_010",
    name: "Ceramic Pour-Over Coffee Set",
    description: "Artisan ceramic pour-over dripper with glass carafe and measuring scoop. Brew cafe-quality coffee at home.",
    price: 1599,
    category: "Home",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500&q=80",
    stock: 35,
    rating: 4.5,
    reviews: [
      { user: "Sonal T.", rating: 5, comment: "Beautiful set, makes amazing coffee.", date: "2026-03-05" }
    ]
  },
  {
    id: "prod_011",
    name: "Atomic Habits by James Clear",
    description: "The #1 bestseller on building good habits and breaking bad ones. Practical strategies backed by scientific research.",
    price: 499,
    category: "Books",
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500&q=80",
    stock: 150,
    rating: 4.9,
    reviews: [
      { user: "Neha G.", rating: 5, comment: "Life-changing book!", date: "2026-01-30" },
      { user: "Rohit M.", rating: 5, comment: "Simple, actionable advice.", date: "2026-02-12" }
    ]
  },
  {
    id: "prod_012",
    name: "4K Ultra HD Webcam",
    description: "Professional 4K webcam with auto-focus, noise-cancelling microphone, and adjustable ring light. Ideal for streaming and video calls.",
    price: 4499,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=500&q=80",
    stock: 15,
    rating: 4.3,
    reviews: [
      { user: "Ananya S.", rating: 4, comment: "Crystal clear video quality.", date: "2026-03-03" }
    ]
  }
];

export default sampleProducts;

export const categories = ["All", "Electronics", "Clothing", "Home", "Books"];
