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
  },
  // ──── NEW PRODUCTS ────
  {
    id: "prod_013",
    name: "Mechanical Gaming Keyboard RGB",
    description: "Hot-swappable mechanical keyboard with per-key RGB lighting, Cherry MX Blue switches, and aircraft-grade aluminum frame. N-key rollover for competitive gaming.",
    price: 6499,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=500&q=80",
    stock: 45,
    rating: 4.7,
    reviews: [
      { user: "Raj P.", rating: 5, comment: "The typing feel is incredible!", date: "2026-03-01" },
      { user: "Divya S.", rating: 4, comment: "Beautiful RGB effects, slightly loud.", date: "2026-03-04" }
    ]
  },
  {
    id: "prod_014",
    name: "Vintage Denim Jacket",
    description: "Classic vintage-wash denim jacket with sherpa lining. Timeless style meets modern comfort. Unisex fit available in S-XXL.",
    price: 2799,
    category: "Clothing",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&q=80",
    stock: 35,
    rating: 4.5,
    reviews: [
      { user: "Isha T.", rating: 5, comment: "Perfect fit and amazing quality!", date: "2026-02-22" }
    ]
  },
  {
    id: "prod_015",
    name: "Smart Home Aroma Diffuser",
    description: "WiFi-enabled essential oil diffuser with LED mood lighting, timer control, and voice assistant compatibility. Covers up to 500 sq ft.",
    price: 1899,
    category: "Home",
    image: "https://images.unsplash.com/photo-1602928321679-560bb453f190?w=500&q=80",
    stock: 80,
    rating: 4.4,
    reviews: [
      { user: "Kavya R.", rating: 4, comment: "Love the ambient lighting feature!", date: "2026-02-10" }
    ]
  },
  {
    id: "prod_016",
    name: "The Psychology of Money",
    description: "Morgan Housel's bestseller exploring the strange ways people think about money. 19 short stories about the role of money in our lives.",
    price: 399,
    category: "Books",
    image: "https://images.unsplash.com/photo-1592496431122-2349e0fbc666?w=500&q=80",
    stock: 200,
    rating: 4.8,
    reviews: [
      { user: "Aditya M.", rating: 5, comment: "Changed how I think about money entirely.", date: "2026-01-18" },
      { user: "Pooja K.", rating: 5, comment: "A masterpiece of financial wisdom.", date: "2026-02-25" }
    ]
  },
  {
    id: "prod_017",
    name: "Wireless Earbuds Pro Max",
    description: "True wireless earbuds with hybrid ANC, spatial audio, and 36-hour total battery life. IPX5 water resistant with premium titanium drivers.",
    price: 7999,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1590658268037-6bf12f032f55?w=500&q=80",
    stock: 18,
    rating: 4.6,
    reviews: [
      { user: "Sahil J.", rating: 5, comment: "Insane sound quality, ANC is top-notch!", date: "2026-03-06" }
    ]
  },
  {
    id: "prod_018",
    name: "Handwoven Throw Blanket",
    description: "Luxurious handwoven cotton throw blanket with geometric patterns. Perfect for cozy evenings. Machine washable, 150×200 cm.",
    price: 1799,
    category: "Home",
    image: "https://images.unsplash.com/photo-1580301762395-21ce6d5d4bc4?w=500&q=80",
    stock: 65,
    rating: 4.3,
    reviews: [
      { user: "Tanvi B.", rating: 4, comment: "Incredibly soft and the design is gorgeous.", date: "2026-02-14" }
    ]
  },
  {
    id: "prod_019",
    name: "Classic Aviator Sunglasses",
    description: "Polarized UV400 aviator sunglasses with titanium frame. Lightweight, scratch-resistant lenses. Includes premium leather case.",
    price: 1999,
    category: "Clothing",
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&q=80",
    stock: 90,
    rating: 4.4,
    reviews: [
      { user: "Varun D.", rating: 5, comment: "Stylish and great polarization!", date: "2026-02-28" },
      { user: "Riya A.", rating: 4, comment: "Perfect for daily wear.", date: "2026-03-02" }
    ]
  },
  {
    id: "prod_020",
    name: "Deep Work by Cal Newport",
    description: "Rules for focused success in a distracted world. Learn how to develop deep concentration and produce elite-level work.",
    price: 449,
    category: "Books",
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500&q=80",
    stock: 120,
    rating: 4.7,
    reviews: [
      { user: "Nishant R.", rating: 5, comment: "Essential read for anyone in tech.", date: "2026-01-28" }
    ]
  }
];

export default sampleProducts;

export const categories = ["All", "Electronics", "Clothing", "Home", "Books"];
